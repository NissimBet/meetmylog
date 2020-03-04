import React from 'react';
import CustomLink, { CustomLinkProps } from '../Link';
import styled from 'styled-components';

const NavbarLink = styled(CustomLink)(({ theme }) => ({
  color: theme.colors.neutral.primary,
  '&:hover': {
    textDecorationColor: theme.colors.text.secondary,
  },
  '&.active-link': {
    color: theme.colors.text.secondary,
    '&:hover': {
      color: theme.colors.text.secondary,
    },
  },
}));

const NavLink: React.FunctionComponent<CustomLinkProps> = ({
  children,
  to,
}) => {
  return (
    <NavbarLink activeClassName="active-link" to={to}>
      {children}
    </NavbarLink>
  );
};

export default NavLink;
