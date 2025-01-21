export interface IImage {
    name: string
    image: File
}

export interface IEventRegisterImageDetail {
    name: string
}

export interface IEventImageDetail extends IEventRegisterImageDetail{
    id: number
    image: string
}

export interface IImageResponse extends IImage {
    id: number
}