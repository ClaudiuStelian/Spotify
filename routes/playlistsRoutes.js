const express = require("express");
const router = express.Router();
const { createPlaylist, getPlaylist } = require("../controllers/playlistsController");

router.route('/').post(createPlaylist);
router.route('/:id').get(getPlaylist);


module.exports = router