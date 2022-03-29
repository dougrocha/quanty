import { type NodeOptions } from 'erela.js'
import { type SpotifyOptions } from 'erela.js-spotify/dist/plugin'

export const lavalinkNodes: NodeOptions = {
  host: process.env.LAVA_LINK_HOST ?? '',
  port: Number(process.env.LAVA_LINK_PORT),
  password: process.env.LAVA_LINK_PASS,
}

export const spotifyOptions: SpotifyOptions = {
  // By default 0 will load all pages available
  clientID: process.env.SPOTIFY_CLIENT_ID ?? '',
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET ?? '',
  playlistLimit: 1,
  albumLimit: 1,
}
