import React from 'react';
import styled from 'styled-components';

import CustomLink, { CustomLinkProps } from '../Link';

const NavbarLink = styled(CustomLink)`
  color: ${({ theme }) => theme.colors.neutral.primary};

  &:hover {
    text-decoration-color: ${({ theme }) => theme.colors.text.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const NavLink: React.FunctionComponent<CustomLinkProps> = ({
  children,
  to,
}) => {
  return <NavbarLink to={to}>{children}</NavbarLink>;
};

export default NavLink;
