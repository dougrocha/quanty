import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { GuildSettingsCountAggregate } from './guild-settings-count-aggregate.output'
import { GuildSettingsAvgAggregate } from './guild-settings-avg-aggregate.output'
import { GuildSettingsSumAggregate } from './guild-settings-sum-aggregate.output'
import { GuildSettingsMinAggregate } from './guild-settings-min-aggregate.output'
import { GuildSettingsMaxAggregate } from './guild-settings-max-aggregate.output'

@ObjectType()
export class AggregateGuildSettings {
  @Field(() => GuildSettingsCountAggregate, { nullable: true })
  _count?: GuildSettingsCountAggregate

  @Field(() => GuildSettingsAvgAggregate, { nullable: true })
  _avg?: GuildSettingsAvgAggregate

  @Field(() => GuildSettingsSumAggregate, { nullable: true })
  _sum?: GuildSettingsSumAggregate

  @Field(() => GuildSettingsMinAggregate, { nullable: true })
  _min?: GuildSettingsMinAggregate

  @Field(() => GuildSettingsMaxAggregate, { nullable: true })
  _max?: GuildSettingsMaxAggregate
}
