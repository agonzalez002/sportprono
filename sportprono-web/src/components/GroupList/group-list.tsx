import React, { useState, useEffect } from 'react';
import { StyledGroupContent, StyledLink } from './StyledGroupList';
import { getGroups } from '../../services/groupServices';

interface Group {
  id: number,
  name: string,
  location: string,
  description: string | null,
}

function GroupList() {

  const [ groups, setGroups ] = useState<Group[] | null>(null);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError ] = useState<boolean | null>(null);
  
  useEffect(() => {
    setLoading(true);
    const getData = async () => {
        await getGroups().then( data => {
          setLoading(false);
          setGroups(data);
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
    <StyledGroupContent>
      { groups && groups.map((group: Group) => {
        return (
          <StyledLink key={group.id} to={`/details/${group.id}`}>
            {group.name} group
          </StyledLink>
        )        
      })}
    </StyledGroupContent>
  )
}

export default GroupList
