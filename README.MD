
# Spotify-Playlists-API

## Description

 The application is a web-based platform developed in collaboration with Spotify. Its main purpose is to allow users to create and manage personalized playlists. The playlists consist of essential information such as a unique Playlist ID, Playlist Name, Playlist Description, Date & Time of creation, and multiple tracks. Each track contains a Track ID, Track Title, and associated Artists with their respective IDs and Names .   


## Usage Guide

 1. Create MySQL DB by running the queries from [Spotify-queries.sql](Spotify-queries.sql)       
 3. Insert the DB server's details in .env file.      
 4. To run the web applicaiton use `npm run start` command.  
 3. For furthure enhencement I recomend running the application using nodemon utilty tool `npm run dev` .   
 4. The web app can also run in a docker by simply running the follwoing terminal commands:    
    4.1. `docker pull mysql:latest`           
    4.2. `docker-compose up -d`  
    4.3. `docker cp create_tables.sql my-mysql-db:/create_tables.sql`         
    4.4. `docker exec -i my-mysql-db mysql -u root -p < create_tables.sql `  
 5. For testing the app use any of :   
            [Spotify.postman_collection.json](Spotify.postman_collection.json)   
            [Spotify-urls.txt](Spotify-urls.txt) 




