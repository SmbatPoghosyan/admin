const express = require('express');
const router = express.Router();
const playlists = require('../controllers/playlist.controller');

// Create a new Playlist
router.post('/', playlists.create);

// Retrieve all Playlists
router.get('/', playlists.findAll);

// // Retrieve Branch's playlists
router.get('/:branchId', playlists.findBranchePlaylists);
//
// Retrieve a single Playlist with playlistId
router.get('/:playlistId', playlists.findOne);

// Update a Playlist with playlistId
router.put('/:playlistId', playlists.update);

// Delete a Playlist with playlistId
router.delete('/:playlistId', playlists.delete);


module.exports = router;