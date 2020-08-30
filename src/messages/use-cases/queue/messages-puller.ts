import { MessageData } from '../entities/message-data';

export interface IMessagesPuller {
    getNext(amount : number) : Promise<MessageData[]>
}