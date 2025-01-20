import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IEvent, IRegistrationEvent } from "../../models/IEvent"

const url = 'event'

export const EventAPI = createApi({
    reducerPath:'EventAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        createEvent: build.mutation<IEvent, IRegistrationEvent>({
            query: (args) => ({
                url: `${url}/create/`,
                body: args
           }) 
        }),
        getEventDetail: build.query<IEvent, number>({
            query: (id) => ({
                url:`${url}/detail/${id}`,
            })
        }),
        getEventsList: build.query<IEvent[], void>({
            query: () => ({
                url:`${url}/list/`,
            })
        })
    })
})

export const {
    useCreateEventMutation,
    useGetEventDetailQuery,
    useGetEventsListQuery
} = EventAPI