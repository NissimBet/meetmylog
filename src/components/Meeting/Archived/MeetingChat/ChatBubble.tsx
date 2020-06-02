import React from 'react';
import styled from 'styled-components';

const Author = styled.p`
  font-weight: bold;
  font-size: 0.8em;
  text-decoration: underline;
  margin-bottom: 5px;
`;

const Bubble = styled.div<{ identifier: string }>`
  border-radius: 7.5px;
  background-color: ${({ theme }) => theme.colors.neutral.white};

  padding: 6px 7px 8px 9px;
  max-width: 75%;

  /* box-shadow: ${({ theme }) => theme.shadows[1]}; */

  /* Quitar el texto de la persona para cada mensaje seguido */
  &.${props => props.identifier} + &.${props => props.identifier} ${Author} {
    display: none;
  }
`;

interface ChatBubbleProps extends Chat {
  className?: string;
}

const ChatBubble: React.FunctionComponent<ChatBubbleProps> = ({
  className,
  ...props
}) => {
  return (
    <Bubble
      className={`${className} ${props.from.userId}`}
      identifier={props.from.userId}
    >
      <Author>{props.from.name}</Author>
      <p>{props.message}</p>
    </Bubble>
  );
};

export default ChatBubble;
