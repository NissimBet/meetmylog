import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  min-height: 100vh;
  padding: 50px 0;
  background-color: #ccc2;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Content = styled.div`
  margin: 30px auto;
  max-width: 575px;
  width: 100%;
`;

const Title = styled.h1`
  text-align: center;
  margin: 10px 0;
`;

const Paragraph = styled.p`
  font-size: 24px;
  text-align: center;
  margin: 5px;
`;

const HomeIntro: React.FunctionComponent = ({}) => {
  return (
    <Container>
      <Content>
        <Title>Bienvenido a Meet My Log</Title>
        <Paragraph>Este es un sitio</Paragraph>
      </Content>
      <Button>Start</Button>
    </Container>
  );
};

export default HomeIntro;
