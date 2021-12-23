import { ArgsType, Field } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@ArgsType()
export class GetGuildIdArgs {
  @Field()
  @IsNotEmpty()
  guildId: string
}
