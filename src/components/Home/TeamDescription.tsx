import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: 20px 0;

  h3 {
    margin: 10px 0;
    line-height: 2;
    text-decoration: underline black;
  }

  p {
    margin: 5px 0;
  }
`;

const Team: React.FunctionComponent = () => {
  return (
    <Container>
      <h3>Quienes somos</h3>
      <p>
        Somos un grupo de estudiantes que Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Ipsa, consequatur!
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet corrupti
        tenetur facere aperiam nemo dolor!
      </p>
    </Container>
  );
};

export default Team;
