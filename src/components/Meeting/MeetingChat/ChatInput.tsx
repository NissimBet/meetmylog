import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Formik } from 'formik';
import { NoStyledButton } from '../../Button';
import { object, string } from 'yup';

const Container = styled.div`
  box-shadow: 0px -2px 10px 6px #0002;
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

  min-height: 3em;
  max-height: 10em;

  overflow-y: auto;
  overflow-x: hidden;
  resize: none;

  /* margin: 20px 10px; */
  padding: 10px;
  border-radius: 10px;

  line-height: 1;
  /*   border: 1px solid black; */
  /* flex: 3; */
  width: 100%;

  transition: height 0.15s ease;
`;

const SendContainer = styled.div`
  flex: 1;

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
  const divRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  let prev = 0;
  return (
    <Formik
      initialValues={{ message: '' }}
      onSubmit={(values, actions) => {
        console.log(`se envio ${values.message}`);
        handleSubmitProp && handleSubmitProp(values.message);
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
                  // get current message
                  const content = values.message;
                  // so no error happens
                  if (divRef.current) {
                    // set text of invisible div
                    divRef.current!.innerHTML = content;
                    // display div and have it disappear
                    divRef.current!.style.visibility = 'hidden';
                    divRef.current!.style.display = 'block';

                    // set height of textarea
                    e.currentTarget.style.height =
                      divRef.current!.offsetHeight + 'px';
                    // disappear invisible div
                    divRef.current!.style.visibility = 'visible';
                    divRef.current!.style.display = 'none';
                    /* if (height !== divRef.current!.offsetHeight) {
                      setHeight(divRef.current!.offsetHeight);
                    } */
                    setHeight(divRef.current!.offsetHeight);
                  }
                  handleChange(e);
                }}
                onKeyDown={e => {
                  if (e.ctrlKey && e.keyCode === 13) {
                    submitForm();
                  }
                }}
              />
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
