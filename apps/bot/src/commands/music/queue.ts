import { MessageEmbed } from 'discord.js';
import { ICommand } from '@quanty/framework';

export const command: ICommand = {
  name: 'queue',
  description: 'Shows the queue',
  options: [
    {
      type: 'INTEGER',
      name: 'pages',
      description: 'Sets page for queue',
      required: false,
    },
  ],
  category: 'music',
  run: async ({ client, options, guild, args }) => {
    const player = client.player.get(guild.id);

    if (!player) return { content: 'There is no queue.' };

    const queue = player.queue;

    const pageNumber = options?.getInteger('pages') ?? Number(args[0]);

    const multiple = 10;
    const page = pageNumber ? pageNumber : 1; // Default page is one if page number does not exist

    const end = page * multiple;
    const start = end - multiple;

    const tracks = queue.slice(start, end);

    const embed = new MessageEmbed().setAuthor(`Queue for ${guild.name}`);

    if (queue.current)
      embed.addField(
        'Current',
        `[${queue.current.title}](${queue.current.uri})`,
      );

    if (!tracks.length)
      embed.setDescription(
        `No tracks in ${page > 1 ? `page ${page}` : 'the queue'}.`,
      );
    else
      embed.setDescription(
        tracks
          .map((track, i) => `${start + ++i} - [${track.title}](${track.uri})`)
          .join('\n'),
      );

    if (queue.previous) {
      embed.addField(
        'Previous',
        `[${queue.previous.title}](${queue.previous.uri})`,
      );
    }

    const maxPages = Math.ceil(queue.length / multiple);
    if (maxPages !== 0)
      embed.setFooter(
        `Page ${page > maxPages ? maxPages : page} of ${maxPages}`,
      );

    return { embeds: [embed] };
  },
};
