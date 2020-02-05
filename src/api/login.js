import axios from "axios";
import { apiURL } from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";


export function login(username, password, cb)
{
    axios.post(apiURL + "/users/login/", {
        username,
        password
    }).then(response => {
        if (response.data && response.data.token) {
            localStorage.setItem("token", response.data.token);
        }
        if(response.data.success){
            localStorage.setItem("user", response.data.data.username);
            cb();
        }
    }).catch(error => {
        console.log(error.message)
        AlertMe(error.message);
    });
}
