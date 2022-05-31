import { Field, ObjectType } from '@nestjs/graphql'
import { Schema, Prop } from '@nestjs/mongoose'

@ObjectType()
@Schema()
export class GuildCommands {
  @Field()
  @Prop({ required: true })
  guildId: string

  @Field()
  @Prop({ required: true })
  id: string

  @Field()
  @Prop({ required: true })
  name: string

  @Field()
  @Prop({ required: true })
  description: string
}
