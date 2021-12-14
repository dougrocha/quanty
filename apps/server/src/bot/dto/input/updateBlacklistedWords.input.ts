import { Field, InputType } from '@nestjs/graphql';
import { ArrayMinSize, IsArray, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateBlacklistedWords {
  @Field()
  @IsNotEmpty()
  guildId: string;

  @Field(() => [String])
  @IsArray()
  @ArrayMinSize(1)
  blacklistedWords: string[];
}
