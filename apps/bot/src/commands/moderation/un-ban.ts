import { Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

export const command: Command = {
  name: 'unban',
  description: 'Un-bans a members that is banned in your server',
  category: 'moderation',
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
  cmdType: 'slash',
  userPermissions: ['BAN_MEMBERS'],
  run: async ({ guild, options }) => {
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
      embed: [embed],
      ephemeral: true,
    }
  },
}
