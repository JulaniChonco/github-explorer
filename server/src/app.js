/**
 * src/app.js
 * -----------
 * Configures the Express application: security (Helmet), JSON parsing,
 * CORS (for local dev), routes, and error handling. Exported for tests.
 */

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const githubRouter = require("./routes/github");
const { notFoundHandler, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Apply basic security headers with Helmet.
// Helmet helps secure your Express apps by setting various HTTP headers.
app.use(helmet());

// Parse incoming JSON request bodies.
app.use(express.json());

// Enable CORS for local development.
// In production, consider serving the client from the same host to avoid CORS.
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET"]
  })
);

// Mount all API routes under /api.
// The frontend should call /api/search/users, /api/users/:username, etc.
app.use("/api", githubRouter);

// 404 handler for unknown routes.
app.use(notFoundHandler);

// Centralized error handler to avoid repeating try/catch send logic.
app.use(errorHandler);

module.exports = app;
