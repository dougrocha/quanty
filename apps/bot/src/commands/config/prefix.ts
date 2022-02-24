import { Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'

import { createLog, CreateLogActionsEnum } from '../../libs/createLog'

export const command: Command = {
  name: 'prefix',
  description: 'desc',
  options: [
    {
      name: 'prefix',
      description: 'sets a new prefix',
      required: false,
      type: 'STRING',
    },
  ],
  category: 'config',
  userPermissions: ['ADMINISTRATOR'],
  run: async ({ client, options, guild, args, member }) => {
    const prefix = client.guildManager.getPrefix(guild.id)

    const embed = new MessageEmbed().setFooter({
      text: `${member?.user.discriminator} | ${member?.user.username}`,
      iconURL: member?.user.displayAvatarURL({ format: 'png', dynamic: true }),
    })

    const input = options?.getString('prefix') || args[0]

    if (input) {
      const user = guild.members.cache.get(member.user.id)

      if (!user) return

      if (!user?.permissions.has('ADMINISTRATOR'))
        return { content: 'You can not edit the prefix.' }

      if (!prefix) {
        return {
          embeds: [
            embed.setDescription(`The current prefix is \`${prefix || 'q!'}\``),
          ],
        }
      }

      if (input.length > 4)
        return {
          embeds: [
            embed.setDescription(
              'The length of your prefix must be under 4 characters.',
            ),
          ],
        }

      const newGuildConfig = await client.guildManager.getPrefixAndUpdate(
        guild.id,
        input,
      )

      await createLog({
        guildId: guild.id,
        action: CreateLogActionsEnum.CHANGEPREFIX,
        user: {
          discriminator: user.user.discriminator,
          username: user.user.username,
          id: user.id,
        },
      })

      return {
        embeds: [
          embed.setDescription(
            `Your prefix has been set to \`${newGuildConfig?.prefix}\``,
          ),
        ],
      }
    }
    return {
      embeds: [embed.setDescription(`Your prefix is  \`${prefix}\``)],
    }
  },
  error: async () => {
    return {
      content: 'Hey man your prefix broke. Contact someone to fix this plugin',
    }
  },
}
