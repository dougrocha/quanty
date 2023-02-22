import { APIGuild } from 'discord-api-types/v10'

const getGuildIcon = (guild?: APIGuild) => {
  if (guild?.icon) {
    return `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`
  }
}

export default getGuildIcon
