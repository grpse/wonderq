import { DataObject } from './data-object'

export type MessageData = {
    id: string,
    data?: {
        [key:string]: DataObject
    }
}