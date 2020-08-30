import { MessageData } from '../entities/message-data';

export interface IMessagesEnqueuer {
    enqueue(message : MessageData) : Promise<{ id : string }>
}