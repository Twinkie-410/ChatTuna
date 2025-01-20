import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { INotification } from "../../models/INotification"

const url = 'notofication'

export const NotificationAPI = createApi({
    reducerPath:'NotificationAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        sendNotification: build.mutation<INotification, INotification>({
            query: (args) => ({
                url: `${url}/send/`,
                body: args
           }) 
        }),
    })
})

export const {
    useSendNotificationMutation
} = NotificationAPI