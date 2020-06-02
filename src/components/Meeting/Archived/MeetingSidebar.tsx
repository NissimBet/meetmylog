import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import Popup from 'reactjs-popup';
import { useLoginContext } from '../../../hooks/login';
import { FaTimes, FaPlus } from 'react-icons/fa';

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

interface MemberRespons {
  member: UserData;
  responsabilities: Omit<Responsabilities, 'member'>[];
}

interface MeetingSidebarProps {
  members: UserData[];
  creator: MeetingCreator;
  className?: string;
  respons: Responsabilities[];
  meetingId: string;
  userToken: string;
}

const MeetingSidebar: React.FunctionComponent<MeetingSidebarProps> = ({
  members,
  meetingId,
  creator,
  className,
  respons,
  userToken,
}) => {
  const { userId } = useLoginContext();
  const [memberRespons, setMemberRespons] = useState<MemberRespons[]>();
  const [respD, setRespD] = useState<Responsabilities>(null);

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
        <h3>Members of the meeting</h3>
        <ul>
          {members.map(member => (
            <li key={member.userId}>{member.username}</li>
          ))}
        </ul>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h3>Responsibilities</h3>
        </div>
        {memberRespons &&
          memberRespons.map(member => (
            <div>
              <h5>{member.member.username}</h5>
              <ul>
                {member.responsabilities.map(resp => (
                  <Responsibility>-{resp.responsability}</Responsibility>
                ))}
              </ul>
            </div>
          ))}
      </Container>
    </div>
  );
};

export default MeetingSidebar;
