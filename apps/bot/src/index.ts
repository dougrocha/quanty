import { PrismaClient } from '@prisma/client'
import { QuantyClient } from '@quanty/framework'
import * as dotenv from 'dotenv'

const production = process.env.production

dotenv.config({ path: production ? '.env.prod' : '.env' })

export const prisma = new PrismaClient()

export const client = new QuantyClient(
  {
    token: process.env.TOKEN,
    owner: '571520537587875851',
    devGuilds: '711679864247156747',
    defaults: true,
    logLevel: production ? 'ALL' : 'DEBUG',
    outDir: 'dist/',
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

client.setDefaultCommandError(
  'This command is broken. Please contact the server owner.',
)

void client.start()
