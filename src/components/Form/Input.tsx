import styled from 'styled-components';

export const Input = styled.input`
  /* border: 1px solid #ccc; */
  border: 1px solid
    ${({ theme }) => theme?.colors?.container?.primary ?? 'transparent'};

  &:focus {
    border: 1px solid
      ${({ theme }) => theme?.colors?.container?.contrast ?? 'transparent'};
  }
  padding: 10px 15px;

  font-size: 1em;
`;
