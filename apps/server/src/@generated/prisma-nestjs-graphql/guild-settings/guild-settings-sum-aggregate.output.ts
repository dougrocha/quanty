import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class GuildSettingsSumAggregate {
  @Field(() => Int, { nullable: true })
  globalCooldown?: number
}
