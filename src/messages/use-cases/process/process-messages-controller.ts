import { IMessagesProcessor } from '../queue/messages-processor';

export class ProcessMessagesController {
    constructor(private readonly messagesProcessor : IMessagesProcessor) { }

    async execute(params : ProcessMessagesController.Params) : Promise<boolean> {
        const {
            id
        } = params
        return await this.messagesProcessor.process(id)
    }
}

export namespace ProcessMessagesController {
    export type Params = {
        id: string
    }
}