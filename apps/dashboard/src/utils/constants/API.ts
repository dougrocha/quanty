export const StaticLinks = {
  GITHUB: 'https://github.com/slashtp3',
  QUANTYGIT: 'https://github.com/slashtp3/quanty',
  QUANTYAPP:
    process.env.NODE_ENV === 'production'
      ? 'https://quanty.xyz'
      : 'http://localhost:3000',
  QUANTY_SERVER_INVITE: 'https://discord.gg/Pgbran8GGH',
  QUANTY_BOT_INVITE:
    'https://discord.com/api/oauth2/authorize?client_id=824106276404854844&permissions=8&scope=bot%20applications.commands',
  DISCORD_CDN: 'https://cdn.discordapp.com',
  QUANTY_API:
    process.env.NODE_ENV === 'production'
      ? 'https://api.quanty.xyz/api'
      : 'http://localhost:3001',
}
