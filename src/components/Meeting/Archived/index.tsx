import React from 'react';
import styled from 'styled-components';

import MeetingChat from './MeetingChat';
import MeetingContent from './MeetingContent';
import MeetingSidebar from './MeetingSidebar';

const MeetingPageContainer = styled.div`
  display: grid;
  grid-template-rows: 90% auto;
  grid-template-columns: auto 28% 30% 10%;
  gap: 70% 100px;
`;

const MeetingContentContainer = styled(MeetingContent)`
  grid-column-start: 2;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;

  height: 100%;
`;

const MeetingChatContainer = styled(MeetingChat)`
  grid-column-start: 1;
  grid-column-end: 2;
  background-color: #aaa;
  grid-row-start: 1;
  grid-row-end: 3;
  min-width: 500px;
  margin-left: -200px;
  overflow: auto;

  height: 100%;
`;

const MeetingSidebarContainer = styled(MeetingSidebar)`
  grid-column-start: 3;
  grid-column-end: 4;
  height: 100%;
  min-width: 250px;
`;

const MeetingPage: React.FunctionComponent<MeetingData & {
  token: string;
}> = props => {
  const {
    chat,
    creator,
    meetingId,
    token,
    members,
    notes,
    responsabilities,
  } = props;
  console.log(responsabilities);
  return (
    <MeetingPageContainer>
      <MeetingChatContainer
        chat={chat}
        creator={creator}
        meetingId={meetingId}
        userToken={token}
      />
      <MeetingContentContainer notes={notes} />
      <MeetingSidebarContainer
        creator={creator}
        members={members}
        meetingId={meetingId}
        userToken={token}
        respons={responsabilities}
      />
    </MeetingPageContainer>
  );
};

export default MeetingPage;
