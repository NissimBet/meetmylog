import React from 'react';
import styled from 'styled-components';

const StyledButton = styled('button')(({ theme }) => ({
  color: theme.colors.text.primary,
  fontWeight: 'bold',
  cursor: 'pointer',
  borderRadius: 5,

  marginTop: theme.scaling(1),
  marginBottom: theme.scaling(1),

  paddingTop: theme.scaling(1),
  paddingBottom: theme.scaling(1),
  paddingLeft: theme.scaling(2),
  paddingRight: theme.scaling(2),

  transition: 'background-color 0.25s cubic-bezier(.71,.24,.39,.83)',
}));

const StyledOutlineButton = styled(StyledButton)(({ theme }) => ({
  border: theme.borders[0],
  backgroundColor: 'transparent',

  '&:hover': {
    color: theme.colors.text.secondary,
    backgroundColor: theme.colors.container.secondary + '50',
  },
}));

interface ButtonProps {
  variant?: 'outline';
}

const Button: React.FunctionComponent<ButtonProps> = ({
  children,
  variant,
}) => {
  if (variant === 'outline') {
    return <StyledOutlineButton>{children}</StyledOutlineButton>;
  }

  return <StyledButton>{children}</StyledButton>;
};

export default Button;
