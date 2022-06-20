import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    username = "username",
    discriminator = "discriminator",
    email = "email",
    avatar = "avatar",
    createdAt = "createdAt",
    locale = "locale",
    accessToken = "accessToken",
    refreshToken = "refreshToken",
    acceptedTermsAndConditions = "acceptedTermsAndConditions"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
