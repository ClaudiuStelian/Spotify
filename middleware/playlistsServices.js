const { query } = require("express");
const pool = require("../config/database");

module.exports = {
    getPlaylist: (playlistID, callBack) => {
        pool.query(
            `SELECT * FROM playlists WHERE playlist_id = ?`,
            [playlistID],
            (error, playlistResults) => {
                if (playlistResults.length === 0) {
                    return callBack({ message: "Playlist not found" });
                }

                const playlist = playlistResults[0];

                pool.query(
                    `SELECT * FROM tracks WHERE playlist_id = ?`,
                    [playlistID],
                    (error, trackResults) => {
                        if (error) {
                            console.error("Error fetching tracks:", error);
                            return callBack({ error: "Failed to fetch tracks" });
                        }

                        const tracks = trackResults;
                        tracks.forEach((track, index) => {
                            pool.query(
                                `SELECT artist_name FROM artists WHERE track_id = ?`,
                                [track.track_id],
                                (error, artistResults) => {
                                    if (error) {
                                        console.error("Error fetching artists:", error);
                                        return callBack({ error: "Failed to fetch artists" });
                                    }

                                    const artists = artistResults.map((artist) => ({
                                        artistName: artist.artist_name,
                                    }));

                                    tracks[index].artists = artists;

                                    if (index === tracks.length - 1) {
                                        playlist.tracks = tracks;
                                        return callBack(null, playlist);
                                    }
                                }
                            );
                        });
                    }
                );
            }
        );
    },

    create: (data, callBack) => {
        const { playlistName, playlistDescription, tracks } = data;
        if (!playlistName || !playlistDescription || !tracks) {
            return callBack(null, { message: "All fields are mendatory" })
        } else {
            pool.query(
                `INSERT INTO playlists (playlist_name, playlist_description) VALUES (?, ?)`,
                [playlistName, playlistDescription],
                (error, results) => {
                    if (error) {
                        return callBack(error);
                    }

                    const playlistID = results.insertId;

                    if (Array.isArray(tracks)) {
                        let trackInsertValues = [];
                        let artistInsertValues = [];

                        tracks.forEach((track) => {
                            const { trackTitle, artists } = track;
                            trackInsertValues.push([trackTitle, playlistID]);

                            if (Array.isArray(artists)) {
                                artists.forEach((artist) => {
                                    const { artistID, artistName } = artist;
                                    artistInsertValues.push([artistID, artistName]);
                                });
                            }
                        });

                        pool.query(
                            `INSERT INTO tracks (track_title, playlist_id) VALUES ?`,
                            [trackInsertValues],
                            (error, results) => {
                                if (error) {
                                    return callBack(error);
                                }

                                const insertedTrackIDs = results.insertId;

                                pool.query(
                                    `INSERT INTO artists (artist_id, artist_name, track_id) VALUES ?`,
                                    [artistInsertValues.map((values) => [...values, insertedTrackIDs])],
                                    (error, results) => {
                                        if (error) {
                                            return callBack(error);
                                        }

                                        return callBack(null, { message: "Playlist created successfully!", playlistID });
                                    }
                                );
                            }
                        );
                    } else {
                        return callBack(null, { message: "Playlist created successfully!", playlistID });
                    }
                }
            );
        }
    }
};
