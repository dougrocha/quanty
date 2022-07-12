import { StaticLinks } from '../utils/constants/API'

export const CheckNullProfileImg = (
  discordID: string,
  avatar?: string | null,
) => {
  if (!avatar) {
    return `${StaticLinks.DISCORD_CDN}/embed/avatars/0.png`
  }

  return `${StaticLinks.DISCORD_CDN}/avatars/${discordID}/${avatar}.png?size=128`
}
