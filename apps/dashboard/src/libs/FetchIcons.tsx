export const FetchUserIcon = (
  discordId: string,
  avatar: string | null | undefined,
) => {
  if (!avatar)
    return `${process.env.NEXT_PUBLIC_DISCORD_CDN}/embed/avatars/0.png`

  return `${process.env.NEXT_PUBLIC_DISCORD_CDN}/avatars/${discordId}/${avatar}.png?size=128`
}

export const FetchGuildIcon = (
  guildId: string,
  icon: string | null | undefined,
) => {
  if (!icon) return `${process.env.NEXT_PUBLIC_DISCORD_CDN}/embed/avatars/0.png`

  return `${process.env.NEXT_PUBLIC_DISCORD_CDN}/icons/${guildId}/${icon}.jpg`
}
