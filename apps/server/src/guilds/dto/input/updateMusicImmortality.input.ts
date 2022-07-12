import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateMusicImmortality {
  @Field()
  @IsNotEmpty()
  guildId: string

  @Field()
  @IsNotEmpty()
  immortal: boolean
}
