import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GuildSettingsAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  globalCooldown?: true
}
