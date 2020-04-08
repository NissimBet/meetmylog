import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;

  margin: 20px 0;

  gap: 20px;
`;

const User = styled.div<{ selected: boolean }>`
  padding: 10px;

  border: 2px solid transparent;

  &:hover {
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
  }

  ${props =>
    props.selected &&
    `
    border-color: #bcff8e;
    box-shadow: 0 0 6px 1px #bcff8e22;
  `}
`;

interface UsersListProps {
  members: Omit<UserData, 'email'>[];
  handleSelect: (id: string) => void;
  className?: string;
  selected: string[];
}

const UsersList: React.FunctionComponent<UsersListProps> = ({
  members = [],
  handleSelect,
  selected,
  className,
}) => {
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
