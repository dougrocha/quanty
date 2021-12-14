// Next.js && React
import { useContext } from 'react';
import dynamic from 'next/dynamic';

import styled from 'styled-components';

// Components
import NavBar from '../components/Navbar';
import Footer from '../components/Footer';

import { CurrentUserContext } from '../utils/stores/CurrentUserContext';
import { useUserQuery } from '../graphql/graphql';
import { CurrentUser } from '../utils/types';

import LoadingLayout from './LoadingLayout';

interface LayoutProps {
  children: React.ReactNode;
}

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: block;

  color: ${({ theme }) => theme.text.main};
`;

const Children = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const Layout = ({ children }: LayoutProps) => {
  const { user, setUser } = useContext(CurrentUserContext);

  const { data, loading, error } = useUserQuery({
    fetchPolicy: 'cache-first',
    onCompleted({ user }: { user: CurrentUser }) {
      setUser(user);
    },
  });

  if (loading) {
    return <LoadingLayout />;
  }

  return (
    <Container>
      <NavBar />
      <Children>{children}</Children>
      <Footer />
    </Container>
  );
};

export default Layout;
