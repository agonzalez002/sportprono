// @ts-ignore TS6133
import React, { useState, useEffect } from 'react';
import { UserDataType } from '../../interfaces';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface UserProps {
    user: UserDataType;
    accessAccount: boolean;
}

function User({ user, accessAccount }: UserProps, ) {

    const navigate = useNavigate();

    const [ imageUrl, setImageUrl ] = useState<string>('');

    useEffect(() => {
        if (user.profile.image) {
            setImageUrl(user.profile.image_url);
        } else {
            setImageUrl("/mediafiles/male.png");
        }
    }, [user]);

    const goToAccount = () => {
        if (accessAccount === true) {
            navigate('/my-account');
        }
    }

    return (
        <>
            <Avatar 
                alt={user.username} 
                src={imageUrl} 
                onClick={goToAccount}
                sx={{ 'cursor': 'pointer' }}
            />
        </>
    )
};

export default User;