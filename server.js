const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/playlists", require("./routes/playlistsRoutes"));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});