import React from 'react';
import styled from 'styled-components';

const GroupsList = styled.div<{ cols: number }>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: 20px 20px;

  margin: 20px 0;
`;

const GroupItem = styled.p`
  font-size: 18px;

  padding: 20px 15px;
  /* box-shadow: 0px 4px 7px 1px #cccccc5c; */
`;

interface ProfileGroupsProps {
  groups: { name: string; groupId: string }[];
  columns?: number;
}

const ProfileGroups: React.FunctionComponent<ProfileGroupsProps> = ({
  groups,
  columns = 1,
}) => {
  return (
    <GroupsList cols={columns}>
      {groups.map(group => (
        <GroupItem key={group.groupId}>{group.name}</GroupItem>
      ))}
    </GroupsList>
  );
};

export default ProfileGroups;
