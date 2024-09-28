// @ts-ignore TS6133
import React from 'react';
import { useLocation } from 'react-router-dom';

function GroupAdmin() {

    const { state } = useLocation();

    return (
        <>
        
            <h1>Admin page for group {state.group.name}</h1>

        </>
    )
}

export default GroupAdmin;