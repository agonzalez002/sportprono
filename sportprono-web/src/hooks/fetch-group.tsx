import { useState, useEffect } from "react";
import { getGroup } from "../services/groupServices";

interface Group {
    id: number,
    name: string,
    location: string,
    description: string | null,
}

function useFetchGroup(groupId: string | undefined) {

    const [ groupDetails, setGroupDetail ] = useState<Group | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    // @ts-ignore TS6133
    const [ error, setError ] = useState<boolean | null>(null);

    if (groupId) {
        useEffect(() => {
            const getData = async () => {
                setLoading(true);
                const data = await getGroup(groupId);
                setGroupDetail(data);
                setLoading(false);
            }
            getData();
        }, [groupId])
    }

    return [groupDetails, loading, error]
};

export default useFetchGroup;