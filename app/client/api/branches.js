import axios from 'axios';

export function getAllBranches(self, setBranches){
    axios.get('http://localhost:8000/branches/', {

    })
        .then(response => {
            setBranches(response.data);
        })
        .catch(error => {
        });
}

export function getPlaylistWithTwoScreens(self){
    axios.get('http://localhost:8000/playlists/with2screens', {
    })
        .then(response => {

            self.setState({
                playlists: response.data.playlists,
            });

        })
        .catch(error => {
        });
}