import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const LinkStyle = styled(Link)(({ theme }) => ({
  color: theme.colors.text.secondary,
  textDecoration: 'none',
  '&:hover': {
    color: theme.colors.text.primary,
    textDecoration: `underline ${theme.colors.text.primary}`,
  },
}));

interface LinkProps {
  to: string;
}

const CustomLink: React.FunctionComponent<LinkProps> = ({ to, children }) => {
  return <LinkStyle to={to}>{children}</LinkStyle>;
};

export default CustomLink;
