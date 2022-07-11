import {
  CommandReturnType,
  Category,
  ClientPermissions,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
  UserPermissions,
} from '@quanty/framework'

@SlashCommand('setup-ticket', {
  description: 'Creates a ticket for issues in your guild.',
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
    {
      name: 'ticketChannel',
      description: 'Set a channel for users to open tickets in.',
      type: 'CHANNEL',
      channelTypes: ['GUILD_TEXT'],
    },
  ],
})
@Category('moderation')
@UserPermissions('MANAGE_CHANNELS', 'MANAGE_GUILD')
@ClientPermissions('MANAGE_CHANNELS', 'MANAGE_GUILD')
export class SetupTicketCommand extends Command {
  async run({ options, guild }: SlashCommandRunOptions): CommandReturnType {
    // Const transcriptChannel = options.getChannel('transcript-channel')
    // const ticketCategory = options.getChannel('category')
    // if (transcriptChannel) {
    //   await GuildPluginsModel.findOneAndUpdate(
    //     { guildId: guild.id },
    //     {
    //       $set: {
    //         ticketTranscriptChannel: transcriptChannel.id,
    //       },
    //     },
    //   )
    // }
    // if (ticketCategory) {
    //   await GuildPluginsModel.findOneAndUpdate(
    //     { guildId: guild.id },
    //     {
    //       $set: {
    //         ticketCategory,
    //       },
    //     },
    //   )
    // }
    // return {
    //   content: 'Ticket Setup',
    //   ephemeral: true,
    // }
  }

  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
