import { Field, ObjectType } from '@nestjs/graphql'
import { Prop } from '@nestjs/mongoose'

@ObjectType()
export class LoggedUser {
  @Field()
  @Prop({ required: true, default: null })
  id: string

  @Field()
  @Prop({ required: true, default: 'Unknown' })
  username: string

  @Field()
  @Prop({ required: true, default: '0000' })
  discriminator: string
}
