import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { GuildCreateNestedOneWithoutGuildSettingsInput } from '../guild/guild-create-nested-one-without-guild-settings.input'

@InputType()
export class GuildSettingsCreateInput {
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

  @Field(() => GuildCreateNestedOneWithoutGuildSettingsInput, {
    nullable: true,
  })
  guild?: GuildCreateNestedOneWithoutGuildSettingsInput
}
