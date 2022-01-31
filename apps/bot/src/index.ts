import { join } from 'path'

import QuantyClient from '@quanty/framework'
import * as dotenv from 'dotenv'

const ENV = process.env.NODE_ENV
dotenv.config({ path: `.env.${ENV}` })

import { spotifyConfig, nodeConfig } from './utils/clientConfig'

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
    defaultValues: {
      defaultCommands: false,
    },
  },
  { intents: 32509 },
  {
    spotifyConfig,
    nodeConfig,
  },
)

void client.start()

export default client
