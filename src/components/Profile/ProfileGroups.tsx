import React from 'react';
import styled from 'styled-components';

const GroupsList = styled.div``;

interface ProfileGroupsProps {
  groups: { name: string }[];
}

const ProfileGroups: React.FunctionComponent<ProfileGroupsProps> = ({
  groups,
}) => {
  return (
    <GroupsList>
      {groups.map(group => (
        <p key={group.name}>{group.name}</p>
      ))}
    </GroupsList>
  );
};

export default ProfileGroups;
