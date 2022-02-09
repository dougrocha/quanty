import { IExtraClientArgs } from '@quanty/framework'

const extraPlugins: IExtraClientArgs = {
  spotifyPlugin: {
    // By default 0 will load all pages available
    clientID: process.env.SPOTIFY_CLIENT_ID ?? '',
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
    playlistLimit: 1,
    albumLimit: 1,
  },
  lavalink: {
    host: process.env.LAVA_LINK_HOST ?? '',
    port: Number(process.env.LAVA_LINK_PORT ?? 4000),
    password: process.env.LAVA_LINK_PASS,
  },
}

export { extraPlugins }
