import { registerEnumType } from '@nestjs/graphql';

export enum CustomerScalarFieldEnum {
    id = "id",
    email = "email",
    subscriptionId = "subscriptionId",
    createdAt = "createdAt",
    userId = "userId"
}


registerEnumType(CustomerScalarFieldEnum, { name: 'CustomerScalarFieldEnum', description: undefined })
