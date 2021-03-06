import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  transition: color 0.25s cubic-bezier(0.23, 1, 0.32, 1),
    text-decoration 0.25s cubic-bezier(0.23, 1, 0.32, 1);

  &:hover {
    text-decoration: underline ${({ theme }) => theme.colors.text.tertiary};
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

export interface CustomLinkProps {
  to: string;
  className?: string;
}

const CustomLink: React.FunctionComponent<CustomLinkProps> = ({
  to,
  children,
  className,
}) => {
  return (
    <Link href={to} passHref>
      <StyledLink className={className}>{children}</StyledLink>
    </Link>
  );
};

export default CustomLink;
