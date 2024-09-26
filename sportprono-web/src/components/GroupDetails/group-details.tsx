// @ts-ignore TS6133
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledGroupDetails, StyledLink } from './StyledGroupDetails';
import { ArrowBack } from '@mui/icons-material';
import useFetchGroup from '../../hooks/fetch-group';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import { GroupFullType } from '../../interfaces';
import User from '../User/user';
import { Button } from '@mui/material';
import { joinGroup, leaveGroup } from '../../services/groupServices';
import { useAuth } from '../../hooks/useAuth';
import { toast } from 'react-toastify';


function GroupDetails() {

    const { id } = useParams();
    // @ts-ignore TS6133
    const { authData } = useAuth();
    const [ groupDetails, loading, error ] = useFetchGroup(id);
    const [ group, setGroup ] = useState<GroupFullType | null>(null);
    const [ inGroup, setInGroup ] = useState<boolean>(false);
    
    useEffect(() => {
        if (groupDetails) {
            if (groupDetails.members) {
                if (authData?.user) {
                    setInGroup(!!groupDetails.members.find( member => member.user.id === authData.user.id));
                }
            }
            setGroup(groupDetails);
        }
    }, [groupDetails]);

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
            

                <h3>Evenst :</h3>
                { group.events.map( event => {
                    const evtTime = DateTime.fromISO(event.time).setLocale("fr").setZone("Europe/Paris").toUTC();
                    return <div key={event.id}>
                        <p>{event.team1} VS {event.team2} on <CalendarTodayIcon />{evtTime.toLocaleString()} <AccessTimeIcon />{evtTime.toFormat('HH:mm')}</p>
                    </div>
                })}

                <h3>Members :</h3>
                { group.members.map( member => {
                    return <div key={member.user.id}>
                        <User user={member.user} />
                        <p>{member.points} pts</p>
                    </div>
                })}
            </>
        }
        
    </StyledGroupDetails>
  )
}

export default GroupDetails
