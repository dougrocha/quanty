import {
  CACHE_MANAGER,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { Guilds, GuildDocument } from '@quanty/schemas'
import { Cache } from 'cache-manager'
import * as ArgsDTO from 'src/guilds/dto/args'

import { GraphQLAuthGuard } from '../../common'
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor'
import { IGuildsService } from '../interfaces/guilds'
import { IGuildConfigProvider } from '../interfaces/types'
import { GuildServiceGateway } from '../websocket/guild-service.gateway'

@Resolver('GuildConfig')
@UseGuards(GraphQLAuthGuard)
export class GuildConfigResolver {
  constructor(
    @Inject(GuildServiceGateway)
    private readonly GuildWs: GuildServiceGateway,
    @Inject('GUILD_CONFIG_SERVICE')
    private readonly GuildService: IGuildConfigProvider,
    @Inject('GUILDS_SERVICE')
    private readonly GuildsService: IGuildsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Query(() => Guilds, { name: 'guildConfig', nullable: false })
  @UseInterceptors(LoggingInterceptor)
  async guild(
    @Args() getGuildId: ArgsDTO.GetGuildIdArgs,
  ): Promise<GuildDocument | null> {
    const cachedGuild = await this.cacheManager.get(`guildConfig-${getGuildId}`)

    if (cachedGuild) return <GuildDocument>cachedGuild

    const guild = await this.GuildsService.getGuildConfig(getGuildId.guildId)
    await this.cacheManager.set(`guildConfig-${getGuildId}`, guild)

    return guild
  }

  // @ResolveField('plugins', () => GuildPlugins, { nullable: true })
  // async getPlugins(
  //   @Parent() guild: Guilds,
  // ): Promise<GuildPluginsDocument | null> {
  //   const { guildId } = guild
  //   const plugins = await this.GuildsService.getGuildPlugins(guildId)
  //   console.log(plugins)
  //   return plugins
  // }

  // @Mutation(() => GuildConfig)
  // async updatePrefix(
  //   @Args('updatePrefix') updatePrefix: Inputs.UpdatePrefixInput,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updatePrefix(updatePrefix)
  //   this.GuildWs.emitGuild(GuildEventsEnum.PREFIX, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async updateAutoMod(
  //   @Args('updateAutoMod') updateAutoMod: Inputs.UpdateAutoModInput,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updateAutoMod(updateAutoMod)
  //   this.GuildWs.emitGuild(GuildEventsEnum.AUTOMOD, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async updateModerationPlugin(
  //   @Args('updateModerationPlugin')
  //   updateModerationPlugin: Inputs.UpdateModerationPlugin,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updateModerationPlugin(
  //     updateModerationPlugin,
  //   )
  //   this.GuildWs.emitGuild(GuildEventsEnum.MODERATION_PLUGIN, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async updateBlacklistedWords(
  //   @Args('updateBlacklistedWords')
  //   blacklistedWords: Inputs.UpdateBlacklistedWords,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updateBlacklistedWords(
  //     blacklistedWords,
  //   )
  //   this.GuildWs.emitGuild(GuildEventsEnum.BL_WORDS, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async updateImmortality(
  //   @Args('updateImmortality') updateImmortality: Inputs.UpdateMusicImmortality,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updateMusicImmortality(
  //     updateImmortality,
  //   )
  //   this.GuildWs.emitGuild(GuildEventsEnum.MUSIC_IMMORTALITY, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async updateMusicPlugin(
  //   @Args('updateMusicPlugin') updateMusicPlugin: Inputs.UpdateMusicPlugin,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updateMusicPlugin(updateMusicPlugin)
  //   this.GuildWs.emitGuild(GuildEventsEnum.MUSIC_PLUGIN, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async updateMusicChannel(
  //   @Args('updateMusicChannel') updateMusicChannel: Inputs.UpdateMusicChannel,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.updateMusicChannel(updateMusicChannel)
  //   this.GuildWs.emitGuild(GuildEventsEnum.MUSIC_CHANNEL, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async addLog(@Args('addLog') addLog: Inputs.AddLog): Promise<GuildDocument> {
  //   const guild = await this.GuildService.addNewLog(addLog)
  //   this.GuildWs.emitGuild(GuildEventsEnum.ADD_LOG, guild)
  //   return guild
  // }

  // @Mutation(() => GuildConfig)
  // async addCustomCommand(
  //   @Args('addCustomCommand') addCustomCommand: Inputs.AddCustomCommand,
  // ): Promise<GuildDocument> {
  //   const guild = await this.GuildService.addCustomCommand(addCustomCommand)
  //   this.GuildWs.emitGuild(GuildEventsEnum.ADD_CUSTOMCOMMAND, guild)
  //   return guild
  // }
}
