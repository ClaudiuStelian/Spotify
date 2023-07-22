const playlistService = require("../services/playlistsServices");
const pool = require("../config/database");

//@desc Create New playlist
//@route POST /playlists
//@access public
const createPlaylist = (req, res) => {
    console.log("The request body is:", req.body);
    const { playlistName, playlistDescription, tracks } = req.body;
    const playlistData = {
        playlistName,
        playlistDescription,
        tracks
    };

    playlistService.create(playlistData, (error, result) => {
        if (error) {
            console.error("Error creating playlist:", error);
            res.status(500).json({ error: "Failed to create playlist" });
        } else {
            console.log("Playlist created successfully!");
            res.status(201).json(result);
        }
    });
};

//@desc Get playlist
//@route GET /playlists/:id
//@access public
const getPlaylist = (req, res) => {
    const playlistID = req.params.id;
    playlistService.getPlaylist(playlistID, (error, playlist) => {
        if (error) {
            console.error("Error fetching playlist:", error);
            res.status(404).json({ message: "Playlist not found" });
        } else {
            res.status(200).json(playlist);
        }
    });
};

module.exports = { createPlaylist, getPlaylist };