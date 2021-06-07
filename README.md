# Tic-Tac-Toe API

A web API that implements [Tic-Tac-Toe](https://www.exploratorium.edu/brain_explorer/tictactoe.html).

## Game Requirements

-   This server will be provided the current board in a GET request using the query parameter `board`
-   This server should always play as o
-   Either player should be able to move first
-   If the board string doesn't represent a valid board, or it's not o's turn, this server should return an HTTP response code 400 (Bad Request)
-   If the board is valid, this server should return a string representing the same board with the one move added for o

### Representation

The board should be encoded as a nine-character string where each character is either o, x or (empty). The nine characters are the board read left-to-right, top-to-bottom.

As an example, the game board

```
x|o|
-+-+-
o| |
-+-+-
 |x|
```

would be be encoded as `xo o x`. An empty board would be nine blanks.

### Example Usage

```
> curl -s YOUR_URL?board=+++++++++
> o
```

```
> curl -s YOUR_URL?board=+xxo++o++
> oxxo o
```

## Implementation

The API is a Dockerized Node application based on my [template-node-app](https://github.com/p3zo/template-node-app) repository.

It includes a Docker image with the following app dependencies installed:

-   express for serving the application
-   nodemon for code reloading in development
-   eslint to lint the code base
-   mocha and chai for unit testing
-   chai-http for end-to-end testing
-   babel for the ES2015-and-up desugarings

Another Docker container runs an nginx reverse-proxy to sit in front of the node app. The two services are managed with docker-compose.

## Development

### Setup

Install [Docker Compose](https://docs.docker.com/compose/install) and start the Docker daemon.

Rename `env_file.template` to `env_file` and fill in the secrets. **Do NOT commit this file.**

Rename `docker-compose.override.yml.example` to `docker-compose.override.yml`.

### Usage

See the [Makefile](./Makefile) for all available actions.

###### Install the app inside a container

```bash
make build
```

###### Start the containers

```bash
make start
```

###### Run tests

```bash
make test
```

###### Lint the project files

```bash
make lint
```

###### Get a shell inside the container

```bash
make shell
```

###### Start the application server

```bash
make server
```

###### Stop the container

```bash
make stop
```
