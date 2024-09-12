import { useEffect, useState } from "react";
import { getGroups } from "../services/groupServices";

interface Group {
    id: number,
    name: string,
    location: string,
    description: string | null,
}

function useFetchGroups() {
    const [ groups, setGroups ] = useState<Group[] | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    // @ts-ignore TS6133
    const [ error, setError ] = useState<boolean | null>(null);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await getGroups();
            setGroups(data);
            setLoading(false);
        };
        getData();
    }, []);

    return [groups, loading, error];
};

export default useFetchGroups;