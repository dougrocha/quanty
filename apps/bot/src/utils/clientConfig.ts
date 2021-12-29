import { ISpotifyConfig, INodeConfig } from '@quanty/framework'

const spotifyConfig: ISpotifyConfig = {
  // By default 0 will load all pages available
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  playlistLimit: 1,
  albumLimit: 1,
}

const nodeConfig: INodeConfig = {
  host: process.env.LAVA_LINK_HOST,
  port: Number(process.env.LAVA_LINK_PORT ?? 4000),
  password: process.env.LAVA_LINK_PASS,
}

export { spotifyConfig, nodeConfig }
