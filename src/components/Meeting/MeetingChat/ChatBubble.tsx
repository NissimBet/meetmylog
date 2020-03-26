import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  border-radius: 10px;
  background-color: white;
  border: 1px solid #aaa;
  padding: 5px 15px;
  max-width: 75%;
`;

export interface ChatData {
  text: string;
  author: string;
  userId: string;
  id: string;
}

interface ChatBubbleProps extends ChatData {
  className?: string;
}

const ChatBubble: React.FunctionComponent<ChatBubbleProps> = ({
  className,
  text,
}) => {
  return (
    <Bubble className={className}>
      <p>{text}</p>
    </Bubble>
  );
};

export default ChatBubble;
