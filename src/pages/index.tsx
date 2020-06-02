import React from 'react';
import { NextPage } from 'next';
import IndexPage from '../components/Home';
import Head from 'next/head';

const Index: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Meet My Log: Registra Tus Reuniones</title>
      </Head>
      <IndexPage />
    </React.Fragment>
  );
};

export default Index;
