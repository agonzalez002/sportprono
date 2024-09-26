import React from 'react';
import { DateTime } from 'luxon';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { EventType } from '../../interfaces';
import { useNavigate } from 'react-router-dom';

interface EventProps {
    events: EventType[],
}

function EventList({events}: EventProps) {

    const navigate = useNavigate();

    return (
        <>
            <h3>Evenst :</h3>
            { events.map( event => {
                const evtTime = DateTime.fromISO(event.time).setLocale("fr").setZone("Europe/Paris").toUTC();
                return <div key={event.id} onClick={() => navigate(`/event/${event.id}`)}>
                    <p>{event.team1} VS {event.team2} on <CalendarTodayIcon />{evtTime.toLocaleString()} <AccessTimeIcon />{evtTime.toFormat('HH:mm')}</p>
                </div>
            })}
        </>
    )
}

export default EventList;