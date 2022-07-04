import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SubscriptionCreateWithoutPriceInput } from './subscription-create-without-price.input'
import { Type } from 'class-transformer'
import { SubscriptionCreateOrConnectWithoutPriceInput } from './subscription-create-or-connect-without-price.input'
import { SubscriptionUpsertWithWhereUniqueWithoutPriceInput } from './subscription-upsert-with-where-unique-without-price.input'
import { SubscriptionCreateManyPriceInputEnvelope } from './subscription-create-many-price-input-envelope.input'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'
import { SubscriptionUpdateWithWhereUniqueWithoutPriceInput } from './subscription-update-with-where-unique-without-price.input'
import { SubscriptionUpdateManyWithWhereWithoutPriceInput } from './subscription-update-many-with-where-without-price.input'
import { SubscriptionScalarWhereInput } from './subscription-scalar-where.input'

@InputType()
export class SubscriptionUncheckedUpdateManyWithoutPriceInput {
  @Field(() => [SubscriptionCreateWithoutPriceInput], { nullable: true })
  @Type(() => SubscriptionCreateWithoutPriceInput)
  create?: Array<SubscriptionCreateWithoutPriceInput>

  @Field(() => [SubscriptionCreateOrConnectWithoutPriceInput], {
    nullable: true,
  })
  @Type(() => SubscriptionCreateOrConnectWithoutPriceInput)
  connectOrCreate?: Array<SubscriptionCreateOrConnectWithoutPriceInput>

  @Field(() => [SubscriptionUpsertWithWhereUniqueWithoutPriceInput], {
    nullable: true,
  })
  @Type(() => SubscriptionUpsertWithWhereUniqueWithoutPriceInput)
  upsert?: Array<SubscriptionUpsertWithWhereUniqueWithoutPriceInput>

  @Field(() => SubscriptionCreateManyPriceInputEnvelope, { nullable: true })
  @Type(() => SubscriptionCreateManyPriceInputEnvelope)
  createMany?: SubscriptionCreateManyPriceInputEnvelope

  @Field(() => [SubscriptionWhereUniqueInput], { nullable: true })
  @Type(() => SubscriptionWhereUniqueInput)
  set?: Array<SubscriptionWhereUniqueInput>

  @Field(() => [SubscriptionWhereUniqueInput], { nullable: true })
  @Type(() => SubscriptionWhereUniqueInput)
  disconnect?: Array<SubscriptionWhereUniqueInput>

  @Field(() => [SubscriptionWhereUniqueInput], { nullable: true })
  @Type(() => SubscriptionWhereUniqueInput)
  delete?: Array<SubscriptionWhereUniqueInput>

  @Field(() => [SubscriptionWhereUniqueInput], { nullable: true })
  @Type(() => SubscriptionWhereUniqueInput)
  connect?: Array<SubscriptionWhereUniqueInput>

  @Field(() => [SubscriptionUpdateWithWhereUniqueWithoutPriceInput], {
    nullable: true,
  })
  @Type(() => SubscriptionUpdateWithWhereUniqueWithoutPriceInput)
  update?: Array<SubscriptionUpdateWithWhereUniqueWithoutPriceInput>

  @Field(() => [SubscriptionUpdateManyWithWhereWithoutPriceInput], {
    nullable: true,
  })
  @Type(() => SubscriptionUpdateManyWithWhereWithoutPriceInput)
  updateMany?: Array<SubscriptionUpdateManyWithWhereWithoutPriceInput>

  @Field(() => [SubscriptionScalarWhereInput], { nullable: true })
  @Type(() => SubscriptionScalarWhereInput)
  deleteMany?: Array<SubscriptionScalarWhereInput>
}
