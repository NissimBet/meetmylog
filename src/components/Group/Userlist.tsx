import React from 'react';
import styled from 'styled-components';
import Button from '../Button';
import { FaTimes } from 'react-icons/fa';



const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(5, 1fr);
  grid-template-columns: 1fr;

  margin: 20px 0;
  border: 0.5px solid;
  box-shadow: 0px 2px #888888;

  gap: 5px;
`;
const InvB = styled(Button)`
  transform: scale(0.7);
  top: 0px;
  right: 0px;
  &:hover {
    cursor: default;
  }
  `;

const EraseButton = styled(Button)`
      background-color: red;
      transform: scale(0.7);
      color: white;
      top: 0px;
      right: 0px;
      &:hover {
        background-color: #dc0000;
        color: white;
      }
`;

const User = styled.div<{ selected: boolean }>`
  padding: 10px;

  border: 2px solid transparent;

  &:hover {
    border-color: #00000;
    box-shadow: 0 0 6px 1px #bcff8e22;
    background-color: #7F7F7F
  }
  &:hover ${EraseButton}{
    opacity:1;
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
  }
  ${EraseButton} {
    opacity: 0;
    position: relative;
    left:80%;
    top:0%;
    box-shadow: 0 8px 6px -6px black;
  }
  ${InvB} {
    opacity: 0;
    position: relative;
    left:80%;
    top:0%;
  }

  ${props =>
    props.selected &&
    `
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
    background-color: #7F7F7F
  `}
`;

interface UsersListProps {
  variant?: 'admin' | 'regular';
  members: UserData[];
  handleSelect: (id: any) => void;
  className?: string;
  selected: string;
  creator: string;
}

const UsersListG: React.FunctionComponent<UsersListProps> = ({
  members = [],
  handleSelect,
  selected,
  className,
  variant,
  creator,
}) => {
  if(variant === 'admin'){
    console.log(creator);
    return (
    <Container className={className}>
      {members.map(member => (
        <User
          key={member.userId}
          selected={selected.includes(member.userId)}
        >
          {(creator === member.userId ? <InvB variant='round'/> 
             : <EraseButton className='eraseButton' type="button" onClick={() => handleSelect(member)} variant='round'>
              <FaTimes style={{ position: 'relative', left: '50%', margin: '-8px 0 0 -8px',transform: 'scale(1.5)'}}/>
          </EraseButton> )}
          {member.username + (creator === member.userId ? ' (creator)' : '')}
        </User>
      ))}
    </Container>
    );
    
  }
  return (
    <Container className={className}>
      {members.map(member => (
        <User
          key={member.userId}
          selected={selected.includes(member.userId)}
          onClick={() => handleSelect(member.userId)}
        >
          {member.username + (creator === member.userId ? ' (creator)' : '')}
        </User>
      ))}
    </Container>
  );
};

export default UsersListG;
