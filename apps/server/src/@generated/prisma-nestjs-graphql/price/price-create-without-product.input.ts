import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { PriceType } from '../prisma/price-type.enum'
import { GuildSubscriptionCreateNestedManyWithoutPriceInput } from '../guild-subscription/guild-subscription-create-nested-many-without-price.input'

@InputType()
export class PriceCreateWithoutProductInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  recurringInterval?: string

  @Field(() => Int, { nullable: false })
  unit_amount!: number

  @Field(() => String, { nullable: false })
  currency!: string

  @Field(() => PriceType, { nullable: false })
  type!: keyof typeof PriceType

  @Field(() => GuildSubscriptionCreateNestedManyWithoutPriceInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionCreateNestedManyWithoutPriceInput
}
