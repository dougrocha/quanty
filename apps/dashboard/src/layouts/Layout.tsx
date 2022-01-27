// Next.js && React
import { useContext } from 'react'
import styled from 'styled-components'

// Components
import LoadingLayout from './LoadingLayout'

import Footer from '../components/Footer'
import NavBar from '../components/Navbar'
import { useUserQuery } from '../graphql/graphql'
import { CurrentUserContext } from '../utils/stores/CurrentUserContext'
import { CurrentUser } from '../utils/types'

interface LayoutProps {
  children: React.ReactNode
  footer?: boolean
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: block;

  color: ${({ theme }) => theme.text.main};
`

const Children = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
`

const Layout = ({ children, footer }: LayoutProps) => {
  const { user, setUser } = useContext(CurrentUserContext)

  const { data, loading, error } = useUserQuery({
    fetchPolicy: 'cache-first',
    onCompleted({ user }: { user: CurrentUser }) {
      setUser(user)
    },
  })

  if (loading) {
    return <LoadingLayout />
  }

  if (footer == false) {
    return (
      <Container>
        <NavBar />
        <Children>{children}</Children>
      </Container>
    )
  }

  return (
    <Container>
      <NavBar />
      <Children>{children}</Children>
      <Footer />
    </Container>
  )
}

export default Layout
