import {
  CACHE_MANAGER,
  Inject,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Cache } from 'cache-manager'
import { PubSub } from 'graphql-subscriptions'

import {
  Guild,
  GuildPlugins,
  GuildSettings,
  GuildUpdateInput,
} from '../../@generated'
import {
  GqlThrottlerGuard,
  GraphQLAuthGuard,
  GuildAdminGuard,
  GUILD_EVENT,
  PUB_SUB,
} from '../../common'
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor'
import { IGuildsService } from '../interfaces/guilds'
import { GuildServiceGateway } from '../websocket/guild-service.gateway'

@Resolver(() => Guild)
@UseInterceptors(LoggingInterceptor)
export class GuildConfigResolver {
  constructor(
    @Inject(GuildServiceGateway)
    private readonly GuildWs: GuildServiceGateway,
    @Inject('GUILDS_SERVICE')
    private readonly GuildsService: IGuildsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @UseGuards(GraphQLAuthGuard, GqlThrottlerGuard, GuildAdminGuard)
  @Mutation(() => Guild)
  async updateGuildById(
    @Args('guildId') id: string,
    @Args('guildUpdateInput')
    updateArgs: GuildUpdateInput,
  ): Promise<Guild> {
    const guildConfig = await this.GuildsService.updateGuild({
      where: { id },
      data: updateArgs,
    })

    void this.pubSub.publish(GUILD_EVENT.UPDATE_GUILD, {
      updatedGuildConfig: guildConfig,
    })

    return guildConfig
  }

  @UseGuards(GraphQLAuthGuard, GqlThrottlerGuard, GuildAdminGuard)
  @Query(() => Guild, { name: 'guildConfig', nullable: false })
  async guild(@Args('guildId') guildId: string): Promise<Guild | null> {
    const cachedGuild = await this.cacheManager.get(`guildConfig-${guildId}`)

    if (cachedGuild) return <Guild>cachedGuild

    const guild = await this.GuildsService.getGuild({ id: guildId })
    await this.cacheManager.set(`guildConfig-${guildId}`, guild)

    return guild
  }

  @ResolveField(() => GuildPlugins, { name: 'guildPlugins', nullable: true })
  async guildPlugins(@Parent() { id }: Guild): Promise<GuildPlugins | null> {
    const cachedGuildPlugins = await this.cacheManager.get(`guildPlugins-${id}`)

    if (cachedGuildPlugins) return <GuildPlugins>cachedGuildPlugins

    const guildPlugins = await this.GuildsService.getGuildPlugins({
      id: id,
    })
    await this.cacheManager.set(`guildPlugins-${id}`, guildPlugins)

    return guildPlugins
  }

  @ResolveField(() => GuildSettings, { name: 'guildSettings', nullable: true })
  async guildSettings(@Parent() { id }: Guild): Promise<GuildSettings | null> {
    const cachedGuildSettings = await this.cacheManager.get(
      `guildSettings-${id}`,
    )

    if (cachedGuildSettings) return <GuildSettings>cachedGuildSettings

    const guildSettings = await this.GuildsService.getGuildSettings({
      id: id,
    })

    await this.cacheManager.set(`guildSettings-${id}`, guildSettings, {
      ttl: 30, // 30 minutes
    })

    return guildSettings
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
