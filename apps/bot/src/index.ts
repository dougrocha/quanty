import '@total-typescript/ts-reset'
import 'dotenv'
import { SapphireClient } from '@sapphire/framework'
import { GatewayIntentBits } from 'discord.js'

import { clientEnv } from './utils/env'

export const client = new SapphireClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildWebhooks,
  ],
})

void client.login(clientEnv.DISCORD_CLIENT_TOKEN)
