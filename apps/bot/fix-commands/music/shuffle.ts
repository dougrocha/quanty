// import {
//   CommandReturnType,
//   Category,
//   Command,
//   SlashCommand,
//   CommandOptions,
// } from '@quanty/framework'
// import { EmbedBuilder } from 'discord.js'

// import { musicManager } from '../../libs/music'

// @Category('music')
// @SlashCommand('shuffle', {
//   description: 'Shuffles the current queue',
// })
// export class TCommand extends Command {
//   async run({ guild }: CommandOptions): CommandReturnType {
//     const player = musicManager.get(guild.id)

//     const embed = new EmbedBuilder().setColor('#FF5F9F')

//     if (!player)
//       return {
//         embeds: [embed.setDescription('Invite Quanty to shuffle your music.')],
//       }

//     if (!player.queue)
//       return {
//         embeds: [embed.setDescription('The queue is empty.')],
//       }

//     embed.setDescription('Shuffled Queue!')
//     player.queue.shuffle()

//     return { embeds: [embed] }
//   }
//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
