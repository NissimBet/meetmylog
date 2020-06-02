import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { NoStyledButton } from '../../Button';
import { object, string } from 'yup';
import { useTagContext } from '../../../hooks/chatTag';
import {useCommandContext} from '../../../hooks/chatCommand';

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
  height: ${({ open }) => (open ? '150%' : '0')};
  overflow:auto; 
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

interface message{
  command: string;
  message: string;
  tag: any;
}

interface ChatInputProps {
  className?: string;
  handleSubmit?: (arg0: message) => void;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = ({
  className,
  handleSubmit: handleSubmitProp,
}) => {
  // crear una referencia a un componente de react
  const divRef = useRef<HTMLDivElement>(null);
  // state para la altura del textarea
  const [height, setHeight] = useState(0);
  const [tagSet, settingTag] = useState<Boolean>(false);
  const [commSet, settingCommand] = useState<Boolean>(false);

  const [compMessage, setCompMessage] = useState<message>({command : '', message: '', tag: ''});

  const {
    command,
    wasSetC,
    consumeC: consumeCommand,
    commandOptions,
    setC: setCommand,
  } = useCommandContext();

  const {
    tag,
    wasSet,
    consume: consumeTag,
    tagOptions,
    set: setTag,
  } = useTagContext();

  useEffect(() => {
    if (wasSet) {
      setCompMessage(prevState => ({
        ...prevState,
        message: compMessage.message + (tagSet ? ' ' : tag.username),
        tag: tag
      }));
      settingTag(false);
      console.log(compMessage)
    }

    consumeTag();
  }, [wasSet]);

  useEffect(() => {
    if (wasSetC) {
      setCompMessage(prevState => ({
        ...prevState,
        message: compMessage.message + (commSet ? ' ' : command),
        command: command
      }));
      settingCommand(false);
      console.log(compMessage);
    }
    consumeCommand();
  }, [wasSetC]);

  return (
    <div style={{ position: 'relative' }}>
      <Hidden open={compMessage.message[compMessage.message.length - 1] === '@'}>
        {tagOptions
          .filter(name => name.username.startsWith(tag.username))
          .map(name => (
            <Tag onClick={() => setTag(name)}>{name.username}</Tag>
          ))}
      </Hidden>
      <Hidden open={compMessage.message[0] === '/' && compMessage.message.length === 1}>
        {commandOptions
          .filter(name => name.startsWith(command))
          .map(name => (
            <Tag onClick={() => setCommand(name)}>{name}</Tag>
          ))}
      </Hidden>
      <Container className={className}>
        <div style={{ flex: 3 }}>
          <Textarea
            placeholder="Ingrese un mensaje"
            name="message"
            autoFocus
            value={compMessage.message}
            onChange={e => {
              
              // sacar el del mensaje
              const content = compMessage;
              // asegurar que no sea nulo
              if (divRef.current) {
                // pegarle el contenido al div invisible
                divRef.current!.innerHTML = content.message;
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
              const mess = e.target.value;
              setCompMessage(prevState => ({
                ...prevState,
                message: mess
              }));
              if (compMessage.message[compMessage.message.length - 1] === '@'){
                  settingTag(true);
                  console.log(tagSet);
              }
              if (compMessage.message[0] === '/' && compMessage.message.length === 1){
                settingCommand(true);
              }
              if(!tagOptions.some(e => compMessage.message.includes('@'+e.username))){
                setCompMessage(prevState => ({
                  ...prevState,
                  tag: ''
                }));
              }
              if(!commandOptions.some(e => compMessage.message.includes('/'+e))){
                setCompMessage(prevState => ({
                  ...prevState,
                  command: ''
                }));
              }
              
            }}
            onKeyDown={e => {
              // manejar teclas especificas
              console.log(e.keyCode);
              // ctrl - enter
              if (e.ctrlKey && e.keyCode === 13 && compMessage.message.length) {
                handleSubmitProp(compMessage);
                setCompMessage(prevState => ({
                  ...prevState,
                  message: '',
                  tag: ''
                }));
                // shift - enter
              } else if (e.shiftKey && e.keyCode === 13) {
                return;
                // enter
              } else if (e.keyCode === 13 && compMessage.message.length) {
                e.preventDefault();
                console.log(compMessage);
                handleSubmitProp(compMessage);
                setCompMessage(prevState => ({
                  ...prevState,
                  message: '',
                  tag: ''
                }));
              }
              else if(e.keyCode === 32 && tagSet && compMessage.message.includes('@')){
                const ind = compMessage.message.indexOf('@');
                console.log(compMessage.message.substr(ind+1));
                for (const tag of tagOptions){
                  if(tag.username === compMessage.message.substr(ind+1)){
                    setTag(tag);
                    return;
                  }
                }
                settingTag(false);
              }
              else if(e.keyCode === 32 && commSet){
                for (const command of commandOptions){
                  if(command === compMessage.message.substr(1)){
                    setCommand(command);
                    return;
                  }
                }
                console.log("no command found");
                settingCommand(false);
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
