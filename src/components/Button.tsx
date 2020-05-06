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
  /* color: ${({ theme }) => theme.colors.text.primary}; */
  /* background-color: ${({ theme }) => theme.colors.container.secondary}; */
  background-color: #aaa;
  color: black;

  font-weight: bold;

  cursor: pointer;
  border-radius: 5px;
  border: none;

  /* margin-top: ${({ theme }) => theme?.scaling(1)}px;
  margin-bottom: ${({ theme }) => theme?.scaling(1)}px;
 */
  padding-top: ${({ theme }) => theme?.scaling(1)}px;
  padding-bottom: ${({ theme }) => theme?.scaling(1)}px;
  padding-left: ${({ theme }) => theme?.scaling(2)}px;
  padding-right: ${({ theme }) => theme?.scaling(2)}px;

  transition: background-color 0.25s cubic-bezier(0.71, 0.24, 0.39, 0.83);

  &:hover {
    /* background-color: ${({ theme }) =>
      theme?.colors?.container?.secondary}; */
    background-color: #ccc;
  }
`;

const StyledOutlineButton = styled(StyledButton)`
  /* border: ${({ theme }) => theme?.borders[0]}; */
  /* background-color: transparent; */

  &:hover {
    /* color: ${({ theme }) => theme?.colors?.text?.tertiary};
    background-color: ${({ theme }) => theme?.colors?.container?.secondary}; */
  }
`;

interface ButtonProps {
  variant?: 'outline';
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
