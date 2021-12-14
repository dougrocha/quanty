import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdatePrefixInput {
  @Field()
  @IsNotEmpty()
  guildId: string;

  @Field()
  @IsNotEmpty()
  prefix: string;
}
