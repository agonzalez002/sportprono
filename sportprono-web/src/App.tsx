import { useState } from 'react';
import Header from './components/Header/header';
import MainContent from './components/MainContent/main-content';
import SideBar from './components/Sidebar/sidebar';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './hooks/AuthProvider';
import { Bounce, ToastContainer } from 'react-toastify';
import './style.less';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [ theme, setTheme ] = useState(lightTheme);

  const toggleTheme = () => {
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  }

  const user = JSON.parse(localStorage.getItem('sportprono-user') as string);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider user={user}>
        <div className='App'>
          <Router>
            <Header toggleTheme={toggleTheme} />
            <div className='content'>
              <SideBar />
              <MainContent />
            </div>
          </Router>
        </div>
        <ToastContainer 
          position='top-right'
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          theme='colored'
          transition={Bounce}
        />
      </AuthProvider>
      
    </ThemeProvider>
  )
}

export default App
