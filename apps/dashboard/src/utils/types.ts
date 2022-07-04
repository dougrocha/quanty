export interface CurrentUser {
  username: string
  id: string
  discriminator: string
  email?: string | null
  avatar?: string | null
  verified?: boolean | null
  locale?: string | null
}

export interface CurrentCustomer {
  id: string
}
