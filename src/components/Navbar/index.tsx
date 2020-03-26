import React from 'react';
import styled from 'styled-components';
import Button from './../Button';
import NavLink from './NavLink';
import { useRouter } from 'next/router';

const NavbarContainer = styled.div`
  padding: 20px 0px;

  box-shadow: 0 0 4px 2px #0003;
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
`;

interface NavbarProps {
  siteTitle: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ siteTitle }) => {
  const router = useRouter();

  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarLinks>
          <NavLink to="/">Inicio</NavLink>

          <NavLink to="/meeting/123">Meeting test page</NavLink>
        </NavbarLinks>

        <Button variant="outline">Login</Button>
        <NavLink to="/registro">Registrate</NavLink>
      </NavbarContent>
    </NavbarContainer>
  );
};

Navbar.defaultProps = {
  siteTitle: ``,
};

export default Navbar;
