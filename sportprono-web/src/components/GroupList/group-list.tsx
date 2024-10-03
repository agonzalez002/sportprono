// @ts-ignore TS6133
import React, { useState, useEffect } from 'react';
import { StyledGroupContent } from './StyledGroupList';
import useFetchGroups from '../../hooks/fetch-groups';
import { GroupType } from '../../interfaces';
import GroupItem from '../GroupItem/group-item';

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
          <GroupItem group={group} />
        )        
      })}
    </StyledGroupContent>
  )
}

export default GroupList
