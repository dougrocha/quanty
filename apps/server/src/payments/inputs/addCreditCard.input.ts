import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AddCreditCardInput {
  @Field()
  customerId: string

  @Field()
  paymentMethodId: string
}
