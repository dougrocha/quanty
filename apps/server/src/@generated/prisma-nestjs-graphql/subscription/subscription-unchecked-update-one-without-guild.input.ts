import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SubscriptionCreateWithoutGuildInput } from './subscription-create-without-guild.input'
import { Type } from 'class-transformer'
import { SubscriptionCreateOrConnectWithoutGuildInput } from './subscription-create-or-connect-without-guild.input'
import { SubscriptionUpsertWithoutGuildInput } from './subscription-upsert-without-guild.input'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'
import { SubscriptionUpdateWithoutGuildInput } from './subscription-update-without-guild.input'

@InputType()
export class SubscriptionUncheckedUpdateOneWithoutGuildInput {
  @Field(() => SubscriptionCreateWithoutGuildInput, { nullable: true })
  @Type(() => SubscriptionCreateWithoutGuildInput)
  create?: SubscriptionCreateWithoutGuildInput

  @Field(() => SubscriptionCreateOrConnectWithoutGuildInput, { nullable: true })
  @Type(() => SubscriptionCreateOrConnectWithoutGuildInput)
  connectOrCreate?: SubscriptionCreateOrConnectWithoutGuildInput

  @Field(() => SubscriptionUpsertWithoutGuildInput, { nullable: true })
  @Type(() => SubscriptionUpsertWithoutGuildInput)
  upsert?: SubscriptionUpsertWithoutGuildInput

  @Field(() => Boolean, { nullable: true })
  disconnect?: boolean

  @Field(() => Boolean, { nullable: true })
  delete?: boolean

  @Field(() => SubscriptionWhereUniqueInput, { nullable: true })
  @Type(() => SubscriptionWhereUniqueInput)
  connect?: SubscriptionWhereUniqueInput

  @Field(() => SubscriptionUpdateWithoutGuildInput, { nullable: true })
  @Type(() => SubscriptionUpdateWithoutGuildInput)
  update?: SubscriptionUpdateWithoutGuildInput
}
