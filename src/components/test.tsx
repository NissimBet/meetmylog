import React from 'react';
import styled from 'styled-components';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';

import { Box, Flex, Button, Card, Image, Text, Link, Heading } from 'rebass';

import ImageTe from './image';

const TestHello = styled.h1`
  /*   color: blue; */
  /* color: ${props => props.theme.colorMain}; */
  text-decoration: underline;
  &:hover {
    color: red;
  }
`;

const MyBox = styled(Box)(({ theme }) => ({
  border: theme.borders[0],
  padding: '5px 0px',
}));

const Hello: React.FunctionComponent = () => {
  const images = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        childImageSharp {
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <MyBox>
      <Flex marginX="auto" justifyContent="center">
        <TestHello>Que pex</TestHello>
      </Flex>
      <Img fluid={images.placeholderImage.childImageSharp.fluid} />
      <ImageTe />
    </MyBox>
  );
};

export default Hello;
