import { Feature } from '@quanty/framework'
import dayjs from 'dayjs'
import {
  MessageActionRow,
  MessageButton,
  MessageEmbed,
  TextBasedChannel,
} from 'discord.js'

import { ticketTypes } from '../../commands/moderation/ticket'
import { GuildModel, GuildTicketModel } from '../../schemas'

export const feature: Feature<'interactionCreate'> = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (!interaction.isSelectMenu()) return

    await interaction.deferUpdate()

    const ticketType = interaction.values[0]

    if (!ticketTypes.some(({ value }) => value === ticketType)) return

    const ticketId = Math.floor(
      Math.random() * Math.floor(Math.random() * Date.now()),
    )

    const { guild, member } = interaction

    const guildConfig = await GuildModel.findOne({ guildId: guild?.id })

    if (!member) return

    if (interaction.customId === 'select-ticket-type') {
      await guild?.channels
        .create(`${ticketType}-${ticketId}`, {
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
          parent: guildConfig?.ticketCategory,
        })
        .then(async channel => {
          const ticket = await GuildTicketModel.create({
            memberId: member.user.id,
            channelId: channel.id,
            ticketId: ticketId,
            closed: false,
            locked: false,
            type: ticketType,
            guild: guildConfig,
          })
          guildConfig?.tickets?.push(ticket._id)

          await guildConfig?.save()

          const embed = new MessageEmbed()
            .setAuthor({
              name: `Ticket number: ${ticketId} - ${dayjs(Date.now()).format(
                'DD/MM/YYYY',
              )}`,
            })
            .setDescription(
              `Please wait till a moderator responds to your request.`,
            )

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

          await (channel as TextBasedChannel)
            ?.send({
              content: `Ticket Created - ${ticketId}`,
            })
            .then(msg => {
              // Will delete msg in 10 seconds
              setTimeout(() => {
                msg.delete().catch(() => console.log('Ticket was not deleted'))
              }, 10000)
            })

          await interaction.followUp({
            content: `Your ticket has been created: ${channel}`,
            components: [],
            embeds: [],
            ephemeral: true,
          })
        })
    }
  },
}
