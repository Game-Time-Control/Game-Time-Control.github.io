import {apiUrl} from "./Api";

export function register(data) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    };

    // body: JSON.stringify({
    //     parentName: "Julia",
    //     email: "juliagabriela98@gmail.com",
    //     password: "teste123",
    //     children: [
    //         {name: "Naomi"},
    //         {name: "Joana"}
    //     ]
    // })

    return fetch(`${apiUrl}/register`, requestOptions)
        .then(response => {
            return response;
        }).catch(error => {
            console.log(error)
        });

}