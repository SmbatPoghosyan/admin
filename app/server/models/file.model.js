const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PlaylistSchema = require('./playlist.model');

const FileSchema = Schema(
    {
        url: {
            type: String,
            required: true
        },
        playlists: [PlaylistSchema],
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('File', FileSchema);