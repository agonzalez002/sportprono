// @ts-ignore TS6133
import React, { useState, useEffect } from 'react';
import { StyledGroupContent, StyledLink } from './StyledGroupList';
import useFetchGroups from '../../hooks/fetch-groups';

interface Group {
  id: number,
  name: string,
  location: string,
  description: string | null,
}

function GroupList() {

  const [ groups, loading, error ] = useFetchGroups();
  const [ groupsData, setGroupsData ] = useState<Group[] | null>(null);
  
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
      { groupsData && groupsData.map((group: Group) => {
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
