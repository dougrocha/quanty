import Image from "next/image";
import Link from "next/link";
import { OwnerGuildsQuery } from "../../../graphql/graphql";
import {
  GuildBackground,
  GuildCardWrapper,
  GuildTag,
} from "./GuildCard.styled";

type OwnerGuildsType = OwnerGuildsQuery["ownerGuilds"][0];

const GuildCard = ({ guild }: { guild: OwnerGuildsType }) => {
  return (
    <GuildCardWrapper>
      <GuildBackground>
        {guild.icon ? (
          <Image
            src={`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png`}
            alt={`${guild.name}'s guild icon`}
            layout="fill"
            priority
            objectFit="cover"
          />
        ) : (
          <div>RANDOMCOLOR</div>
        )}
      </GuildBackground>
      <GuildTag>
        <div className="tag">{guild.name}</div>
        <Link
          href={{
            pathname: `/dashboard/[guildId]`,
            query: { guildId: guild.id },
          }}
          passHref
          prefetch={false}
        >
          <a>
            <button>Edit Settings</button>
          </a>
        </Link>
      </GuildTag>
    </GuildCardWrapper>
  );
};

export default GuildCard;
