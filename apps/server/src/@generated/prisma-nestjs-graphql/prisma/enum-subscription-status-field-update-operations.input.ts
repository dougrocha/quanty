import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Subscription_status } from './subscription-status.enum'

@InputType()
export class EnumSubscription_statusFieldUpdateOperationsInput {
  @Field(() => Subscription_status, { nullable: true })
  set?: keyof typeof Subscription_status
}
