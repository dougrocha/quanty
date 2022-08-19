import { ActivityType } from 'discord.js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { QuantyClient } from '../src/structures/client/Client'

const client: QuantyClient = new QuantyClient(
  {
    token: process.env.BOT_TOKEN,
    owner: '571520537587875851',
    baseDir: 'test/',
    outDir: 'dist/',
    defaults: true,
    logLevel: 'ALL',
    devGuilds: ['871581301713555526', '711679864247156747'],
  },
  {
    intents: ['Guilds', 'GuildMessages', 'GuildPresences'],
    presence: {
      activities: [
        {
          name: 'quanty.xyz',
          type: ActivityType.Playing,
          url: 'https://www.quanty.xyz/',
        },
      ],
    },
  },
)

void client.start()
