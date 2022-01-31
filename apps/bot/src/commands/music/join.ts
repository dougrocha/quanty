import { Command, createPlayer } from '@quanty/framework'

export const command: Command = {
  name: `join`,
  description: 'Joins the channel.',
  category: 'music',
  cmdType: 'both',
  run: async ({ guild, member, client, channel }) => {
    const currGuild = client.guilds.cache.get(guild.id)
    const currMember = currGuild?.members.cache.get(member.user.id)
    const voiceChannelId = currMember?.voice.channel?.id

    if (!voiceChannelId) return { content: 'You need to join a voice channel.' }

    const channelId = channel.id
    const guildId = guild.id

    createPlayer({ client, guildId, channelId, voiceChannelId })
  },
}
