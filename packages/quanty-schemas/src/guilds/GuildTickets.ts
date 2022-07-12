import { Field, ObjectType } from '@nestjs/graphql'
import { Schema, Prop } from '@nestjs/mongoose'

@ObjectType()
@Schema({ timestamps: { createdAt: 'issuedOn', updatedAt: false } })
export class GuildTickets {
  @Field()
  @Prop({ type: () => String, required: true })
  memberId: string

  @Field()
  @Prop({ type: () => String, required: true })
  channelId: string

  @Field()
  @Prop({ type: () => String, required: true })
  ticketId: string

  @Field()
  @Prop({ type: () => Boolean, required: true })
  closed: boolean

  @Field()
  @Prop({ type: () => Boolean, required: true })
  locked: boolean

  @Field()
  @Prop({ type: () => String, required: true })
  type: string

  @Field()
  @Prop({ required: true })
  guildId: string
}
