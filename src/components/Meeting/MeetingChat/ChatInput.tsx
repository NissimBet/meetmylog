import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid green;
`;

interface ChatInputProps {
  className?: string;
}

const ChatInput: React.FunctionComponent<ChatInputProps> = ({ className }) => {
  return (
    <Container className={className}>
      <h1>Input</h1>
    </Container>
  );
};

export default ChatInput;
