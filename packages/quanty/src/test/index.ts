import { join } from 'path'

import * as dotenv from 'dotenv'

import QuantyClient from '../client'

const ENV = process.env.NODE_ENV
dotenv.config({ path: !ENV ? '.env' : `.env.${ENV}` })

const client = new QuantyClient(
  {
    token: process.env.TOKEN,
    mongoUri: process.env.MONGOURI,
    WebSocketConfig: {
      url: process.env.WS_URL,
      token: process.env.WEBSOCKET_TOKEN,
    },
    botOwners: ['571520537587875851'],
    commandsDir: join(__dirname, 'commands'),
    featuresDir: join(__dirname, 'features'),
    testServers: ['871581301713555526'],
  },
  { intents: 32509 },
)

void client.start()

export default client
