import React from 'react';
import styled from 'styled-components';

export const NoStyledButton = styled.button`
  background-color: transparent;
  color: black;

  cursor: pointer;
  border: none;
  outline: none;
`;

const StyledButton = styled('button')`
  color: ${({ theme }) => theme.colors.text.secondary};
  background-color: ${({ theme }) => theme.colors.container.primary};

  font-weight: bold;

  cursor: pointer;
  border-radius: 5px;
  border: none;

  margin-top: ${({ theme }) => theme?.scaling(1)}px;
  margin-bottom: ${({ theme }) => theme?.scaling(1)}px;

  padding-top: ${({ theme }) => theme?.scaling(1)}px;
  padding-bottom: ${({ theme }) => theme?.scaling(1)}px;
  padding-left: ${({ theme }) => theme?.scaling(2)}px;
  padding-right: ${({ theme }) => theme?.scaling(2)}px;

  transition: background-color 0.25s cubic-bezier(0.71, 0.24, 0.39, 0.83);

  &:hover {
    background-color: ${({ theme }) => theme?.colors?.container?.secondary};
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`;

const StyledOutlineButton = styled(StyledButton)`
  border: ${({ theme }) => theme?.borders[0]};
  background-color: transparent;

  &:hover {
    color: ${({ theme }) => theme?.colors?.text?.tertiary};
    background-color: ${({ theme }) => theme?.colors?.container?.secondary};
  }
`;

const StyledRoundButton = styled(StyledButton)`
  position: relative;
  height: 35px;
  width: 35px;
  border-radius: 50%;
`;
1;

interface ButtonProps {
  variant?: 'outline' | 'round';
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
}

const Button: React.FunctionComponent<ButtonProps> = React.forwardRef(
  (
    { children, variant, className, onClick, ...props },
    ref: React.RefObject<HTMLButtonElement>
  ) => {
    if (variant === 'outline') {
      return (
        <StyledOutlineButton
          ref={ref}
          className={className}
          onClick={onClick}
          {...props}
        >
          {children}
        </StyledOutlineButton>
      );
    } else if (variant === 'round') {
      return (
        <StyledRoundButton
          ref={ref}
          className={className}
          onClick={onClick}
          {...props}
        >
          {children}
        </StyledRoundButton>
      );
    }
    return (
      <StyledButton
        ref={ref}
        className={className}
        onClick={onClick}
        {...props}
      >
        {children}
      </StyledButton>
    );
  }
);

export default Button;
// export default React.forwardRef((props, ref) => (
//   <Button {...props} ref={ref} />
// ));
