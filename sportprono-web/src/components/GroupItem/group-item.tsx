import { GroupType } from '../../interfaces';
import { StyledBox } from './StyledGroupItem';
import emptyFile from '../../assets/images/empty-file.png';
import { useEffect, useState } from 'react';
import { Avatar, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


interface TypeGroup {
    group: GroupType;
}

function GroupItem({group}: TypeGroup) {
    const [ imageUrl, setImageUrl ] = useState<string>(emptyFile);
    const navigate = useNavigate();

    useEffect(() => {
        if (group && group.image) {
            setImageUrl(group.image_url);
        }
    }, [group])

    const handleGroupDetail = () => {
        navigate(`/details/${group.id}`)
    }
    
    return (
        <>
            {
                group 
                &&
                <>
                    <StyledBox onClick={handleGroupDetail}>
                        <Avatar 
                            alt={group.name} 
                            src={imageUrl}
                            sx={{ width: 70, height: 70 }}
                        />
                        <h2>{group.name}</h2>
                        <Box sx={{ padding: '5px', backgroundColor: 'red', width: '100px' }}></Box>
                    </StyledBox>
                </>
            }
        </>
    )
}

export default GroupItem;