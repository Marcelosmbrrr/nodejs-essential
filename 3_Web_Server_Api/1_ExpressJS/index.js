import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { createServer } from "http";

dotenv.config();

import { router } from "./routes/index.js";

/**
 * App Variables
 */

if (!process.env.APP_PORT) {
    process.exit(1);
}

const app = express();
const http = createServer(app);

/**
 *  App Configuration
 */

app.use(cors()); // use cors as default (enable all external domains)
app.use(express.json()); // parses incoming JSON data

/**
 *  App Routes
 */

app.use("/api", router);

/**
 * Server Activation
 */

http.listen(process.env.APP_PORT, () => {
    console.log(`Listening on port ${process.env.APP_PORT}`);
});