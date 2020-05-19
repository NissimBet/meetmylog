import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NoStyledButton } from '../../Button';
import { object, string } from 'yup';
import { useTagContext } from '../../../hooks/chatTag';

const Container = styled.div`
  /* box-shadow: 0px -2px 10px 6px #0002; */
  background-color: ${({ theme }) => theme.colors.container.secondary};
  border-top: ${({ theme }) => theme.colors.container.primary} solid 1px;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 10px;

  position: relative;
`;

const Hidden = styled.div<{ open: boolean }>`
  position: absolute;
  width: 100%;
  max-height: 150px;
  left: 0;
  top: 0;
  background-color: white;
  transition: all 0.75s ease;
  transform: translate(0, ${({ open }) => (open ? '-100%' : '0%')});
  height: ${({ open }) => (open ? '200%' : '0')};
`;

const Tag = styled.p`
  padding: 10px;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const Textarea = styled.textarea`
  font-family: inherit;
  font-size: inherit;
  border: none;
  outline: none;

  overflow-y: auto;
  overflow-x: hidden;
  resize: none;

  border-radius: 10px;

  padding: 0.5em;
  min-height: 2em;
  line-height: 1em;
  max-height: 10em;

  width: 100%;

  transition: height 0.15s ease;
`;

const SendContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.container.primary};
  border-radius: 50%;

  width: 40px;
  height: 40px;
  position: relative;
`;

const Triangle = styled.div`
  height: 0;
  width: 0;
  position: relative;

  right: -2px;

  border-right: 0px solid transparent;
  border-bottom: 10px solid transparent;
  border-top: 10px solid transparent;
  border-left: 15px solid white;
`;

/**
 * Invisible div to use for height calculation
 */
const Clone = styled.div`
  display: none;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
  margin: 20px 10px;
  padding: 5px;
  border: none;
`;

// validar que el mensaje no este vacio
const MessageValidation = object().shape({
  message: string().required(),
});

interface ChatInputProps {
  className?: string;
  handleSubmit?: (arg0: string) => void;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = ({
  className,
  handleSubmit: handleSubmitProp,
}) => {
  // crear una referencia a un componente de react
  const divRef = useRef<HTMLDivElement>(null);
  // state para la altura del textarea
  const [height, setHeight] = useState(0);

  const [compMessage, setCompMessage] = useState('');

  const {
    tag,
    wasSet,
    consume: consumeTag,
    tagOptions,
    set: setTag,
  } = useTagContext();

  useEffect(() => {
    if (wasSet) {
      setCompMessage(compMessage + tag);
    }

    consumeTag();
  }, [wasSet]);

  console.log(tagOptions);

  return (
    <div style={{ position: 'relative' }}>
      <Hidden open={compMessage[compMessage.length - 1] === '@'}>
        {tagOptions
          .filter(name => name.startsWith(tag))
          .map(name => (
            <Tag onClick={() => setTag(name)}>{name}</Tag>
          ))}
      </Hidden>
      <Container className={className}>
        <div style={{ flex: 3 }}>
          <Textarea
            placeholder="Ingrese un mensaje"
            name="message"
            autoFocus
            value={compMessage}
            onChange={e => {
              // sacar el del mensaje
              const content = compMessage;
              // asegurar que no sea nulo
              if (divRef.current) {
                // pegarle el contenido al div invisible
                divRef.current!.innerHTML = content;
                // aparecer el clon, sin que se muestre
                divRef.current!.style.visibility = 'hidden';
                divRef.current!.style.display = 'block';

                // modificar la altura del textarea
                e.currentTarget.style.height =
                  divRef.current!.offsetHeight + 'px';
                // quitar el clon
                divRef.current!.style.visibility = 'visible';
                divRef.current!.style.display = 'none';

                // modificar la altura del textarea
                setHeight(divRef.current!.offsetHeight);
              }
              setCompMessage(e.target.value);
            }}
            onKeyDown={e => {
              // manejar teclas especificas

              // ctrl - enter
              if (e.ctrlKey && e.keyCode === 13) {
                handleSubmitProp(compMessage);
                setCompMessage('');
                // shift - enter
              } else if (e.shiftKey && e.keyCode === 13) {
                return;
                // enter
              } else if (e.keyCode === 13) {
                e.preventDefault();
                handleSubmitProp(compMessage);
                setCompMessage('');
              }
            }}
          />
          {/* Asignar la referencia al clon que no se muestra */}
          <Clone ref={divRef} />
        </div>

        <SendContainer>
          <NoStyledButton type="submit">
            <Circle>
              <Triangle />
            </Circle>
          </NoStyledButton>
        </SendContainer>
      </Container>
    </div>
  );
};

export default ChatInput;
