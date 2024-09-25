import { UserDataSignUpType, ChangePasswordType } from "../interfaces";

export function auth(credentials: Object) {
    return fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    }).then(resp => resp.json())
    .catch( e => {
        console.log(e);
    })
}

export function signUp(userData: UserDataSignUpType) {
    return fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    }).then(resp => resp.json())
    .catch( e => {
        console.log(e);
    });
}

export function uploadAvatar(profileId: number, data: any) {
    return fetch(`http://localhost:8000/api/profile/${profileId}/`, {
        method: 'PUT',
        body: data,
    }).then(resp => resp.json())
    .catch( e => {
        console.log(e);
    });
}

export function changePassword(passwordData: ChangePasswordType, userId: number) {
    return fetch(`http://localhost:8000/api/users/${userId}/change_password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(passwordData),
    }).then(resp => resp.json())
    .catch( e => {
        console.log(e);
    });
}