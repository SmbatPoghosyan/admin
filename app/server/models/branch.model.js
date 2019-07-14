const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BranchSchema = Schema({
    name: {
        type: String,
        required: true
    },
    screens: {
        type: Number,
        required: true
    },
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Branch', BranchSchema);