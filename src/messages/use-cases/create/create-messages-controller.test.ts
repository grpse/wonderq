import { MessageData } from '../entities/message-data'
import { IMessagesEnqueuer } from '../queue/messages-enqueuer'
import { CreateMessagesController } from './create-messages-controller'

describe('Messages', () => {
    describe('CreateMessagesController', () => {

        it('should create a message and return message id', async () => {
            // 1. arrange
            const message : MessageData = {                
                data: {
                    processing_unit: '123456',
                    sku: 'SKU123',
                }
            }
            const queue = new MockMessagesEnqueuer()
            const controller = new CreateMessagesController(queue)
            const executeParams : CreateMessagesController.Params = {
                message,
            }
    
            // 2. act
            const messageId = await controller.execute(executeParams)
    
            // 3. assert
            expect(messageId).toEqual({ id: queue.lastId })
        })
    })
})

export class MockMessagesEnqueuer implements IMessagesEnqueuer {

    private lastIdNumber = 0
    lastId : string = ''
    
    async enqueue(message : MessageData): Promise<{ id: string }> {
        this.lastIdNumber += 1
        this.lastId = `${this.lastIdNumber}`
        return { id: this.lastId }
    }
}