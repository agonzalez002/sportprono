// @ts-ignore TS6133
import React, { useState } from 'react';
import { GroupType } from '../../interfaces';
import { StyledLink } from './StyledGroupItem';

interface TypeGroup {
    group: GroupType;
}

function GroupItem({group}: TypeGroup) {
    
    return (
        <>
            {
                group 
                &&
                <StyledLink key={group.id} to={`/details/${group.id}`}>
                    {group.name} group
                </StyledLink>
            }
        </>
    )
}

export default GroupItem;