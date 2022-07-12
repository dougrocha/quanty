import { Prop } from '@typegoose/typegoose'

export class BaseUser {
  @Prop({ required: true, default: null })
  id: string

  @Prop({ required: true, default: 'Unknown' })
  username: string

  @Prop({ required: true, default: '0000' })
  discriminator: string
}
