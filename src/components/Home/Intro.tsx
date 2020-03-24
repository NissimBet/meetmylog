import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  min-height: 400px;
  padding: 50px 0;
  background-color: #ccc2;
`;

const Content = styled.div`
  max-width: 750px;
  width: 100%;
  padding: 0 10%;
`;

const Title = styled.h1`
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  font-size: 18px;

  margin: 5px;
`;

const StartButton = styled(Button)`
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
  padding: 10px;
`;

const HomeIntro: React.FunctionComponent = ({}) => {
  return (
    <Container>
      <Content>
        <Title>Bienvenido a Meet My Log</Title>
        <Paragraph>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Animi
          suscipit ut voluptatibus blanditiis voluptatem doloremque perferendis
          impedit. Voluptate, labore ullam?
        </Paragraph>
        <StartButton>Start</StartButton>
      </Content>
    </Container>
  );
};

export default HomeIntro;
