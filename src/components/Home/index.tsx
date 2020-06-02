import React from 'react';
import { NextPage } from 'next';
import HomeIntro from './Intro';
import Image from '../image';
import Team from './TeamDescription';

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 250px;
  background-color: #ccc2;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 22%;
  height: 200px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin: 10px;
`;

const Title = styled.h1`
  font-size: 1.3em;
  padding-top: 10px;
  padding-bottom: 20px;
  // margin-block-start: 1em;
  // margin-block-end: 1em;
  // margin-inline-start: 0px;
  // margin-inline-end: 0px;
`;

const Paragraph = styled.p`
  font-size: 14px;
`;

const IndexPage: NextPage = () => {
  return (
    <div>
      <HomeIntro />

      {/* imagen de uso soon */}
      <Container>
        <CardContainer>
          <Card>
            <img
              src={
                'https://assets.website-files.com/5b9041fb091628c1f868ff07/5b9421a139ac89aa649dc123_home-icon1.png'
              }
              height={'20px'}
              width={'20px'}
            />
            <Title>Track everything</Title>
            <Paragraph>
              With <strong>Meet My Log</strong> you can start a new meeting,
              take note of what's important, and highlight team's agreements.
              Anywhere.
            </Paragraph>
          </Card>
          <Card>
            <img
              src={
                'https://assets.website-files.com/5b9041fb091628c1f868ff07/5b9421a1e63359d6ee0231b9_home-icon2.png'
              }
              height={'20px'}
              width={'20px'}
            />
            <Title>Collaborate</Title>
            <Paragraph>
              Create your team, add members to your meetings, and contribute{' '}
              <strong>in real time</strong> using the session's chat
              functionality.
            </Paragraph>
          </Card>
          <Card>
            <img
              src={
                'https://assets.website-files.com/5b9041fb091628c1f868ff07/5b9421a27572f53c1b387d56_home-icon4.png'
              }
              height={'20px'}
              width={'20px'}
            />
            <Title>Read Later</Title>
            <Paragraph>
              Your meetings will stay on our servers so you can access your
              notes and your team's agreements, any time you want.
            </Paragraph>
          </Card>
        </CardContainer>
      </Container>

      <Team />
    </div>
  );
};

export default IndexPage;
