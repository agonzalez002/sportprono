import { Route, Routes } from "react-router-dom";
import Account from "../Account/account";
import EventDetails from "../EventDetails/event-details";
import GroupAdmin from "../GroupAdmin/group-admin";
import GroupDetails from "../GroupDetails/group-details";
import GroupList from "../GroupList/group-list";
import SignUp from "../SignUp/signUp";
import StyledMainContent from "./StyledMainContent";

function MainContent() {
  return (
    <StyledMainContent>
      <Routes>
        <Route path="/" element={<GroupList />} />
        <Route path="/details/:id" element={<GroupDetails />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/my-account" element={<Account />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/group-admin/:id" element={<GroupAdmin />} />
      </Routes>
    </StyledMainContent>
  );
}

export default MainContent;
