import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventType } from '../../interfaces';
import useFetchEvent from '../../hooks/fetch-event';
import { useAuth } from '../../hooks/useAuth';

function EventDetails() {

    const { authData } = useAuth();
    const { id } = useParams();
    const [ eventDetails, loading, error ] = useFetchEvent(id, authData.token);
    const [ event, setEvent ] = useState<EventType>();

    return (
        <>
            <h1>Event Detail</h1>
        </>
    )
}

export default EventDetails;