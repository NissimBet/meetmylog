import React from 'react';
import styled from 'styled-components';

const TestHello = styled.h1`
  color: blue;
  text-decoration: underline;
`;

const Hello: React.FunctionComponent = () => {
  return <TestHello>Que pex</TestHello>;
};

export default Hello;
