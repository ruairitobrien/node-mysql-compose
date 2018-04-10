# node-mysql-compose

A sample project demonstrating a simple local development environment for a nodejs web application connecting to mysql with docker compose.

This project was created using the [express application generator](https://expressjs.com/en/starter/generator.html) with this command:

`express node-mysql-compose -f -e`

## Setup

To use this setup you need to install [docker](https://www.docker.com/) and [docker compose](https://docs.docker.com/compose/).


## Start

`docker-compose up`

> Note, the very first time this is run, mysql will take some time to be created and the node app will fail. The node app will restaet until the connection succeeds. This will only happen the first time docker compose creates these containers.

This will start 2 docker containers. One for mysql. One for the node app. You can access the application at http://localhost:3000

The node app is started with pm2 and will automatically restart whenever you change any server files.

If you want to remove the container you can run:
`docker-compose rm`


