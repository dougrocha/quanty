import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateAutoModInput {
  @Field()
  @IsNotEmpty()
  guildId: string

  @Field()
  @IsNotEmpty()
  autoMod: boolean
}
