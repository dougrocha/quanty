import { ModelOptions, Prop } from '@typegoose/typegoose'

import { LoggedUser } from './LoggedUser'

@ModelOptions({
  schemaOptions: { timestamps: { createdAt: 'issuedOn' } },
})
export class GuildBanLogs {
  @Prop({ type: () => LoggedUser, required: true })
  bannedUser: LoggedUser

  @Prop({ type: () => LoggedUser, required: true })
  issuedBy: LoggedUser

  @Prop({ type: () => String })
  reason?: string

  @Prop({ required: true })
  guildId: string

  @Prop({ type: () => Date, required: true })
  issuedOn: Date
}
