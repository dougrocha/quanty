import { registerEnumType } from '@nestjs/graphql'

export enum Product_tier {
  FREE = 'FREE',
  QUANTUM = 'QUANTUM',
}

registerEnumType(Product_tier, { name: 'Product_tier', description: undefined })
