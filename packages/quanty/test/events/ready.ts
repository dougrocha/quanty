import type { Client, CommandInteraction } from 'discord.js'

import { Once } from '../../src'
import { Command } from '../../src/structures/command/Command'
import { Event } from '../../src/structures/event/Event'

@Once('ready')
export class ReadyEvent extends Event<'ready'> {
  async run(client: Client) {
    this.logger?.log(
      `Client is logged in as: ${client.user?.id || 'Unavailable'}`,
    )
    const test = await (
      this.container.stores?.get('commands')?.get('anime') as Command
    ).before()

    if (test) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      await (this.container.stores?.get('commands')?.get('anime') as Command)
        .run!({} as CommandInteraction)
    }
  }
}
