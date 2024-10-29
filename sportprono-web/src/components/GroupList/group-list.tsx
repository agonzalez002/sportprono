import { useState, useEffect } from 'react';
import { 
  StyledGroupContent, 
  StyledBox, 
  StyledGrid2,
  StyledPaper,
  StyledButton,
} from './StyledGroupList';
import useFetchGroups from '../../hooks/fetch-groups';
import { GroupType } from '../../interfaces';
import GroupItem from '../GroupItem/group-item';
import { Box, InputBase } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AddNewGroupDialog from './AddNewGroupDialog';
import SearchIcon from '@mui/icons-material/Search';

function GroupList() {

  const [ groups, loading ] = useFetchGroups();
  const [ groupsData, setGroupsData ] = useState<GroupType[]>([]);
  const [ open, setOpen ] = useState<boolean>(false);  

  useEffect(() => {
    if (Array.isArray(groups)) {
      setGroupsData(groups);
    }
  }, [groups]);

  if (loading) {
    return <h1>Loading...</h1>;
  };

  const handleAddNewGroup = () => {
    setOpen(true);
  };

  return (
    <StyledGroupContent>
      <StyledBox className='searchBox'>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '420px'}}>
          <StyledPaper>
            <SearchIcon />
            <InputBase
              sx={{ ml: 1, flex: 1}}
              placeholder='Rechercher'
              inputProps={{ 'aria-label': 'rechercher' }}
            />  
          </StyledPaper>
          <StyledButton variant="contained">
            Valider
          </StyledButton>
        </Box>
        
        <StyledButton 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleAddNewGroup}
        >
          Créer un groupe
        </StyledButton>
      </StyledBox>

      <StyledBox className='group-content'>
        <StyledGrid2 container spacing={3} columns={{ xs: 4, sm: 9, md: 12 }}>
          { groupsData.length !== 0
            ?
            groupsData.map((group: GroupType) => {
              return (
                <GroupItem group={group} />
              )        
            })
            :
            <h2>Vous n'avez ou ne faites partie d'aucun Groupe de jeu</h2>
          }
        </StyledGrid2>
      </StyledBox>

      <StyledBox className='paginate'>

      </StyledBox>
      <AddNewGroupDialog open={open} setOpen={setOpen} />
    </StyledGroupContent>
  )
}

export default GroupList
