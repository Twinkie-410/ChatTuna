import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IEvent, IEventGetUsers, IRegistrationEvent } from "../../models/IEvent"

const url = 'event'

export interface IUpdateEvent {
    data:IRegistrationEvent
    id:number
}

export const EventAPI = createApi({
    reducerPath:'EventAPI',
    baseQuery: customFetchBase,
    tagTypes:['Event'],
    endpoints: (build) => ({
        createEvent: build.mutation<IEvent, IRegistrationEvent>({
            query: (args) => ({
                url: `${url}/create/`,
                method:'POST',
                body: args
           }) 
        }),
        getEventDetail: build.query<IEvent, number>({
            query: (id) => ({
                url:`${url}/detail/${id}`,
            }),
            providesTags:["Event"]
        }),
        getUsersOfEvent: build.query<IEventGetUsers[], number>({
            query: (id) => ({
                url:`${url}/${id}/users`,
            })
        }),
        getEventsList: build.query<IEvent[], void>({
            query: () => ({
                url:`${url}/list/`,
            }),
            providesTags:["Event"]
        }),
        updateEvent: build.mutation<IEvent, IUpdateEvent>({
            query: (args) => ({
                url: `${url}/detail/${args.id}/`,
                method:'PATCH',
                body: args.data
           }),
           invalidatesTags:['Event']
        }),
    })
})

export const {
    useCreateEventMutation,
    useGetEventDetailQuery,
    useGetEventsListQuery,
    useGetUsersOfEventQuery,
    useUpdateEventMutation
} = EventAPI