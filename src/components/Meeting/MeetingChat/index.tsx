import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import { BACKEND_URI } from '../../../utils/config';
import { useLoginContext } from '../../../hooks/login';

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

interface MeetingChatProps {
  className?: string;
  chat: Chat[];
  creator: MeetingCreator;
  meetingId: string;
  userToken: string;
  onChatSubmit: (arg0: Chat) => void;
}

const MeetingChat: React.FunctionComponent<MeetingChatProps> = ({
  className,
  chat,
  creator,
  meetingId,
  userToken,
  onChatSubmit,
}) => {
  const { userId } = useLoginContext();
  return (
    <MeetingChatContainer className={className}>
      <Container>
        <ChatContainer>
          {chat.map(data => (
            <Bubble
              {...data}
              key={data._id}
              self={data.from.userId === userId}
            />
          ))}
        </ChatContainer>
      </Container>
      <ChatInput
        handleSubmit={value => {
          axios
            .put(
              `${BACKEND_URI}/meeting/chat/${meetingId}`,
              {
                from: userId,
                message: value,
              },
              {
                headers: {
                  Authorization: `Bearer ${userToken}`,
                },
              }
            )
            .then(response => {
              onChatSubmit(response.data);
            })
            .catch(err => console.log(err));
        }}
      />
    </MeetingChatContainer>
  );
};

export default MeetingChat;
