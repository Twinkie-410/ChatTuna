export interface IImage {
    name: string
    image: File
}

export interface IImageResponse extends IImage {
    id: number
}