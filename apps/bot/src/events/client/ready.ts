import { Event, Once } from '@quanty/framework'
import { ActivityType, Client } from 'discord.js'

@Once('ready')
export class ReadyEvent extends Event<'ready'> {
  async run(client: Client<true>) {
    this.logger?.log(`🤖 ${client.user?.tag} is online!`)

    client.user?.setPresence({
      activities: [{ name: 'Things', type: ActivityType.Playing }],
      status: 'online',
    })
  }
}

