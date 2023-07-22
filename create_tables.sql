CREATE DATABASE spotify;

USE spotify;

CREATE TABLE playlists (
  playlist_id INT AUTO_INCREMENT PRIMARY KEY,
  playlist_name VARCHAR(255) NOT NULL,
  playlist_description VARCHAR(255),
  date_time DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE tracks (
  track_id INT AUTO_INCREMENT PRIMARY KEY,
  track_title VARCHAR(255) NOT NULL,
  playlist_id INT NOT NULL,
  FOREIGN KEY (playlist_id) REFERENCES playlists (playlist_id)
);

CREATE TABLE artists (
  artist_id INT AUTO_INCREMENT PRIMARY KEY,
  artist_name VARCHAR(255) NOT NULL,
  track_id INT NOT NULL,
  FOREIGN KEY (track_id) REFERENCES tracks (track_id)
);


