import { WonderQ } from './wonder-queue'
import { ISettings } from '../../../settings/settings'
import { InMemoryRepository } from '../repositories/inmemory-repository'
import { EnqueueMessageDTO } from '../entities/enqueue-message-dto'
import { LockableMessageData } from '../entities/lockable-message-data'

describe('Queue', () => {
    describe('WonderQ', () => {
        it('should enqueue message', async () => {
            // 1. arrange
            const repository = new InMemoryRepository<LockableMessageData>()
            const settings = new MockSettings({ LOCK_MESSAGES_TIMEOUT : 10 })
            const wonderq = new WonderQ(repository, settings)
            const message : EnqueueMessageDTO = { data: { text: 'DATA' } }

            // 2. act
            const messageId = await wonderq.enqueue(message)

            // 3. assert
            const pulledMessages = await wonderq.getNext(1)
            expect(messageId.id).toEqual(pulledMessages[0].id)
        })

        it('should pull messages from queue', async () => {
            // 1. arrange
            const repository = new InMemoryRepository<LockableMessageData>()
            const settings = new MockSettings({ LOCK_MESSAGES_TIMEOUT : 10 })
            const wonderq = new WonderQ(repository, settings)
            const message : EnqueueMessageDTO = { data: { text: 'DATA' } }
            const messageId = await wonderq.enqueue(message)

            // 2. act
            const pulledMessages = await wonderq.getNext(1)

            // 3. assert
            expect(pulledMessages).toEqual([{ ...message, ...messageId }])
        })

        it('should process a message from queue', async () => {
            // 1. arrange
            const repository = new InMemoryRepository<LockableMessageData>()
            const settings = new MockSettings({ LOCK_MESSAGES_TIMEOUT : 10 })
            const wonderq = new WonderQ(repository, settings)
            const message : EnqueueMessageDTO = { data: { text: 'DATA' } }
            await wonderq.enqueue(message)
            const pulledMessages = await wonderq.getNext(1)

            // 2. act
            const success = await wonderq.process(pulledMessages[0].id)

            // 3. assert
            expect(success).toBeTruthy()
        })

        it('should not be able to process a not pulled message', async () => {
            // 1. arrange
            const repository = new InMemoryRepository<LockableMessageData>()
            const settings = new MockSettings({ LOCK_MESSAGES_TIMEOUT : 10 })
            const wonderq = new WonderQ(repository, settings)
            const message : EnqueueMessageDTO = { data: { text: 'DATA' } }            
            const messageId = await wonderq.enqueue(message)

            // 2. act
            const success = await wonderq.process(messageId.id)

            // 3. assert
            expect(success).toBeFalsy()
        })

        it('should pull messages when timeout', async () => {
            // 1. arrange
            jest.useFakeTimers()
            const repository = new InMemoryRepository<LockableMessageData>()
            const settings = new MockSettings({ LOCK_MESSAGES_TIMEOUT : 10 })
            const wonderq = new WonderQ(repository, settings)
            const message : EnqueueMessageDTO = { data: { text: 'DATA' } }
            await wonderq.enqueue(message)
            const pulledMessagesFirst = await wonderq.getNext(1)
            jest.runAllTimers()

            // 2. act
            const pulledMessages = await wonderq.getNext(1)

            // 3. assert
            expect(pulledMessages).toEqual(pulledMessagesFirst)
        })
    })
})

class MockSettings implements ISettings {

    constructor(private config : { [key:string] : string | null | number }) { }

    getString(key : string) : string | null {
        return `${this.config[key]}`
    }

    getNumber(key : string) : number {
        return Number(this.config[key])
    }
}