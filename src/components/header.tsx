import React from 'react';
import { Box } from 'rebass';
import styled from 'styled-components';
import CustomLink from './Link';
import Button from './Button';

const HeaderContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.colors.container.primary,
  marginBottom: 2,
  padding: theme.scaling(3),
}));
HeaderContainer.defaultProps = {
  as: 'header',
};

interface HeaderProps {
  siteTitle: string;
}
const Header: React.FunctionComponent<HeaderProps> = ({ siteTitle }) => (
  <HeaderContainer>
    <h1>
      <CustomLink to="/">{siteTitle}</CustomLink>
    </h1>
    <Button>Login</Button>
  </HeaderContainer>
);

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
