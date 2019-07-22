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


[
    {
        "playlist": {
            "_id": "5d345d5fbc88b0a3c05706f9",
            "name": "New",
            "endDate": "2019-07-19T20:00:00.000Z",
            "startDate": "2019-07-16T20:00:00.000Z",
            "totalTime": 20,
            "currency": true,
            "ticker": true,
            "branch_id": "5d345ce2d64bf0a32cb414b2",
            "createdAt": "2019-07-21T12:41:03.842Z",
            "updatedAt": "2019-07-21T12:41:03.842Z",
            "__v": 0
        },
        "files": [
            {
                "_id": "5d345d5fbc88b0a3c05706fa",
                "url": "dfg",
                "showTime": 11,
                "screen": 1,
                "order": 2,
                "playlistId": "5d345d5fbc88b0a3c05706f9",
                "createdAt": "2019-07-21T12:41:03.852Z",
                "updatedAt": "2019-07-21T12:41:03.852Z",
                "__v": 0
            },
            {
                "_id": "5d345d5fbc88b0a3c05706fb",
                "url": "sssss",
                "showTime": 12,
                "screen": 2,
                "order": 1,
                "playlistId": "5d345d5fbc88b0a3c05706f9",
                "createdAt": "2019-07-21T12:41:03.853Z",
                "updatedAt": "2019-07-21T12:41:03.853Z",
                "__v": 0
            },
            {
                "_id": "5d345d5fbc88b0a3c05706fc",
                "url": "asds",
                "showTime": 10,
                "screen": 1,
                "order": 1,
                "playlistId": "5d345d5fbc88b0a3c05706f9",
                "createdAt": "2019-07-21T12:41:03.853Z",
                "updatedAt": "2019-07-21T12:41:03.853Z",
                "__v": 0
            }
        ]
    },
    {
        "playlist": {
            "_id": "5d345d93bc88b0a3c05706fd",
            "name": "New2",
            "endDate": "2019-07-19T20:00:00.000Z",
            "startDate": "2019-07-16T20:00:00.000Z",
            "totalTime": 20,
            "currency": true,
            "ticker": true,
            "branch_id": "5d345ce2d64bf0a32cb414b2",
            "createdAt": "2019-07-21T12:41:55.985Z",
            "updatedAt": "2019-07-21T12:41:55.985Z",
            "__v": 0
        },
        "files": [
            {
                "_id": "5d345d93bc88b0a3c05706fe",
                "url": "dfg",
                "showTime": 11,
                "screen": 1,
                "order": 2,
                "playlistId": "5d345d93bc88b0a3c05706fd",
                "createdAt": "2019-07-21T12:41:55.993Z",
                "updatedAt": "2019-07-21T12:41:55.993Z",
                "__v": 0
            },
            {
                "_id": "5d345d93bc88b0a3c05706ff",
                "url": "sssss",
                "showTime": 12,
                "screen": 2,
                "order": 1,
                "playlistId": "5d345d93bc88b0a3c05706fd",
                "createdAt": "2019-07-21T12:41:55.994Z",
                "updatedAt": "2019-07-21T12:41:55.994Z",
                "__v": 0
            },
            {
                "_id": "5d345d93bc88b0a3c0570700",
                "url": "asds",
                "showTime": 10,
                "screen": 1,
                "order": 1,
                "playlistId": "5d345d93bc88b0a3c05706fd",
                "createdAt": "2019-07-21T12:41:55.994Z",
                "updatedAt": "2019-07-21T12:41:55.994Z",
                "__v": 0
            }
        ]
    }
]