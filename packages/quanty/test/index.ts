import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

import { QuantyClient } from '../src/structures/client/Client'

const client: QuantyClient = new QuantyClient({
  owner: '571520537587875851',
  outDir: 'dist/',
  baseDirectory: 'test/',
  defaults: true,
  logLevel: 'ALL',
  devGuilds: ['1039855915244998756'],
  intents: ['Guilds', 'GuildMessages', 'GuildPresences'],
})

void client.login(process.env.BOT_TOKEN)
