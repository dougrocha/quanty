// import {
//   CommandReturnType,
//   Category,
//   Command,
//   SlashCommand,
//   CommandOptions,
// } from '@quanty/framework'
// import {
//   ActionRowBuilder,
//   ButtonBuilder,
//   ButtonStyle,
//   ComponentType,
// } from 'discord.js'

// @SlashCommand('dashboard', {
//   description: 'Sends a link to your dashboard.',
// })
// @Category('util')
// export class DashboardCommand extends Command {
//   async run({ guild }: CommandOptions): CommandReturnType {
//     const button = new ActionRowBuilder().addComponents(
//       new ButtonBuilder()
//         .setLabel('Go to your dashboard')
//         .setStyle(ButtonStyle.Link)
//         .setURL(`https://quanty.xyz/dashboard/${guild.id}`),
//     )

//     // Return {
//     //   content: 'Here you go',
//     //   components: [
//     //     {
//     //       type: ComponentType.ActionRow,
//     //       components: [button],
//     //     },
//     //   ],
//     // }
//   }

//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
