/**
 * src/middleware/errorHandler.js
 * -------------------------------
 * Contains common error-handling middleware to keep route files clean.
 */

/**
 * notFoundHandler
 * Responds with 404 JSON when no route matches.
 */
function notFoundHandler(req, res, _next) {
  res.status(404).json({ error: "Route not found" });
}

/**
 * errorHandler
 * Logs errors and responds with a safe message. The status code defaults to 500.
 */
function errorHandler(err, _req, res, _next) {
  // Log the full error for debugging (avoid leaking sensitive details to the client)
  console.error("[error]", err?.message || err);
  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Internal Server Error" });
}

module.exports = { notFoundHandler, errorHandler };
