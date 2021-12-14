import { OwnerGuildsQuery } from '../../graphql/graphql';
import GuildCard from './GuildCard/GuildCard';
import { GuildCardsContainer } from './GuildCards.styled';

const GuildCards = ({ data }: { data: OwnerGuildsQuery }) => {
  return (
    <GuildCardsContainer>
      {data.ownerGuilds.map((guild) => {
        return <GuildCard key={guild.id} guild={guild}></GuildCard>;
      })}
    </GuildCardsContainer>
  );
};

export default GuildCards;
