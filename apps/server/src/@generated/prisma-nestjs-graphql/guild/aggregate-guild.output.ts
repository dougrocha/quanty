import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { GuildCountAggregate } from './guild-count-aggregate.output'
import { GuildMinAggregate } from './guild-min-aggregate.output'
import { GuildMaxAggregate } from './guild-max-aggregate.output'

@ObjectType()
export class AggregateGuild {
  @Field(() => GuildCountAggregate, { nullable: true })
  _count?: GuildCountAggregate

  @Field(() => GuildMinAggregate, { nullable: true })
  _min?: GuildMinAggregate

  @Field(() => GuildMaxAggregate, { nullable: true })
  _max?: GuildMaxAggregate
}
