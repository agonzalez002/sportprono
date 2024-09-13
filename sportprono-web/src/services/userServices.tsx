function auth(credentials: Object) {
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

export default auth;