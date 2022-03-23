import {
  CommandReturnType,
  Category,
  Command,
  SlashCommand,
  SlashCommandRunOptions,
} from '@quanty/framework'
import { MessageEmbed } from 'discord.js'
import { SearchResult } from 'erela.js'

@Category('music')
@SlashCommand('play', {
  description: 'Plays song.',
  options: [
    { type: 'STRING', name: 'song', description: 'Plays song', required: true },
  ],
})
export class PlayCommand extends Command {
  async run({}: SlashCommandRunOptions): CommandReturnType {
    // Const currGuild = client.guilds.cache.get(guild.id)
    // const currMember = currGuild?.members.cache.get(member.user.id)
    // const voiceChannelId = currMember?.voice.channel?.id
    // // Let awaitChannel = client.channels.cache.get(interaction.channelId);
    // const search = options?.getString('song') || args?.join(' ')
    // if (!search) {
    //   return { content: "Give a link or a song name and I'll play it" }
    // }
    // if (!voiceChannelId) return { content: 'You need to join a voice channel.' }
    // const channelId = channel.id
    // const guildId = guild.id
    // // Will make player and join channel
    // const player = createPlayer({ client, guildId, channelId, voiceChannelId })
    // const embed = new MessageEmbed().setColor('#FF5F9F')
    // let res: SearchResult
    // const { user } = member
    // try {
    //   res = await player.search(search, user)
    // } catch (err: any) {
    //   return {
    //     embeds: [
    //       embed.setDescription(
    //         `there was an error while searching: ${err.message}`,
    //       ),
    //     ],
    //   }
    // }
    // if (res.loadType === ('LOAD_FAILED' || 'NO_MATCHES')) {
    //   if (!player.queue.current) player.destroy()
    //   return {
    //     embeds: [
    //       embed.setDescription(`there were no results found. ${res.exception}`),
    //     ],
    //   }
    // }
    // if (player.state === 'DISCONNECTED') player.connect()
    // switch (res.loadType) {
    //   case 'TRACK_LOADED':
    //     player.queue.add(res.tracks[0])
    //     if (!player.playing && !player.paused && !player.queue.size) {
    //       await player.play()
    //     } else {
    //       return {
    //         embeds: [
    //           embed.setDescription(`enqueuing \`${res.tracks[0].title}\`.`),
    //         ],
    //       }
    //     }
    //     break
    //   case 'PLAYLIST_LOADED':
    //     player.queue.add(res.tracks)
    //     if (
    //       !player.playing &&
    //       !player.paused &&
    //       player.queue.totalSize === res.tracks.length
    //     ) {
    //       await player.play()
    //     }
    //     /**
    //      * If playlist name does not exist
    //      * set playlist name to first song of playlist
    //      */
    //     let playlistName: string = res.tracks[0].title
    //     if (res.playlist?.name) {
    //       playlistName = res.playlist.name
    //     }
    //     return {
    //       embeds: [
    //         embed.setDescription(
    //           `Queued playlist \`${playlistName}\` with ${res.tracks.length} tracks.`,
    //         ),
    //       ],
    //     }
    //   case 'SEARCH_RESULT':
    //     /// This only plays the first song in search, Use search command for more options
    //     player.queue.add(res.tracks[0])
    //     if (!player.playing && !player.paused && !player.queue.size) {
    //       await player.play()
    //       return {
    //         embeds: [embed.setDescription(`Starting up...`)],
    //       }
    //     }
    //     return {
    //       embeds: [
    //         embed.setDescription(`enqueuing \`${res.tracks[0].title}\`.`),
    //       ],
    //     }
    // }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
