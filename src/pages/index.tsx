import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Index: NextPage = () => {
  return (
    <h1>
      {useRouter().pathname} {useRouter().route}
    </h1>
  );
};

export default Index;
