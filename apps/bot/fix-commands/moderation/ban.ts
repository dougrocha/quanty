// import {
//   CommandReturnType,
//   Category,
//   ClientPermissions,
//   Command,
//   SlashCommand,
//   CommandOptions,
//   UserPermissions,
// } from '@quanty/framework'
// import { ApplicationCommandOptionType } from 'discord.js'

// @SlashCommand('ban', {
//   description: 'Bans members',
//   options: [
//     {
//       name: 'user',
//       description: 'User to ban from this server.',
//       type: ApplicationCommandOptionType.User,
//       required: true,
//     },
//     {
//       name: 'reason',
//       description: 'Reason for banning user,',
//       type: ApplicationCommandOptionType.String,
//     },
//   ],
// })
// @Category('moderation')
// @UserPermissions('BanMembers')
// @ClientPermissions('BanMembers')
// export class BanCommand extends Command {
//   async run({
//     options,
//     guild,
//     user: issuer,
//   }: CommandOptions): CommandReturnType {
//     // Const user = options.getUser('user')
//     // if (!user) return
//     // const reason = options.getString('reason') ?? 'No reason provided'
//     // const member = await guild.members.fetch(user?.id)
//     // if (member) {
//     //   await member
//     //     .ban({ reason: reason })
//     //     .catch(err => console.log({ ban: err }))
//     //   const guildConfig = await GuildsModel.findOne({ guildId: guild.id })
//     //   const banLogs = await GuildBanLogsModel.create({
//     //     guildId: guild.id,
//     //     bannedUser: {
//     //       username: user.username,
//     //       discriminator: user.discriminator,
//     //       id: user.id,
//     //     },
//     //     reason: reason,
//     //     issuedBy: {
//     //       username: issuer.username,
//     //       discriminator: issuer.discriminator,
//     //       id: issuer.id,
//     //     },
//     //     issuedOn: new Date(),
//     //   })
//     //   guildConfig?.banLogs?.push(banLogs)
//     //   await guildConfig?.save()
//     // } else {
//     //   return { content: 'Could not find user' }
//     // }
//     // return {
//     //   content: `Banned ${user} ${reason ?? ''}`,
//     // }
//   }

//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }
// }
export {}
