import { URLs } from '../constansts/url';

const fetchData = async (endpoint: string = '', type: 'GET' | 'POST' | 'PUT' | 'DELETE', data = {}) => {
    // Default options are marked with *
    try {
        const response = await fetch(URLs.URL_SERVER_DEFAULT + endpoint, {
            method: type, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.log("Error: ", error);
    }
}

const getData = async (endpoint: string = '') => {
    // Default options are marked with *
    try {
        const response = await fetch(URLs.URL_SERVER_DEFAULT + endpoint, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });

        return response.json();
    } catch (error) {
        console.log("Error: ", error);
    }
}


const get = async (url: string = '') => {
    // Default options are marked with *
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        });

        return response.json();
    } catch (error) {
        console.log("Error: ", error);
    }
}

const post = async (url: string = '', type: 'GET' | 'POST' | 'PUT' | 'DELETE', data = {}) => {
    // Default options are marked with *
    try {
        const response = await fetch(url, {
            method: type, // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });

        return response.json(); // parses JSON response into native JavaScript objects
    } catch (error) {
        console.log("Error: ", error);
    }
}



export { fetchData, getData, get, post }