import { StaticLinks } from '../utils/staticLinks'

export const FetchUserIcon = (
  discordId: string,
  avatar: string | null | undefined,
) => {
  if (!avatar) return `${StaticLinks.DISCORD_CDN}/embed/avatars/0.png`

  return `${StaticLinks.DISCORD_CDN}/avatars/${discordId}/${avatar}.png?size=128`
}

export const FetchGuildIcon = (
  guildId: string,
  icon: string | null | undefined,
) => {
  if (!icon) return `${StaticLinks.DISCORD_CDN}/embed/avatars/0.png`

  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.jpg`
}
