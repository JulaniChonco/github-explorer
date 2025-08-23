/**
 * src/index.js
 * -------------
 * Entry point for the Express server. This file creates the HTTP server
 * using the configured Express app from `app.js`. Keeping server creation
 * separate from the app configuration makes testing easier.
 */


const http = require("http");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const githubRoutes = require("./routes/github");

const app = express();
/** The port can be customized via environment variable. */
const PORT = process.env.PORT || 5000;


app.use(helmet()); // ✅ Helmet added here
app.use(cors());
app.use(express.json());

/** Create the HTTP server with our Express app. */
const server = http.createServer(app);
app.use("/api", githubRoutes);

/** Start listening for incoming connections. */
server.listen(PORT, () => {
  console.log(`[server] Listening on http://localhost:${PORT}`);
});
