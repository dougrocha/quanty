import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateSubscriptionInput {
  @Field()
  userId: string

  @Field()
  priceId: string

  @Field()
  guildId: string
}
