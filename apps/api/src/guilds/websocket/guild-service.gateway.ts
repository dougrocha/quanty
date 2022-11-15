import { Logger } from '@nestjs/common'
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class GuildServiceGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  ws: Server

  private logger: Logger = new Logger('BotGateway')

  async afterInit(server: Server) {
    this.logger.log(GuildServiceGateway.name, 'Initialized!')
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

  // EmitGuild(emit: GuildEventsEnum, guild: GuildDocument) {
  //   this.ws.emit(emit, guild)
  // }
}
