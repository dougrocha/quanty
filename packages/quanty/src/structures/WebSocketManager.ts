import QuantyClient from 'index'
import { io, Socket } from 'socket.io-client'
import { guildsDocument } from 'types/mongoose.gen'

import { QuantyLogger } from '.'

import { GuildEventsEnum, IWebSocket, IWebSocketConfig } from '../types'

class WebSocket implements IWebSocket {
  private logger: QuantyLogger = new QuantyLogger('Websocket')

  private client: QuantyClient

  public socket: Socket | undefined

  private readonly url: string | undefined

  private readonly token: string | undefined

  constructor(client: QuantyClient, config?: IWebSocketConfig) {
    this.url = config?.url

    this.token = config?.token

    this.client = client

    if (this.url?.length) {
      this.socket = io('http://localhost:3001/', {
        auth: { token: this.token ?? null },
      })
      this.socket
        .on('connect', () => {
          this.logger.info('Websocket successfully Connected.')
        })
        .on('disconnected', () => {
          this.logger.info('Websocket disconnected.')
        })

      this.receivePrefixUpdate()
      this.receiveAutoMod()
      this.receiveBlacklistedWords()
      this.receiveImmortality()
      this.receiveModerationPlugin()
      this.receiveMusicPlugin()
      this.receiveMusicChannel()
    } else {
      this.logger.warn('WebSocket config needed to start this')
    }
  }
  receivePrefixUpdate(): void {
    this.socket?.on(GuildEventsEnum.PREFIX, async (data: guildsDocument) => {
      await this.client.guildManager.updateGuildById(data.guildId, data)
    })
  }
  receiveAutoMod(): void {
    this.socket?.on(GuildEventsEnum.AUTOMOD, async (data: guildsDocument) => {
      await this.client.guildManager.updateGuildById(data.guildId, data)
    })
  }
  receiveModerationPlugin(): void {
    this.socket?.on(
      GuildEventsEnum.MODERATION_PLUGIN,
      async (data: guildsDocument) => {
        await this.client.guildManager.updateGuildById(data.guildId, data)
      },
    )
  }
  receiveBlacklistedWords(): void {
    this.socket?.on(GuildEventsEnum.BL_WORDS, async (data: guildsDocument) => {
      await this.client.guildManager.updateGuildById(data.guildId, data)
    })
  }
  receiveImmortality(): void {
    this.socket?.on(
      GuildEventsEnum.MUSIC_IMMORTALITY,
      async (data: guildsDocument) => {
        await this.client.guildManager.updateGuildById(data.guildId, data)
      },
    )
  }
  receiveMusicPlugin(): void {
    this.socket?.on(
      GuildEventsEnum.MUSIC_PLUGIN,
      async (data: guildsDocument) => {
        await this.client.guildManager.updateGuildById(data.guildId, data)
      },
    )
  }
  receiveMusicChannel(): void {
    this.socket?.on(
      GuildEventsEnum.MUSIC_CHANNEL,
      async (data: guildsDocument) => {
        await this.client.guildManager.updateGuildById(data.guildId, data)
      },
    )
  }
}

export default WebSocket