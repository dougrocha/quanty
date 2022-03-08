import { setMetaData } from '../util/setMetaData'

/* Sets commands use to guild only */
export function GuildOnly(): ClassDecorator {
  return setMetaData('guildOnly', true)
}

/* Sets commands use for guild owners only */
export function OwnerOnly(): ClassDecorator {
  return setMetaData('guildOnly', true)
}

/* Sets commands use to NSFW chats only */
export function NSFWOnly(): ClassDecorator {
  return setMetaData('guildOnly', true)
}
