import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'

@InputType()
export class GuildSettingsUncheckedCreateWithoutGuildInput {
  @Field(() => String, { nullable: false })
  defaultJoinRole!: string

  @Field(() => Boolean, { nullable: true })
  nsfw?: boolean

  @Field(() => Int, { nullable: true })
  globalCooldown?: number

  @Field(() => String, { nullable: false })
  djRole!: string

  @Field(() => Boolean, { nullable: true })
  musicTimeOut?: boolean
}
