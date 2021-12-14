import { OwnerGuildsQuery } from '../../../graphql/graphql';
import { GuildCardWrapper } from './GuildCard.styled';

type OwnerGuildsType = OwnerGuildsQuery['ownerGuilds'][0];

const GuildCard = ({ guild }: { guild: OwnerGuildsType }) => {
  return <GuildCardWrapper className="guildCard">{guild.id}</GuildCardWrapper>;
};

export default GuildCard;
