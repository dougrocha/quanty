import { Prop } from '@typegoose/typegoose'

export class GuildCommands {
  @Prop({ required: true })
  guildId: string

  @Prop({ required: true })
  id: string

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  description: string
}
