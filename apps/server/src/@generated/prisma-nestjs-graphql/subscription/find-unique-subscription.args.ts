import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'
import { Type } from 'class-transformer'

@ArgsType()
export class FindUniqueSubscriptionArgs {
  @Field(() => SubscriptionWhereUniqueInput, { nullable: false })
  @Type(() => SubscriptionWhereUniqueInput)
  where!: SubscriptionWhereUniqueInput
}
