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
            <Title>Anota todo</Title>
            <Paragraph>
              Inicia tus reuniones, anota lo importante, registra tus acuerdos y
              hazlo donde quieras.
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
            <Title>Colabora</Title>
            <Paragraph>
              Crea tus equipos de trabajo, agrégalos a tus reuniones, y
              contribuyan <strong>en tiempo real</strong> en el chat de la
              sesión.
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
            <Title>Accesa luego</Title>
            <Paragraph>
              Tus reuniones se quedarán registradas y podrás ver tus notas y los
              acuerdos de tus compañeros cuando quieras.
            </Paragraph>
          </Card>
        </CardContainer>
      </Container>

      <Team />
    </div>
  );
};

export default IndexPage;
