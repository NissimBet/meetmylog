import React, { useState } from 'react';
import styled from 'styled-components';

import ChatInput from './ChatInput';
import ChatBubble, { ChatData as _ChatData } from './ChatBubble';
export type ChatData = _ChatData;

const MeetingChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: safe flex-end;
  width: 100%;
  padding: 0 15px;
`;

const Bubble = styled(ChatBubble)<{ self: boolean }>`
  align-self: ${({ self }) => (self ? 'flex-end' : 'flex-start')};
`;

const chats: Array<ChatData> = [
  { id: '1', text: 'Hi', author: 'Nissim', userId: 'NB' },
  { id: '2', text: 'How are you', author: 'Nissim', userId: 'NB' },

  { id: '3', text: 'How are you', author: 'Nissim', userId: 'NB' },
  { id: '5', text: "I'm fine", author: 'Alex', userId: 'AL' },
  { id: '4', text: 'Hi', author: 'Nissim', userId: 'NB' },

  { id: '6', text: 'How are you', author: 'Nissim', userId: 'NB' },
  { id: '7', text: "I'm fine", author: 'Alex', userId: 'AL' },
  { id: '8', text: 'Hi', author: 'Nissim', userId: 'NB' },
  { id: '9', text: 'How are you', author: 'Nissim', userId: 'NB' },
  { id: '10', text: "I'm fine", author: 'Alex', userId: 'AL' },
  { id: '11', text: 'Hi', author: 'Nissim', userId: 'NB' },
  { id: '12', text: 'How are you', author: 'Nissim', userId: 'NB' },
];

interface MeetingChatProps {
  className?: string;
}

const MeetingChat: React.FunctionComponent<MeetingChatProps> = ({
  className,
}) => {
  const [messages, setMessages] = useState<ChatData[]>(chats);
  return (
    <MeetingChatContainer className={className}>
      <Container>
        <ChatContainer>
          {messages.map(data => (
            <Bubble {...data} key={data.id} self={data.userId === 'NB'} />
          ))}
        </ChatContainer>
      </Container>
      <ChatInput
        handleSubmit={value =>
          setMessages([
            ...messages,
            {
              author: 'Nissim',
              id: String(+messages[messages.length - 1].id + 1),
              text: value,
              userId: 'NB',
            },
          ])
        }
      />
    </MeetingChatContainer>
  );
};

export default MeetingChat;
