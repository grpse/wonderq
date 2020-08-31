import { EnqueueMessageDTO } from '../entities/enqueue-message-dto'

export interface IMessagesEnqueuer {
    enqueue(message : EnqueueMessageDTO) : Promise<{ id : string }>
}