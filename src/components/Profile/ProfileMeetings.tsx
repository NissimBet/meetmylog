import React from 'react';
import styled from 'styled-components';
import CustomLink from '../Link';

const MeetingContainer = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  grid-auto-rows: minmax(100px, 1fr);
  gap: 20px;
`;

const MeetingCard = styled.div`
  background-color: #ccc;
  height: 100%;
`;

interface PersonalMeetingsProps {
  meetings: MeetingData[];
  cols?: number;
  className?: string;
}

const PersonalMeetings: React.FunctionComponent<PersonalMeetingsProps> = ({
  meetings,
  cols = 5,
  ...props
}) => {
  return (
    <MeetingContainer cols={cols} {...props}>
      {meetings.map(meeting => (
        <CustomLink
          to={`/meeting/ongoing/${meeting.meetingId}`}
          key={meeting.meetingId}
        >
          <MeetingCard />
        </CustomLink>
      ))}
    </MeetingContainer>
  );
};

export default PersonalMeetings;
