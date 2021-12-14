import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMusicChannel {
  @Field()
  @IsNotEmpty()
  guildId: string;

  @Field()
  @IsNotEmpty()
  channel: string;
}
