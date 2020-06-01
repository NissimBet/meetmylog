import styled from 'styled-components';
import {ModalContent} from './ModalContent'
import {ModalBody} from './ModalBody'
import {ModalFooter} from './ModalFooter'
import {ModalHeader} from './ModalHeader'


const Modal =styled.div<{ display: string }>`
    ${props =>
        props.display &&
        `
        display: ${props.display};
    `}
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
`;
export { Modal, ModalContent, ModalFooter, ModalBody, ModalHeader };
