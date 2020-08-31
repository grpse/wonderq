import { DataObject } from './data-object'

export type EnqueueMessageDTO = {
    data: {
        [key:string]: DataObject
    }
}