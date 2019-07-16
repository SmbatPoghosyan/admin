const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FileSchema = Schema({
    url: {
        type: String,
        required: true
    },
    showTime: {
        type: Date,
        required: true
    },
    screen: {
        type: Number,
        required: true
    },
    order: {
        type: Number,
        required: true
    },
}, {
    timestamps: true
});

const PlaylistSchema = Schema({
    name: {
        type: String,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    totalTime: {
        type: Number,
        required: true
    },
    currency: {
        type: Boolean,
        required: true
    },
    ticker: {
        type: Boolean,
        required: true
    },
    branch_id: { type: Schema.Types.ObjectId, ref: 'Branch' },
    files: [{FileSchema}]
}, {
    timestamps: true
});

module.exports = mongoose.model("Playlist", PlaylistSchema);