import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import moment from 'moment';

dotenv.config();

/**
 * App Variables
 */

if (!process.env.APP_PORT) {
    process.exit(1);
}

const app = express();
const httpServer = http.createServer(app);

/**
 *  App Configuration
 */

app.use(cors()); // use cors as default (enable all external domains)
app.use(express.json()); // parses incoming JSON data

/**
 * Http server initialization
 */

httpServer.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`);
});

/*
* Sockets server initialization
* https://socket.io/docs/v4/server-initialization/
*/

const io = new Server(httpServer, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {

    if (socket.id) {

        socket.on("login", (username) => {

            socket.username = username;

            const response = { username };
            socket.emit("login", response);

        });

        socket.on("logout", () => {

            const response = { username: socket.username };
            socket.emit("logout", response);

        });

        socket.on('new-message', (message) => {

            const response = {
                username: socket.username,
                timestamp: moment().format("LT"),
                text: message
            }

            socket.emit("new-message", response);

        });

    } else {
        console.log("Socket connection failed");
    }

});