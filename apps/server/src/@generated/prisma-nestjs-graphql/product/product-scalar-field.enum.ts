import { registerEnumType } from '@nestjs/graphql'

export enum ProductScalarFieldEnum {
  id = 'id',
  name = 'name',
  description = 'description',
}

registerEnumType(ProductScalarFieldEnum, {
  name: 'ProductScalarFieldEnum',
  description: undefined,
})
