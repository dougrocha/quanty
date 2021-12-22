import { ICommand, GuildSettingsEnum } from '@quanty/framework';
import { MessageEmbed } from 'discord.js';

export const command: ICommand = {
  name: 'plugins',
  description: 'Shows the commands available in this server.',
  options: [
    {
      type: 'STRING',
      name: 'add-ons',
      description: 'Shows specific commands for this add-on.',
      required: false,
    },
  ],
  category: 'util',
  userPermissions: ['ADMINISTRATOR'],
  slash: 'both',
  run: async ({ client, guild, options, args }) => {
    const plugin =
      options?.getString('add-ons')?.toLowerCase() ?? args[0].toLowerCase();

    const serverPlugins = await client.PluginManager.getGuild(guild.id);

    const embed = new MessageEmbed().setColor('RANDOM');

    if (!serverPlugins) {
      await client.PluginManager.createGuild(guild.id);
    }

    if (!plugin && !Object.values<string>(GuildSettingsEnum).includes(plugin)) {
      return {
        embeds: [
          embed.setDescription(
            '``Choose one of the following plugins:`` \n Anime, Moderation, Music',
          ),
        ],
      };
    }

    switch (plugin) {
      case 'music':
        const res = await client.PluginManager.getGuildSetting({
          guildId: guild.id,
          setting: 'MUSIC',
        });
        embed.setTitle('Music Settings');
        embed.addFields(
          {
            name: 'Plugin',
            value: `\`\`${
              `${res.plugin || false}`.charAt(0).toUpperCase() +
              `${res.plugin || false}`.slice(1)
            }\`\``,
          },
          {
            name: 'Immortality',
            value: `\`\`${
              `${res.immortal || false}`.charAt(0).toUpperCase() +
              `${res.immortal || false}`.slice(1)
            }\`\``,
          },
          {
            name: 'Channel',
            value: `\`\`${
              guild.channels.cache.get(res.musicChannel ?? '')?.name ||
              'Any Room'
            }\`\``,
          },
        );
        break;

      default:
        return {
          embeds: [
            embed.setDescription(
              `Currently being worked on. Here is your response: `,
            ),
          ],
        };
    }

    return {
      embeds: [embed],
    };
  },
};

// Allow user to enables certain commands.
// Make feature to remove and add those commands to specific server.
