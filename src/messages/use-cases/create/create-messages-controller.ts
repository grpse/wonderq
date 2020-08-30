import { IMessagesEnqueuer } from '../queue/messages-enqueuer'
import { MessageData } from '../entities/message-data'

export class CreateMessagesController {

    constructor(private readonly messagesQueue : IMessagesEnqueuer) { }

    async execute(params : CreateMessagesController.Params) : Promise<{ id : string }> {
        const {
            message,
        } = params

        return await this.messagesQueue.enqueue(message)
    }
}

export namespace CreateMessagesController {
    export type Params = {
        message: MessageData
    }
}