import axios from "axios"
import {setCookie} from "./cookies";
import { message } from 'antd';


export const successMessage = (msg = "") => {
    message.success(msg);
};

export const errorMessage = (msg= "") => {
    message.error(msg);
};

export function signUp(url, data, sign_up_as) {
    axios.post(`${url}`, data)
        .then(res => {
            console.log(res);
            successMessage(`${res.data.message}, please login for continue`);
        })
        .catch(e => {
            console.log(e);
            console.log(e.message);
            errorMessage(e.message);
        })
}

export function signIn(url, data) {
    axios.post(`${url}`, data)
        .then(res => {
            setCookie('token',`${res.data.token}`);
            successMessage("You will redirected to your profile soon");
        })
        .catch(e => {
            console.log(e)
            console.log(e.message)
            errorMessage(e.message)
        })
}




