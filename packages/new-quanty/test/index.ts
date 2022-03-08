import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { QuantyClient } from '../src/structures/client/Client'

process.env.production = 'true'

const client: QuantyClient = new QuantyClient(
  {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    token: process.env.TOKEN!,
    commandDir: 'commands/',
    eventDir: 'events/',
    owner: '',
    baseDir: 'test/',
    defaultCommands: {
      help: true,
      ping: true,
    },
    logLevel: 'DEBUG',
  },
  {
    intents: ['GUILDS', 'GUILD_MESSAGES'],
    presence: {
      activities: [
        {
          name: 'quanty.xyz',
          type: 'PLAYING',
          url: 'https://www.quanty.xyz/',
        },
      ],
    },
  },
)

void client.start()
