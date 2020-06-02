import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatBubble from './ChatBubble';
import { useLoginContext } from '../../../../hooks/login';
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
}) => {
  const { userId } = useLoginContext();
  const container = useRef<HTMLDivElement>();

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
    </MeetingChatContainer>
  );
};

export default MeetingChat;
