import React from 'react';
import styled from 'styled-components';
import Button from './../Button';
import NavLink from './NavLink';

const NavbarContainer = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.container.primary};
  margin-bottom: ${({ theme }) => theme.scaling(1)}px;
  padding: ${({ theme }) => theme.scaling(1)}px;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: space-evenly;
  width: 40%;

  & > * {
    margin: 5px 10px;
  }
`;

interface NavbarProps {
  siteTitle: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ siteTitle }) => (
  <NavbarContainer>
    <NavbarContent>
      <NavbarLinks>
        <NavLink to="/">Inicio</NavLink>

        <NavLink to="/">{siteTitle}</NavLink>
      </NavbarLinks>

      <Button variant="outline">Login</Button>
    </NavbarContent>
  </NavbarContainer>
);

Navbar.defaultProps = {
  siteTitle: ``,
};

export default Navbar;
