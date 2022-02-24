import { ModelOptions, Prop } from '@typegoose/typegoose'

import { BaseUser } from './extras'

@ModelOptions({
  schemaOptions: { timestamps: { createdAt: 'issuedOn' } },
})
export class GuildBanLogs {
  @Prop({ type: () => BaseUser, required: true })
  bannedUser: BaseUser

  @Prop({ type: () => BaseUser, required: true })
  issuedBy: BaseUser

  @Prop({ type: () => String })
  reason?: string

  @Prop({ required: true })
  guildId: string

  @Prop({ type: () => Date, required: true })
  issuedOn: Date
}
