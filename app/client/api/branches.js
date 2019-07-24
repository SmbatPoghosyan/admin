import axios from 'axios';

export function getAllBranches(setBranches){
    axios.get('http://localhost:8000/branches/',{})
        .then(response => {
            setBranches(response.data);
        })
        .catch(error => {
            alert(error.message);
        });
};

export function getBranchById(id,setBranch, setPlaylists){
    axios.get('http://localhost:8000/branches/' + id,{})
        .then(response => {
            console.log(response.data)
            setBranch(response.data.branch);
            setPlaylists(response.data.playlists);
        })
        .catch(error => {
            alert(error.message);
        });
};

export function createBranch(name, screens, setBranches, handleClose){
    axios.post('http://localhost:8000/branches/',{
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
};

export function deleteBranch(id, setBranches){
    axios.delete(
        'http://localhost:8000/branches/' + id)
        .then(response => {
            getAllBranches(setBranches);
            alert(response.data.message)
        })
        .catch(error => {
            alert(error.message);
        });
};

export function updateBranch(id, name, screens, setBranches, ){
    axios.put('http://localhost:8000/branches/' + id,{
            name,
            screens
        }
    ).then(response => {
        getAllBranches(setBranches);
        alert(response.data.message);
    })
        .catch(error => {
            console.log(error);
            alert(error.message);
        });
};