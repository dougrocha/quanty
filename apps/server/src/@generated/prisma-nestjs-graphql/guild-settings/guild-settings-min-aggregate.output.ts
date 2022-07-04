import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@ObjectType()
export class GuildSettingsMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  defaultJoinRole?: string

  @Field(() => Boolean, { nullable: true })
  nsfw?: boolean

  @Field(() => Int, { nullable: true })
  globalCooldown?: number

  @Field(() => String, { nullable: true })
  djRole?: string

  @Field(() => Boolean, { nullable: true })
  musicTimeOut?: boolean
}
