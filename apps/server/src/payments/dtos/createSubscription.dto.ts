import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSubscriptionInput {
  @Field()
  customerId: string

  @Field()
  priceId: string
}
