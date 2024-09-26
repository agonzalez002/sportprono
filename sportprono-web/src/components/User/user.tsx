import React, { useState, useEffect } from 'react';
import { UserDataType } from '../../interfaces';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserProps {
    user: UserDataType;
}

function User({ user }: UserProps) {

    const navigate = useNavigate();

    const [ imageUrl, setImageUrl ] = useState<string>('');

    useEffect(() => {
        if (user.profile.image) {
            setImageUrl(user.profile.image);
        } else {
            setImageUrl("/mediafiles/male.png");
        }
    }, [user]);

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