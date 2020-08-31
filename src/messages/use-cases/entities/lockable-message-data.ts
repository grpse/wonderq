import { DataObject } from './data-object'

export type LockableMessageData = {
    id: string,
    locked?: boolean
    data?: {
        [key:string]: DataObject
    }
}