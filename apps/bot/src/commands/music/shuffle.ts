import { MessageEmbed } from 'discord.js';
import { ICommand } from '../../../quanty/types';

export const command: ICommand = {
  name: 'shuffle',
  description: 'Shuffles the current queue',
  options: [],
  category: 'music',
  run: async ({ client, guild }) => {
    const player = client.player.get(guild.id);

    const embed = new MessageEmbed().setColor('#FF5F9F');

    if (!player)
      return {
        embeds: [embed.setDescription('Invite Quanty to shuffle your music.')],
      };

    if (!player.queue)
      return {
        embeds: [embed.setDescription('The queue is empty.')],
      };

    embed.setDescription('Shuffled Queue!');

    player.queue.shuffle();

    return { embeds: [embed] };
  },
};
