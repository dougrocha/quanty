const VERCEL_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : ''

export const WEBAPP_URL =
  process.env.NEXT_PUBLIC_WEBAPP_URL || VERCEL_URL || 'http://localhost:3000'

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Quanty'

export const LOGO = {
  sm: '/images/quanty_sm.jpg' as const,
  md: '/images/quanty_md.jpg' as const,
  lg: '/images/quanty_lg.jpg' as const,
}

export const DISCORD_LOGO = '/images/discord_logo.png'
export const JOIN_DISCORD = 'https://quanty.xyz/discord'
export const INVITE_BOT = 'https://quanty.xyz/invite'
export const GITHUB = 'https://github.com/dougrocha/quanty'

export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
