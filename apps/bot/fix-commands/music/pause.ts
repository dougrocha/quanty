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
// @SlashCommand('pause', {
//   description: 'Pauses the song.',
// })
// export class PauseCommand extends Command {
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
//     if (player.paused) return { content: 'Quanty is already paused.' }
//     player.pause(true)
//     return { content: 'Quanty is now paused' }
//   }
//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
