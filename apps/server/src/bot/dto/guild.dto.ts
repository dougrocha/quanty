import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

class Music {
  @IsBoolean()
  plugin?: boolean

  @IsBoolean()
  immortal?: boolean

  @IsString()
  channel?: string
}

class Anime {
  @IsBoolean()
  plugin?: boolean

  @IsBoolean()
  nsfw?: boolean
}

class CustomCommand {
  @IsString()
  id?: string

  @IsString()
  name?: string

  @IsString()
  description?: string
}

class Log {
  @IsString()
  name?: string

  @IsString()
  action?: string

  updatedAt?: Date
}

export class GuildDto {
  @IsNotEmpty()
  guildId: string

  @IsString()
  prefix?: string

  music?: Music

  anime?: Anime

  customCommands?: CustomCommand[]

  @IsBoolean()
  premium?: boolean

  logs?: Log[]

  blacklistedWords: string[]
}
