import {
  CommandReturnType,
  Category,
  ClientPermissions,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
  UserPermissions,
} from '@quanty/framework'
import { TextChannel } from 'discord.js'

@SlashCommand('setup-logger', {
  description: 'Sets up logs channel.',
  options: [
    {
      name: 'channel',
      description: 'All logs will be sent to this channel.',
      type: 'CHANNEL',
      channelTypes: ['GUILD_TEXT'],
    },
  ],
})
@Category('moderation')
@UserPermissions('MANAGE_WEBHOOKS')
@ClientPermissions('MANAGE_WEBHOOKS')
export class BanCommand extends Command {
  async run({
    client,
    user,
    options,
  }: SlashCommandRunOptions): CommandReturnType {
    // const guildChannel = options.getChannel('channel') as TextChannel

    // // !TODO Find a way to store this in database to keep track of guild webhooks
    // await guildChannel
    //   .createWebhook('Quanty', {
    //     avatar: client?.user?.avatarURL(),
    //     reason: 'Quanty Logger',
    //   })
    //   .then(async val => {
    //     await GuildsModel.findOneAndUpdate(
    //       {
    //         guildId: val.guildId,
    //       },
    //       {
    //         $set: { logChannel: val.channelId },
    //       },
    //     )
    //   })
    //   .catch(() => {
    //     throw Error('Could not setup Log Channel.')
    //   })

    // return {
    //   content: `Log Channel set up in ${guildChannel.name} by ${user.username}`,
    // }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
