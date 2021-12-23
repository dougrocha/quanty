import { GuildDocument } from 'src/schemas'
import * as Args from 'src/bot/dto/args'
import * as Inputs from 'src/bot/dto/input'

export interface IGuildConfigProvider {
  getGuild(GetGuildIdArgs: Args.GetGuildIdArgs): Promise<GuildDocument | null>

  updatePrefix(prefix: Inputs.UpdatePrefixInput): Promise<GuildDocument>
  updateBlacklistedWords(
    input: Inputs.UpdateBlacklistedWords,
  ): Promise<GuildDocument>

  updateAutoMod(input: Inputs.UpdateAutoModInput): Promise<GuildDocument>
  updateModerationPlugin(
    input: Inputs.UpdateModerationPlugin,
  ): Promise<GuildDocument>

  updateAnimeNSFW(input: Inputs.UpdateAnimeNsfw): Promise<GuildDocument>
  updateAnimePlugin(input: Inputs.UpdateAnimePlugin): Promise<GuildDocument>

  updateMusicImmortality(
    input: Inputs.UpdateMusicImmortality,
  ): Promise<GuildDocument>
  updateMusicPlugin(input: Inputs.UpdateMusicPlugin): Promise<GuildDocument>
  updateMusicChannel(input: Inputs.UpdateMusicChannel): Promise<GuildDocument>

  addCustomCommand(input: Inputs.AddCustomCommand): Promise<GuildDocument>
  addNewLog(input: Inputs.AddLog): Promise<GuildDocument>
}
