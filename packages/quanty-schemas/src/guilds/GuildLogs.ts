import { ObjectType, Field } from '@nestjs/graphql'
import { Schema, Prop } from '@nestjs/mongoose'

import { LoggedUser } from './'

@ObjectType()
@Schema({ timestamps: { updatedAt: false } })
export class GuildLogs {
  @Field(() => LoggedUser)
  @Prop({ type: () => LoggedUser, required: true })
  user: LoggedUser

  @Field()
  @Prop({ required: true })
  guildId: string

  @Field()
  @Prop({ required: true })
  action: string
}
