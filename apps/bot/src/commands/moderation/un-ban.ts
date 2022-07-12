import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
  UserPermissions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

@Category('moderation')
@SlashCommand('unban', {
  description: 'Un-bans a members that is banned in your server',
  options: [
    {
      name: 'user',
      description: 'User to remove from ban list.',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'Reason for unbanning this user.',
      type: 'STRING',
    },
  ],
})
@UserPermissions('BAN_MEMBERS')
export class UnBanCommand extends Command {
  async run({ guild, options }: SlashCommandRunOptions): CommandReturnType {
    // Must exist for command to run
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const unBanUser = options.getUser('user')

    if (!unBanUser) return

    const reason = options.getString('reason')

    const currentBans = await guild.bans.fetch()

    if (!currentBans.has(unBanUser?.id)) return

    await guild.bans.remove(unBanUser.id).catch(console.error)

    const embed = new MessageEmbed().setTitle('Unbanned user').addFields([
      {
        name: 'User',
        value: unBanUser.username,
      },
      {
        name: 'Reason',

        value: reason ?? 'No reason provided',
      },
    ])

    return {
      embeds: [embed],
      ephemeral: true,
    }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
