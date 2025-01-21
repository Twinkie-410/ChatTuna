import { createApi } from "@reduxjs/toolkit/query/react"
import { customFetchBase } from "./customFetchBase"
import { IImage, IImageResponse } from "../../models/IImage"

const url = 'image'

export const ImageAPI = createApi({
    reducerPath:'ImageAPI',
    baseQuery: customFetchBase,
    endpoints: (build) => ({
        createImage: build.mutation<IImageResponse, IImage>({
            query: (args) => ({
                url: `${url}/create/`,
                body: args
           }) 
        }),
    })
})

export const {
    useCreateImageMutation
} = ImageAPI