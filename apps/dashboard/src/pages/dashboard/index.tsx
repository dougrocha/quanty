// Layouts & CSS;
import { useContext } from 'react'

import GuildCards from '../../components/GuildCards'
import { useOwnerGuildsQuery, useUserQuery } from '../../graphql/graphql'
import Layout from '../../layouts/Layout'
import LoadingLayout from '../../layouts/LoadingLayout'
// GraphQL
import { CurrentUserContext } from '../../utils/stores/CurrentUserContext'

const Dashboard = () => {
  const { user, setUser } = useContext(CurrentUserContext)

  const { data, loading, error } = useOwnerGuildsQuery({})

  const userQuery = useUserQuery({
    fetchPolicy: 'cache-first',
    onCompleted({ user }) {
      setUser(user)
    },
  })

  if (loading || userQuery.loading) {
    return <LoadingLayout />
  }

  return (
    <>
      <Layout footer={false}>
        <h1>Dashboard</h1>
        {data ? (
          <GuildCards data={data} />
        ) : (
          //TODO Fix this so it looks nice
          <div>It appears youre not in any servers.</div>
        )}
      </Layout>
    </>
  )
}

export default Dashboard
