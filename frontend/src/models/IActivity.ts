export interface IRegistrationActivity {
    id: number
    user: number
    activity: number
    subcribe: number
    created_at: Date
}

export interface Activity {
    id: number
    event: number
    datetime_start: Date
    datetime_end: Date
    description: string
    organizer: string
    places: number
    free_places: number
}