import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GuildPluginsCreateManyInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => Boolean, { nullable: true })
  autoMod?: boolean

  @Field(() => Boolean, { nullable: true })
  anime?: boolean
}
