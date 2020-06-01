import styled from 'styled-components';

export const ModalFooter =styled.div<{ color: string }>`
    ${props =>
    props.color &&
    `
    background: ${props.color};
  `}
    padding: 10px;
    color: #fff;
    text-align: center;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
`;