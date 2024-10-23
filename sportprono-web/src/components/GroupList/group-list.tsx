import { useState, useEffect } from 'react';
import { StyledGroupContent, Card, StyledBox, StyledGrid2 } from './StyledGroupList';
import useFetchGroups from '../../hooks/fetch-groups';
import { GroupType } from '../../interfaces';
import GroupItem from '../GroupItem/group-item';
import { Grid2, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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
      <StyledBox>
        <StyledGrid2 container spacing={3} columns={{ xs: 4, sm: 9, md: 12 }}>
          { groupsData && groupsData.map((group: GroupType) => {
            return (
              <GroupItem group={group} />
            )        
          })}
          <Grid2 key='8' size={{ xs: 6, lg: 3 }}>
              <Card>
                <Box className="icon">
                  <AddIcon />
                </Box>
                <Box className="text">
                  Ajouter un nouveau groupe
                </Box>
              </Card>
          </Grid2>
        </StyledGrid2>
      </StyledBox>
    </StyledGroupContent>
  )
}

export default GroupList
