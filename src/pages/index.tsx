import React from 'react';
import { NextPage } from 'next';
import IndexPage from '../components/Home';
import Head from 'next/head';


const Index: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Log Your Meetings</title>
      </Head>
      <IndexPage />
    </React.Fragment>
  );
};

export default Index;
