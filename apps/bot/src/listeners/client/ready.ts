import { Listener } from '@sapphire/framework'
import { ActivityType, Client } from 'discord.js'

export class ReadyListener extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      once: true,
      event: 'ready',
    })
  }

  public run(client: Client<true>) {
    console.log(`🤖 ${client.user?.tag} is online!`)

    client.user?.setPresence({
      activities: [{ name: 'Things', type: ActivityType.Playing }],
      status: 'online',
    })
  }
}
