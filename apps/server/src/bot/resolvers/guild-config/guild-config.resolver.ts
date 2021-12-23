import {
  createParamDecorator,
  ExecutionContext,
  Inject,
  UseGuards,
} from '@nestjs/common'
import {
  Args,
  GqlExecutionContext,
  Mutation,
  Query,
  Resolver,
} from '@nestjs/graphql'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import { GuildConfig } from 'src/bot/models/guildConfig'
import { IGuildConfigProvider } from 'src/bot/types'
import { GuildDocument } from 'src/schemas'

import * as ArgsDTO from 'src/bot/dto/args'
import * as Inputs from 'src/bot/dto/input'

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  },
)

@Resolver('GuildConfig')
@UseGuards(GraphQLAuthGuard)
export class GuildConfigResolver {
  constructor(
    @Inject('GUILD_CONFIG_SERVICE')
    private readonly GuildService: IGuildConfigProvider,
  ) {}

  @Query(() => GuildConfig, { name: 'guildConfig', nullable: false })
  async guild(
    @Args() getGuildId: ArgsDTO.GetGuildIdArgs,
  ): Promise<GuildDocument | null> {
    return this.GuildService.getGuild(getGuildId)
  }

  @Mutation(() => GuildConfig)
  async updateAutoMod(
    @Args('updateAutoMod') updateAutoMod: Inputs.UpdateAutoModInput,
  ): Promise<GuildDocument> {
    return await this.GuildService.updateAutoMod(updateAutoMod)
  }

  @Mutation(() => GuildConfig)
  async updateModerationPlugin(
    @Args('updatePlugin') updatePlugin: Inputs.UpdateModerationPlugin,
  ): Promise<GuildDocument> {
    return await this.GuildService.updateModerationPlugin(updatePlugin)
  }

  @Mutation(() => GuildConfig)
  async updatePrefix(
    @Args('updatePrefix') updatePrefix: Inputs.UpdatePrefixInput,
  ): Promise<GuildDocument> {
    return await this.GuildService.updatePrefix(updatePrefix)
  }

  @Mutation(() => GuildConfig)
  async updateBlacklistedWords(
    @Args('updateBlacklistedWords')
    blacklistedWords: Inputs.UpdateBlacklistedWords,
  ): Promise<GuildDocument> {
    return await this.GuildService.updateBlacklistedWords(blacklistedWords)
  }

  @Mutation(() => GuildConfig)
  async updateImmortality(
    @Args('updateImmortality') updateImmortality: Inputs.UpdateMusicImmortality,
  ): Promise<GuildDocument> {
    return await this.GuildService.updateMusicImmortality(updateImmortality)
  }

  @Mutation(() => GuildConfig)
  async updateMusicPlugin(
    @Args('updateMusicPlugin') updateMusicPlugin: Inputs.UpdateMusicPlugin,
  ): Promise<GuildDocument> {
    return await this.GuildService.updateMusicPlugin(updateMusicPlugin)
  }

  @Mutation(() => GuildConfig)
  async updateMusicChannel(
    @Args('updateMusicChannel') updateMusicChannel: Inputs.UpdateMusicChannel,
  ): Promise<GuildDocument> {
    return await this.GuildService.updateMusicChannel(updateMusicChannel)
  }

  @Mutation(() => GuildConfig)
  async addLog(@Args('addLog') addLog: Inputs.AddLog): Promise<GuildDocument> {
    return await this.GuildService.addNewLog(addLog)
  }

  @Mutation(() => GuildConfig)
  async addCustomCommand(
    @Args('addCustomCommand') addCustomCommand: Inputs.AddCustomCommand,
  ): Promise<GuildDocument> {
    return await this.GuildService.addCustomCommand(addCustomCommand)
  }
}
