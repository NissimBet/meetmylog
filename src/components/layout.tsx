import React from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { useRouter } from 'next/router';

import Navbar from './Navbar';
import Footer from './Footer';

import { theme } from '../utils/theme';
import LoginProvider from './../hooks/login';

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
  grid-template-rows: auto auto minmax(500px, 100vh);
  min-height: 100%;
  height: 100%;
`;

const MeetingPageContent = styled.div`
  width: 100%;
  height: 100%;
`;

const PageContent = styled.div`
  padding: 00px 0px;
  margin: 0px auto;

  width: 100%;
`;
// le he cambiado el max-width (era   max-width: 1200px;) para que me deje poner las fotos a full width
// el padding era padding: 10px 20px;

const PageTitle = styled.div`
  background-color: ${({ theme }) => theme.colors.neutral.grey};
  color: ${({ theme }) => theme.colors.text.tertiary};
  // padding: ${({ theme }) => theme.scaling(2)}px;
  padding: 2px;
  text-align: center;
  text-transform: capitalize;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Layout: React.FunctionComponent = ({ children }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <LoginProvider>
        <GlobalStyle />
        <PageLayout>
          <Navbar siteTitle="meetmylog" />
          <PageTitle>
            <h2>{router.route.split('/')[1] ?? ''}</h2>
          </PageTitle>
          {router.route.match(/\/meeting\/ongoing\/./) ? (
            <MeetingPageContent>{children}</MeetingPageContent>
          ) : (
            <PageContent>{children}</PageContent>
          )}
        </PageLayout>
      </LoginProvider>
    </ThemeProvider>
  );
};

export default Layout;
