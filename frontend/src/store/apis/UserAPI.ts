import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IAdmin } from "../../models/IAuth"
import { tokenService } from "../../services/TokenService"


const url = 'users'

export const UsersAPI = createApi({
    reducerPath:'UsersAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        loadMyProfile: build.query<IAdmin, void>({
            query: () => ({
                url: `${url}/me/`,
                headers: {'Bearer' : `${tokenService.getLocalAccessToken()}`}
           }) 
        }),
    })
})

export const {
    useLoadMyProfileQuery
} = UsersAPI