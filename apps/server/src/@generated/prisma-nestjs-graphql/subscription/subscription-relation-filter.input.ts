import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SubscriptionWhereInput } from './subscription-where.input'

@InputType()
export class SubscriptionRelationFilter {
  @Field(() => SubscriptionWhereInput, { nullable: true })
  is?: SubscriptionWhereInput

  @Field(() => SubscriptionWhereInput, { nullable: true })
  isNot?: SubscriptionWhereInput
}
