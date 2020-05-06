import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import MeetingChat from './MeetingChat';
import MeetingContent from './MeetingContent';
import MeetingSidebar from './MeetingSidebar';
import { BACKEND_URI } from '../../utils/config';

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
}> = props => {
  const {
    chat,
    creator,
    meetingId,
    token,
    onChatSubmit,
    members,
    closeMeeting,
  } = props;

  return (
    <MeetingPageContainer>
      <MeetingChatContainer
        chat={chat}
        creator={creator}
        meetingId={meetingId}
        userToken={token}
        onChatSubmit={onChatSubmit}
      />
      <MeetingContentContainer />
      <MeetingSidebarContainer
        creator={creator}
        members={members}
        handleCloseMeeting={closeMeeting}
      />
    </MeetingPageContainer>
  );
};

export default MeetingPage;
