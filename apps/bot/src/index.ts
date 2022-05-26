import { QuantyClient } from '@quanty/framework'
import * as dotenv from 'dotenv'

const production = process.env.production

dotenv.config({ path: production ? '.env.prod' : '.env' })

class Client extends QuantyClient {
  constructor() {
    super(
      {
        token: process.env.TOKEN,
        owner: ['571520537587875851'],
        devGuilds: '871581301713555526',
        defaults: true,
        logLevel: production ? 'ALL' : 'DEBUG',
      },
      {
        intents: [
          'GUILDS',
          'GUILD_MEMBERS',
          'GUILD_BANS',
          'GUILD_VOICE_STATES',
          'GUILD_MEMBERS',
          'GUILD_WEBHOOKS',
          'GUILD_MESSAGES',
        ],
      },
    )
  }
}

const client = new Client()

client.setDefaultCommandError(
  'This command is broken. Please contact the server owner.',
)

void client.start()

export default client
