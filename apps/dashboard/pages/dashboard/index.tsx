// Layouts & CSS;
import Layout from '../../layouts/Layout';
import LoadingLayout from '../../layouts/LoadingLayout';

// GraphQL
import { useOwnerGuildsQuery, useUserQuery } from '../../graphql/graphql';

import { useContext } from 'react';
import { CurrentUserContext } from '../../utils/stores/CurrentUserContext';
import { CurrentUser } from '../../utils/types';

import GuildCards from '../../components/GuildCards';

const Dashboard = () => {
  const { user, setUser } = useContext(CurrentUserContext);

  const { data, loading, error } = useOwnerGuildsQuery({});

  const userQuery = useUserQuery({
    fetchPolicy: 'cache-first',
    onCompleted({ user }: { user: CurrentUser }) {
      setUser(user);
    },
  });

  if (loading || userQuery.loading) {
    return <LoadingLayout />;
  }

  return (
    <>
      <Layout>
        <h1>Dashboard</h1>
        {data ? (
          <GuildCards data={data} />
        ) : (
          //TODO Fix this so it looks nice
          <div>It appears youre not in any servers.</div>
        )}
      </Layout>
    </>
  );
};

export default Dashboard;
