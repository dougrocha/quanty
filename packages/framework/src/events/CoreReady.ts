import { registerTestCommands } from '../structures/command/applicationCommands/ApplicationCommandRegistries'
import { Event } from '../structures/event/Event'
import type { Part } from '../structures/part/Part'

export class CoreReadyEvent extends Event<'ready'> {
  public constructor(context: Part.Context) {
    super(context, { event: 'ready', once: true })
  }

  async run() {
    this.logger?.log('ApplicationCommandRegistries: Initializing...')

    const now = Date.now()
    if (this.container.client?.devGuilds)
      await registerTestCommands(this.logger)
    // await registerTestCommands(this.container.client.devGuilds)
    const diff = Date.now() - now

    this.logger?.log(`ApplicationCommandRegistries: Initialized in ${diff}ms`)
  }
}
