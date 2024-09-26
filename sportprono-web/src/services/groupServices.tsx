import status from "../utils";

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