import { StaticLinks } from '../utils/staticLinks'

export const CheckNullProfileImg = (discordID: string, avatar: string) => {
  if (avatar === null) {
    return `${StaticLinks.DISCORD_CDN}/embed/avatars/0.png`
  }

  return `${StaticLinks.DISCORD_CDN}/avatars/${discordID}/${avatar}.png?size=128`
}
