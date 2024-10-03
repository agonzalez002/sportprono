import { Routes, Route } from 'react-router-dom';
import GroupList from '../GroupList/group-list';
import StyledMainContent from './StyledMainContent';
import GroupDetails from '../GroupDetails/group-details';
import SignUp from '../SignUp/signUp';
import Account from '../Account/account';
import EventDetails from '../EventDetails/event-details';
import GroupAdmin from '../GroupAdmin/group-admin';

function MainContent() {

  return (
    <StyledMainContent>
      <Routes>
        <Route path='/' element={<GroupList />} />
        <Route path='/details/:id' element={<GroupDetails />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/my-account' element={<Account />} />
        <Route path='/event/:id' element={<EventDetails />} />
        <Route path='/group-admin/:id' element={<GroupAdmin />} />
      </Routes>
    </StyledMainContent>
  )
}

export default MainContent
