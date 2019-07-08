const mongoose = require('mongoose');

const BranchSchema = mongoose.Schema({
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