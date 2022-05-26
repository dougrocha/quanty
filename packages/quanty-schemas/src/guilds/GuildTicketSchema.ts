import { ModelOptions, Prop } from '@typegoose/typegoose'

@ModelOptions({
  schemaOptions: { timestamps: { createdAt: 'issuedOn', updatedAt: false } },
})
export class GuildTicket {
  @Prop({ type: () => String, required: true })
  memberId: string

  @Prop({ type: () => String, required: true })
  channelId: string

  @Prop({ type: () => String, required: true })
  ticketId: string

  @Prop({ type: () => Boolean, required: true })
  closed: boolean

  @Prop({ type: () => Boolean, required: true })
  locked: boolean

  @Prop({ type: () => String, required: true })
  type: string

  @Prop({ required: true })
  guildId: string
}
