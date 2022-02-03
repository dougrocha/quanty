import { Feature } from '@quanty/framework'
import dayjs from 'dayjs'
import { createTranscript } from 'discord-html-transcripts'
import { MessageEmbed, TextBasedChannel } from 'discord.js'

import { GuildTicketModel, GuildModel } from '../../schemas'

export const feature: Feature<'interactionCreate'> = {
  name: 'interactionCreate',
  run: async (client, interaction) => {
    if (!interaction.isButton()) return

    if (
      !['close-ticket', 'lock-ticket', 'unlock-ticket'].includes(
        interaction.customId,
      )
    ) {
      return
    }

    await interaction.deferUpdate()

    const { guild, customId, channel, user, memberPermissions } = interaction

    if (!memberPermissions?.has('ADMINISTRATOR'))
      return await interaction.reply({
        content: 'Only a mod can access these buttons',
        ephemeral: true,
      })
    if (!channel || channel.type != 'GUILD_TEXT') return

    const embed = new MessageEmbed().setColor('RANDOM')

    const ticket = await GuildTicketModel.findOne({
      channelId: channel.id,
    }).catch(err => console.log(err))

    if (!ticket) {
      await interaction.followUp({
        embeds: [
          embed.setDescription('No ticket was found. Please delete manually.'),
        ],
        ephemeral: true,
      })
      return
    }

    const isTicketLocked = ticket?.locked

    const isTicketClosed = ticket?.closed

    switch (customId) {
      case 'close-ticket':
        if (isTicketClosed == true) {
          await interaction.followUp({
            embeds: [
              embed.setDescription(
                'Ticket is already closed. Please delete this channel manually.',
              ),
            ],
            ephemeral: true,
          })
          return
        }

        const guildConfig = await GuildModel.findOne({
          guildId: guild?.id,
        }).catch(err => console.log(err))

        if (!guildConfig?.ticketTranscriptChannel)
          return await interaction.reply(
            'Please set a transcript channel first before closing a ticket.',
          )

        await channel?.permissionOverwrites.edit(
          ticket.memberId,
          {
            SEND_MESSAGES: false,
          },
          { reason: 'Closed Ticket', type: 1 },
        )

        await GuildTicketModel.updateOne(
          { channelId: channel.id },
          { $set: { closed: true } },
        )

        const attachment = await createTranscript(channel, {
          limit: -1,
          returnBuffer: false,
          fileName: `${ticket?.type}-${ticket?.ticketId}.html`,
        })

        const transcriptChannel = guild?.channels.cache.get(
          guildConfig?.ticketTranscriptChannel,
        ) as TextBasedChannel

        const transcriptMessage = await transcriptChannel.send({
          files: [attachment],
          embeds: [
            embed
              .setTitle(`Transcript for ticket: ${ticket?.ticketId}`)
              .setDescription(
                `Ticket type: ${ticket?.type}\nUser id: ${ticket.memberId}`,
              )
              .setFooter({ text: `${dayjs(Date.now()).format('DD/MM/YYYY')}` }),
          ],
        })

        await channel.send({
          embeds: [
            embed
              .setAuthor({
                name: user.username,
                iconURL: user.defaultAvatarURL,
              })
              .setDescription(
                `The transcript is now saved: ${transcriptMessage.url} \nThis message will be deleted in 10 seconds.`,
              ),
          ],
        })

        await channel?.permissionOverwrites.edit(
          ticket.memberId,
          {
            SEND_MESSAGES: false,
          },
          { reason: `Locked Ticket: ${ticket.ticketId}`, type: 1 },
        )

        await client.wait(10000)

        await channel.delete()

        break
      case 'lock-ticket':
        if (isTicketLocked == true) {
          await interaction.followUp({
            embeds: [embed.setDescription('Ticket is already locked.')],
            ephemeral: true,
          })
          return
        }

        await GuildTicketModel.updateOne(
          { channelId: channel.id },
          { $set: { locked: true } },
        )

        await channel?.permissionOverwrites.edit(
          ticket.memberId,
          {
            SEND_MESSAGES: false,
          },
          { reason: `Locked Ticket: ${ticket.ticketId}`, type: 1 },
        )

        await channel.send({
          embeds: [
            embed
              .setDescription(
                `Ticket: ${ticket?.ticketId} is now locked for review. `,
              )
              .setFooter({ text: `${dayjs(Date.now()).format('DD/MM/YYYY')}` }),
          ],
        })

        break
      case 'unlock-ticket':
        if (isTicketLocked == false) {
          await interaction.followUp({
            embeds: [embed.setDescription('Ticket is already un-locked.')],
            ephemeral: true,
          })
          return
        }

        await GuildTicketModel.updateOne(
          { channelId: channel.id },
          { $set: { locked: false } },
        )

        await channel?.permissionOverwrites.edit(
          ticket.memberId,
          {
            SEND_MESSAGES: true,
          },
          { reason: `Unlocked Ticket: : ${ticket.ticketId}`, type: 1 },
        )

        await channel.send({
          embeds: [
            embed
              .setDescription(
                `Ticket: ${ticket?.ticketId} is now un-locked. Please add anything to your issue here.`,
              )
              .setFooter({ text: `${dayjs(Date.now()).format('DD/MM/YYYY')}` }),
          ],
        })

        break
      default:
        break
    }
  },
}
