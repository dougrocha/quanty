import { join } from 'path'

import QuantyClient from '@quanty/framework'
import * as dotenv from 'dotenv'

const ENV = process.env.NODE_ENV
console.log(ENV)
dotenv.config({ path: ENV ? `.env.${ENV}` : '.env' })

const client = new QuantyClient(
  {
    token: process.env.TOKEN,
    mongoUri: process.env.MONGOURI,
    // WebSocketConfig: {
    //   url: process.env.WS_URL,
    //   token: process.env.WEBSOCKET_TOKEN,
    // },
    botOwners: ['571520537587875851'],
    commandsDir: join(__dirname, 'commands'),
    featuresDir: join(__dirname, 'features'),
    testServers: ['871581301713555526'],
    defaultValues: {
      defaultCommands: false,
    },
  },
  { intents: 32509 },
  // ExtraPlugins,
)

void client.start()

export default client
