import { Guild as GuildType, User } from 'discord.js'

import Manager from './manager'

import client from '../..'

export const checkChannel = ({
  guild: curGuild,
  user: user,
}: {
  guild: GuildType
  user: User
}) => {
  // Guild
  const guild = client.guilds.cache.get(curGuild.id)
  // Member
  const member = guild?.members.cache.get(user.id)
  // Voice channel
  const voice = member?.voice

  let channel

  voice ? (channel = voice.channel) : null

  const player = Manager.getInstance().get(curGuild.id)

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
