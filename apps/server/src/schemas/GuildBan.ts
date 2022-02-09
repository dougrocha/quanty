/* eslint-disable  */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type GuildBanDocument = GuildBanLog & Document

@Schema({ timestamps: true, versionKey: false })
export class GuildBanLog {
  @Prop({ type: String, required: true, unique: true })
  guildId: string

  @Prop({ type: String, required: true })
  bannedUserId: string

  @Prop({ type: String, required: true })
  issuedBy: string

  @Prop({ type: String, required: false })
  reason?: string

  @Prop()
  issuedOn: Date
}

export const GuildBanSchema =
  SchemaFactory.createForClass<GuildBanLog>(GuildBanLog)
