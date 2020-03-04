import React from 'react';
import { Box, Flex } from 'rebass';
import styled from 'styled-components';
import Button from './../Button';
import NavLink from './NavLink';

const NavbarContainer = styled('div')(({ theme }) => ({
  color: theme.colors.text.secondary,
  backgroundColor: theme.colors.container.primary,

  marginBottom: theme.scaling(1),
  padding: theme.scaling(3),
}));

const NavbarContent = styled('div')({
  maxWidth: 1200,
  margin: 'auto',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

interface NavbarProps {
  siteTitle: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ siteTitle }) => (
  <NavbarContainer>
    <NavbarContent>
      <Flex width={2 / 5} justifyContent="space-evenly">
        <NavLink to="/">{siteTitle}</NavLink>

        <NavLink to="/">{siteTitle}</NavLink>

        <NavLink to="/">{siteTitle}</NavLink>
      </Flex>

      <Button variant="outline">Login</Button>
    </NavbarContent>
  </NavbarContainer>
);

Navbar.defaultProps = {
  siteTitle: ``,
};

export default Navbar;
