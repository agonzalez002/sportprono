import logoLight from '../../assets/images/logo/logoLight.png';
import darkLogo from '../../assets/images/logo/logoDark.png';
import { StyledHeader, MaterialUISwitch, StyledBox } from './StyledHeader';
import { Box, FormControlLabel, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Login from '../Login/login';
import { useState } from 'react';
import LoginDialog from '../Login/login-popup';
import RegisterDialog from '../Login/registerDialog';
import ForgotPasswordDialog from '../Login/forgotPasswordDialog';

interface HeaderType {
  toggleTheme: () => void;
}

function Header({toggleTheme}: HeaderType) {
  const navigate = useNavigate();

  const [ loginOpen, setLoginOpen ] = useState<boolean>(false);
  const [ registerOpen, setRegisterOpen ] = useState<boolean>(false);
  const [ forgotPasswordOpen, setForgotPasswordOpen ] = useState<boolean>(false);

  const theme = useTheme();

  const logoSrc = theme.palette.mode === 'dark' ? darkLogo : logoLight;
  const defaultChecked = theme.palette.mode === 'dark' ? true : false;

  return (
    <StyledHeader>
      <Box className="logo-content">
        <img 
          src={logoSrc} 
          alt='SportProno logo' 
          height="75"
          className="logo"
          onClick={() => { navigate('/') }}
        />
      </Box>
      <StyledBox>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} defaultChecked={defaultChecked}/>}
          label=""
          onChange={toggleTheme}
        />
        <Login setLoginOpen={setLoginOpen} />
        <LoginDialog 
          open={loginOpen} 
          setOpen={setLoginOpen} 
          setRegisterOpen={setRegisterOpen} 
          setForgotPasswordOpen={setForgotPasswordOpen}
        />
        <RegisterDialog open={registerOpen} setOpen={setRegisterOpen} />
        <ForgotPasswordDialog open={forgotPasswordOpen} setOpen={setForgotPasswordOpen} />
      </StyledBox>
    </StyledHeader>
  )
}

export default Header
