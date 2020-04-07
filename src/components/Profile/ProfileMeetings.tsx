import React from 'react';
import styled from 'styled-components';

const MeetingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(100px, 1fr);
  gap: 20px;
`;

const MeetingCard = styled.div`
  background-color: #ccc;
`;

interface PersonalMeetingsProps {
  meetings: { meetingName: string; meetingId: string }[];
  className?: string;
}

const PersonalMeetings: React.FunctionComponent<PersonalMeetingsProps> = ({
  meetings,
  ...props
}) => {
  return (
    <MeetingContainer {...props}>
      {meetings.map(meeting => (
        <MeetingCard key={meeting.meetingId} />
      ))}
    </MeetingContainer>
  );
};

export default PersonalMeetings;
