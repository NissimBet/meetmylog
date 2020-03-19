import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import MeetingPage from '../../src/components/Meeting';

const Meeting: NextPage = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Meeting X</title>
      </Head>
      <MeetingPage />
    </React.Fragment>
  );
};

export default Meeting;
