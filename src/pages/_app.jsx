import React from 'react';
import NextApp from 'next/app';
import Head from 'next/head';

import PageLayout from '../components/layout';

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
        </Head>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </React.Fragment>
    );
  }
}

export default MyApp;
