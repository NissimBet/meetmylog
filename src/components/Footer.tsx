import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'rebass';

import Link from './Link';

const FooterContainer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.colors.container.secondary,
  width: '100%',

  color: theme.colors.text.primary,
}));

const FooterContent = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: '1fr',
  gridTemplateColumns: '1fr 2fr',
  columnGap: theme.scaling(3),

  padding: theme.scaling(2),
  paddingBottom: theme.scaling(3),
  maxWidth: 1200,
  margin: '0 auto',
}));

const SiteLinks = styled(Flex)(({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',

  '& > *': {
    width: '30%',
    textAlign: 'center',
    marginTop: theme.scaling(1),
  },
}));

const CustomLink = styled(Link)(({ theme }) => ({
  //color: theme.colors.text.secondary,
  '&:hover': {
    color: theme.colors.text.tertiary,
  },
}));

const Footer: React.FunctionComponent = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <SiteLinks>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Login</CustomLink>
          <CustomLink to="/">Register</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
          <CustomLink to="/">Hello</CustomLink>
        </SiteLinks>
        <Box>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            perspiciatis in nemo ipsam? Est, quibusdam.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugit
            perspiciatis in nemo ipsam? Est, quibusdam.
          </p>
        </Box>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
