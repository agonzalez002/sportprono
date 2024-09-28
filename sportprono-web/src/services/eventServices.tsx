import status from "../utils";
import { PlaceBetType } from "../interfaces";

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

export function placeBet(bet: PlaceBetType, token: string) {
    return fetch('http://127.0.0.1:8000/api/bets/place_bet/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(bet),
    })
    .then(status)
    .catch(e => {
        console.log(e);
    })
}
