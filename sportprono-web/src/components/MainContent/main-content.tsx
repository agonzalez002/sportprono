// @ts-ignore TS6133
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GroupList from '../GroupList/group-list';
import StyledMainContent from './StyledMainContent';
import GroupDetails from '../GroupDetails/group-details';
import SignUp from '../SignUp/signUp';

function MainContent() {

  return (
    <StyledMainContent>
      <Routes>
        <Route path='/' element={<GroupList />} />
        <Route path='/details/:id' element={<GroupDetails />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </StyledMainContent>
  )
}

export default MainContent
