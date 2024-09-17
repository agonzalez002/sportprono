import { useState, useEffect } from "react";
import { getGroup } from "../services/groupServices";
import { GroupType } from "../interfaces";


function useFetchGroup(groupId: string | undefined) {

    const [ groupDetails, setGroupDetail ] = useState<GroupType | null>(null);
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