import { IMessagesProcessor } from '../queue/messages-processor'
import { ProcessMessagesController } from './process-messages-controller'

describe('Process', () => {
    describe('ProcessMessagesController', () => {
        it('should set as processed message by id', async () => {
            // 1. arrange
            const queue = new MockMessagesProcessQueue()
            const controller = new ProcessMessagesController(queue)
            const params : ProcessMessagesController.Params = { id: '1' }

            // 2. act
            const success = await controller.execute(params)

            // 3. assert
            expect(success).toBeTruthy()
        })

        it('should not set processed message by id when message is unlocked', async () => {
            // 1. arrange
            const queue = new MockMessagesProcessQueue()
            const controller = new ProcessMessagesController(queue)
            const params : ProcessMessagesController.Params = { id: '2' }

            // 2. act
            const success = await controller.execute(params)

            // 3. assert
            expect(success).toBeFalsy()
        })
    })
})

class MockMessagesProcessQueue implements IMessagesProcessor {

    private mutex : { [id:string] : boolean } = { '1' : false, '2' : true }

    async process(id: string): Promise<boolean> {
        return !this.mutex[id]
    }

}