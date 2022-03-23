import { Event, On } from '@quanty/framework'
import dayjs from 'dayjs'
import {
  CacheType,
  Interaction,
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  TextBasedChannel,
} from 'discord.js'
import mongoose from 'mongoose'

import { GuildModel, GuildTicketModel } from '../../database/schemas'
import { uppercaseFirst } from '../../libs/extra'

@On('interactionCreate')
export class SelectTicketEvent extends Event<'interactionCreate'> {
  async run(interaction: Interaction<CacheType>) {
    if (!interaction.isButton()) return

    const { guild, member, customId } = interaction

    if (!guild) return

    if (
      !['report-ticket', 'suggestion-ticket', 'other-ticket'].includes(customId)
    )
      return

    await interaction.deferUpdate()

    const ticketId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now()),
    )

    const guildConfig = await GuildModel.findOne(
      { guildId: guild.id },
      {},
      {
        populate: {
          path: 'GuildPlugins',
          select: 'ticketCategory',
        },
      },
    )

    console.log('testing', { guildConfig })

    const guildPlugins = guildConfig?.GuildPlugins

    if (guildPlugins instanceof mongoose.Types.ObjectId) return

    if (!member || !guildPlugins) return

    await guild?.channels
      .create(`${customId}-${ticketId}`, {
        reason: `Ticket: ${ticketId}`,
        permissionOverwrites: [
          {
            id: member.user.id,
            allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
          {
            id: guild.roles.everyone.id,
            deny: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
          },
        ],
        parent: guildPlugins?.ticketCategory,
      })
      .then(async channel => {
        const ticket = await GuildTicketModel.create({
          memberId: member.user.id,
          channelId: channel.id,
          ticketId: ticketId,
          closed: false,
          locked: false,
          type: customId,
          guildId: guild.id,
        })
        guildConfig?.tickets?.push(ticket._id)

        await guildConfig?.save()

        const embed = new MessageEmbed()
          .setAuthor({
            name: `Type: ${uppercaseFirst(customId).replace('-', ' ')}`,
            iconURL: guild.iconURL() ?? '',
          })
          .addFields([
            {
              name: 'Ticket id:',
              value: String(ticketId),
            },
            {
              name: 'User id:',
              value: member.user.id,
            },
          ])
          .setDescription(
            `Please wait till a moderator responds to your request.`,
          )
          .setFooter({
            text: `${dayjs(Date.now()).format(
              'DD/MM/YYYY - HH:mm:ss, UTC: Z',
            )}`,
          })

        const buttons = new MessageActionRow().addComponents(
          new MessageButton()
            .setEmoji('👍')
            .setCustomId('close-ticket')
            .setLabel('Close Ticket')
            .setStyle('SUCCESS'),
          new MessageButton()
            .setEmoji('🔒')
            .setCustomId('lock-ticket')
            .setLabel('Lock ticket')
            .setStyle('DANGER'),
          new MessageButton()
            .setEmoji('🔓')
            .setCustomId('unlock-ticket')
            .setLabel('Unlock ticket')
            .setStyle('PRIMARY'),
        )

        await (channel as TextBasedChannel)?.send({
          embeds: [embed],
          components: [buttons],
        })

        await interaction.followUp({
          content: `Your ticket has been created: ${channel}`,
          ephemeral: true,
        })
      })
  }
}
