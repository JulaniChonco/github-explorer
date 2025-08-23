/**
 * src/routes/github.js
 * --------------------
 * Defines the API endpoints the frontend will call. Each endpoint delegates
 * to the service layer which calls the real GitHub REST API.
 */

const express = require("express");
const router = express.Router();

const {
  searchUsers,
  getUserAndRepos,
  getRepoAndCommits
} = require("../services/githubService");

/**
 * GET /api/search/users?q=<query>
 * Performs a GitHub user search and returns a simplified result list.
 */
router.get("/search/users", async (req, res, next) => {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required." });
    }
    const results = await searchUsers(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/users/:username
 * Fetches public profile info for a GitHub user and a list of their repos.
 */
router.get("/users/:username", async (req, res, next) => {
  try {
    const { username } = req.params;
    const payload = await getUserAndRepos(username);
    res.json(payload);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/repos/:owner/:repo
 * Fetches repository details and the last 5 commit messages.
 */
router.get("/repos/:owner/:repo", async (req, res, next) => {
  try {
    const { owner, repo } = req.params;
    const payload = await getRepoAndCommits(owner, repo);
    res.json(payload);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
