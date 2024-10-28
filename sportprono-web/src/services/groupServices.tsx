import { status } from "../utils";

export function getGroup(id: string) {
    return fetch(`http://127.0.0.1:8000/api/groups/${id}/`)
    .then(status)
    .catch(e => {
        console.log(e);
    })
};

export function getGroups() {
    return fetch('http://127.0.0.1:8000/api/groups/')
    .then(status)
    .catch(e => {
        console.log(e);
    });
};

export function joinGroup(data: {group: number, user: number}, token: string) {
    return fetch(`http://localhost:8000/api/members/join/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data)
    })
    .then(status)
    .catch(e => {
        console.log(e);
    });
}

export function leaveGroup(data: {group: number, user: number}, token: string) {
    return fetch(`http://localhost:8000/api/members/leave/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data)
    })
    .then(status)
    .catch(e => {
        console.log(e);
    });
}

export function createGroup(data: BodyInit, token: string) {
    return fetch('http://localhost:8000/api/groups/', {
        method: 'POST',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: data,
    })
    .then(status)
    .catch(e => {
        console.log(e);
    });
}