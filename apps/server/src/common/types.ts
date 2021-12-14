import { User } from 'src/schemas';

export type UserDetails = {
  username: string;
  discriminator: string;
  discordID: string;
  avatar: string;
  accessToken: string;
  refreshToken: string;
};

export type Done = (err: Error, user: User) => void;
