/**
 * src/api.js
 * ----------
 * Tiny wrapper around `fetch` for GET requests to our own backend.
 * This keeps fetch logic in one place and makes it easy to test.
 */

export async function getJSON(path) {
  // Ensure path starts with /api
  const url = path.startsWith("/api") ? path : `/api${path}`;

  const res = await fetch(url);
  if (!res.ok) {
    // Attempt to parse error payload; fall back to status text
    let message = res.statusText;
    try {
      const err = await res.json();
      message = err.error || message;
    } catch (_) {}
    throw new Error(message || `Request failed with status ${res.status}`);
  }
  return res.json();
}
