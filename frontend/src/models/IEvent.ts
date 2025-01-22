import { ITgUser } from "./IAuth"
import { IEventImageDetail, IEventRegisterImageDetail } from "./IImage"

export type IRegistrationEvent = {
    image_detail?: IEventRegisterImageDetail
    free_places: number
    name: string
    datetime_start: string
    datetime_end: string
    address?: string
    description?: string
    organizer: string
    contacts: string
    places: number
    image?: number
}

export interface IEvent extends Omit<IRegistrationEvent, 'image_detail'> {
    id?: number
    image_detail?: IEventImageDetail
    users?: number
}

export interface IEventGetUsers {
    id?: number
    event_name?: string
    user?: ITgUser
    subcribe?: boolean
    created_at?: string
    updated_at?: string
    event: number
}