import axios from "axios";
import {apiURL} from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";

export function getAllUsers(callback)
{
    axios
        .get(apiURL + "/users/", {})
        .then(json =>
        {
            if (callback)
            {
                callback("success", json.data);
            }
        })
        .catch(error =>
        {
            if (callback)
            {
                callback("error");
            }
        });
}

export function createUser(username, password, callback)
{
    axios
        .post(apiURL + "/users/", {
            username,
            password,
            token: localStorage.getItem("token")
        })
        .then(response =>
        {
            if (callback)
            {
                callback("success");
            }
            AlertMe(response.data.message);
        })
        .catch(error =>
        {
            if (callback)
            {
                callback("error");
            }
            AlertMe(error.response.data.message);
        });
}

export function deleteUser(id, callback)
{
    axios
        .delete(apiURL + "/users/" + id + "?token=" + localStorage.getItem("token"))
        .then(response =>
        {
            if (callback)
            {
                callback();
            }
            AlertMe(response.data.message);
        })
        .catch(error =>
        {
            AlertMe(error.response.data.message);
        });
}

export function updateUser(id, changeObj, callback)
{
    const {username, password, oldpassword} = changeObj;

    let objToEdit = {};

    if (oldpassword && password)
    {
        objToEdit.oldpassword = oldpassword;
        objToEdit.password = password;
    }

    if (username)
    {
        objToEdit.username = username;
    }

    axios
        .put(apiURL + "/users/" + id, {...objToEdit, token: localStorage.getItem("token")})
        .then(response =>
        {
            if (callback)
            {
                callback("success");
            }
            AlertMe(response.data.message);
        })
        .catch(error =>
        {
            if (callback)
            {
                callback("error");
            }
            AlertMe(error.response.data.message);
        });
}
