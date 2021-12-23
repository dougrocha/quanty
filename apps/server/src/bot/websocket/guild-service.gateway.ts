import { Logger } from '@nestjs/common'
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets'

@WebSocketGateway()
export class GuildServiceGateway implements OnGatewayInit {
  private logger: Logger = new Logger('BotGateway')

  afterInit(server: any) {
    this.logger.log('Initialized!')
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): WsResponse<string> {
    return { event: 'msg', data: 'Hello world!' }
  }
}
