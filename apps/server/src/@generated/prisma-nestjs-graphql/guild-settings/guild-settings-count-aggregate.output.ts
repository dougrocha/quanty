import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class GuildSettingsCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  defaultJoinRole!: number

  @Field(() => Int, { nullable: false })
  nsfw!: number

  @Field(() => Int, { nullable: false })
  globalCooldown!: number

  @Field(() => Int, { nullable: false })
  djRole!: number

  @Field(() => Int, { nullable: false })
  musicTimeOut!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
