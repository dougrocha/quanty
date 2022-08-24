export const FetchGuildIcon = (
  guildId: string,
  icon: string | null | undefined,
) => {
  if (!icon) return '/basic_discord_logo.png'

  return `${process.env.NEXT_PUBLIC_DISCORD_CDN}/icons/${guildId}/${icon}.jpg`
}
