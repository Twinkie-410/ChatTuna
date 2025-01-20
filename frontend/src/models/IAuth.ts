import { IToken } from "./IToken"

export interface ILogin {
    username: string,
    password: string,
    tokens:IToken
}

export interface IUser {
    id: number,
    first_name: string,
    last_name: string,
    created_at: Date,
    age: number
}

export interface ITgUser extends IUser {
    username: string
    email?: string
    date_joined?: string
    is_admin?: boolean
    is_staff?: boolean
    is_active?: boolean
    is_verified?: boolean
}

export interface IAdmin {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string
}