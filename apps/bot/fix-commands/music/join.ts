// import {
//   CommandReturnType,
//   Category,
//   Command,
//   SlashCommand,
//   CommandOptions,
// } from '@quanty/framework'

// import { createPlayer } from '../../libs'

// @Category('music')
// @SlashCommand('join', {
//   description: 'Joins the channel.',
// })
// export class JoinCommand extends Command {
//   async error(): CommandReturnType {
//     throw new Error('Method not implemented.')
//   }

//   async run({
//     guild,
//     user,
//     client,
//     channel,
//   }: CommandOptions): CommandReturnType {
//     const currGuild = client.guilds.cache.get(guild.id)
//     const currMember = currGuild?.members.cache.get(user.id)
//     const voiceChannelId = currMember?.voice.channel?.id

//     if (!voiceChannelId) return { content: 'You need to join a voice channel.' }

//     const channelId = channel.id
//     const guildId = guild.id

//     const player = createPlayer({ guildId, channelId, voiceChannelId })

//     player.connect()

//     return { content: 'Joined' }
//   }
// }
export {}
