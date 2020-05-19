import React from 'react';
import styled from 'styled-components';

import NavLink from './NavLink';
import { useLoginContext } from '../../hooks/login';
import Button from '../Button';

const NavbarContainer = styled.div`
  padding: ${({ theme }) => theme.scaling(2)}px 0px;

  display: flex;
  align-items: center;
`;

const NavbarContent = styled.div`
  max-width: 1200px;
  width: 100%;

  margin: auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarLinks = styled.div`
  display: flex;
  align-items: space-evenly;
`;

const TitleLink = styled(NavLink)`
  font-size: 28px;
`;

interface NavbarProps {
  siteTitle: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ siteTitle }) => {
  const { userId, logout } = useLoginContext();
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarLinks>
          <NavLink to="/meeting/new">Start a Meeting</NavLink>
          {userId && <NavLink to="/profile">Profile Page</NavLink>}
        </NavbarLinks>
        <NavbarLinks>
          <TitleLink to="/">{siteTitle}</TitleLink>
        </NavbarLinks>
        <NavbarLinks>
          {!userId && (
            <>
              <NavLink to="/registro">Registrate</NavLink>
              <NavLink to="/login">Inicia Sesión</NavLink>
            </>
          )}
        </NavbarLinks>
        {userId && (
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        )}
      </NavbarContent>
    </NavbarContainer>
  );
};

Navbar.defaultProps = {
  siteTitle: ``,
};

export default Navbar;
