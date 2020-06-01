import styled from 'styled-components';


const ModalHead = styled.div<{ color: string, fontC?: string }>`
    ${props =>
    props.color &&
    `
    background: ${props.color};
    color: ${props.fontC || '#fff'};
    `}
    padding: 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
`;

const Close = styled.span<{ fontC?: string }>`
    ${props =>
    `
        color: ${props.fontC || '#fff'};
    `}
    float: right;
    font-size: 30px;

    &:hover,&:focus {
        color: ${ props => (props.fontC ? `#808080` : '#000')};
        text-decoration: none;
        cursor: pointer;
    }
`;

interface ModalHeaderComponentProps {
    title: string;
    color: string;
    handleSelect: () => void;
    fontC?: string;
  }
export const ModalHeader: React.FunctionComponent<ModalHeaderComponentProps> = ({
    title,
    color,
    handleSelect,
    fontC,
  }) => (
    (fontC ?
    <ModalHead color={color} fontC={fontC}>
        <Close fontC={'#000'} onClick={() => handleSelect()}>
            &times;
        </Close>
        <h2>{title}</h2>
    </ModalHead> :
    <ModalHead color={color}>
        <Close onClick={() => handleSelect()}>
            &times;
        </Close>
        <h2>{title}</h2>
    </ModalHead> )
  );