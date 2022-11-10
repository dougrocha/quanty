// import {
//   CommandReturnType,
//   Category,
//   Command,
//   SlashCommand,
//   CommandOptions,
// } from '@quanty/framework'
// import { ApplicationCommandOptionType, EmbedBuilder } from 'discord.js'

// import { musicManager } from '../../libs/music'

// @Category('music')
// @SlashCommand('skip', {
//   description: 'Skips to next song',
//   options: [
//     {
//       type: ApplicationCommandOptionType.Integer,
//       name: 'song',
//       description: 'Skips to a specific song in the queue',
//       required: false,
//       minValue: 1,
//     },
//   ],
// })
// export class TCommand extends Command {
//   async run({
//     client,
//     guild,
//     user,
//     options,
//   }: CommandOptions): CommandReturnType {
//     const player = musicManager.get(guild.id)

//     if (!player) return { content: 'Play a few songs first' }

//     const current = player.queue.current?.title
//     const amount = options?.getInteger('song') || 1

//     if (!amount) {
//       return { content: 'Please type in a number.' }
//     }

//     const guildId = guild.id
//     const userId = user.id

//     if (amount) {
//       if (Math.sign(amount) == (0 | -1))
//         return {
//           content: 'Please skip to a song in the queue.',
//         }
//       const guild = client.guilds.cache.get(guildId)
//       const member = guild?.members.cache.get(userId)
//       const channel = member?.voice.channel
//       if (!channel)
//         return {
//           content: 'Join Quanty in a voice channel to use this command.',
//         }
//       if (channel.id !== player.voiceChannel)
//         return {
//           content: 'You need to be in the same voice channel as Quanty.',
//         }
//       if (!player.queue.current)
//         return {
//           content: 'There is not song to skip.',
//         }
//       const embed = new EmbedBuilder()
//       player.stop(Number(amount))
//       await client.wait(500)
//       if (amount > 1) embed.setTitle(`\`${amount - 1} songs were skipped.\``)
//       else embed.setTitle(`\`Skipped ${current}\``)
//       return { embeds: [embed] }
//     }
//     player.stop()
//     return { content: `${current} was skipped.` }
//   }

//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
