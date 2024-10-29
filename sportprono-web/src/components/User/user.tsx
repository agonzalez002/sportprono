import { useState, useEffect } from 'react';
import { UserDataType } from '../../interfaces';
import { Avatar } from '@mui/material';

interface UserProps {
    user: UserDataType;
    accessAccount: boolean;
    setOpenMenu?: (openMenu: boolean) => void;
}

function User({ user, accessAccount, setOpenMenu }: UserProps, ) {
    const [ imageUrl, setImageUrl ] = useState<string>('http://localhost:8000/mediafiles/male.png');

    useEffect(() => {
        const newImageUrl = user.profile && user.profile.image_url
            ? user.profile.image_url
            : 'http://localhost:8000/mediafiles/male.png';

        if (newImageUrl !== imageUrl) {
            setImageUrl(newImageUrl);
        }
    }, [user.profile, user.profile?.image_url, imageUrl]);

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