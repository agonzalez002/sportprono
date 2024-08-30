import React from 'react';
import StyledSidebar from './StyledSidebar';
import { Button } from '@mui/material';


function SideBar() {

  return (
    <StyledSidebar>
      <h1>SideBar section</h1>
      <Button variant='contained' color='primary'>Mon bouton</Button>
    </StyledSidebar>
  )
}

export default SideBar
