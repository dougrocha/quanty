import { Command } from '@quanty/framework'

import { GuildBanLogsModel, GuildModel } from '../../schemas'

export const command: Command = {
  name: `ban`,
  description: 'Bans members',
  category: 'moderation',
  cmdType: 'both',
  options: [
    {
      name: 'user',
      description: 'User to ban from this server.',
      type: 'USER',
      required: true,
    },
    {
      name: 'reason',
      description: 'Reason for banning user,',
      type: 'STRING',
    },
  ],
  userPermissions: ['BAN_MEMBERS'],
  clientPermissions: ['BAN_MEMBERS'],
  run: async ({ options, guild, member: issuer }) => {
    const user = options.getUser('user')
    if (!user) return

    const reason = options.getString('reason') ?? 'No reason provided'

    const member = await guild.members.fetch(user?.id)
    if (member) {
      await member
        .ban({ reason: reason })
        .catch(err => console.log({ ban: err }))

      const guildConfig = await GuildModel.findOne({ guildId: guild.id })

      const banLogs = await GuildBanLogsModel.create({
        guildId: guild.id,
        bannedUserId: user.id,
        reason: reason,
        issuedBy: issuer.id,
        guild: guildConfig,
        issuedOn: new Date(),
      })

      guildConfig?.banLogs?.push(banLogs)

      await guildConfig?.save()
    } else {
      return { content: 'Could not find user' }
    }

    return {
      content: `Banned ${user} ${reason ?? ''}`,
    }
  },
}
