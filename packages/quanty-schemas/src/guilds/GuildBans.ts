import { Field, ObjectType } from '@nestjs/graphql'
import { Schema, Prop } from '@nestjs/mongoose'

import { LoggedUser } from './'

@ObjectType()
@Schema({ timestamps: { createdAt: 'issuedOn', updatedAt: false } })
export class GuildBanLogs {
  @Field(() => LoggedUser)
  @Prop({ type: () => LoggedUser, required: true })
  bannedUser: LoggedUser

  @Field(() => LoggedUser)
  @Prop({ type: () => LoggedUser, required: true })
  issuedBy: LoggedUser

  @Field()
  @Prop({ type: () => String })
  reason?: string

  @Field()
  @Prop({ required: true })
  guildId: string

  @Field()
  @Prop({ type: () => Date, required: true })
  issuedOn: Date
}
