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

export interface ITgUser {
    id?: number
    external_id: number
    first_name: string
    username:string
    age: number
}

export interface IAdmin {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    password: string
}