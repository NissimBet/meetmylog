import React from 'react';
import styled from 'styled-components';

import CustomLink, { CustomLinkProps } from '../Link';

const NavbarLink = styled(CustomLink)`
  /* color: ${({ theme }) => theme?.colors?.neutral?.primary}; */
  font-weight: bold;

  margin: 5px 10px;

  &:hover {
    /* text-decoration-color: ${({ theme }) => theme?.colors?.text?.tertiary};
    color: ${({ theme }) => theme?.colors?.text?.secondary}; */
  }
`;

const NavLink: React.FunctionComponent<CustomLinkProps> = ({
  className,
  children,
  to,
}) => {
  return (
    <NavbarLink className={className} to={to}>
      {children}
    </NavbarLink>
  );
};

export default NavLink;
