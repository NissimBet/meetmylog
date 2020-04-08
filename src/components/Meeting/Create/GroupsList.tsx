import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;

  margin: 20px 0;

  gap: 20px;
`;

const GroupCard = styled.div<{ selected: boolean }>`
  box-shadow: 0 0 6px 1px #2222;
  padding: 10px;
  border: 2px solid transparent;
  border-radius: 10px;

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

interface GroupsListProps {
  groups: GroupData[];
  handleSelect: (id: string) => void;
  className?: string;
  selected: string;
}

const GroupsList: React.FunctionComponent<GroupsListProps> = ({
  groups = [],
  className,
  handleSelect,
  selected = false,
}) => {
  return (
    <Container className={className}>
      {groups.map(group => (
        <GroupCard
          selected={selected === group.groupId}
          key={group.groupId}
          onClick={() => handleSelect(group.groupId)}
        >
          {group.name}
          <ul>
            {group?.members.map(member => (
              <li key={member.userId}>{member.name}</li>
            ))}
          </ul>
        </GroupCard>
      ))}
    </Container>
  );
};

export default GroupsList;
