import React from 'react';
import styled from 'styled-components';
import Button from '../Button';

const Container = styled.div`
  min-height: 500px;

  padding: 90px 0;
  background-color: #f8f8f8;

  background: url('https://images2.imgbox.com/ac/c0/ZibqJNBT_o.jpg')
    center/cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  max-width: 750px;
  width: 100%;
  padding: 0 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 36px;
  text-shadow: 0px 1px 1px #000;
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
        <Title>Meet your new culture</Title>
        <Paragraph>Don't miss an important meeting. Ever.</Paragraph>
        <StartButton>Create an account</StartButton>
      </Content>
    </Container>
  );
};

export default HomeIntro;
