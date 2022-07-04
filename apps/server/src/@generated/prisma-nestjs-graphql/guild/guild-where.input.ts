import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { StringFilter } from '../prisma/string-filter.input'
import { BoolFilter } from '../prisma/bool-filter.input'
import { GuildSubscriptionWhereInput } from '../guild-subscription/guild-subscription-where.input'
import { GuildSettingsWhereInput } from '../guild-settings/guild-settings-where.input'
import { GuildPluginsWhereInput } from '../guild-plugins/guild-plugins-where.input'

@InputType()
export class GuildWhereInput {
  @Field(() => [GuildWhereInput], { nullable: true })
  AND?: Array<GuildWhereInput>

  @Field(() => [GuildWhereInput], { nullable: true })
  OR?: Array<GuildWhereInput>

  @Field(() => [GuildWhereInput], { nullable: true })
  NOT?: Array<GuildWhereInput>

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter

  @Field(() => BoolFilter, { nullable: true })
  premium?: BoolFilter

  @Field(() => StringFilter, { nullable: true })
  prefix?: StringFilter

  @Field(() => GuildSubscriptionWhereInput, { nullable: true })
  subscription?: GuildSubscriptionWhereInput

  @Field(() => GuildSettingsWhereInput, { nullable: true })
  guildSettings?: GuildSettingsWhereInput

  @Field(() => GuildPluginsWhereInput, { nullable: true })
  guildPlugins?: GuildPluginsWhereInput
}
