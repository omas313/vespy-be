## Introduction

This project is the backend of Vespy, an imaginary [vespa](https://www.google.com/search?q=vespa&client=opera-gx&hs=PWb&sxsrf=AOaemvLKOY_v7rCQZjy9NIzp188iTT9hjg:1636489725379&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjLwommj4z0AhXE4KQKHW8iB_YQ_AUoAXoECAIQAw&biw=1503&bih=759&dpr=1.25) rental app.

Created with Node.js for practice purposes. It uses Express.js and MongoDB, and is consumed by a Front-End React app.

## Setup

### Install Node and MongoDB

Intall Node.js.
Install MongoDB Community Edition (free).

Open terminal and run DB server:

    mongod

### Install the Dependencies

In root project folder:

    npm i

### Seed the DB

    node seed.js

### Start the Server

    node index.js

This will launch the Node server on port 3900.

### Interact with the Server

Open up a browser and head over to:

    http://localhost:3900/api/vespe

It should respond with a list of Vespe.
