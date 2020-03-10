import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

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

  body, #__next {
    height: 100%;
    margin: 0;
  }

  h1, h2, h3,
  h4, h5, h6 {
    margin: 0;
  }
`;

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  height: 100%;
`;

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageLayout>
        <Navbar siteTitle="Meet my log" />
        <div
          style={{
            margin: '0 auto',
            maxWidth: 1200,
            padding: '1.0875rem 1.45rem',
          }}
        >
          {children}
        </div>
        <Footer />
      </PageLayout>
    </ThemeProvider>
  );
};

export default Layout;
