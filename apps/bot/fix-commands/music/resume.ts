// import {
//   CommandReturnType,
//   Category,
//   Command,
//   SlashCommand,
//   CommandOptions,
//   Test,
// } from '@quanty/framework'

// import { checkChannel } from '../../libs'

// @Test()
// @Category('music')
// @SlashCommand('resume', {
//   description: 'Resumes the song',
// })
// export class TCommand extends Command {
//   async run({ guild, user }: CommandOptions): CommandReturnType {
//     const { content, player } = checkChannel({
//       guild,
//       user,
//     })
//     if (!player) {
//       return {
//         content,
//       }
//     }
//     if (player.playing) return { content: 'Song is already playing.' }
//     player.pause(false)
//     return { content: 'Quanty is now playing' }
//   }
//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
