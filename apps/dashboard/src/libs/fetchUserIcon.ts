export const FetchUserIcon = (
  discordId: string,
  avatar: string | null | undefined,
) => {
  if (!avatar) return '/basic_discord_logo.png'

  return `${process.env.NEXT_PUBLIC_DISCORD_CDN}/avatars/${discordId}/${avatar}.png?size=128`
}
