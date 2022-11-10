import { PrismaClient } from '@prisma/client'
import { QuantyClient } from '@quanty/framework'
import * as dotenv from 'dotenv'
import { createClient } from 'redis'

const production = process.env.NODE_ENV === 'production'
dotenv.config({ path: production ? '.env.production' : '.env.development' })

export const prisma = new PrismaClient()

const redis = createClient({
  url: process.env.REDIS_URL,
})

redis.on('error', err => console.log('Redis Client Error', err))

void redis.connect()

export const client = new QuantyClient({
  owner: ['571520537587875851'],
  devGuilds: ['871581301713555526'],
  defaults: {
    events: true,
  },
  logLevel: production ? 'ALL' : 'DEBUG',
  outDir: 'dist/',
  baseDirectory: 'src/',
  intents: [
    'Guilds',
    'GuildBans',
    'GuildInvites',
    'GuildMembers',
    'GuildMessages',
    'GuildMessageReactions',
    'GuildWebhooks',
  ],
})

client.setDefaultCommandError(
  'This command is broken. Please contact the server owner.',
)

void client.login(process.env.BOT_TOKEN)
