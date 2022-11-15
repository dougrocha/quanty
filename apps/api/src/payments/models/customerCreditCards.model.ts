import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
class Card {
  @Field()
  brand: string

  @Field({ nullable: true })
  country?: string

  @Field()
  exp_month: number

  @Field()
  exp_year: number

  @Field({
    description:
      'Card funding type. Can be credit, debit, prepaid, or unknown.',
  })
  funding: string

  @Field()
  last4: string
}

@ObjectType()
class Address {
  @Field({ nullable: true })
  city?: string

  @Field({ nullable: true })
  country?: string

  @Field({
    nullable: true,
    description: 'Address line 1 (e.g., street, PO Box, or company name).',
  })
  line1?: string

  @Field({
    nullable: true,
    description: 'Address line 2 (e.g., apartment, suite, unit, or building).',
  })
  line2?: string

  @Field({ nullable: true })
  postal_code?: string

  @Field({ nullable: true })
  state?: string
}

@ObjectType()
class BillingDetails {
  @Field()
  address?: Address

  @Field({ nullable: true })
  email?: string

  @Field({ nullable: true })
  name?: string

  @Field({
    nullable: true,
    description: 'Billing phone number (include extensions)',
  })
  phone?: string
}

@ObjectType()
export class PaymentMethod {
  @Field()
  id: string

  @Field(() => BillingDetails, {
    name: 'billingDetails',
    description:
      'Billing information associated with the PaymentMethod that may be used or request by certain payment methods',
  })
  billing_details: BillingDetails

  @Field({ name: 'customerId', description: 'Customer Id' })
  customer: string

  @Field(() => Card)
  card: Card
}
