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

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`;

const NavbarLinks = styled.div<{ position: 'left' | 'center' | 'right' }>`
  justify-self: ${({ position }) =>
    position === 'left'
      ? 'flex-start'
      : position === 'center'
      ? 'center'
      : 'flex-end'};
  display: flex;
  align-items: space-evenly;
`;

const TitleLink = styled(NavLink)`
  font-size: 24px;
`;

interface NavbarProps {
  siteTitle: string;
}

const Navbar: React.FunctionComponent<NavbarProps> = ({ siteTitle }) => {
  const { userId, logout } = useLoginContext();
  return (
    <NavbarContainer>
      <NavbarContent>
        <NavbarLinks position="left">
          <NavLink to="/meeting/new">Start a Meeting</NavLink>
          {userId && <NavLink to="/profile">My Profile</NavLink>}
          {userId && <NavLink to="/team/new">Create a Team</NavLink>}
        </NavbarLinks>
        <NavbarLinks position="center">
          <TitleLink to="/">{siteTitle}</TitleLink>
        </NavbarLinks>
        <NavbarLinks position="right">
          {userId ? (
            <Button variant="outline" onClick={logout}>
              Log Out
            </Button>
          ) : (
            <>
              <NavLink to="/registro">Sign Up</NavLink>
              <NavLink to="/login">Log In</NavLink>
            </>
          )}
        </NavbarLinks>
        {userId && (
          <Button variant="outline" onClick={logout}>
            Log Out
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
