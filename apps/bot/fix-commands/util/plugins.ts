// // Import { join } from 'path'

// import {
//   CommandReturnType,
//   Category,
//   Command,
//   SlashCommand,
//   CommandOptions,
//   UserPermissions,
// } from '@quanty/framework'
// import { ApplicationCommandOptionType } from 'discord.js'
// // Import { MessageEmbed } from 'discord.js'

// // import { uppercaseFirst } from '../../libs'

// // const PossiblePlugins = {
// //   MODERATION: 'moderation',
// //   ANIME: 'anime',
// //   MUSIC: 'music',
// //   //   ECONOMY: 'economy',
// // } as const

// @Category('util')
// @SlashCommand('plugins', {
//   description: 'Shows the commands available in this server.',
//   options: [
//     {
//       type: ApplicationCommandOptionType.Subcommand,
//       name: 'on',
//       description: 'Turn on plugins',
//       options: [
//         {
//           name: 'plugin-name',
//           description: 'Plugin to turn on',
//           type: ApplicationCommandOptionType.String,
//         },
//       ],
//     },
//     {
//       type: ApplicationCommandOptionType.Subcommand,
//       name: 'off',
//       description: 'Turn off plugins',
//       options: [
//         {
//           name: 'plugin-name',
//           description: 'Plugin to turn off',
//           type: ApplicationCommandOptionType.String,
//         },
//       ],
//     },
//   ],
// })
// @UserPermissions('Administrator')
// export class PluginsCommand extends Command {
//   async run({}: // Client,
//   // options,
//   // guild,
//   CommandOptions): CommandReturnType {
//     // Const embed = new MessageEmbed().setColor('RANDOM')
//     // const subCmd = options?.getSubcommand().toLowerCase()
//     // const pluginName = options?.getString('plugin-name')?.toLowerCase()
//     // if (subCmd == 'all') {
//     //   ;(await guild.commands.fetch()).map(async cmd => {
//     //     await cmd.delete()
//     //   })
//     //   return
//     // }
//     // if (
//     //   !(<any>Object).values(PossiblePlugins).includes(pluginName) ||
//     //   !subCmd
//     // ) {
//     //   return {
//     //     embeds: [
//     //       embed
//     //         .setTitle('Plugins you can turn on/off:')
//     //         .setDescription(
//     //           `${Object.values(PossiblePlugins).map(
//     //             string => `\`${uppercaseFirst(string)}\``,
//     //           )}`,
//     //         ),
//     //     ],
//     //   }
//     // }
//     // // Const guildConfig = client.guildManager.findGuild(guild.id)
//     // const guildConfig: any = ''
//     // if (!guildConfig) {
//     //   return `It seems that I don't have your guild saved. Log in to https://quanty.xyz to active plugins.`
//     // }
//     // const staticPath = join(__dirname, `../${pluginName}`)
//     //   If (subCmd == 'off') {
//     //     await turnOffPlugin(staticPath, client, guild.id)
//     //     return {
//     //       embeds: [
//     //         embed
//     //           .setTitle(`Turned off:`)
//     //           .setDescription(uppercaseFirst(pluginName ?? '')),
//     //       ],
//     //     }
//     //   } else if (subCmd == 'on') {
//     //     await turnOnPlugin(staticPath, client, guild.id)
//     //     return {
//     //       embeds: [
//     //         embed
//     //           .setTitle(`Turned on:`)
//     //           .setDescription(uppercaseFirst(pluginName ?? '')),
//     //       ],
//     //     }
//     //   }
//   }
//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }

// // Allow user to enables certain commands.
// // Make feature to remove and add those commands to specific server.
export {}
