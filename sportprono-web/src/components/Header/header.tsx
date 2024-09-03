// @ts-ignore TS6133
import React from 'react'; 
import logoLight from '../../assets/images/logo/logoLight.png';
import darkLogo from '../../assets/images/logo/logoDark.png';
import StyledHeader from './StyledHeader';
import { useTheme } from '@mui/material';


function Header() {

  const theme = useTheme();

  const logoSrc = theme.palette.mode === 'dark' ? darkLogo : logoLight;

  return (
    <StyledHeader>
      <img src={logoSrc} alt='SportProno logo' height="75" />
    </StyledHeader>
  )
}

export default Header
