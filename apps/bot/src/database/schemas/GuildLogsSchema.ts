import { ModelOptions, Prop } from '@typegoose/typegoose'

import { BaseUser } from './extras'

@ModelOptions({ schemaOptions: { timestamps: { updatedAt: false } } })
export class GuildLogs {
  @Prop({ type: () => BaseUser, required: true })
  user: BaseUser

  @Prop({ required: true })
  guildId: string

  @Prop({ required: true, unique: true })
  action: string
}
