import { Field, ObjectType } from '@nestjs/graphql'
import { Prop, Schema } from '@nestjs/mongoose'
import { Exclude } from 'class-transformer'
import { IsEmail } from 'class-validator'

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

  @Field({ nullable: true })
  @Prop({ unique: true })
  @IsEmail()
  email?: string

  @Field()
  @Prop({ default: false })
  verified: boolean

  @Field({ nullable: true })
  @Prop({ required: false })
  locale?: string

  @Field({ nullable: true })
  @Prop({ unique: true })
  stripeId?: string

  @Field({ nullable: true })
  @Prop()
  billingAddress?: string

  @Field({ nullable: true })
  @Prop()
  firstName?: string

  @Field({ nullable: true })
  @Prop()
  lastName?: string

  @Field({ nullable: true })
  @Prop()
  subscriptionId?: string

  @Prop({ name: 'access_token' })
  @Exclude()
  accessToken: string

  @Prop({ name: 'refresh_token' })
  @Exclude()
  refreshToken: string
}
