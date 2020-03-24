import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  /* margin: 20px 0; */
  background: #ccc2;

  padding: 40px 30px;
  min-height: 400px;

  h3 {
    margin-bottom: 10px;
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
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque omnis
        similique, repellat ipsum reprehenderit vel illum alias. Odio
        voluptatibus tenetur a autem distinctio beatae expedita alias? Quasi
        facilis optio quidem?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugit, dolores
        quam eaque in consectetur sequi officia voluptate? Laudantium distinctio
        aut quis, incidunt nam iste laboriosam? Accusamus sint quos laborum
        necessitatibus. Nesciunt modi ipsum est quidem tenetur, assumenda sunt
        itaque iure fuga hic sed aperiam et quo explicabo veritatis esse omnis.
      </p>
    </Container>
  );
};

export default Team;
