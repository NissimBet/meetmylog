import React from 'react';
import NextApp from 'next/app';

import PageLayout from '../components/Layout';

class MyApp extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <React.Fragment>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </React.Fragment>
    );
  }
}

export default MyApp;
