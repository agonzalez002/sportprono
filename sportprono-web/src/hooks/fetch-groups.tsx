import { useEffect, useState } from "react";
import { getGroups } from "../services/groupServices";
import { GroupType } from "../interfaces";

function useFetchGroups() {
    const [ groups, setGroups ] = useState<GroupType[] | null>(null);
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