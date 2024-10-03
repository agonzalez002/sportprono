import { useEffect, useState } from "react";
import { getGroups } from "../services/groupServices";
import { GroupType } from "../interfaces";

function useFetchGroups() {
    const [ groups, setGroups ] = useState<GroupType[] | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const data = await getGroups();
            setGroups(data);
            setLoading(false);
        };
        getData();
    }, []);

    return [groups, loading];
};

export default useFetchGroups;