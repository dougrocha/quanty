import { ModelOptions, Prop } from '@typegoose/typegoose'

import { LoggedUser } from './LoggedUser'

@ModelOptions({ schemaOptions: { timestamps: { updatedAt: false } } })
export class GuildLogs {
  @Prop({ type: () => LoggedUser, required: true })
  user: LoggedUser

  @Prop({ required: true })
  guildId: string

  @Prop({ required: true })
  action: string
}
