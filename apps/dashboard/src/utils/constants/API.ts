export const QUANTY_API =
  process.env.NODE_ENV == 'production'
    ? 'https://quanty.xyz/api'
    : 'http://localhost:3001'
