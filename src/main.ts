import express from 'express'
import bodyParser from 'body-parser'
import { settings } from './settings'
import messagesRouterV1 from './messages/router-v1'

async function main() {
    const app = express()
    app.use(bodyParser.json())
    const port = settings.getNumber('PORT') || 3000

    app.use('/v1', messagesRouterV1)

    app.listen(port, (hostname) => {
        console.log(`WonderQ listening on PORT: ${port}`)
    })
}

main()