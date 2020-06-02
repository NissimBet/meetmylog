import React from 'react';
import styled from 'styled-components';

import MeetingChat from './MeetingChat';
import MeetingContent from './MeetingContent';
import MeetingSidebar from './MeetingSidebar';

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
