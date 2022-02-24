import { Command } from '@quanty/framework'

import { GuildModel, GuildPluginModel } from '../../database/schemas'

export const command: Command = {
  name: `setup-ticket`,
  description: 'Creates a ticket for issues in your guild.',
  category: 'moderation',
  cmdType: 'slash',
  options: [
    {
      name: 'transcript-channel',
      description: 'Quanty will send all transcript to this channel.',
      type: 'CHANNEL',
      channelTypes: ['GUILD_TEXT'],
    },
    {
      name: 'category',
      description: 'Set a category for all tickets to be put under.',
      type: 'CHANNEL',
      channelTypes: ['GUILD_CATEGORY'],
    },
  ],
  userPermissions: ['MANAGE_CHANNELS', 'MANAGE_GUILD'],
  clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_GUILD'],
  run: async ({ options, guild }) => {
    const transcriptChannel = options.getChannel('transcript-channel')
    const ticketCategory = options.getChannel('category')

    if (transcriptChannel) {
      await GuildPluginModel.findOneAndUpdate(
        { guildId: guild.id },
        {
          $set: {
            ticketTranscriptChannel: transcriptChannel.id,
          },
        },
      )
    }

    if (ticketCategory) {
      await GuildPluginModel.findOneAndUpdate(
        { guildId: guild.id },
        {
          $set: {
            ticketCategory,
          },
        },
      )
    }

    return {
      content: 'Ticket Setup',
      ephemeral: true,
    }
  },
}
