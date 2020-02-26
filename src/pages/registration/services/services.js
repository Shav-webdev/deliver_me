import axios from "axios"

export function signUp(url, data) {
    axios.post(`${url}`, data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(e => console.log(e.message))
}

export function signIn(url, data) {
    axios.post(`${url}`, data)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(e => console.log(e.message))
}

export function getCompanies(url) {
    axios.get(`${url}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .catch(e => console.log(e.message))
}



