import { createApi } from "@reduxjs/toolkit/query/react";
import { ILogin } from "../../models/IAuth";
import { customFetchBase } from "./customFetchBase";


const url = 'auth'

export const AuthAPI = createApi({
    reducerPath: 'AuthAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        LogInUser: build.mutation<ILogin, {username: string, password: string}>({
            query: (arg) => ({
                url: `${url}/login/`,
                method: 'POST',
                body: arg
            }),
        }),
        LogOutUser: build.mutation<void, string>({
            query: (refresh) => ({
                url:`${url}/logout/`,
                method:'POST',
                body:{refresh: `${refresh}`}
            })
        }),
        RefreshToken: build.mutation<string, string>({
            query: (refresh) => (
                {
                    url:`${url}/token/refresh/`,
                    method: 'POST',
                    body:refresh
                }
            )
        })
    })
})

export const {
    useLogInUserMutation,
    useRefreshTokenMutation,
    useLogOutUserMutation
} = AuthAPI