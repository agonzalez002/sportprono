import React, { useState, useEffect } from 'react';

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
        await fetch('http://127.0.0.1:8000/api/groups/')
        .then(resp => resp.json())
        .then( data => {
          setGroups(data);
          setLoading(false);
        }).catch(e => {
          setError(true);
          setLoading(false);
        })
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
    <>
      { groups && groups.map((group: Group) => {
        return <p key={group.id}>{group.name}</p>
      })}
    </>
  )
}

export default GroupList
