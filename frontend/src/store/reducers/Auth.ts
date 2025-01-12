import { createSlice } from "@reduxjs/toolkit";
import { IAdmin, IUser } from "../../models/IAuth";
import { AuthAPI } from "../apis/AuthAPI";
import { UsersAPI } from "../apis/UserAPI";

interface AuthState {
    user: IAdmin,
    isAuth: boolean,
    isLoading: boolean,
}

const initialState: AuthState = {
    user: {
        id:0,
        email: '',
        first_name: '',
        last_name: '',
        password: ''
    },
    isAuth: false,
    isLoading: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addMatcher(
            AuthAPI.endpoints.LogInUser.matchFulfilled,
            (state, {payload}) => {
                localStorage.setItem('access', payload.tokens.access)
                localStorage.setItem('refresh', payload.tokens.refresh)
                state.isAuth= true
            },
        )
        builder.addMatcher(
            UsersAPI.endpoints.loadMyProfile.matchFulfilled,
            (state, {payload}) => {
                state.user = payload
                state.isAuth = true
            }
        )
        builder.addMatcher(
            AuthAPI.endpoints.LogOutUser.matchFulfilled,
            (state) => {
                localStorage.removeItem('access')
                localStorage.removeItem('refresh')
                state.isAuth = false
                state.user = initialState.user
            }
        )
    },
})

export const authReducer = authSlice.reducer