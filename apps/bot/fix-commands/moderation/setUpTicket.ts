// import {
//   CommandReturnType,
//   Category,
//   ClientPermissions,
//   Command,
//   SlashCommand,
//   CommandOptions,
//   UserPermissions,
// } from '@quanty/framework'
// import { ApplicationCommandOptionType, ChannelType } from 'discord.js'

// @SlashCommand('setup-ticket', {
//   description: 'Creates a ticket for issues in your guild.',
//   options: [
//     {
//       name: 'transcript-channel',
//       description: 'Quanty will send all transcript to this channel.',
//       type: ApplicationCommandOptionType.Channel,
//       channelTypes: [ChannelType.GuildText],
//     },
//     {
//       name: 'category',
//       description: 'Set a category for all tickets to be put under.',
//       type: ApplicationCommandOptionType.Channel,
//       channelTypes: [ChannelType.GuildCategory],
//     },
//     {
//       name: 'ticketChannel',
//       description: 'Set a channel for users to open tickets in.',
//       type: ApplicationCommandOptionType.Channel,
//       channelTypes: [ChannelType.GuildText],
//     },
//   ],
// })
// @Category('moderation')
// @UserPermissions('ManageChannels', 'ManageGuild')
// @ClientPermissions('ManageChannels', 'ManageGuild')
// export class SetupTicketCommand extends Command {
//   async run({ options, guild }: CommandOptions): CommandReturnType {
//     // Const transcriptChannel = options.getChannel('transcript-channel')
//     // const ticketCategory = options.getChannel('category')
//     // if (transcriptChannel) {
//     //   await GuildPluginsModel.findOneAndUpdate(
//     //     { guildId: guild.id },
//     //     {
//     //       $set: {
//     //         ticketTranscriptChannel: transcriptChannel.id,
//     //       },
//     //     },
//     //   )
//     // }
//     // if (ticketCategory) {
//     //   await GuildPluginsModel.findOneAndUpdate(
//     //     { guildId: guild.id },
//     //     {
//     //       $set: {
//     //         ticketCategory,
//     //       },
//     //     },
//     //   )
//     // }
//     // return {
//     //   content: 'Ticket Setup',
//     //   ephemeral: true,
//     // }
//   }

//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
