import { useState, useEffect } from 'react';
import { UserDataType } from '../../interfaces';
import { Avatar } from '@mui/material';

interface UserProps {
    user: UserDataType;
    accessAccount: boolean;
    setOpenMenu?: (openMenu: boolean) => void;
}

function User({ user, accessAccount, setOpenMenu }: UserProps, ) {
    const [ imageUrl, setImageUrl ] = useState<string>('');

    useEffect(() => {
        if (user.profile && user.profile.image) {
            setImageUrl(user.profile.image_url);
        } else {
            setImageUrl("http://localhost:8000/mediafiles/male.png");
        }
        console.log(imageUrl);
    }, [user]);

    const openMenu = () => {
        if (accessAccount === true && setOpenMenu) {
            setOpenMenu(true);
        }
    }

    return (
        <>
            <Avatar 
                alt={user.username} 
                src={imageUrl} 
                onClick={openMenu}
                sx={{ 
                    cursor: accessAccount ? 'pointer' : 'inherit',
                }}
            />
        </>
    )
};

export default User;