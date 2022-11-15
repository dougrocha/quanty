import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CreateSubscription {
  @Field({ name: 'subscriptionId' })
  id: string

  @Field({ name: 'clientSecret' })
  client_secret: string
}
