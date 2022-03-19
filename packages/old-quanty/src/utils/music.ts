import { Guild as GuildType, GuildMember, TextChannel, User } from 'discord.js'
import { Manager, Player, Track } from 'erela.js'

import QuantyClient from '..'

/**
 * Creates Player for music
 * @param {client} QuantyClient
 * @param guildId Guild Id
 * @param channelId Text Channel Id that command was used in
 * @param channel Voice Channel that Quanty will join if connected
 * @returns Player Class using Erela
 */
export const createPlayer = ({
  client,
  guildId,
  channelId,
  voiceChannelId,
}: {
  client: QuantyClient
  guildId: string
  channelId: string
  voiceChannelId: string
}): Player =>
  client.player.create({
    guild: guildId,
    voiceChannel: voiceChannelId,
    textChannel: channelId,
    selfDeafen: true,
  })

export const checkChannel = ({
  client,
  guild: curGuild,
  member: curMember,
}: {
  client: QuantyClient
  guild: GuildType
  member: GuildMember
}) => {
  // Guild
  const guild = client.guilds.cache.get(curGuild.id)
  // Member
  const member = guild?.members.cache.get(curMember.user.id)
  // Voice channel
  const voice = member?.voice

  let channel

  voice ? (channel = voice.channel) : null

  const player = client.player.get(curGuild.id)

  if (!channel) {
    return { player, content: 'Use `/join` to connect to Quanty.' }
  }

  if (channel.id !== player?.voiceChannel)
    return {
      player,
      content: 'You need to be in the same voice channel as Quanty.',
    }

  if (!player) {
    return {
      player,
      content: "Use my slash command and I'll play some music",
    }
  }

  return {
    player,
    voiceChannel: channel,
  }
}

/**
 * Features for music portion of bot
 * @param {client} QuantyClient
 * @returns Features for music
 */
export const MusicEvent = (manager: Manager, client: QuantyClient) => {
  manager
    .on('nodeConnect', node => {
      client.logger.success(`Node ${node.options.identifier} connected`)
    })
    .on('nodeError', (node, error) => {
      client.logger.info(`Node ${node.options.identifier} had an error`)

      if (client.willWarn == true) {
        client.logger.error(`Lavalink ${node.options.identifier}:`, error)
      }
    })
    .on('trackStart', async (player, track: Track) => {
      if (!player.textChannel) {
        return
      }

      const channel = client.channels.cache.get(
        player.textChannel,
      ) as TextChannel

      const { title, requester } = track

      // Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
      await channel.send({
        content: `Now playing: \`${title}\`, requested by \`${
          (requester as User).tag
        }\`.`,
      })
    })
    .on('trackStuck', async (player, track: Track) => {
      player.stop()

      if (!player.textChannel) {
        return
      }

      const channel = client.channels.cache.get(
        player.textChannel,
      ) as TextChannel

      await channel.send(
        `Something went wrong, \`\`${track.title}\`\` has been skipped`,
      )
    })
    .on('queueEnd', async player => {
      if (!player.textChannel) {
        return
      }
      const channel = client.channels.cache.get(
        player.textChannel,
      ) as TextChannel

      const guildConfig = client.guildManager.findGuild(player.guild)

      await channel.send('Queue has ended.')

      if (guildConfig?.music.immortal == true) {
      } else {
        await client.wait(1000 * 60 * 5) // 10 Minutes
        if (player.playing) return
        player.destroy()
      }
    })
    .on('playerMove', (player, newChannel) => {
      if (!newChannel) {
        return player.destroy()
      }

      player.voiceChannel = newChannel
    })
    .on('socketClosed', async player => {
      if (!player.textChannel) {
        return
      }
      // Const channel = client.channels.cache.get(
      //   player.textChannel,
      // ) as TextChannel

      // await channel.send("I'm dead, ask the owner for help")
    })

  client
    .on('raw', d => manager.updateVoiceState(d))
    .on('channelUpdate', (oldChannel, newChannel) => {
      if (
        oldChannel.type === 'GUILD_VOICE' &&
        newChannel.type === 'GUILD_VOICE'
      ) {
        const player = client.player.players.get(newChannel.guild.id)

        if (player) {
          if (player.voiceChannel === newChannel.id) {
            if (player.playing && !player.paused) {
              player.pause(true)
              setTimeout(() => {
                player.pause(false)
              }, 500)
            }
          }
        }
      }
    })
}
