import { TextChannel, User, GuildMember, Guild as GuildType } from 'discord.js'
import { Track, Player, Manager } from 'erela.js'
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
}): Player => {
  return client.player.create({
    guild: guildId,
    voiceChannel: voiceChannelId,
    textChannel: channelId,
    selfDeafen: true,
  })
}

export const checkChannel = ({
  client,
  guild: curGuild,
  member: curMember,
}: {
  client: QuantyClient
  guild: GuildType
  member: GuildMember
}) => {
  // guild
  const guild = client.guilds.cache.get(curGuild.id)
  // member
  const member = guild?.members.cache.get(curMember.user.id)
  // voice channel
  const voice = member?.voice

  let channel

  voice ? (channel = voice.channel) : null

  const player = client.player.get(curGuild.id)

  if (!channel) {
    return { player, content: 'Please join a voice channel first.' }
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
    .on('nodeError', (node, error) =>
      client.logger.error(
        `Node ${node.options.identifier} had an error`,
        error.message,
      ),
    )
    .on('trackStart', (player, track: Track) => {
      if (!player.textChannel) {
        return
      }

      const channel = client.channels.cache.get(player.textChannel)

      const { title, requester } = track

      // Send a message when the track starts playing with the track name and the requester's Discord tag, e.g. username#discriminator
      ;(channel as TextChannel).send({
        content: `Now playing: \`${title}\`, requested by \`${
          (requester as User).tag
        }\`.`,
      })
    })
    .on('trackStuck', (player, track: Track) => {
      player.stop()
    })
    .on('queueEnd', async (player, track) => {
      if (!player.textChannel) {
        return
      }
      const channel = client.channels.cache.get(
        player.textChannel,
      ) as TextChannel

      const guildConfig = await client.PluginManager.getGuildSetting({
        guildId: player.guild,
        setting: 'MUSIC',
      })

      await channel.send('Queue has ended.')

      if (guildConfig?.immortal == true) {
        return
      } else {
        await client.wait(1000 * 60 * 10) // 10 Minutes
        if (player.playing) return
        player.destroy()
      }
    })
    .on('playerMove', (player, track, newChannel) => {
      if (!newChannel) {
        return player.destroy()
      }

      player.voiceChannel = newChannel
    })
    .on('socketClosed', player => {
      if (!player.textChannel) {
        return
      }
      const channel = client.channels.cache.get(
        player.textChannel,
      ) as TextChannel
    })
  client.on('raw', d => manager.updateVoiceState(d))
}
