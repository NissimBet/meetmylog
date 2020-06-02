import React from 'react';
import styled from 'styled-components';
import Button from '../../Button';
import { FaTimes } from 'react-icons/fa';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;

  margin: 20px 0;

  gap: 20px;
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

const User = styled.div<{ selected: boolean }>`
  padding: 10px;

  border: 2px solid transparent;

  &:hover ${EraseButton} {
    opacity: 1;
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
  }
  ${EraseButton} {
    opacity: 0;
    position: relative;
    left: 80%;
    top: -15%;
    box-shadow: 0 8px 6px -6px black;
  }
  ${props =>
    props.selected &&
    `
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
  `}
`;

interface UsersListProps {
  variant?: 'regular' | 'options';
  members: UserData[];
  handleSelect: (id: string) => void;
  className?: string;
  selected: string[];
}

const UsersList: React.FunctionComponent<UsersListProps> = ({
  members = [],
  handleSelect,
  selected,
  className,
  variant,
}) => {
  if (variant === 'options') {
    return (
      <Container className={className}>
        {members.map(member => (
          <User key={member.userId} selected={selected.includes(member.userId)}>
            <EraseButton
              className="eraseButton"
              type="button"
              onClick={() => handleSelect(member.userId)}
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
            {member.username}
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
          {member.username}
        </User>
      ))}
    </Container>
  );
};

export default UsersList;
