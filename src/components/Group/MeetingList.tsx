import React, { useState } from 'react';
import styled from 'styled-components';

const Tabs = styled.div`
  overflow: hidden;
  background: #fff;
  font-family: Open Sans;
  height: 3em;
`;

const Tab = styled.button<{ selected: boolean }>`
  border: none;
  outline: none;
  cursor: pointer;
  width: 40%;
  position: relative;

  margin-right: 0.1em;
  font-size: 1em;
  border: ${props => (props.selected ? "1px solid #ccc" : "")};
  border-bottom: ${props => (props.selected ? "none" : "")};
  background-color: ${props => (props.selected ? "white" : "lightgray")};
  height: ${props => (props.selected ? "3em" : "2.6em; top:.4em")};
  transition: background-color 0.5s ease-in-out;

  :hover {
    background-color: white;
  }
`;

const Content = styled.div<{ selected: boolean }>`
  ${props => (props.selected ? "" : "display:none")}
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr;

  margin: 20px 0;

  gap: 5px;
`;

const Meeting = styled.div<{ selected: boolean }>`
  padding: 10px;

  border: 2px solid transparent;

  &:hover {
    border-color: #000000;
    box-shadow: 0 0 6px 1px #000000;
    background-color: #7F7F7F;
    cursor:pointer;
    text-decoration: underline;
  }

  ${props =>
    props.selected &&
    `
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
    background-color: #7F7F7F
  `}
`;



interface MeetingListProps {
  meetings?: MeetingData[];
  handleSelect: (meeting: MeetingData) => void;
  className?: string;
  selected: string;
}

const MeetingList: React.FunctionComponent<MeetingListProps> = ({
  meetings = [],
  handleSelect,
  selected,
  className,
}) => {
  const [active, setActive] = useState(0);
  const handleClick = (e:any) => {
    const index = parseInt(e.target.id, 0);
    if (index !== active) {
      setActive(index);
    }
  };
  return (
    <div>
    <Tabs>
      <Tab onClick={handleClick} selected={active === 0} id='0'>
          Ongoing
      </Tab>
      <Tab onClick={handleClick} selected={active === 1} id='1'>
          Archived
      </Tab>
    </Tabs>
    <>
    <Content selected={active === 0}>
      <Container>
          {meetings.map(meeting => (
            (meeting.ongoing ? 
            <Meeting
              key={meeting.meetingId}
              selected={selected.includes(meeting.meetingId)}
              onClick={() => handleSelect(meeting)}
            >
              {meeting.meetingName}
            </Meeting> : false)
          ))}

          </Container>
    </Content>
    <Content selected={active === 1}>
      <Container>
          {meetings.map(meeting => (
            (meeting.ongoing ? false :
            <Meeting
              key={meeting.meetingId}
              selected={selected.includes(meeting.meetingId)}
              onClick={() => handleSelect(meeting)}
            >
              {meeting.meetingName}
            </Meeting>)
          ))}
        </Container>
    </Content>
    </>
    </div>
  );
};

export default MeetingList;
