import axios from "axios"
import {
    setCookie,
    getCookie,
    eraseCookie
} from "./cookies";

export function signUp(url, data, sign_up_as) {
    axios.post(`${url}`, data)
        .then(res => {
            if (sign_up_as === "user") {
                console.log("user is login", res);
            } else if (sign_up_as === "company") {
                console.log("company is login", res);
            } else {
                console.log(res);
                setCookie('token', `${res.data.token}`);
                console.log(res.data.message);
            }
        })
        .catch(e => console.log(e.message))
}

export function signIn(url, data) {
    axios.post(`${url}`, data)
        .then(res => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.data);
            console.log(res.data.token);
            console.log(res.data.message);
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