import {apiUrl} from "./Api";

export function register(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl}/register`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}