import { authReducer } from './reducers/Auth';
import { AuthAPI } from './apis/AuthAPI';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { UsersAPI } from './apis/UserAPI';
import { NotificationAPI } from './apis/NotificationsAPI';


const rootReducer = combineReducers({
    authReducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [UsersAPI.reducerPath]: UsersAPI.reducer,
    [NotificationAPI.reducerPath]: NotificationAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                AuthAPI.middleware, 
                UsersAPI.middleware,
                NotificationAPI.middleware
                ),
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']