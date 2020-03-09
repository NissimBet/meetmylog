import React from 'react';
import { useRouter } from 'next/router';

export default () => {
  const router = useRouter();
  return (
    <div>
      <h1>{router.route}</h1>
      <h1>{router.pathname}</h1>
      <h1>{router.asPath}</h1>
      <h1>hi</h1>
    </div>
  );
};
