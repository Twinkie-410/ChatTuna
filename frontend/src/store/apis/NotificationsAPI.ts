import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { INotification } from "../../models/INotification"

const url = 'notification'

export const NotificationAPI = createApi({
    reducerPath:'NotificationAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        sendNotification: build.mutation<INotification, INotification>({
            query: (args) => ({
                url: `${url}/send/`,
                method:"POST",
                body: args
           }) 
        }),
    })
})

export const {
    useSendNotificationMutation
} = NotificationAPI