import { QuantyClient } from '@quanty/framework'
import { Guild as GuildType, GuildMember } from 'discord.js'

import Manager from './manager'

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

  const player = Manager.get(curGuild.id)

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
