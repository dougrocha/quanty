import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { QuantyClient } from '../src/structures/client/Client'

const client: QuantyClient = new QuantyClient(
  {
    token: process.env.TOKEN,
    commandDir: 'commands/',
    eventDir: 'events/',
    owner: '979178442140549230',
    baseDir: 'test/',
    outDir: 'dist/',
    defaults: true,
    logLevel: 'DEBUG',
    devGuilds: '871581301713555526',
  },
  {
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'],
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

// Void client.start()
