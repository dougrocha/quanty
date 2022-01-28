import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { GraphQLAuthGuard } from 'src/auth/utils/Guards'
import * as ArgsDTO from 'src/bot/dto/args'
import * as Inputs from 'src/bot/dto/input'
import { GuildConfig } from 'src/bot/models/guildConfig'
import { GuildDocument } from 'src/schemas'

import { GuildEventsEnum, IGuildConfigProvider } from '../interfaces/types'
import { GuildServiceGateway } from '../websocket/guild-service.gateway'

@Resolver('GuildConfig')
@UseGuards(GraphQLAuthGuard)
export class GuildConfigResolver {
  constructor(
    @Inject(GuildServiceGateway)
    private readonly GuildWs: GuildServiceGateway,
    @Inject('GUILD_CONFIG_SERVICE')
    private readonly GuildService: IGuildConfigProvider,
  ) {}

  @Query(() => GuildConfig, { name: 'guildConfig', nullable: false })
  async guild(
    @Args() getGuildId: ArgsDTO.GetGuildIdArgs,
  ): Promise<GuildDocument | null> {
    return await this.GuildService.getGuild(getGuildId)
  }

  @Mutation(() => GuildConfig)
  async updatePrefix(
    @Args('updatePrefix') updatePrefix: Inputs.UpdatePrefixInput,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updatePrefix(updatePrefix)
    this.GuildWs.emitGuild(GuildEventsEnum.PREFIX, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async updateAutoMod(
    @Args('updateAutoMod') updateAutoMod: Inputs.UpdateAutoModInput,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updateAutoMod(updateAutoMod)
    this.GuildWs.emitGuild(GuildEventsEnum.AUTOMOD, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async updateModerationPlugin(
    @Args('updateModerationPlugin')
    updateModerationPlugin: Inputs.UpdateModerationPlugin,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updateModerationPlugin(
      updateModerationPlugin,
    )
    this.GuildWs.emitGuild(GuildEventsEnum.MODERATION_PLUGIN, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async updateBlacklistedWords(
    @Args('updateBlacklistedWords')
    blacklistedWords: Inputs.UpdateBlacklistedWords,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updateBlacklistedWords(
      blacklistedWords,
    )
    this.GuildWs.emitGuild(GuildEventsEnum.BL_WORDS, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async updateImmortality(
    @Args('updateImmortality') updateImmortality: Inputs.UpdateMusicImmortality,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updateMusicImmortality(
      updateImmortality,
    )
    this.GuildWs.emitGuild(GuildEventsEnum.MUSIC_IMMORTALITY, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async updateMusicPlugin(
    @Args('updateMusicPlugin') updateMusicPlugin: Inputs.UpdateMusicPlugin,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updateMusicPlugin(updateMusicPlugin)
    this.GuildWs.emitGuild(GuildEventsEnum.MUSIC_PLUGIN, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async updateMusicChannel(
    @Args('updateMusicChannel') updateMusicChannel: Inputs.UpdateMusicChannel,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.updateMusicChannel(updateMusicChannel)
    this.GuildWs.emitGuild(GuildEventsEnum.MUSIC_CHANNEL, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async addLog(@Args('addLog') addLog: Inputs.AddLog): Promise<GuildDocument> {
    const guild = await this.GuildService.addNewLog(addLog)
    this.GuildWs.emitGuild(GuildEventsEnum.ADD_LOG, guild)
    return guild
  }

  @Mutation(() => GuildConfig)
  async addCustomCommand(
    @Args('addCustomCommand') addCustomCommand: Inputs.AddCustomCommand,
  ): Promise<GuildDocument> {
    const guild = await this.GuildService.addCustomCommand(addCustomCommand)
    this.GuildWs.emitGuild(GuildEventsEnum.ADD_CUSTOMCOMMAND, guild)
    return guild
  }
}
