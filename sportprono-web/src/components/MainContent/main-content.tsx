import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupList from '../GroupList/group-list';
import StyledMainContent from './StyledMainContent';

function MainContent() {

  return (
    <StyledMainContent>
      <Routes>
        <Route path='/' element={<GroupList />} />
        <Route path='/details' element={<h1>Details !</h1>} />
      </Routes>
    </StyledMainContent>
  )
}

export default MainContent
