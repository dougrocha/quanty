import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { GuildCreateNestedOneWithoutGuildPluginsInput } from '../guild/guild-create-nested-one-without-guild-plugins.input'

@InputType()
export class GuildPluginsCreateInput {
  @Field(() => Boolean, { nullable: true })
  autoMod?: boolean

  @Field(() => Boolean, { nullable: true })
  anime?: boolean

  @Field(() => GuildCreateNestedOneWithoutGuildPluginsInput, {
    nullable: false,
  })
  guild!: GuildCreateNestedOneWithoutGuildPluginsInput
}
