import { ModelOptions, Prop, Ref } from '@typegoose/typegoose'

import { Guild } from './GuildSchema'

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

  @Prop({ required: true, ref: () => 'Guild', type: () => Guild })
  guild: Ref<Guild>
}
