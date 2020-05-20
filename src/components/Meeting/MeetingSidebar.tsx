import React from 'react';
import styled from 'styled-components';
import Button, { NoStyledButton } from '../Button';
import Popup from 'reactjs-popup';
import { useLoginContext } from '../../hooks/login';
import { useTagContext } from '../../hooks/chatTag';

const Container = styled.div`
  padding: 10px;
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

const MembersList = styled.ul`
  text-decoration: none;
  padding: 0;

  li {
    font-size: 18px;
    padding: 5px 10px;
    list-style: none;

    button:hover {
      text-decoration: underline black;
    }
  }
`;

interface MeetingSidebarProps {
  members: Pick<UserData, 'username' | 'userId'>[];
  creator: MeetingCreator;
  handleCloseMeeting: () => void;
  className?: string;
}

const MeetingSidebar: React.FunctionComponent<MeetingSidebarProps> = ({
  members,
  creator,
  handleCloseMeeting,
  className,
}) => {
  const { userId } = useLoginContext();
  const { set: setTag } = useTagContext();

  return (
    <Container className={className}>
      {creator.userId === userId && (
        <MeeetingControls>
          <p>Controls</p>
          <Popup
            trigger={<Button variant="warning">Close Meeting</Button>}
            modal
          >
            {close => (
              <InteractionModal>
                <h2>Are you sure you want to end the meeting?</h2>
                <p>
                  This action is <b>not</b> undoable
                </p>
                <p>
                  This action will close the meeting for editing, processing the
                  meeting to be exported and printed / downloaded
                </p>
                <ModalButtons>
                  <Button
                    onClick={() => {
                      close();
                      handleCloseMeeting();
                    }}
                  >
                    End Meeting
                  </Button>
                  <Button variant="outline" onClick={close}>
                    Dismiss
                  </Button>
                </ModalButtons>
              </InteractionModal>
            )}
          </Popup>
        </MeeetingControls>
      )}
      <h3>Members of the meeting</h3>
      <MembersList>
        {members.map(member => (
          <li key={member.userId}>
            <NoStyledButton onClick={() => setTag('@' + member.username)}>
              {member.username}
            </NoStyledButton>
          </li>
        ))}
      </MembersList>
    </Container>
  );
};

export default MeetingSidebar;
