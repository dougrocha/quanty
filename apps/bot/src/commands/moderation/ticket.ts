import { Command } from '@quanty/framework'
import dayjs from 'dayjs'
import {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  MessageSelectOptionData,
} from 'discord.js'

import { GuildModel } from '../../schemas'

export const ticketTypes: MessageSelectOptionData[] = [
  {
    label: 'Report',
    value: 'report',
    description: 'Report user.',
    emoji: '🔴',
  },
  {
    label: 'Suggestion',
    value: 'suggestion',
    description: 'Suggest a feature for the server.',
    emoji: '📃',
  },
  {
    label: 'Other',
    value: 'other',
    description: 'Other reports not mentioned above.',
    emoji: '💡',
  },
]

export const command: Command = {
  name: `ticket`,
  description: 'Creates a ticket for any issues you may have.',
  category: 'moderation',
  userPermissions: ['ADMINISTRATOR'],
  cmdType: 'slash',
  options: [
    {
      name: 'set-category',
      description:
        'Set a category for all tickets to go under & Channel for all transcripts',
      type: 'CHANNEL',
    },
  ],
  run: async ({ interaction, guild }) => {
    const embed = new MessageEmbed().setColor('#FF5F9F')

    const optionsTicketChannel =
      interaction.options.getChannel('set-category') ?? undefined

    if (optionsTicketChannel) {
      if (
        interaction.guild?.channels.cache.get(optionsTicketChannel?.id)?.type !=
        'GUILD_TEXT'
      )
        return {
          content: 'That is not a valid channel. Please try again later.',
        }

      const parentChannelId = guild.channels.cache.get(
        optionsTicketChannel.id,
      )?.parentId

      await GuildModel.findOneAndUpdate(
        { guildId: guild.id },
        {
          $set: {
            ticketCategory: parentChannelId,
            ticketTranscriptChannel: optionsTicketChannel.id,
          },
        },
      )

      return {
        content: 'Channel set',
        ephemeral: true,
      }
    }

    const component = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('select-ticket-type')
        .setPlaceholder(
          'Please select the type of ticket you would like to submit.',
        )
        .addOptions(
          ticketTypes.map(({ label, value, description, emoji }) => ({
            label,
            value,
            description,
            emoji,
          })),
        ),
    )

    embed.setDescription(`Open a ticket for ${guild.name}.`).setFooter({
      text: dayjs(Date.now()).format('DD/MM/YYYY'),
      iconURL: guild.iconURL({ dynamic: true })?.toString(),
    })

    return {
      embeds: [embed],
      components: [component],
    }
  },
}
