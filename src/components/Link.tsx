import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  transition: color 0.25s cubic-bezier(0.23, 1, 0.32, 1),
    text-decoration 0.25s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.text.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

export interface CustomLinkProps {
  to: string;
}

const CustomLink: React.FunctionComponent<CustomLinkProps> = ({
  to,
  children,
}) => {
  return (
    <Link href={to} passHref>
      <StyledLink>{children}</StyledLink>
    </Link>
  );
};

export default CustomLink;
