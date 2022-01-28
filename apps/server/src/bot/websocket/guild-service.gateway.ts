import { Inject, Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { GuildDocument } from 'src/schemas'

import { GuildEventsEnum, IGuildConfigProvider } from '../interfaces/types'

@WebSocketGateway()
export class GuildServiceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  ws: Server

  constructor(
    @Inject('GUILD_CONFIG_SERVICE')
    private readonly GuildService: IGuildConfigProvider,
  ) {}

  private logger: Logger = new Logger('BotGateway')

  async afterInit(server: Server) {
    this.logger.log('Initialized!')
  }

  handleConnection(client: Socket, ...args: any[]) {
    const isTokenValid = () =>
      process.env.WEBSOCKET_TOKEN == client.handshake.auth.token

    if (!isTokenValid()) {
      client.disconnect()
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Socket disconnect: ', client.id)
  }

  emitGuild(emit: GuildEventsEnum, guild: GuildDocument) {
    this.ws.emit(emit, guild)
  }
}
