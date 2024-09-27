import { useState, useEffect } from "react";
import { getEvent } from "../services/eventServices";
import { EventType } from "../interfaces";


function useFetchEvent(eventId: string | undefined, token: string) {

    const [ eventDetails, setEventDetail ] = useState<EventType | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    // @ts-ignore TS6133
    const [ error, setError ] = useState<boolean | null>(null);

    if (eventId) {
        useEffect(() => {
            const getData = async () => {
                setLoading(true);
                const data = await getEvent(eventId, token);
                setEventDetail(data);
                setLoading(false);
            }
            getData();
        }, [eventId])
    }

    return [eventDetails, loading, error]
};

export default useFetchEvent;