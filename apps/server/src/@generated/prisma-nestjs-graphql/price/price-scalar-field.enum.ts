import { registerEnumType } from '@nestjs/graphql';

export enum PriceScalarFieldEnum {
    id = "id",
    recurringInterval = "recurringInterval",
    unit_amount = "unit_amount",
    currency = "currency",
    productId = "productId"
}


registerEnumType(PriceScalarFieldEnum, { name: 'PriceScalarFieldEnum', description: undefined })
