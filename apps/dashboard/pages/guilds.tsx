// Layouts & CSS;
import Layout from '../layouts/Layout';

// GraphQL
import { useOwnerGuildsQuery } from '../graphql/graphql';

const GuildPage = () => {
  const { data, loading, error } = useOwnerGuildsQuery({});

  return (
    <>
      <Layout>
        <h1>Guild Page</h1>
        {data?.ownerGuilds.map((guild) => {
          return <div key={guild.id}>{guild.id} </div>;
        })}
      </Layout>
    </>
  );
};

export default GuildPage;
