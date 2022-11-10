import type { Client } from 'discord.js'

import { Once } from '../../src'
import { registerTestCommands } from '../../src/structures/command/applicationCommands/ApplicationCommandRegistries'
import { Event } from '../../src/structures/event/Event'

@Once('ready')
export class ReadyEvent extends Event<'ready'> {
  async run(client: Client) {
    this.logger?.log(
      `Client is logged in as: ${client.user?.id || 'Unavailable'}`,
    )

    await registerTestCommands()
  }
}
