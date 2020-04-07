import React from 'react';
import styled from 'styled-components';

import MeetingChat from './MeetingChat';
import MeetingContent from './MeetingContent';

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

  min-width: 400px;
  height: 100%;
`;

const MeetingPage: React.FunctionComponent<MeetingData & {
  token: string;
}> = props => {
  const { chat, creator, meetingId, token } = props;
  return (
    <MeetingPageContainer>
      <MeetingChatContainer
        chat={chat}
        creator={creator}
        meetingId={meetingId}
        userToken={token}
      />
      <MeetingContentContainer />
    </MeetingPageContainer>
  );
};

export default MeetingPage;
