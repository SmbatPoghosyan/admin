import axios from "axios";
import baseUrl from "./index";

export function getAllBranches(setBranches) {
  axios
    .get(baseUrl + "/branches/", {})
    .then(response => {
      setBranches(response.data);
    })
    .catch(error => {
      alert(error.message);
    });
}

export function getBranchById(id, setBranch, setPlaylists) {
  axios
    .get(baseUrl + "/branches/" + id, {})
    .then(response => {
      console.log(response.data);
      setBranch(response.data.branch);
      setPlaylists(response.data.playlists);
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
      alert("WRONG ID!!!");
    });
}

export function createBranch(name, screens, setBranches, handleClose) {
  axios
    .post(baseUrl + "/branches/", {
      name,
      screens
    })
    .then(response => {
      getAllBranches(setBranches);
      handleClose();
      alert(response.data.message);
    })
    .catch(error => {
      alert(error.message);
    });
}

export function deleteBranch(id, setBranches) {
  axios
    .delete(baseUrl + "/branches/" + id)
    .then(response => {
      getAllBranches(setBranches);
      alert(response.data.message);
    })
    .catch(error => {
      alert(error.message);
    });
}

export function updateBranch(id, name, screens, setBranches) {
  axios
    .put(baseUrl + "/branches/" + id, {
      name,
      screens
    })
    .then(response => {
      getAllBranches(setBranches);
      alert(response.data.message);
    })
    .catch(error => {
      console.log(error);
      alert(error.message);
    });
}
