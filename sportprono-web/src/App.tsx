import React from 'react';
import Header from './components/Header/header';
import MainContent from './components/MainContent/main-content';
import SideBar from './components/Sidebar/sidebar';
import './style.less';


function App() {

  return (
    <div className='App'>
      <Header />
      <div className='content'>
        <SideBar />
        <MainContent />
      </div>
    </div>
  )
}

export default App
