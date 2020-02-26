import axios from "axios"

export function signUp(url, data) {
    axios.post(`${url}`, { data })
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
}



