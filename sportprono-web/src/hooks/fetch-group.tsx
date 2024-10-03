import { useState, useEffect } from "react";
import { getGroup } from "../services/groupServices";
import { GroupFullType } from "../interfaces";


function useFetchGroup(groupId: string | undefined) {

    const [ groupDetails, setGroupDetail ] = useState<GroupFullType | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);

    useEffect(() => {
        if (groupId) {
            const getData = async () => {
                setLoading(true);
                const data = await getGroup(groupId);
                setGroupDetail(data);
                setLoading(false);
            }
            getData();
        }
    }, [groupId]);

    return [groupDetails, loading]
};

export default useFetchGroup;