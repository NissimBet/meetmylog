import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { NoStyledButton } from '../../Button';
import { object, string } from 'yup';

const Container = styled.div`
  /* box-shadow: 0px -2px 10px 6px #0002; */
  background-color: #999;
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 10px;
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

  background-color: #ccc;
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
  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, actions) => {
        // enviar mensaje a tarves de la funcion que se paso por prop
        handleSubmitProp && handleSubmitProp(values.message);
        // borrar datos del textarea
        actions.resetForm();
      }}
      validationSchema={MessageValidation}
    >
      {({ handleSubmit, values, handleChange, submitForm }) => (
        <form onSubmit={handleSubmit}>
          <Container className={className}>
            <div style={{ flex: 3 }}>
              <Textarea
                placeholder="Ingrese un mensaje"
                name="message"
                autoFocus
                value={values.message}
                onChange={e => {
                  // sacar el del mensaje
                  const content = values.message;
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
                  handleChange(e);
                }}
                onKeyDown={e => {
                  // manejar teclas especificas

                  // ctrl - enter
                  if (e.ctrlKey && e.keyCode === 13) {
                    submitForm();
                    // shift - enter
                  } else if (e.shiftKey && e.keyCode === 13) {
                    return;
                    // enter
                  } else if (e.keyCode === 13) {
                    e.preventDefault();
                    submitForm();
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
        </form>
      )}
    </Formik>
  );
};

export default ChatInput;
