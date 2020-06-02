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
        <h3>Quienes Somos</h3>
        <p>
          AP4 es una startup dedicada a proveer soluciones de productividad en
          la industria del conocimiento. <strong>Meet my log</strong> es una de
          las iniciativas que buscan digitalizar el entorno laboral corporativo,
          haciendo más sencilla la colaboración presencial o a distancia.
        </p>
        <p>
          Meetmylog es una aplicación de código abierto en la que puedes
          colaborar en{' '}
          <a href="https://github.com/NissimBet/meetmylog" target="_blank">
            Github
          </a>
          , hacer una pull request y ayudar a reimaginar la experiencia con
          minutas y reuniones en tu compañía.
        </p>
      </Wrapper>
    </Container>
  );
};

export default Team;
