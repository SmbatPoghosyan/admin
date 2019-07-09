const Branch = require('../models/branch.model.js');

// Create and Save a new Branch
exports.create = (req, res) => {
    if(!req.body.name) {
        return res.status(400).send({
            message: "Branch name can not be empty"
        });
    }

    // Create a Branch
    const branch = new Branch({
        name: req.body.name,
        screens: req.body.screens
    });

    // Save Branch in the database
    branch.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all branches from the database.
exports.findAll = (req, res) => {
    Branch.find()
        .then(branches => {
            res.send(branches);
        }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single branch with a branchId
exports.findOne = (req, res) => {
    Branch.findById(req.params.branchId)
        .then(branch => {
            if(!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            res.send(branch);
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

// Update a branch identified by the branchId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name) {
        return res.status(400).send({
            message: "Branch name can not be empty"
        });
    }

    // Find branch and update it with the request body
    Branch.findByIdAndUpdate(req.params.branchId, {
        name: req.body.name,
        screens: req.body.screens
    }, {new: true})
        .then(branch => {
            if(!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            res.send(branch);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Branch not found with id " + req.params.branchId
            });
        }
        return res.status(500).send({
            message: "Error updating branch with id " + req.params.branchId
        });
    });
};

// Delete a branch with the specified branchId in the request
exports.delete = (req, res) => {
    Branch.findByIdAndRemove(req.params.branchId)
        .then(branch => {
            if(!branch) {
                return res.status(404).send({
                    message: "Branch not found with id " + req.params.branchId
                });
            }
            res.send({message: "Branch deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Branch not found with id " + req.params.branchId
            });
        }
        return res.status(500).send({
            message: "Could not delete branch with id " + req.params.branchId
        });
    });
};