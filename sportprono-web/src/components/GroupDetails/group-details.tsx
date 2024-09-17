// @ts-ignore TS6133
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledGroupDetails, StyledLink } from './StyledGroupDetails';
import { ArrowBack } from '@mui/icons-material';
import useFetchGroup from '../../hooks/fetch-group';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { GroupFullType } from '../../interfaces';


function GroupDetails() {

    const { id } = useParams();
    const [ groupDetails, loading, error ] = useFetchGroup(id);
    const [ group, setGroup ] = useState<GroupFullType | null>(null);
    
    useEffect(() => {
        // @ts-ignore TS2345
        setGroup(groupDetails);
    }, [groupDetails]);

    if (error) {
        return <h1>Error !</h1>;
    };

    if (loading) {
        return <h1>Loading...</h1>;
    };

  return (
    <StyledGroupDetails>
        <StyledLink to="/"><ArrowBack />back</StyledLink>
        { group && 
            <>
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
            </>
        }
        
    </StyledGroupDetails>
  )
}

export default GroupDetails
