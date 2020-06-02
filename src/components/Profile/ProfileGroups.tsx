import React from 'react';
import styled from 'styled-components';
import CustomLink from '../Link';

const GroupsList = styled.div<{ cols: number }>`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(${props => props.cols}, 1fr);
  gap: 20px 20px;

  margin: 10px 0;
`;

const GroupItem = styled.p`
  font-size: 18px;

  padding: 10px 15px;
  /* box-shadow: 0px 4px 7px 1px #cccccc5c; */
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
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
        <CustomLink to={`/team/${group.groupId}`} key={group.groupId}>
          <GroupItem>{group.name}</GroupItem>
        </CustomLink>
      ))}
    </GroupsList>
  );
};

export default ProfileGroups;
