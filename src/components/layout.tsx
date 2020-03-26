import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

import Navbar from './Navbar';
import Footer from './Footer';

import { theme } from '../utils/theme';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
  }

  html {
    height: 100vh;
    font-family: sans-serif;
  }

  body, #__next {
    height: 100%;
    margin: 0;
  }

`;

const PageLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100%;

  /* background-color: #ccc2; */
  /* background-color: ${({ theme }) => theme.colors.container.secondary}; */
`;

const PageContent = styled.div`
  padding: 10px 20px;
  margin: 20px auto;
  max-width: 1200px;
  width: 100%;
  /* background-color: white; */

  /* border: 1px solid #ccc; */
`;

const Layout: React.FunctionComponent = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <PageLayout>
        <Navbar siteTitle="Meet my log" />
        <PageContent>{children}</PageContent>
        <Footer />
      </PageLayout>
    </ThemeProvider>
  );
};

export default Layout;
