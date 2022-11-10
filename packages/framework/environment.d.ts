declare namespace NodeJS {
  export interface ProcessEnv {
    BOT_TOKEN: string
    LOG_LEVEL: 'DEBUG' | 'ALL' | 'WARN' | 'ERROR'

    LAVA_LINK_HOST?: string | undefined
    LAVA_LINK_PORT?: string | undefined
    LAVA_LINK_PASS?: string | undefined

    SPOTIFY_CLIENT_ID?: string | undefined
    SPOTIFY_CLIENT_SECRET?: string | undefined

    WS_URL?: string | undefined
    WEBSOCKET_TOKEN?: string | undefined
  }
}
