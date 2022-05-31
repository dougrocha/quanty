import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'

@ObjectType({ description: 'Returns the logged in user' })
@Schema({})
export class Users {
  @Field()
  @Prop({ index: true })
  discordId: string

  @Field()
  @Prop()
  username: string

  @Field()
  @Prop()
  discriminator: string

  @Field()
  @Prop({ nullable: true })
  avatar?: string

  @Field()
  @Prop({ nullable: true, unique: true })
  email?: string

  @Field()
  @Prop({ default: false })
  verified: boolean

  @Field()
  @Prop({ nullable: true })
  locale?: string

  @Prop({ name: 'access_token' })
  accessToken: string

  @Prop({ name: 'refresh_token' })
  refreshToken: string
}
