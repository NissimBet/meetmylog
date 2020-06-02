import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ChatInput from './ChatInput';
import ChatBubble from './ChatBubble';
import { BACKEND_URI } from '../../../utils/config';
import { useLoginContext } from '../../../hooks/login';
import { useTagContext } from '../../../hooks/chatTag';
import { REPLCommand } from 'repl';

const MeetingChatContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  overflow: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.container.secondary};
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: safe flex-end;
  width: 100%;
  padding: 15px 15px 30px 15px;
`;

const Bubble = styled(ChatBubble)<{ self: boolean }>`
  align-self: ${({ self }) => (self ? 'flex-end' : 'flex-start')};

  ${props => props.self && `& p:nth-child(1) {display: none;}`}
`;

interface MeetingChatProps {
  className?: string;
  chat: Chat[];
  creator: MeetingCreator;
  meetingId: string;
  userToken: string;
  onChatSubmit: (arg0: Chat) => void;
  onCommandSubmit: (arg0: Responsabilities) => void;
}

interface message {
  command: string;
  message: string;
  tag: any;
}

const MeetingChat: React.FunctionComponent<MeetingChatProps> = ({
  className,
  chat,
  creator,
  meetingId,
  userToken,
  onChatSubmit,
  onCommandSubmit,
}) => {
  const { userId } = useLoginContext();
  const container = useRef<HTMLDivElement>();

  const submitInput = (value: message) => {
    if (value.command.includes('resp') && creator.userId == userId) {
      value.message = value.message.slice(5);
      const cut = value.tag.username.includes('@')
        ? value.tag.username.length + 2
        : value.tag.username.length + 3;
      value.message = value.message.slice(cut);
      console.log(value.message);
      axios
        .put(
          `${BACKEND_URI}/meeting/responsability/${meetingId}`,
          {
            userId: value.tag._id,
            responsability: value.message,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(response => {
          onCommandSubmit(response.data);
        })
        .catch(err => console.log(err));
    } else if (value.command.includes('resp') && creator.userId != userId) {
    } else {
      axios
        .put(
          `${BACKEND_URI}/meeting/chat/${meetingId}`,
          {
            from: userId,
            message: value.message,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then(response => {
          onChatSubmit(response.data);
          container.current.scrollTop = container?.current?.scrollHeight;
        })
        .catch(err => console.log(err));
    }
  };

  useEffect(() => {
    if (container && container.current)
      container.current.scrollTop = container?.current?.scrollHeight;
  }, [container]);
  return (
    <MeetingChatContainer className={className}>
      <Container ref={container}>
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
      <ChatInput handleSubmit={submitInput} />
    </MeetingChatContainer>
  );
};

export default MeetingChat;
