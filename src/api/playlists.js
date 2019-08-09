import axios from 'axios';

export function getAllBranchePlaylists(branchId, setPlaylists){
    axios.get('/playlists/' + branchId,{})
        .then(response => {
            setPlaylists(response.data);
        })
        .catch(error => {
            alert(error.message);
        });
};

export function getPlaylistById(branchId, paylistId,setPlaylist, setFiles){
    axios.get('/playlists/' + branchId + '/' + paylistId,{})
        .then(response => {
            setPlaylist(response.data.playlist);
            setFiles(response.data.files);
        })
        .catch(error => {
            alert(error.message);
        });
};

export function createBranchPlaylist(branchId, playlistInfo, setPlaylists){
    axios.post('/playlists/' + branchId,{
        ...playlistInfo
    })
        .then(response => {
            getAllBranchePlaylists(branchId, setPlaylists);
        })
        .catch(error => {
            alert(error.message)
        });
};

export function deletePlaylist(playlistId,branchId, setPlaylists){
    axios.delete(
        '/playlists/' + playlistId)
        .then(response => {
            getAllBranchePlaylists(branchId, setPlaylists);
            alert(response.data.message)
        })
        .catch(error => {
            alert(error.message);
        });
};

export function updatePlaylist(playlistId, branchId, playlistInfo, setPlaylists ){
    axios.put('/branches/' + playlistId,{
            ...playlistInfo
        }
    ).then(response => {
        getAllBranchePlaylists(branchId, setPlaylists);
        alert(response.data.message);
    })
        .catch(error => {
            console.log(error);
            alert(error.message);
        });
};