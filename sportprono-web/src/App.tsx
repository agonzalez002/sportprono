// @ts-ignore TS6133
import React, { useState } from 'react';
import Header from './components/Header/header';
import MainContent from './components/MainContent/main-content';
import SideBar from './components/Sidebar/sidebar';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import './style.less';


function App() {
  const [ theme, setTheme ] = useState(lightTheme);

  // @ts-ignore TS6133
  const toogleTheme = () => {
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className='App'>
        <Router>
          <Header />
          <div className='content'>
            <SideBar />
            <MainContent />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}

export default App
