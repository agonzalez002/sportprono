// @ts-ignore TS6133
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledGroupDetails, StyledLink } from './StyledGroupDetails';
import { ArrowBack } from '@mui/icons-material';
import useFetchGroup from '../../hooks/fetch-group';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { GroupFullType, MemberType } from '../../interfaces';
import User from '../User/user';
import { Button } from '@mui/material';
import { joinGroup, leaveGroup } from '../../services/groupServices';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import EventList from '../EventList/event-list';


function GroupDetails() {

    const { id } = useParams();
    // @ts-ignore TS6133
    const { authData } = useAuth();
    const [ groupDetails, loading, error ] = useFetchGroup(id);
    const [ group, setGroup ] = useState<GroupFullType | null>(null);
    const [ inGroup, setInGroup ] = useState<boolean>(false);
    
    useEffect(() => {
        if (groupDetails && typeof groupDetails !== 'boolean') {
            if (groupDetails.members) {
                if (authData?.user) {
                    setInGroup(!!groupDetails.members.find( (member: MemberType) => member.user.id === authData.user.id));
                }
            }
            setGroup(groupDetails);
        }
    }, [groupDetails, authData]);

    if (error) {
        return <h1>Error !</h1>;
    };

    if (loading) {
        return <h1>Loading...</h1>;
    };

    const join = async () => {
        if (group) {
            const joined = await joinGroup({user: authData.user.id, group: group.id}, authData.token)
            if (joined) {
                if (joined.type === "warning") {
                    toast.warning(joined.message);
                } else {
                    toast.success(joined.message);
                }
            }
        }
    }

    const leave = async () => {
        if (group) {
            const leaved = await leaveGroup({user: authData.user.id, group: group.id}, authData.token)
            if (leaved) {
                toast.success(leaved.message);
            }
        }
    }

  return (
    <StyledGroupDetails>
        <StyledLink to="/"><ArrowBack />back</StyledLink>
        { group && 
            <>
                {
                    inGroup ? 
                    <Button onClick={() => leave()} variant='contained' color='primary'><LogoutIcon /> Leave</Button> 
                    : 
                    <Button onClick={() => join()} variant='contained' color='primary'><AddIcon /> Join</Button> 
                }
                
                <h1>Details here for group {id} !</h1>
                <p>Name: {group?.name}</p>
                <p>Description: {group?.description}</p>
                <p>Location: {group?.location}</p>

                <EventList events={group.events}/>

                <h3>Members :</h3>
                { group.members.map( member => {
                    return <div key={member.user.id}>
                        <User user={member.user} accessAccount={false} />
                        <p>{member.points} pts</p>
                    </div>
                })}
            </>
        }
        
    </StyledGroupDetails>
  )
}

export default GroupDetails
