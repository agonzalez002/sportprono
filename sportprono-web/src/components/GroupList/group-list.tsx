// @ts-ignore TS6133
import React, { useState, useEffect } from 'react';
import { StyledGroupContent, StyledLink } from './StyledGroupList';
import useFetchGroups from '../../hooks/fetch-groups';
import { GroupType } from '../../interfaces';

function GroupList() {

  const [ groups, loading, error ] = useFetchGroups();
  const [ groupsData, setGroupsData ] = useState<GroupType[] | null>(null);
  
  useEffect(() => {
    // @ts-ignore TS2345
    setGroupsData(groups);
  }, [groups]);

  if (error) {
    return <h1>Error !</h1>;
  };

  if (loading) {
    return <h1>Loading...</h1>;
  };

  return (
    <StyledGroupContent>
      { groupsData && groupsData.map((group: GroupType) => {
        return (
          <StyledLink key={group.id} to={`/details/${group.id}`}>
            {group.name} group
          </StyledLink>
        )        
      })}
    </StyledGroupContent>
  )
}

export default GroupList
