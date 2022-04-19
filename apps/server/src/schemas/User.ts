/* eslint-disable  */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
  @Prop()
  discordId: string

  @Prop()
  username: string

  @Prop()
  discriminator: string

  @Prop({ nullable: true })
  avatar?: string

  @Prop({ nullable: true })
  email?: string

  @Prop({ default: false })
  verified: boolean

  @Prop({ nullable: true })
  locale?: string

  @Prop({ name: 'access_token' })
  accessToken: string

  @Prop({ name: 'refresh_token' })
  refreshToken: string
}

export const UserSchema = SchemaFactory.createForClass(User)
