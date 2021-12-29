import * as dotenv from 'dotenv'

const ENV = process.env.NODE_ENV
dotenv.config({ path: !ENV ? '.env' : `.env.${ENV}` })

import QuantyClient from '@quanty/framework'
import { join } from 'path'

import { nodeConfig, spotifyConfig } from './utils/clientConfig'

const client = new QuantyClient(
  {
    token: process.env.TOKEN,
    mongoUri: process.env.MONGOURI,
    WSUrl: process.env.WS_URL,
    botOwners: ['571520537587875851'],
    commandsDir: 'commands',
    featuresDir: join(__dirname, 'features'),
    testServers: ['871581301713555526'],
  },
  { intents: 32509 },
  {
    spotifyConfig,
    nodeConfig,
  },
)

export default client
