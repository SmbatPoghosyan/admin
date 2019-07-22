const Playlist = require('../models/playlist.model');
const Branch = require('../models/branch.model');
const File = require('../models/file.model');

// Create and Save a new Playlist
exports.create = (req, res) => {
    Branch.findById(req.params.branchId)
        .then(branch => {
            if(!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            console.log(req.body)
            if(!req.body.name) {
                return res.status(400).send({
                    message: "Playlist name can not be empty"
                });
            }if(!req.body.startDate) {
                return res.status(400).send({
                    message: "Playlist start date can not be empty"
                });
            }if(!req.body.endDate) {
                return res.status(400).send({
                    message: "Playlist end date can not be empty"
                });
            }if(!req.body.totalTime) {
                return res.status(400).send({
                    message: "Playlist total time can not be empty"
                });
            }

            const playlist = new Playlist({
                    name: req.body.name,
                    endDate: req.body.endDate,
                    startDate: req.body.startDate,
                    totalTime: req.body.totalTime,
                    currency: req.body.currency,
                    ticker: req.body.ticker,
                    branch_id: req.params.branchId,
                });
            playlist.save()
                .then(data => {
                    console.log(data)
                    JSON.parse(req.body.files).forEach((item) => {
                        const file = new File({
                            url: item.url,
                            showTime: item.showTime,
                            screen: item.screen,
                            order: item.order,
                            playlistId: data._id
                        });

                       file.save()
                            .then()
                            .catch(err => console.log(err))
                    });


                    res.send({data, message: "You successfully create new playlist!"});
                }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the playlist."
                });
            });

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Branch not found with id " + req.params.branchId
            });
        }
        return res.status(500).send({
            message: "Error retrieving branch with id " + req.params.branchId
        });
    });
};

// Retrieve and return all playlists by branchId from the database.
exports.findBranchePlaylists = async function(req, res) {
    let data = [];
    let playlists = await Playlist.find({branch_id: req.params.branchId});
    if(req.params.withFiles){
        for(let i=0; i < playlists.length; i++){
            let files = await File.find({playlistId: playlists[i]._id });
            await data.push({playlist: playlists[i], files});
        }
    }
    data = req.params.withFiles ? data : playlists;
    res.send(data);
};


// Find a single playlist with a playlistId
exports.findOne =  async function(req, res) {
    let data = [];
    let branch = await Branch.findById(req.params.branchId);
    if(!branch){
        return res.status(404).send({
            message: "Branch not found with id " + req.params.branchId
        });
    }
    let playlist = await Playlist.findById(req.params.playlistId);
    if(!playlist){
        return res.status(404).send({
            message: "Playlist not found with id " + req.params.playlistId
        });
    }
    let files = await File.find({playlistId: playlist._id });
    res.send({playlist, files});
};

// Update a playlist identified by the playlistId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Playlist name can not be empty"
        });
    }

    // Find playlist and update it with the request body
    Playlist.findByIdAndUpdate(req.params.playlistId, {
        name: req.body.name,
        screens: req.body.screens
    }, {new: true})
        .then(playlist => {
            if(!playlist) {
                return res.status(404).send({
                    message: "Playlist not found with id " + req.params.playlistId
                });
            }
            res.send({message: "You successfully update playlist!"});
        }).catch(err => {
        console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Playlist not found with id " + req.params.playlistId
            });
        }
        return res.status(500).send({
            message: "Error updating playlist with id " + req.params.playlistId
        });
    });
};

// Delete a playlist with the specified playlistId in the request
exports.delete = (req, res) => {
    Playlist.findByIdAndRemove(req.params.playlistId)
        .then(playlist => {
            if(!playlist) {
                return res.status(404).send({
                    message: "Playlist not found with id " + req.params.playlistId
                });
            }
            res.send({message: "Playlist deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Playlist not found with id " + req.params.playlistId
            });
        }
        return res.status(500).send({
            message: "Could not delete playlist with id " + req.params.playlistId
        });
    });
};