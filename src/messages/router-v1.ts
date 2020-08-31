import { Router, Request, Response } from 'express'
import { CreateMessagesController } from './use-cases/create/create-messages-controller'
import { PullMessagesController } from './use-cases/pull/pull-messages-controller'
import { ProcessMessagesController } from './use-cases/process/process-messages-controller'
import { WonderQ } from './use-cases/queue/wonder-queue'
import { InMemoryRepository } from './use-cases/repositories/inmemory-repository'
import { settings } from '../settings'
import { LockableMessageData } from './use-cases/entities/lockable-message-data'

const router = Router()

const repository = new InMemoryRepository<LockableMessageData>()
const wonderq = new WonderQ(repository, settings)

const createController = new CreateMessagesController(wonderq)
const processController = new ProcessMessagesController(wonderq)
const pullController = new PullMessagesController(wonderq)

router.post('/api/messages', async (req : Request, res : Response) => {
    const messageId = await createController.execute({ message: req.body })
    res.json(messageId)
})

router.get('/api/messages', async (req : Request, res : Response) => {
    const limit = (req.query['limit'] && clamp(Number(req.query['limit']), 1, 10)) || 10
    const messages = await pullController.execute({ amount : limit })
    res.json(messages)
})

router.delete('/api/messages/:id', async (req : Request, res : Response) => {
    const id = req.params['id']
    const success = await processController.execute({ id })
    res.status(success ? 200 : 422).json({ success })
})

function clamp(value : number, min : number, max : number) : number {
    return Math.max(Math.min(max, value), min)
}

export default router