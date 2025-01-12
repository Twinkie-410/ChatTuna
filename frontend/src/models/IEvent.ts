export interface IRegistrationEvent {
    id: number
    user: number
    event: number
    subcribe: number
    created_at: Date
}

export interface IEvent {
    id: number
    name: string
    datetime_start: string
    datetime_end: string
    address: string
    description: string
    image: string
    organizer: string
    contacts: string
    places: number
    free_places: number
}