import { MessageData } from '../entities/message-data'
import { IMessagesPuller } from '../queue/messages-puller'
import { PullMessagesController } from './pull-messages-controller'

describe('Pull', () => {
    describe('PullMessagesController', () => {
        it('should pull N messages from queue', async () => {
            // 1. arrange 
            const queue = new MockMessagesPuller()
            const controller = new PullMessagesController(queue)
            const amountOfMessages = 2
            const params : PullMessagesController.Params = {
                amount: amountOfMessages,
            }

            // 2. act
            const retrievedMessages = await controller.execute(params)

            // 3. assert
            expect(retrievedMessages).toEqual(queue.lastMessages)
        })
    })
})

class MockMessagesPuller implements IMessagesPuller {

    private mutex = {}

    lastMessages : MessageData[] = [{ id: '1' }, { id: '2' }]

    async getNext(amount: number): Promise<MessageData[]> {
        return this.lastMessages
    }

}