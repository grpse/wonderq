export type MessageData = {
    id?: string,
    data?: {
        [key:string]: DataObject
    }
}

type DataObject = number | boolean | string | { [key:string] : DataObject }