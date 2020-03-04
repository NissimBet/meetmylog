import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Box } from 'rebass';

import Navbar from './Navbar';
import Footer from './Footer';

import { theme } from '../utils/theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100vh;
    font-family: sans-serif;
  }

  body, #___next {
    height: 100%;
    margin: 0;
  }

  h1, h2, h3,
  h4, h5, h6 {
    margin: 0;
  }
`;

const PageLayout = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gridTemplateRows: 'auto 1fr auto',
  height: '100%',
});

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageLayout>
        <Navbar siteTitle="Meet my log" />
        <Box margin={'0 auto'} maxWidth={1200} padding="1.0875rem 1.45rem">
          {children}
        </Box>
        <Footer />
      </PageLayout>
    </ThemeProvider>
  );
};

export default Layout;
