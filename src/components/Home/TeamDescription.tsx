import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* margin: 20px 0; */
  background: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 40px 30px;
  min-height: 400px;

  h3 {
    margin-bottom: 25px;
    font-size: 20px;
  }

  p {
    margin: 10px 0;
    line-height: 1.5;
  }
`;

const Wrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Team: React.FunctionComponent = () => {
  return (
    <Container>
      <Wrapper>
        <h3>About Us</h3>
        <p>
          AP4 is a startup focused on coming up with new productivity solutions
          for knowledge workers. <strong>Meet my log</strong> is one of the
          initiatives looking to digitalize corporate work culture, making
          collaboration easier than ever.
        </p>
        <p>
          Meet My Log is an open-source app. You can open a pull request on{' '}
          <a href="https://github.com/NissimBet/meetmylog" target="_blank">
            Github
          </a>
          , and help us reimagine the project management experience in your
          company, and the world! We'll keep on working to make your lives
          easier.
        </p>
      </Wrapper>
    </Container>
  );
};

export default Team;
