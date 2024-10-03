import { useState } from 'react';
import StyledSidebar from './StyledSidebar';
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import PasswordIcon from '@mui/icons-material/Password';
import { auth } from '../../services/userServices';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import User from '../User/user';


function SideBar() {

  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ showPassword, setShowPassword] = useState<boolean>(false);
  const { authData, setAuth } = useAuth();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  }

  const handleSubmit = async () => {
    const data = await auth({username, password});
    setAuth(data);
  }

  const handleLogOut = () => {
    setAuth(null);
  }

  return (
    <StyledSidebar>
        { !authData ?
          <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx" label="Username" variant="standard" onChange={ e => setUsername(e.target.value) } />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={ e => setPassword(e.target.value) }
                  />
                </FormControl>
            </Box>     
            
            <Button variant='contained' color='primary' onClick={handleSubmit}>Sign in</Button>
            <Link to={'/signup'} color='secondary'>Sign up</Link>
          </>
          :
          <>
            <User user={authData.user} accessAccount />
            <Button variant='outlined' color='primary' onClick={handleLogOut}>Log Out</Button>
          </>
        }
    </StyledSidebar>
  )
}

export default SideBar
