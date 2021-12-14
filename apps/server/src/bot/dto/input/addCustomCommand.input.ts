import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
class CustomCommand {
  @Field()
  @IsString()
  id: string;
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsString()
  description: string;
}

@InputType()
export class AddCustomCommand {
  @Field()
  @IsString()
  @IsNotEmpty()
  guildId: string;

  @Field(() => CustomCommand)
  @IsNotEmpty()
  customCommand: CustomCommand;
}
