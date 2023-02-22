import { z } from 'zod'

// export const clientOptionsSchema = z.object({
//     owner: z.
// })

export const parseClientOptions = () => {
  const _clientEnv = clientOptionsSchema.safeParse(clientEnv)

  if (!_clientEnv.success) {
    console.error(
      '❌ Invalid environment variables:\n',
      //  TODO: Eventually format these errors
      _clientEnv.error.format(),
    )
    throw new Error('Invalid environment variables')
  }
}
