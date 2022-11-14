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
// @SlashCommand('stop', {
//   description: 'Stop Quanty and clears the queue.',
// })
// export class StopCommand extends Command {
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
//     player.disconnect()
//     player.destroy()

//     return {
//       content: 'Bye!',
//     }
//   }
//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
