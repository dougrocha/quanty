import { PrismaClient } from '@prisma/client'
import { QuantyClient } from '@quanty/framework'
import { IntentsBitField } from 'discord.js'
import * as dotenv from 'dotenv'

const production = process.env.NODE_ENV === 'production'

dotenv.config({ path: production ? '.env.production' : '.env.development' })

export const prisma = new PrismaClient()

export const client = new QuantyClient(
  {
    token: process.env.BOT_TOKEN,
    owner: ['571520537587875851'],
    devGuilds: ['711679864247156747'],
    defaults: {
      events: true,
    },
    logLevel: production ? 'ALL' : 'DEBUG',
    outDir: 'dist/',
  },
  {
    intents: [new IntentsBitField(32509)],
  },
)

client.setDefaultCommandError(
  'This command is broken. Please contact the server owner.',
)

void client.start()
