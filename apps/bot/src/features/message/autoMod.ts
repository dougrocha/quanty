import { FeatureBuilder, Guild } from '@quanty/framework';

export const feature: FeatureBuilder<'messageCreate'> = {
  name: 'messageCreate',
  run: async (client, message) => {
    const guildPlugins = await Guild.findOne({
      guildId: message.guild?.id,
    });

    const autoMod = guildPlugins?.moderation.autoMod;

    if (!autoMod) {
      return;
    }

    if (message.author.bot || !message.guild)
      // If message is from bot or in a dm
      return;
    // if message content is larger than limit
    if (message.content.length > 300) {
      await message.reply({
        content: 'Please do not send super long messages.',
      });
      message.delete();
      return;
    }

    if (
      message.mentions.users.size > 2 &&
      !message.member?.permissions.has('ADMINISTRATOR')
    ) {
      await message.reply('You cannot spam mentions.');
      message.delete();
      return;
    }

    const lineArray = message.content.match(/\n/g) ?? '';

    if (lineArray?.length >= 4) {
      await message.reply('You cannot send messages');
      message.delete();
      return;
    }

    const blacklistedWords = ['fuck', 'bitch'];

    for (let i = 0; i < blacklistedWords.length; i++) {
      const msg = message?.content?.toLowerCase().includes(blacklistedWords[i]);

      if (msg) {
        await message.reply('You cannot send messages');
        message.delete();

        return;
      }
    }
  },
};
