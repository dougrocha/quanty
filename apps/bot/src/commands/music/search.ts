import { checkChannel, Command } from '@quanty/framework'
import {
  MessageActionRow,
  MessageEmbed,
  MessageSelectMenu,
  SelectMenuInteraction,
} from 'discord.js'
import { SearchResult, Track } from 'erela.js'

export const command: Command = {
  name: 'search',
  description: 'Shows a list of songs closest your search',
  options: [
    { type: 'STRING', name: 'search', description: 'Search', required: true },
  ],
  category: 'music',
  cmdType: 'slash',
  run: async ({ client, interaction, guild, member, options, channel }) => {
    const { content, player } = checkChannel({
      client,
      guild,
      member,
    })

    if (!player) {
      return {
        content,
      }
    }

    const search = options.getString('search')

    if (!search) {
      return { content: 'Search anything you want.' }
    }

    if (player.state !== 'CONNECTED') player.connect()

    const embed = new MessageEmbed().setColor('#FF5F9F')

    let res: SearchResult

    try {
      res = await player.search(search, member.user)
      if (res.loadType === 'LOAD_FAILED') {
        if (!player.queue.current) player.destroy()
        throw res.exception
      }
    } catch (err: any) {
      return {
        embeds: [
          embed.setDescription(
            `there was an error while searching: ${err.message}`,
          ),
        ],
      }
    }

    switch (res.loadType) {
      case 'NO_MATCHES':
        if (!player.queue.current) player.destroy()
        return {
          embeds: [embed.setDescription('there were no results found.')],
        }
      case 'TRACK_LOADED':
        player.queue.add(res.tracks[0])

        if (!player.playing && !player.paused && !player.queue.size)
          await player.play()
        return {
          embeds: [
            embed.setDescription(`enqueuing \`${res.tracks[0].title}\`.`),
          ],
        }
      case 'PLAYLIST_LOADED':
        player.queue.add(res.tracks)

        if (
          !player.playing &&
          !player.paused &&
          player.queue.totalSize === res.tracks.length
        )
          await player.play()
        return {
          embeds: [
            embed.setDescription(
              `Queued playlist \`${res.playlist?.name}\` with ${res.tracks.length} tracks.`,
            ),
          ],
        }
      case 'SEARCH_RESULT':
        const emojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣']
        // Add a seperate command for searching, This will play first result in search results
        const query = res.tracks

        const tracks = query.slice(0, 5)

        const component = new MessageActionRow().addComponents(
          new MessageSelectMenu()
            .setCustomId('search-songs')
            .setPlaceholder('Please select a song to play')
            .addOptions(
              tracks.map((song, index) => ({
                label: song.title,
                value: song.identifier,
                description: `Search results from searching ${song.title}`,
                emoji: emojis[index],
              })),
            ),
        )

        await interaction.editReply({
          embeds: [embed.setDescription('Please select a song to play')],
          components: [component],
        })

        const collector = channel.createMessageComponentCollector({
          componentType: 'SELECT_MENU',
          time: 15000,
        })

        const collectedSongs = 0

        collector.on('collect', async (collector: SelectMenuInteraction) => {
          if (collector.user.id !== interaction.user.id) {
            await collector.reply({
              content:
                'You cannot access this menu. Please use the search command.',
              ephemeral: true,
            })
            return
          }
          const [trackIdentifier] = collector.values

          const track = tracks.find(
            (s: Track) => s.identifier === trackIdentifier,
          )

          if (!track) {
            return
          }

          embed.setTitle(`Added to queue: `).setDescription(`${track.title}`)

          player.queue.add(track)

          collectedSongs + 1

          if (!player.playing && !player.paused && !player.queue.size)
            await player.play()

          await collector.update({
            embeds: [embed],
            components: [component],
          })
        })

        collector.on('end', async () => {
          embed
            .setTitle(`Search has ended`)
            .setDescription(`Added ${collectedSongs} songs to the queue.`)

          await interaction.editReply({ embeds: [embed], components: [] })
          await client.wait(5000)
          await interaction.deleteReply()
        })
    }
  },
}
