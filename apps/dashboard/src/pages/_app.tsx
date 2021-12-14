// Imports
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../apollo.client';

import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { CurrentUserContextProvider } from '../utils/stores/CurrentUserContext';
import { DarkTheme, LightTheme } from '../utils/themes';

// Types
import { CurrentUser } from '../utils/types';
import { useRouter } from 'next/router';
import LoadingLayout from '../layouts/LoadingLayout';

const GlobalStyle = createGlobalStyle`
html,
body {
  height: 100%;
  background-color: ${({ theme }) => theme.base.background};
  margin: 0px auto;
  font-family: 'Open Sans', sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  text-rendering: optimizeLegibility; 
}

body::-webkit-scrollbar {
  width: 0.9rem;
}

body::-webkit-scrollbar-track {
  background: #1b1b24;
  border-radius: 1rem;
  box-shadow: inset 0 0 10px 10px #1e1e24;
  border: solid 3px transparent;
}

body::-webkit-scrollbar-thumb {
  border-radius: 1rem;
  box-shadow: inset 0 0 10px 10px #f0f0f0a6;
  border: solid 3px transparent;
}

#root {
  height: 100%;
  font-size: 16px;
  font-family: 'Overpass', 'Inter', sans-serif;
}
`;

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<CurrentUser>();
  const [theme, setTheme] = useState('light');
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);
  });

  const onSelectMode = (theme: any) => {
    setTheme(theme);
    if (theme === 'dark') document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  };

  useEffect(() => {
    // Add listener to update styles
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) =>
        onSelectMode(e.matches ? 'dark' : 'light')
      );

    // Setup dark/light mode for the first time
    onSelectMode(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    );

    // Remove listener
    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', () => {});
    };
  }, []);

  return (
    <>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme == 'light' ? LightTheme : DarkTheme}>
          <GlobalStyle />
          <CurrentUserContextProvider value={{ user, setUser }}>
            {pageLoading ? <LoadingLayout /> : <Component {...pageProps} />}
          </CurrentUserContextProvider>
        </ThemeProvider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
