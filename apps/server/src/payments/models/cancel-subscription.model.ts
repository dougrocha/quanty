import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class CancelSubscription {
  @Field({ name: 'subscriptionId' })
  id: string

  @Field()
  status: string
}
