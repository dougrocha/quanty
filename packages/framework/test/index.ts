import { GatewayIntentBits } from 'discord.js'

import { clientEnv } from '../src'
import { QuantyClient } from '../src/structures/client/Client'

const client = new QuantyClient({
  owner: '571520537587875851',
  outDir: 'dist/',
  baseDirectory: 'test/',
  defaults: true,
  logLevel: 'ALL',
  devGuilds: ['711679864247156747'],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
  ],
})

void client.login(clientEnv.DISCORD_CLIENT_TOKEN)
