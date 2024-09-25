import React, { useState, useEffect } from 'react';
import { UserDataType } from '../../interfaces';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function User({user}: UserDataType) {

    const navigate = useNavigate();

    const [ imageUrl, setImageUrl ] = useState<string>();

    useEffect(() => {
        if (user.profile.image) {
            setImageUrl(user.profile.image);
        } else {
            setImageUrl("/mediafiles/male.png");
        }
    }, []);

    return (
        <>
            <Avatar 
                alt={user.username} 
                src={"http://localhost:8000"+imageUrl} 
                onClick={() => { navigate('my-account')}}
                sx={{ 'cursor': 'pointer' }}
            />
        </>
    )
};

export default User;