import { logger, Logger } from '@quanty/framework'
import AppleMusic from 'better-erela.js-apple/dist'
import { TextChannel, User } from 'discord.js'
import { Track, Manager as ErelaManager } from 'erela.js'
import { Spotify } from 'erela.js-spotify/dist/plugin'

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

  private static _instance: MusicManager = new MusicManager()

  constructor() {
    super({
      nodes: [lavalinkNodes],
      send(id, payload) {
        const guild = client.guilds.cache.get(id)
        if (guild) guild.shard.send(payload)
      },
      clientName: 'Quanty-Bot',
      plugins: managerPlugins,
    })

    MusicManager._instance = this

    this._init()
  }

  public static getInstance(): MusicManager {
    if (!this._instance) MusicManager._instance = new MusicManager()

    return MusicManager._instance
  }

  private _init() {
    this.on('nodeConnect', node => {
      this.logger.log(`Node ${node.options.identifier} connected`)
      this._initClientEvents()
    })
      .on('nodeError', node => {
        this.logger.error(
          `Node ${node.options.identifier}:${node.options.port} had an error`,
        )
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
        // Const guildConfig: any = this.guildManager.findGuild(player.guild)
        await channel.send('Queue has ended.')
        // If (guildConfig?.music.immortal == true) {
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
  }

  private _initClientEvents() {
    client
      .on('raw', d => this.updateVoiceState(d))
      .on('channelUpdate', (oldChannel, newChannel) => {
        if (
          oldChannel.type === 'GUILD_VOICE' &&
          newChannel.type === 'GUILD_VOICE'
        ) {
          const player = this.players.get(newChannel.guild.id)

          console.log(player)
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

export default MusicManager
