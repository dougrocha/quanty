import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateModerationPlugin {
  @Field()
  @IsNotEmpty()
  guildId: string

  @Field()
  @IsNotEmpty()
  plugin: boolean
}
