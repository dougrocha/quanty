import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { SubscriptionUpdateInput } from './subscription-update.input'
import { Type } from 'class-transformer'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'

@ArgsType()
export class UpdateOneSubscriptionArgs {
  @Field(() => SubscriptionUpdateInput, { nullable: false })
  @Type(() => SubscriptionUpdateInput)
  data!: SubscriptionUpdateInput

  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  @Type(() => SubscriptionWhereUniqueInput)
  where!: SubscriptionWhereUniqueInput
}
