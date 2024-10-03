import logoLight from '../../assets/images/logo/logoLight.png';
import darkLogo from '../../assets/images/logo/logoDark.png';
import { StyledHeader, MaterialUISwitch } from './StyledHeader';
import { Box, FormControlLabel, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface HeaderType {
  toggleTheme: () => void;
}

function Header({toggleTheme}: HeaderType) {
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
      <Box>
        <FormControlLabel
          control={<MaterialUISwitch sx={{ m: 1 }} />}
          label="MUI switch"
          onChange={toggleTheme}
        />
      </Box>
    </StyledHeader>
  )
}

export default Header
