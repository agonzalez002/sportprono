// @ts-ignore TS6133
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledGroupDetails, StyledLink } from './StyledGroupDetails';
import { ArrowBack } from '@mui/icons-material';
import useFetchGroup from '../../hooks/fetch-group';
import { DateTime } from 'luxon';

interface Event {
    id: number,
    team1: string,
    team2: string,
    time: string,
    score1: number,
    score2: number,
    group: number,
}

interface GroupFull {
    id: number,
    name: string,
    location: string,
    description: string | null,
    events: Event[],
  }

function GroupDetails() {

    const { id } = useParams();
    const [ groupDetails, loading, error ] = useFetchGroup(id);
    const [ group, setGroup ] = useState<GroupFull | null>(null);
    
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
                <React.Fragment>
                    <h1>Details here for group {id} !</h1>
                    <p>Name: {group?.name}</p>
                    <p>Description: {group?.description}</p>
                    <p>Location: {group?.location}</p>
                

                    <h3>Evenst :</h3>
                    { group.events.map( event => {
                        const evtTime = DateTime.fromISO(event.time).setLocale("fr").setZone("Europe/Paris").toUTC();
                        return <div key={event.id}>
                            <p>{event.team1} VS {event.team2} on {evtTime.toLocaleString()} {evtTime.toFormat('HH:mm')}</p>
                        </div>
                    })}
                </React.Fragment>
            </>
        }
        
    </StyledGroupDetails>
  )
}

export default GroupDetails
