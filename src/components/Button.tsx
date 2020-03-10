import React from 'react';
import styled from 'styled-components';

const StyledButton = styled('button')`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: bold;
  cursor: pointer;
  border-radius: 5;

  margin-top: ${({ theme }) => theme.scaling(1)}px;
  margin-bottom: ${({ theme }) => theme.scaling(1)}px;

  padding-top: ${({ theme }) => theme.scaling(1)}px;
  padding-bottom: ${({ theme }) => theme.scaling(1)}px;
  padding-left: ${({ theme }) => theme.scaling(2)}px;
  padding-right: ${({ theme }) => theme.scaling(2)}px;

  transition: background-color 0.25s cubic-bezier(0.71, 0.24, 0.39, 0.83);
`;

const StyledOutlineButton = styled(StyledButton)`
  border: ${({ theme }) => theme.borders[0]};
  background-color: transparent;

  &:hover {
    color: ${({ theme }) => theme.colors.text.secondary};
    background-color: ${({ theme }) => theme.colors.container.secondary + '50'};
  }
`;

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
