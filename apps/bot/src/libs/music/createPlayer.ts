import { Player } from 'erela.js'

import Manager from './manager'

/**
 * Creates Player for music
 * @param {client} QuantyClient
 * @param guildId Guild Id
 * @param channelId Text Channel Id that command was used in
 * @param channel Voice Channel that Quanty will join if connected
 * @returns Player Class using Erela
 */
export const createPlayer = ({
  guildId,
  channelId,
  voiceChannelId,
}: {
  guildId: string
  channelId: string
  voiceChannelId: string
}): Player =>
  Manager.create({
    guild: guildId,
    voiceChannel: voiceChannelId,
    textChannel: channelId,
    selfDeafen: true,
  })
