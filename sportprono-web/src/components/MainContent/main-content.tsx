import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupList from '../GroupList/group-list';
import StyledMainContent from './StyledMainContent';
import GroupDetails from '../GroupDetails/group-details';

function MainContent() {

  return (
    <StyledMainContent>
      <Routes>
        <Route path='/' element={<GroupList />} />
        <Route path='/details/:id' element={<GroupDetails />} />
      </Routes>
    </StyledMainContent>
  )
}

export default MainContent
