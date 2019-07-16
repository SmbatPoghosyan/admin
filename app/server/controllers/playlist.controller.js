const Playlist = require('../models/playlist.model');
const Branch = require('../models/branch.model');

// Create and Save a new Playlist
exports.create = (req, res) => {

    Branch.findById(req.body.branch_id)
        .then(branch => {
            if(!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            branch.playlists.push({
                name: req.body.name,
                endDate: req.body.endDate,
                currency: req.body.currency,
                ticker: req.body.ticker,
            });
            branch.save()
                .then(data => {
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


    // if(!req.body.name) {
    //     return res.status(400).send({
    //         message: "Playlist name can not be empty"
    //     });
    // }
    //
    // // Create a Playlist
    // const playlist = new Playlist({
    //     name: req.body.name,
    //     endDate: req.body.endDate,
    //     currency: req.body.currency,
    //     ticker: req.body.ticker,
    //     branch_id: req.body.branch_id,
    // });
    //
    // // Save Playlist in the database
    // playlist.save()
    //     .then(data => {
    //         res.send({data, message: "You successfully create new playlist!"});
    //     }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while creating the playlist."
    //     });
    // });
};

// Retrieve and return all playlists from the database.
exports.findAll = (req, res) => {
    Playlist.find()
        .then(playlists => {
            res.send(playlists);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playlists."
        });
    });
};

// Retrieve and return all playlists by branchId from the database.
exports.findBranchePlaylists = (req, res) => {
    Playlist.find({})
        .populate({
            path : 'teachers' ,
            match : { _id :  req.params.branchId }
        }).then(playlists => {
        res.send(playlists);
    });
    Playlist.find()
        .then(playlists => {
            res.send(playlists);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playlists."
        });
    });
};

exports.findBranchePlaylists = (req, res) => {
    Playlist.
    find({}).
    populate({
        path: 'branches',
        match: { branch_id: req.param.branchId},
    }).then(playlists => {
        res.send(playlists);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving playlists."
        })
    });
};

// Find a single playlist with a playlistId
exports.findOne = (req, res) => {
    Playlist.findById(req.params.playlistId)
        .then(playlist => {
            if(!playlist) {
                return res.status(404).send({
                    message: "Playlist not found with id " + req.params.playlistId
                });
            }
            res.send(playlist);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Playlist not found with id " + req.params.playlistId
            });
        }
        return res.status(500).send({
            message: "Error retrieving playlist with id " + req.params.playlistId
        });
    });
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