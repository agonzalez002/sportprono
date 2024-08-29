import React from 'react';
import Header from './components/header';
import MainContent from './components/main-content';
import SideBar from './components/sidebar';
import './App.css';


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
