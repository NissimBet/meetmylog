import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../Button';
import Popup from 'reactjs-popup';
import { useLoginContext } from '../../hooks/login';
import { useTagContext } from '../../hooks/chatTag';
import { useCommandContext } from '../../hooks/chatCommand';
import { FaTimes, FaPlus } from 'react-icons/fa';
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalFooter,
  ModalBody,
} from '../Modal/Modal';
import axios, { AxiosError } from 'axios';
import { BACKEND_URI } from '../../utils/config';

const Container = styled.div`
  padding: 10px;
  overflow: auto;
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
const EraseButton = styled(Button)`
  background-color: red;
  transform: scale(0.5);
  color: white;
  top: 0px;
  right: 0px;
  &:hover {
    background-color: #dc0000;
    color: white;
  }
`;
const ButtonYes = styled(Button)`
  margin-right: 10px;
  color: #fff;
  background-color: #00ff1b;
  &:hover {
    background-color: #00d316;
    color: #fff;
  }
`;
const ButtonNo = styled(Button)`
  margin-left: 10px;
  color: #fff;
  background-color: #ff0000;
  &:hover {
    background-color: #bf0000;
    color: #fff;
  }
`;

const ButtonAdd = styled(Button)`
  border-radius: 0px;
  border: none;
  outline:none
  margin-left: 10px;
  color: #000;
  background-color: #fff;
  &:hover {
    background-color: #fff;
    color: #808080;
  }
  &:focus{
    border: 0;
    outline: 0;
  }
`;

const Responsibility = styled.li`
  display: flex;
  margin-left: -40px;
  align-items: center;

  &:hover ${EraseButton} {
    opacity: 1;
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
  }
  ${EraseButton} {
    opacity: 0;
    position: relative;
    box-shadow: 0 8px 6px -6px black;
  }
`;

function removeResponsibility(meetingId: string, id: string, token: string) {
  axios
    .post(
      `${BACKEND_URI}/meeting/responsability/remove/${meetingId}`,
      {
        rId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(err => {
      throw Error(err);
    });
}

interface MemberRespons {
  member: UserData;
  responsabilities: Omit<Responsabilities, 'member'>[];
}

interface MeetingSidebarProps {
  members: UserData[];
  creator: MeetingCreator;
  handleCloseMeeting: () => void;
  className?: string;
  respons: Responsabilities[];
  handleResponsabilityD: (id: string) => void;
  meetingId: string;
  userToken: string;
}

const MeetingSidebar: React.FunctionComponent<MeetingSidebarProps> = ({
  members,
  meetingId,
  creator,
  handleCloseMeeting,
  className,
  respons,
  userToken,
  handleResponsabilityD,
}) => {
  const { userId } = useLoginContext();
  const { set: setTag } = useTagContext();
  const [memberRespons, setMemberRespons] = useState<MemberRespons[]>();
  const [disp, setDisp] = useState('none');
  const [respD, setRespD] = useState<Responsabilities>(null);
  const { setC: setCommand } = useCommandContext();

  console.log(respons);
  useEffect(() => {
    var index = 0;
    const newArr: MemberRespons[] = [];
    for (const member of members) {
      newArr.push({ member: member, responsabilities: [] });
      respons
        .filter(resp => member._id == resp.member._id)
        .map(resp =>
          newArr[index].responsabilities.push({
            _id: resp._id,
            responsability: resp.responsability,
          })
        );
      index++;
    }
    setMemberRespons(newArr);
    console.log(memberRespons);
  }, [respons]);

  return (
    <div>
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
            <li
              key={member.userId}
              onClick={() =>
                setTag({
                  _id: member._id,
                  username: '@' + member.username,
                  name: member.name,
                  email: member.email,
                  userId: member.userId,
                })
              }
            >
              {member.username}
            </li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>Responsibilities</h3>
          {creator.userId === userId && (
            <ButtonAdd
              type="button"
              onClick={() => setCommand('/resp @')}
              variant="round"
            >
              <FaPlus
                style={{
                  position: 'relative',
                  left: '50%',
                  margin: '-8px 0 0 -8px',
                }}
              />
            </ButtonAdd>
          )}
        </div>
        {memberRespons &&
          memberRespons.map(member => (
            <div>
              <h5>{member.member.username}</h5>
              <ul>
                {member.responsabilities.map(resp => (
                  <Responsibility>
                    {creator.userId === userId && (
                      <EraseButton
                        className="eraseButton"
                        type="button"
                        onClick={() => {
                          setDisp('block');
                          setRespD({
                            _id: resp._id,
                            member: member.member,
                            responsability: resp.responsability,
                          });
                        }}
                        variant="round"
                      >
                        <FaTimes
                          style={{
                            transform: 'scale(1.5)',
                            position: 'relative',
                            left: '50%',
                            margin: '-8px 0 0 -8px',
                          }}
                        />
                      </EraseButton>
                    )}
                    -{resp.responsability}
                  </Responsibility>
                ))}
              </ul>
            </div>
          ))}
      </Container>
      {respD && (
        <Modal display={disp}>
          <ModalContent>
            <ModalHeader
              title={
                'Do you want to remove ' +
                respD.member.username +
                `'s responsibility ` +
                respD.responsability +
                '?'
              }
              fontC={'#000'}
              color={'#ffffff'}
              handleSelect={() => setDisp('none')}
            />
            <ModalFooter color={'#ffffff'}>
              <ButtonYes
                type="submit"
                onClick={() => {
                  try {
                    removeResponsibility(meetingId, respD._id, userToken);
                    handleResponsabilityD(respD._id);
                    setDisp('none');
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                Yes
              </ButtonYes>
              <ButtonNo type="submit" onClick={() => setDisp('none')}>
                No
              </ButtonNo>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default MeetingSidebar;
