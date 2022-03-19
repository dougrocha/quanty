import { QuantyClient } from '@quanty/framework'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

process.env.production = 'true'

const client = new QuantyClient(
  {
    token: process.env.TOKEN,
    owner: ['571520537587875851'],
    commandDir: 'commands/',
    eventDir: 'features/',
    baseDir: 'src/',
    devGuilds: ['871581301713555526'],
    defaults: true,
    logLevel: 'DEBUG',
  },
  { intents: 32509 },
)

void client.start()

export default client
