import React from 'react';
import { NextPage } from 'next';
import HomeIntro from './Intro';
import Image from '../image';
import Team from './TeamDescription';

const IndexPage: NextPage = () => {
  return (
    <div>
      <HomeIntro />

      <div
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: '#ccc2',
          margin: '20px 0',
        }}
      >
        <Image src="" alt="" />
      </div>

      <Team />
    </div>
  );
};

export default IndexPage;
