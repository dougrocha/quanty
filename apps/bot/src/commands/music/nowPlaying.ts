// TODO: Re-do this whole command

import { checkChannel, Command } from '@quanty/framework'
import { MessageEmbed } from 'discord.js'
import { Player } from 'erela.js'

export const command: Command = {
  name: 'nowplaying',
  description: 'Shows the current playing song',
  options: [],
  category: 'music',
  run: ({ client, guild, member }) => {
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

    try {
      function format(millis: number) {
        try {
          const h = Math.floor(millis / 3600000)
          const m = Math.floor(millis / 60000)
          const s: any = ((millis % 60000) / 1000).toFixed(0)
          if (h < 1)
            return `${(m < 10 ? '0' : '') + m}:${
              s < 10 ? '0' : ''
            }${s} | ${Math.floor(millis / 1000)} Seconds`
          return `${(h < 10 ? '0' : '') + h}:${m < 10 ? '0' : ''}${m}:${
            s < 10 ? '0' : ''
          }${s} | ${Math.floor(millis / 1000)} Seconds`
        } catch (e: any) {
          console.log(String(e.stack))
        }
      }

      function createBar(player: Player) {
        try {
          if (!player.queue.current)
            return `**"[""▇""—".repeat(size - 1)}]**\n**00:00:00 / 00:00:00**`
          const current =
            player.queue.current.duration !== 0
              ? player.position
              : player.queue.current.duration
          const total = player.queue.current.duration
          if (!total) {
            return `**This is a livestream.**`
          }
          const size = 15
          const bar =
            String('|') +
            String('▇').repeat(Math.round(size * (current / total))) +
            String('—').repeat(size - Math.round(size * (current / total))) +
            String('|')
          return `**${bar}**\n**${`${new Date(player.position)
            .toISOString()
            .substr(11, 8)} / ${
            total == 0 ? ' ◉ LIVE' : new Date(total).toISOString().substr(11, 8)
          }`}**`
        } catch (e: any) {
          console.log(String(e.stack))
        }
      }

      const player = client.player.get(guild.id)

      if (!player) {
        return
      }

      const song: any = player?.queue?.current
      if (!song)
        return {
          embeds: [
            new MessageEmbed()
              .setColor('RED')
              .setTitle(`Error | There is nothing playing`),
          ],
        }
      // Send Now playing Message
      return {
        embeds: [
          new MessageEmbed()
            .setAuthor({
              name: `Current song playing:`,
              iconURL: client.user?.displayAvatarURL({
                dynamic: true,
              }),
            })
            .setThumbnail(
              `https://img.youtube.com/vi/${song.identifier}/mqdefault.jpg`,
            )
            .setURL(song.uri)
            .setColor('GREEN')
            .setTitle(`🎶 **${song.title}** 🎶`)
            .addField(`🕰️ Duration: `, `\`${format(song.duration)}\``, true)
            .addField(`🎼 Song By: `, `\`${song.author}\``, true)
            .addField(
              `🔢 Queue length: `,
              `\`${player.queue.length} Songs\``,
              true,
            )
            .addField(`🎛️ Progress: `, createBar(player) ?? 'none')
            .setFooter({
              text: `Requested by: ${song.requester.username}`,
              iconURL:
                // !TODO
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                song.requester.displayAvatarURL({
                  dynamic: true,
                }),
            }),
        ],
      }
    } catch (e: any) {
      console.log(String(e.stack))
      return {
        embeds: [
          new MessageEmbed()
            .setColor('RED')
            .setTitle(`ERROR | An error occurred`)
            .setDescription(`\`\`\`${e.message}\`\`\``),
        ],
      }
    }
  },
}
