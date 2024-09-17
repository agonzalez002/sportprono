// @ts-ignore TS6133
import React, { useState } from "react";
import { AccountCircle, Visibility, VisibilityOff, AlternateEmail } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from "@mui/material";
import PasswordIcon from '@mui/icons-material/Password';

function SignUp() {

    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [password2, setPassword2] = useState<string>();
    const [ showPassword, setShowPassword] = useState<boolean>(false);

    const passwordMatch = () => {
        return password === password2;
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleSubmit = async () => {
        if (passwordMatch()) {
            console.log('all good', username, password, email);
        } else {
            console.log("password don't match");
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx-sign-up-email" label="Email" variant="standard" onChange={ e => setEmail(e.target.value) } />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx-sign-up-username" label="Username" variant="standard" onChange={ e => setUsername(e.target.value) } />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
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

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <PasswordIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                  <InputLabel htmlFor="password2">Confirm password</InputLabel>
                  <Input
                    id="password2"
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
                    onChange={ e => setPassword2(e.target.value) }
                  />
                </FormControl>
            </Box>
            
            <Button variant='contained' color='primary' onClick={handleSubmit}>Register</Button>
        </>
    );
}

export default SignUp;