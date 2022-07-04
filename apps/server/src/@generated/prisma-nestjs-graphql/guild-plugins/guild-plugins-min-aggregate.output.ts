import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class GuildPluginsMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => Boolean, { nullable: true })
  autoMod?: boolean

  @Field(() => Boolean, { nullable: true })
  anime?: boolean
}
