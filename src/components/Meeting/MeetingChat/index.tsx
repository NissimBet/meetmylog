import React from 'react';
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
  { text: 'Hi', author: 'Nissim', userId: 'NB' },
  { text: 'How are you', author: 'Nissim', userId: 'NB' },

  { text: 'How are you', author: 'Nissim', userId: 'NB' },
  { text: "I'm fine", author: 'Alex', userId: 'AL' },
  { text: 'Hi', author: 'Nissim', userId: 'NB' },

  { text: 'How are you', author: 'Nissim', userId: 'NB' },
  { text: "I'm fine", author: 'Alex', userId: 'AL' },
  { text: 'Hi', author: 'Nissim', userId: 'NB' },
  { text: 'How are you', author: 'Nissim', userId: 'NB' },
  { text: "I'm fine", author: 'Alex', userId: 'AL' },
  { text: 'Hi', author: 'Nissim', userId: 'NB' },
  { text: 'How are you', author: 'Nissim', userId: 'NB' },
];

interface MeetingChatProps {
  className?: string;
}

const MeetingChat: React.FunctionComponent<MeetingChatProps> = ({
  className,
}) => {
  return (
    <MeetingChatContainer className={className}>
      <Container>
        <ChatContainer>
          {chats.map(data => (
            <Bubble {...data} key={data.text} self={data.userId === 'NB'} />
          ))}
        </ChatContainer>
      </Container>
      <ChatInput />
    </MeetingChatContainer>
  );
};

export default MeetingChat;
