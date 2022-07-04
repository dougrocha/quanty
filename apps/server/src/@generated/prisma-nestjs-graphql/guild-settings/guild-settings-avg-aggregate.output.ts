import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Float } from '@nestjs/graphql'

@ObjectType()
export class GuildSettingsAvgAggregate {
  @Field(() => Float, { nullable: true })
  globalCooldown?: number
}
