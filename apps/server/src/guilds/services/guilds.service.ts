import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { map } from 'rxjs'
import {
  IGuildsHttpService,
  IGuildsService,
} from 'src/guilds/interfaces/guilds'
import { GuildDocument, Guilds } from 'src/schemas'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  },
)

@Injectable()
export class GuildsService implements IGuildsService {
  constructor(
    @InjectModel(Guilds.name) private guildModel: Model<GuildDocument>,
    @Inject('GUILDS_HTTP_SERVICE')
    private readonly guildsHttpService: IGuildsHttpService,
  ) {}

  async getGuildConfig(guildId: string): Promise<GuildDocument | null> {
    return await this.guildModel.findOne({ guildId })
  }

  async getMutualGuilds(accessToken: string) {
    const { data: userGuilds } = await this.guildsHttpService.fetchUserGuilds(
      accessToken,
    )
    const { data: botGuilds } = await this.guildsHttpService.fetchBotGuilds()

    const adminUserGuilds = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions ?? '') & 0x8) === 0x8,
    )
    console.log('admin', adminUserGuilds)
    const mutualGuilds = userGuilds.filter(guild =>
      botGuilds.some(botGuild => botGuild.id === guild.id),
    )
    console.log('mutual', mutualGuilds)
  }
}
