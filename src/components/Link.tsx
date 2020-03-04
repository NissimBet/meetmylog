import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.colors.text.primary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.colors.text.secondary,
    textDecoration: `underline ${theme.colors.text.primary}`,
  },
}));

export interface CustomLinkProps {
  to: string;
}

export const CustomLink: React.FunctionComponent<CustomLinkProps> = ({
  to,
  children,
}) => {
  return <LinkStyle to={to}>{children}</LinkStyle>;
};

export default LinkStyle;
