import React from 'react';
import styled from 'styled-components';

import MeetingChat from './MeetingChat';
import MeetingContent from './MeetingContent';
import MeetingSidebar from './MeetingSidebar';

import TagProvider from './../../hooks/chatTag';
import CommandProvider from './../../hooks/chatCommand';

const MeetingPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`;

const MeetingContentContainer = styled(MeetingContent)`
  flex: 5;

  height: 100%;
`;

const MeetingChatContainer = styled(MeetingChat)`
  flex: 2;
  background-color: #aaa;

  overflow: hidden;

  min-width: 500px;
  height: 100%;
`;

const MeetingSidebarContainer = styled(MeetingSidebar)`
  flex: 1;
  height: 100%;
  min-width: 250px;
`;

const MeetingPage: React.FunctionComponent<MeetingData & {
  token: string;
  onChatSubmit: (arg0: Chat) => void;
  closeMeeting: () => void;
  onCommandSubmit: (arg0: Responsabilities) => void;
  handleResponsabilityD: (id: string) => void;
}> = props => {
  const {
    chat,
    creator,
    meetingId,
    token,
    onChatSubmit,
    members,
    responsabilities,
    notes,
    closeMeeting,
    onCommandSubmit,
    handleResponsabilityD,
  } = props;
  console.log(responsabilities);
  return (
    <MeetingPageContainer>
      <TagProvider options={members}>
        <CommandProvider options={['resp']}>
          <MeetingChatContainer
            chat={chat}
            creator={creator}
            meetingId={meetingId}
            userToken={token}
            onChatSubmit={onChatSubmit}
            onCommandSubmit={onCommandSubmit}
          />
          <MeetingContentContainer
            userToken={token}
            meetingId={meetingId}
            notes={notes}
          />
          <MeetingSidebarContainer
            creator={creator}
            members={members}
            meetingId={meetingId}
            userToken={token}
            handleCloseMeeting={closeMeeting}
            respons={responsabilities}
            handleResponsabilityD={handleResponsabilityD}
          />
        </CommandProvider>
      </TagProvider>
    </MeetingPageContainer>
  );
};

export default MeetingPage;
