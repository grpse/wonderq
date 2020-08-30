import { IMessagesPuller } from '../queue/messages-puller';
import { MessageData } from '../entities/message-data';

export class PullMessagesController {
    constructor(private readonly messagesPuller : IMessagesPuller) { }

    async execute(params : PullMessagesController.Params) : Promise<MessageData[]> {
        const {
            amount,
        } = params

        return await this.messagesPuller.getNext(amount)
    }
}

export namespace PullMessagesController {
    export type Params = {
        amount: number
    }
}