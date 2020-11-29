import axios from "axios";
import {apiURL} from "../env";
import AlertMe from "../components/ConfirmAlert/AlertMe";

export function getAllUsers(setUsers)
{
  axios
    .get(apiURL + "/users/", {})
    .then(response =>
    {
      setUsers(response.data);
    })
    .catch(error =>
    {
      console.error(error.message);
    });
}

export function createUser(username, password, setUsers, handleClose)
{
  const token = localStorage.getItem("token");
  axios
    .post(apiURL + "/users/", {
      username,
      password,
      token
    })
    .then(response =>
    {
      getAllUsers(setUsers);
      handleClose();
      AlertMe(response.data.message);
    })
    .catch(error =>
    {
      AlertMe(error.message);
    });
}

export function deleteUser(id, setUsers)
{
  const token = localStorage.getItem("token");
  axios
    .delete(apiURL + "/users/" + id + "?token=" + token)
    .then(response =>
    {
      getAllUsers(setUsers);
      AlertMe(response.data.message);
    })
    .catch(error =>
    {
      AlertMe(error.message);
    });
}

export function updateUser(id, new_password, old_password, setUsers)
{
  const token = localStorage.getItem("token");
  axios
    .put(apiURL + "/users/" + id, {
      new_password,
      old_password,
      token
    })
    .then(response =>
    {
      getAllUsers(setUsers);
      AlertMe(response.data.message);
    })
    .catch(error =>
    {
      console.log(error.message);
      AlertMe(error.message);
    });
}
