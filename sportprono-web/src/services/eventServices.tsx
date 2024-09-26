import status from "../utils";

export function getEvent(id: string, token: string) {
    return fetch(`http://127.0.0.1:8000/api/events/${id}/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
    })
    .then(status)
    .catch(e => {
        console.log(e);
    })
};