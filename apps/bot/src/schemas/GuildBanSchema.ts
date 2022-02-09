import { ModelOptions, Prop, Ref } from '@typegoose/typegoose'

import { Guild } from './GuildSchema'

@ModelOptions({
  schemaOptions: { timestamps: { createdAt: 'issuedOn' } },
})
export class GuildBanLogs {
  @Prop({ type: () => String, required: true })
  bannedUserId: string

  @Prop({ type: () => String, required: true })
  issuedBy: string

  @Prop({ type: () => String })
  reason?: string

  @Prop({ required: true, ref: () => 'Guild', type: () => Guild })
  guild: Ref<Guild>
}
