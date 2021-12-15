import { NextPage } from "next";
import { OwnerGuildsQuery } from "../../graphql/graphql";
import GuildCard from "./GuildCard/GuildCard";
import { GuildCardsContainer } from "./GuildCards.styled";

type PropsType = {
  data: OwnerGuildsQuery;
};

const GuildCards: NextPage<PropsType> = ({ data }) => {
  return (
    <GuildCardsContainer>
      {data.ownerGuilds.map((guild) => {
        return <GuildCard key={guild.id} guild={guild}></GuildCard>;
      })}
    </GuildCardsContainer>
  );
};

export default GuildCards;
