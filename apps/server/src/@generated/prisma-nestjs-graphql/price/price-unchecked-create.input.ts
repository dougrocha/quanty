import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { PriceType } from '../prisma/price-type.enum'
import { GuildSubscriptionUncheckedCreateNestedManyWithoutPriceInput } from '../guild-subscription/guild-subscription-unchecked-create-nested-many-without-price.input'

@InputType()
export class PriceUncheckedCreateInput {
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

  @Field(() => String, { nullable: false })
  productId!: string

  @Field(() => GuildSubscriptionUncheckedCreateNestedManyWithoutPriceInput, {
    nullable: true,
  })
  subscription?: GuildSubscriptionUncheckedCreateNestedManyWithoutPriceInput
}
