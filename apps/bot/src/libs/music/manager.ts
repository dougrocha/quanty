import { logger, Logger } from '@quanty/framework'
import AppleMusic from 'better-erela.js-apple/dist'
import { TextChannel, User } from 'discord.js'
import { Track, Manager as ErelaManager } from 'erela.js'
import { Spotify } from 'erela.js-spotify/dist/plugin'

import { client } from '../..'
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

    this._init()
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
      .on('playerMove', (player, initChannel, newChannel) => {
        if (!newChannel) {
          return player.destroy()
        }

        if (player) {
          if (player.voiceChannel === initChannel) {
            // Pause song for short duration while switching channels
            if (player.playing && !player.paused) {
              player.setVoiceChannel(newChannel)
              player.pause(true)
              setTimeout(() => {
                player.pause(false)
              }, 500)
            }
          }
        }
      })
      .on('socketClosed', async player => {
        if (!player.textChannel) {
          return
        }

        this.logger.log(
          `socketClosed. Guild: ${player.guild}. Channel: ${player.voiceChannel}`,
        )

        // Const channel = this.client.channels.cache.get(
        //   player.textChannel,
        // ) as TextChannel
        // await channel.send("I'm dead, ask the owner for help")
      })
  }

  private _initClientEvents() {
    client.on('raw', (d: any) => this.updateVoiceState(d))
  }
}

export const musicManager = new MusicManager()
