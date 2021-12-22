import { MessageEmbed } from 'discord.js';
import { checkChannel, ICommand } from '@quanty/framework';

export const command: ICommand = {
  name: 'loop',
  description: 'Loops the queue',
  options: [],
  category: 'music',
  run: async ({ client, member, guild }) => {
    const { content, player } = checkChannel({
      client,
      guild,
      member,
    });

    if (!player) {
      return {
        content,
      };
    }

    const embed = new MessageEmbed().setAuthor(`Queue for ${guild.name}`);

    if (player.queue.length == 0) {
      return { embeds: [embed.setDescription('Queue is empty')] };
    }

    if (player.queueRepeat) {
      embed.setDescription('Queue Loop is off');
      player.setQueueRepeat(false);
      return { embeds: [embed] };
    } else {
      embed.setDescription('Queue is Looped');
      player.setQueueRepeat(true);
      return { embeds: [embed] };
    }
  },
};
