import { UserDataSignUpType, ChangePasswordType, ChangeUserDataType, ForgotPwdType } from "../interfaces";
import { status } from "../utils";

export function auth(credentials: object) {
    return fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
    })
    .then(status)
    .catch( (e) => {
        console.log(e);
        throw new Error("Nom d'utilisateur ou mot de passe incorrect !");
    })
}

export function signUp(userData: UserDataSignUpType) {
    return fetch('http://localhost:8000/api/users/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(status)
    .catch( e => {
        console.log(e);
    });
}

export function uploadAvatar(profileId: number, data: BodyInit, token: string) {
    return fetch(`http://localhost:8000/api/profile/${profileId}/`, {
        method: 'PUT',
        headers: {
            'Authorization': `Token ${token}`,
        },
        body: data,
    })
    .then(status)
    .catch( e => {
        console.log(e);
    });
}

export function changePassword(passwordData: ChangePasswordType, userId: number, token: string) {
    return fetch(`http://localhost:8000/api/users/${userId}/change_password/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(passwordData),
    })
    .then(status)
    .catch( e => {
        console.log(e);
    });
}

export function changeUserData(userData: ChangeUserDataType, userId: number, token: string) {
    return fetch(`http://localhost:8000/api/users/${userId}/change_data/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(userData),
    })
    .then(status)
    .catch( e => {
        console.log(e);
    });
}

export function forgotPwd(email: ForgotPwdType) {
    return fetch('http://localhost:8000/api/users/forgot_password/', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email),
    })
    .then(status)
    .catch( e => {
        console.log(e);
    });
};