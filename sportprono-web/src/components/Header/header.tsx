// @ts-ignore TS6133
import React from 'react'; 
import logoLight from '../../assets/images/logo/logoLight.png';
import darkLogo from '../../assets/images/logo/logoDark.png';
import StyledHeader from './StyledHeader';
import { useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Header() {
  const navigate = useNavigate();

  const theme = useTheme();

  const logoSrc = theme.palette.mode === 'dark' ? darkLogo : logoLight;

  return (
    <StyledHeader>
      <img 
        src={logoSrc} 
        alt='SportProno logo' 
        height="75" 
        onClick={() => { navigate('/') }}
      />
    </StyledHeader>
  )
}

export default Header
