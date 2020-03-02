import axios from "axios";
import { getCookie, setCookie } from "./cookies";
import { message } from "antd";
import history from "../../../routes/history";

export const successMessage = (msg = "") => {
  message.success(msg);
};

export const errorMessage = (msg = "") => {
  message.error(msg);
};

export function signUp(url, data) {
  axios
    .post(`${url}`, data)
    .then(res => {
      successMessage(`${res.data.message}, please login for continue`);
    })
    .catch(e => {
      errorMessage(`Error.${e.response.data.message}`);
    });
}

export function signIn(url, data, redirectUrl = "/") {
  axios
    .post(`${url}`, data)
    .then(res => {
      setCookie("token", `${res.data.token}`);
      successMessage("You will redirected to your profile soon");
      if (!getCookie("token")) {
        history.push("/");
      } else {
        history.push(redirectUrl);
      }
    })
    .catch(e => {
      errorMessage(e.response.data.message);
    });
}
