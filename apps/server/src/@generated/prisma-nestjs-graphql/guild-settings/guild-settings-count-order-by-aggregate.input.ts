import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { SortOrder } from '../prisma/sort-order.enum'

@InputType()
export class GuildSettingsCountOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  defaultJoinRole?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  nsfw?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  globalCooldown?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  djRole?: keyof typeof SortOrder

  @Field(() => SortOrder, { nullable: true })
  musicTimeOut?: keyof typeof SortOrder
}
