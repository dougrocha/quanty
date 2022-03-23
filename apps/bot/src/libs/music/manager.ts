import { logger, Logger, QuantyClient } from '@quanty/framework'
import AppleMusic from 'better-erela.js-apple/dist'
import { TextChannel, User } from 'discord.js'
import { Track, Manager as ErelaManager } from 'erela.js'
import Spotify from 'erela.js-spotify'

import client from '../..'
import { lavalinkNodes, spotifyOptions } from '../../utils'

const managerPlugins = [new AppleMusic(), new Spotify(spotifyOptions)]

/**
 * Features for music portion of bot
 * @param {client} QuantyClient
 * @returns Features for music
 */
class MusicManager extends ErelaManager {
  @logger()
  private logger: Logger

  private client: QuantyClient

  constructor() {
    super({
      nodes: [lavalinkNodes],
      send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
      },
      plugins: managerPlugins,
    })

    this.client = client

    this._init()
  }

  private _init() {
    this.on('nodeConnect', node => {
      this.logger.log(`Node ${node.options.identifier} connected`)
    })
      .on('nodeError', (node, error) => {
        this.logger.warn(`Node ${node.options.identifier} had an error`)

        this.logger.error(error)
      })
      .on('trackStart', async (player, track: Track) => {
        if (!player.textChannel) {
          return
        }
        const channel = this.client.channels.cache.get(
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
        const channel = this.client.channels.cache.get(
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
        const channel = this.client.channels.cache.get(
          player.textChannel,
        ) as TextChannel
        // const guildConfig: any = this.guildManager.findGuild(player.guild)
        await channel.send('Queue has ended.')
        // if (guildConfig?.music.immortal == true) {
        // } else {
        //   await this.client.wait(1000 * 60 * 5) // 10 Minutes
        //   if (player.playing) return
        //   player.destroy()
        // }
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
        // Const channel = this.client.channels.cache.get(
        //   player.textChannel,
        // ) as TextChannel
        // await channel.send("I'm dead, ask the owner for help")
      })

    this._initClientEvents()
  }

  private _initClientEvents() {
    this.client
      .on('raw', d => this.updateVoiceState(d))
      .on('channelUpdate', (oldChannel, newChannel) => {
        if (
          oldChannel.type === 'GUILD_VOICE' &&
          newChannel.type === 'GUILD_VOICE'
        ) {
          const player = this.players.get(newChannel.guild.id)
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
}

export default new MusicManager()
