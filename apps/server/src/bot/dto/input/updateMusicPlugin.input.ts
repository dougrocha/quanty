import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateMusicPlugin {
  @Field()
  @IsNotEmpty()
  guildId: string;

  @Field()
  @IsNotEmpty()
  plugin: boolean;
}
