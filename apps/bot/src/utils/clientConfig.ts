/* eslint-disable @typescript-eslint/no-unused-vars */
import { NodeOptions } from 'erela.js';
import { SpotifyOptions } from 'erela.js-spotify/dist/plugin';

/**
 * @type {SpotifyOptions}
 */
export const spotifyConfig: any = {
  clientID: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  // By default 0 will load all pages available
  playlistLimit: 1, // The amount of pages to load when a playlist is searched, Each page holds 100 tracks
  albumLimit: 1, // The amount of pages to load when a album is searched, Each page holds 50 tracks
};

/**
 * @type {NodeOptions}
 */
export const nodeConfig: any = {
  host: process.env.LAVA_LINK_HOST,
  port: Number(process.env.LAVA_LINK_PORT ?? 4000),
  password: process.env.LAVA_LINK_PASS,
};
