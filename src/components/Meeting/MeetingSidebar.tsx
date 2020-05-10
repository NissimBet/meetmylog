import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Popup from 'reactjs-popup';
import { useLoginContext } from '../../hooks/login';
import { useTagContext } from '../../hooks/chatTag';

const Container = styled.div`
  padding: 10px;

  ul {
    text-decoration: none;
  }

  li {
    list-style: none;
  }
`;

const MeeetingControls = styled.div`
  margin: 5px 0;
`;

const InteractionModal = styled.div`
  padding: 20px;

  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin: 10px 0px;

  & > button {
    margin: 5px 10px;
  }
`;

interface MeetingSidebarProps {
  members: Pick<UserData, 'username' | 'userId'>[];
  creator: MeetingCreator;
  handleCloseMeeting: () => void;
  createTag: (arg0: string) => void;
  className?: string;
}

const MeetingSidebar: React.FunctionComponent<MeetingSidebarProps> = ({
  members,
  creator,
  handleCloseMeeting,
  createTag,
  className,
}) => {
  const { userId } = useLoginContext();
  const { set: setTag } = useTagContext();

  return (
    <Container className={className}>
      {creator.userId === userId && (
        <MeeetingControls>
          <p>Controls</p>
          <Popup trigger={<Button>Close Meeting</Button>} modal>
            {close => (
              <InteractionModal>
                <h2>Are you sure you want to end the meeting?</h2>
                <ModalButtons>
                  <Button
                    onClick={() => {
                      close();
                      handleCloseMeeting();
                    }}
                  >
                    End
                  </Button>
                  <Button onClick={close}>Close</Button>
                </ModalButtons>
              </InteractionModal>
            )}
          </Popup>
        </MeeetingControls>
      )}
      <h3>Members of the meeting</h3>
      <ul>
        {members.map(member => (
          <li key={member.userId} onClick={() => setTag(member.username)}>
            {member.username}
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default MeetingSidebar;
