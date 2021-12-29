import { io, Socket } from 'socket.io-client'

import { QuantyLogger } from '.'

import { IWebSocket } from '../types'

class WebSocket implements IWebSocket {
  private logger: QuantyLogger = new QuantyLogger('Websocket')

  private socket: Socket | undefined

  constructor(uri?: string) {
    if (uri?.length) {
      this.socket = io(uri)
      this.socket
        .on('connect', () => {
          this.logger.info('Websocket successfully Connected.')
        })
        .on('disconnected', () => {
          this.logger.info('Websocket disconnected.')
        })
    } else {
      this.logger.warn('WebSocket config needed to start this')
    }
  }

  recieveGuild() {
    return this.socket?.emit('guildUpdate')
  }
}

export default WebSocket
