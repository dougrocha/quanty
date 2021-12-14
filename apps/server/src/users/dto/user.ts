import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class UserObject {
  @Field()
  discordID: string;
  @Field()
  username: string;
  @Field()
  discriminator: string;
  @Field({ nullable: false })
  avatar?: string;
  @Field({ nullable: true })
  @IsEmail()
  email?: string;
  @Field({ nullable: true })
  verified?: boolean;
  @Field({ nullable: true })
  flags?: number;
  @Field({ nullable: true })
  locale?: string;
  // @Field({ name: 'access_token' })
  // accessToken: string;
  // @Field({ name: 'refresh_token' })
  // refreshToken: string;
}
