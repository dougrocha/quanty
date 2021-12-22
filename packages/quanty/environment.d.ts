declare namespace NodeJS {
  export interface ProcessEnv {
    TOKEN?: string;
    MONGOURI?: string;
    WS_URL?: string;

    LAVA_LINK_HOST?: string;
    LAVA_LINK_PORT?: string;
    LAVA_LINK_PASS?: string;

    SPOTIFY_CLIENT_ID?: string;
    SPOTIFY_CLIENT_SECRET?: string;
  }
}
