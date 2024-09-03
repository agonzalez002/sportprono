// @ts-ignore TS6133
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledGroupDetails, StyledLink } from './StyledGroupDetails';
import { ArrowBack } from '@mui/icons-material';
import { getGroup } from '../../services/groupServices';

interface Group {
    id: number,
    name: string,
    location: string,
    description: string | null,
  }

function GroupDetails() {

    const { id } = useParams();

    const [ groupDetails, setGroupDetail ] = useState<Group | null>(null);
    const [ loading, setLoading ] = useState<boolean>(true);
    const [ error, setError ] = useState<boolean | null>(null);
    
    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            await getGroup(id as string).then( data => {
                setLoading(false);
                setGroupDetail(data);
            }).catch(e => {
                setError(e);
            });
        };
        getData();
    }, []);

    if (error) {
        return <h1>Error !</h1>;
    };

    if (loading) {
        return <h1>Loading...</h1>;
    };

  return (
    <StyledGroupDetails>
        <StyledLink to="/"><ArrowBack />back</StyledLink>
        <h1>Details here for group {id} !</h1>
        <p>Name: {groupDetails?.name}</p>
        <p>Description: {groupDetails?.description}</p>
        <p>Location: {groupDetails?.location}</p>
    </StyledGroupDetails>
  )
}

export default GroupDetails
