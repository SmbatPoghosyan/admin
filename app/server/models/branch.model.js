const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Playlists = require('./playlist.model')



const BranchSchema = Schema({
    name: {
        type: String,
        required: true
    },
    screens: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', BranchSchema);