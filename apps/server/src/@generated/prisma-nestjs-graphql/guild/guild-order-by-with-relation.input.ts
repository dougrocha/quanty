import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'
import { GuildSubscriptionOrderByWithRelationInput } from '../guild-subscription/guild-subscription-order-by-with-relation.input'
import { GuildSettingsOrderByWithRelationInput } from '../guild-settings/guild-settings-order-by-with-relation.input'
import { GuildPluginsOrderByWithRelationInput } from '../guild-plugins/guild-plugins-order-by-with-relation.input'

@InputType()
export class GuildOrderByWithRelationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  premium?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  prefix?: keyof typeof SortOrder

  @Field(() => GuildSubscriptionOrderByWithRelationInput, { nullable: true })
  subscription?: GuildSubscriptionOrderByWithRelationInput

  @Field(() => GuildSettingsOrderByWithRelationInput, { nullable: true })
  guildSettings?: GuildSettingsOrderByWithRelationInput

  @Field(() => GuildPluginsOrderByWithRelationInput, { nullable: true })
  guildPlugins?: GuildPluginsOrderByWithRelationInput
}
