import { useState, useEffect } from 'react';
import { StyledGroupContent } from './StyledGroupList';
import useFetchGroups from '../../hooks/fetch-groups';
import { GroupType } from '../../interfaces';
import GroupItem from '../GroupItem/group-item';

function GroupList() {

  const [ groups, loading ] = useFetchGroups();
  const [ groupsData, setGroupsData ] = useState<GroupType[]>([]);
  
  useEffect(() => {
    if (Array.isArray(groups)) {
      setGroupsData(groups);
    }
  }, [groups]);

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
