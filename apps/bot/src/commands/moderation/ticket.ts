import { Command } from '@quanty/framework'
import dayjs from 'dayjs'
import {
  InteractionButtonOptions,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
} from 'discord.js'

import { GuildModel } from '../../schemas'

export const command: Command = {
  name: `ticket`,
  description: 'Opens a ticket for any issues you may have.',
  category: 'moderation',
  userPermissions: ['SEND_MESSAGES'],
  cmdType: 'slash',
  run: async ({ guild, member }) => {
    const embed = new MessageEmbed().setColor('#FF5F9F')

    const guildConfig = await GuildModel.findOne(
      {
        guildId: guild.id,
      },
      'guildId maxTickets',
      {
        populate: {
          path: 'tickets',
          match: { memberId: { $eq: member.id }, closed: false },
          select: 'memberId closed',
        },
      },
    )

    const maxTickets = guildConfig?.maxTickets ?? 5

    if ((guildConfig?.tickets?.length ?? -1) > maxTickets)
      return {
        embeds: [
          embed
            .setDescription(
              `You already have the \`max number\` of tickets open.`,
            )
            .addField('Max Tickets:', String(maxTickets))
            .setFooter({
              text: dayjs(Date.now()).format('DD/MM/YYYY'),
              iconURL: guild.iconURL({ dynamic: true }) ?? '',
            }),
        ],
      }

    embed.setDescription(`Open a ticket for \`${guild.name}\`.`).setFooter({
      text: dayjs(Date.now()).format('DD/MM/YYYY'),
      iconURL: guild.iconURL({ dynamic: true }) ?? '',
    })

    const component = new MessageActionRow().addComponents(
      ticketTypes.map(({ label, customId: id, style }) =>
        new MessageButton()
          .setCustomId(id)
          .setLabel(label ?? 'DNE')
          .setStyle(style),
      ),
    )

    return {
      embeds: [embed],
      components: [component],
      ephemeral: true,
    }
  },
}

export const ticketTypes: InteractionButtonOptions[] = [
  {
    customId: 'report-ticket',
    label: '🔴 Report',
    style: 'DANGER',
  },
  {
    customId: 'suggestion-ticket',
    label: '📃 Suggestion',
    style: 'PRIMARY',
  },
  {
    customId: 'other-ticket',
    label: '💡 Other',
    style: 'SECONDARY',
  },
]
