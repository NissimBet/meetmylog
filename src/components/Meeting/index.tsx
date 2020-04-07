import React from 'react';
import styled from 'styled-components';

import MeetingChat from './MeetingChat';
import MeetingContent from './MeetingContent';

const MeetingPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 85vh;
`;

const MeetingContentContainer = styled(MeetingContent)`
  flex: 5;
  border: 1px solid black;
  height: 100%;
`;

const MeetingChatContainer = styled(MeetingChat)`
  flex: 2;
  border: 1px solid red;
  min-width: 400px;
  height: 100%;
`;

const MeetingPage: React.FunctionComponent = () => {
  return (
    <MeetingPageContainer>
      <MeetingChatContainer />
      <MeetingContentContainer />
    </MeetingPageContainer>
  );
};

export default MeetingPage;
