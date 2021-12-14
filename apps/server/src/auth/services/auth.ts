import { UserDetails } from 'src/common/types';
import { UserDocument } from 'src/schemas';

export interface IAuthenticationProvider {
  validateUser(user: UserDetails): Promise<UserDocument>;
  createUser(user: UserDetails): Promise<UserDocument>;
  findUser(discordID: string);
}
