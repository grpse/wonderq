import { IMessagesEnqueuer } from './messages-enqueuer'
import { IMessagesPuller } from './messages-puller'
import { IMessagesProcessor } from './messages-processor'
import { MessageData } from '../entities/message-data'
import { ISettings } from '../../../settings/settings'
import { IRepository } from '../repositories/repository'
import { EnqueueMessageDTO } from '../entities/enqueue-message-dto'
import { LockableMessageData } from '../entities/lockable-message-data'

export class WonderQ implements IMessagesEnqueuer, IMessagesPuller, IMessagesProcessor {

    private mutex = false

    constructor(
        private readonly messagesRepo : IRepository<LockableMessageData>,
        private readonly settings : ISettings
    ) { }

    async enqueue(message: EnqueueMessageDTO): Promise<{ id : string }> {
        const messageData : LockableMessageData = {
            id: '',
            locked: false,
            ...message,
        }
        return await this.messagesRepo.save(messageData)
    }

    async getNext(amount: number): Promise<MessageData[]> {
        return new Promise<MessageData[]>(async (resolve) => {
            if (this.mutex) {
                const retryInterval = setInterval(async () => {
                    if (!this.mutex) {
                        resolve(await this.retrieveUnlockedMessages(amount))
                        clearInterval(retryInterval)
                    }
                }, 50)
            } else {
                this.mutex = true
                resolve(await this.retrieveUnlockedMessages(amount))
                this.mutex = false
            }
        })
    }

    async process(id : string) : Promise<boolean> {
        try {
            const found = await this.messagesRepo.find({ id, locked: true }, 1)
            if (found[0] && found[0].id === id) {
                await this.messagesRepo.delete(id)
                return true
            }
            return false
        } catch(e) {
            return false
        }
    }

    private async retrieveUnlockedMessages(limit : number) : Promise<MessageData[]> {
        
        const unlockedMessages = await this.messagesRepo.find({ locked: false }, limit)
        const unlockedMessagesIds = unlockedMessages.map(message => message.id)
        await this.messagesRepo.update(unlockedMessagesIds, { locked: true })

        const resetMessagesTimeout = this.settings.getNumber('LOCK_MESSAGES_TIMEOUT')
        setTimeout(async () => {
            await this.messagesRepo.update(unlockedMessagesIds, { locked: false })
        }, resetMessagesTimeout)

        return unlockedMessages.map(message => ({
            id: message.id,
            data: message.data,
        } as MessageData)) 
    }
}