import React from 'react';
import styled from 'styled-components';

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
`;

interface NavbarProps {
  siteTitle: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ siteTitle }) => {
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarLinks>
          <NavLink to="/">{siteTitle}</NavLink>
          <NavLink to="/meeting/ongoing/123">Meeting test page</NavLink>
          <NavLink to="/meeting/new">Meeting creation page</NavLink>
          <NavLink to="/profile">Profile Page</NavLink>
        </NavbarLinks>
        <NavbarLinks>
          <NavLink to="/registro">Registrate</NavLink>
          <NavLink to="/login">Inicia Sesión</NavLink>
        </NavbarLinks>
      </NavbarContent>
    </NavbarContainer>
  );
};

Navbar.defaultProps = {
  siteTitle: ``,
};

export default Navbar;
