// Imports
// Next imports
import Image from 'next/image'
// Types
import { CurrentUser } from '../utils/types'

export const ProfileImg = (user: CurrentUser) => {
  const iconNullCheck = (id: string, icon: string) => {
    if (icon === null) {
      return `https://cdn.discordapp.com/embed/avatars/0.png`
    }
    return `https://cdn.discordapp.com/avatars/${id}/${icon}.png`
  }
  return (
    <Image
      src={iconNullCheck(user.discordID, user.avatar)}
      priority
      layout="fill"
      alt="userImage"
    />
  )
}
