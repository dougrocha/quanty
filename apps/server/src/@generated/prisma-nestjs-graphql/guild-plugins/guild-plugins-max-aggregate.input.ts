import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GuildPluginsMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true

  @Field(() => Boolean, { nullable: true })
  autoMod?: true

  @Field(() => Boolean, { nullable: true })
  anime?: true
}
