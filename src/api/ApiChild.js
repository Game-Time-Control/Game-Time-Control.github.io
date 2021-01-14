import {apiUrl} from "./Api";

export function getAllChildren(auth, parent) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth
        }
    };

    return fetch(`${apiUrl}/parent/${parent}/children`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}

export function getOneChildren(auth, child) {

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth
        }
    };

    return fetch(`${apiUrl}/child/${child}`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}

export function addChildren(auth, parent, data) {

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth
        },
        body: JSON.stringify({
            name: data.name,
        })
    };

    return fetch(`${apiUrl}/parent/${parent}/child/add`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}

export function updateChildren(auth, parent, child, data) {

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth
        },
        body: JSON.stringify(data)
    };

    return fetch(`${apiUrl}/parent/${parent}/child/${child}/update`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}

export function deleteChildren(auth, child) {
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': auth
        },
    };

    return fetch(`${apiUrl}/child/${child}/delete`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}