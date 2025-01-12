import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { tokenService } from "../../services/TokenService";
import axios from "axios";
import { IToken } from "../../models/IToken";


const mutex = new Mutex()
const baseUrl = '/api'

const baseQuery = fetchBaseQuery({baseUrl: baseUrl,prepareHeaders: (headers) => {
    const access = tokenService.getLocalAccessToken()

    if (access) {
        headers.set("Authorization", `Bearer ${access}`)
    }

    return headers
}})

export const customFetchBase:BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>  = async (args, api, extraOptions) => {
    await mutex.waitForUnlock()

    let result = await baseQuery(args, api, extraOptions)

    const refreshToken = tokenService.getLocalRefreshToken()

    if (result.error && result.error.status === 401 && refreshToken) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const response = await axios.post<IToken>(`${baseUrl}/auth/token/refresh/`, {'refresh':refreshToken})
                
                if (response.data) {
                    tokenService.updateLocalAccessToken(response.data.access)

                    result = await baseQuery(args, api, extraOptions)
                }
                
            } catch (e) {
                tokenService.removeTokens()
            }
            finally {
                release
            }
        }
        else {
            await mutex.waitForUnlock()

            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}