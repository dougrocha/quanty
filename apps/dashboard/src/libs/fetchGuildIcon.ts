export const FetchGuildIcon = (
  guildId: string,
  icon: string | null | undefined,
) => {
  if (!icon) return '/basic_discord_logo.png'

  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.jpg`
}
