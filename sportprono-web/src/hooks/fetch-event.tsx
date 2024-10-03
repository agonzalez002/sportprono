import { useState, useEffect } from "react";
import { getEvent } from "../services/eventServices";
import { EventType } from "../interfaces";


function useFetchEvent(eventId: string | undefined, token: string | undefined) {

    const [ eventDetails, setEventDetail ] = useState<EventType | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        if (eventId && token) {
            const getData = async () => {
                setLoading(true);
                const data = await getEvent(eventId, token);
                setEventDetail(data);
                setLoading(false);
            }
            getData();
        }
    }, [eventId, token])

    return [eventDetails, loading]
};

export default useFetchEvent;