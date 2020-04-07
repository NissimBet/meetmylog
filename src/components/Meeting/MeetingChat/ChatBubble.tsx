import React from 'react';
import styled from 'styled-components';

const Bubble = styled.div`
  border-radius: 10px;
  background-color: white;
  border: 1px solid #aaa;
  padding: 5px 15px;
  max-width: 75%;
`;

interface ChatBubbleProps extends Chat {
  className?: string;
}

const ChatBubble: React.FunctionComponent<ChatBubbleProps> = ({
  className,
  ...props
}) => {
  return (
    <Bubble className={className}>
      <p>{props.message}</p>
    </Bubble>
  );
};

export default ChatBubble;
