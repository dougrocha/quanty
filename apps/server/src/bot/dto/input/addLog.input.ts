import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
class Log {
  @Field()
  name: string
  @Field()
  action: string
}

@InputType()
export class AddLog {
  @Field()
  @IsNotEmpty()
  guildId: string

  @Field(() => Log)
  @IsNotEmpty()
  log: Log
}
