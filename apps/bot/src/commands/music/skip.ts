import { MessageEmbed } from 'discord.js';
import { ICommand } from '@quanty/framework';

export const command: ICommand = {
  name: 'skip',
  description: 'Skips to next song',
  options: [
    {
      type: 'INTEGER',
      name: 'song',
      description: 'Skips to a specific song in the queue',
      required: false,
    },
  ],
  category: 'music',
  run: async ({ client, options, guild, member, args }) => {
    const skipToSong = options?.getInteger('song') ?? args[0];
    const player = client.player.get(guild.id);

    if (!player) return { content: 'Play a few songs first' };

    const current = player.queue.current?.title;

    const amount = Number(skipToSong);

    if (!amount) {
      return { content: 'Please type in a number.' };
    }

    const guildId = guild.id;
    const userId = member.user.id;

    if (amount) {
      if (Math.sign(amount) == (0 | -1))
        return {
          content: 'Please skip to a song in the queue.',
        };

      const guild = client.guilds.cache.get(guildId);
      const member = guild?.members.cache.get(userId);
      const channel = member?.voice.channel;

      if (!channel)
        return {
          content: 'Join Quanty in a voice channel to use this command.',
        };

      if (channel.id !== player.voiceChannel)
        return {
          content: 'You need to be in the same voice channel as Quanty.',
        };

      if (!player.queue.current)
        return {
          content: 'There is not song to skip.',
        };

      const embed = new MessageEmbed();

      player.stop(Number(amount));

      client.wait(500);

      embed.setTitle(`\`${amount - 1} songs were skipped.\``);

      return { embeds: [embed] };
    } else {
      player.stop();
      return { content: `${current} was skipped.` };
    }
  },
};
