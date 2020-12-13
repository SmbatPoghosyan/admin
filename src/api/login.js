import axios from "axios";
import {apiURL} from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";

export function login(username, password, cb)
{
    axios.post(apiURL + "/users/login/", {
        username,
        password
    }).then(response =>
    {
        if (response.data && response.data.token)
        {
            localStorage.setItem("token", response.data.token);
        }
        if (response.data.success)
        {
            localStorage.setItem("user", response.data.data.username);
            localStorage.setItem("id", response.data.data._id);
            cb();
        }
    }).catch(error =>
    {
        console.error(error.response.data.message);
        AlertMe(error.response.data.message);
    });
}
