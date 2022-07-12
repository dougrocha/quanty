import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreatePaymentMethod {
  @Field({ name: 'clientSecret' })
  client_secret: string
  @Field()
  status: string
}
