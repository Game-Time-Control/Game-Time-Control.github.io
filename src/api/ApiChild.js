import {apiUrl} from "./Api";

export function getAllChildren(parent) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    return fetch(`${apiUrl}/parent/${parent}/children`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}