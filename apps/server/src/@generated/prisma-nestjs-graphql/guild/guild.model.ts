import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { GuildSubscription } from '../guild-subscription/guild-subscription.model'
import { GuildSettings } from '../guild-settings/guild-settings.model'
import { GuildPlugins } from '../guild-plugins/guild-plugins.model'

@ObjectType()
export class Guild {
  @Field(() => ID, { nullable: false })
  id!: string

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  premium!: boolean

  @Field(() => String, { nullable: false, defaultValue: 'q!' })
  prefix!: string

  @Field(() => GuildSubscription, { nullable: true })
  subscription?: GuildSubscription | null

  @Field(() => GuildSettings, { nullable: true })
  guildSettings?: GuildSettings | null

  @Field(() => GuildPlugins, { nullable: true })
  guildPlugins?: GuildPlugins | null
}
