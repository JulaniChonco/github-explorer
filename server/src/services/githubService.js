/**
 * src/services/githubService.js
 * -----------------------------
 * All calls to the GitHub REST API live here. This layer isolates third-party
 * fetch logic from Express route handlers and returns clean, simplified objects
 * for the frontend.
 *
 * Notes:
 * - We only use **public** GitHub endpoints; no auth is required for the task.
 * - Unauthenticated requests are limited (~60/hour/IP). Be mindful when testing.
 */

const axios = require("axios");

/** Pre-configured axios instance for GitHub v3 API. */
const gh = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  },
  timeout: 10_000
});

/**
 * searchUsers(query: string)
 * Calls GitHub's search/users endpoint and returns a simplified list.
 */
async function searchUsers(query) {
  const { data } = await gh.get("/search/users", {
    params: { q: query, per_page: 20 }
  });

  return {
    totalCount: data.total_count,
    items: data.items.map((u) => ({
      id: u.id,
      login: u.login,
      avatarUrl: u.avatar_url
    }))
  };
}

/**
 * getUserAndRepos(username: string)
 * Returns a combined object with user profile and a short repo list.
 */
async function getUserAndRepos(username) {
  const [userRes, reposRes] = await Promise.all([
    gh.get(`/users/${encodeURIComponent(username)}`),
    gh.get(`/users/${encodeURIComponent(username)}/repos`, {
      params: { sort: "updated", per_page: 20 }
    })
  ]);

  const user = userRes.data;
  const repos = reposRes.data;

  return {
    user: {
      login: user.login,
      name: user.name,
      avatarUrl: user.avatar_url,
      bio: user.bio,
      htmlUrl: user.html_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      createdAt: user.created_at
    },
    repos: repos.map((r) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      stargazersCount: r.stargazers_count,
      forksCount: r.forks_count,
      htmlUrl: r.html_url,
      updatedAt: r.updated_at,
      defaultBranch: r.default_branch,
      ownerLogin: r.owner?.login
    }))
  };
}

/**
 * getRepoAndCommits(owner: string, repo: string)
 * Returns repository details plus the last 5 commit messages and dates.
 */
async function getRepoAndCommits(owner, repo) {
  const [repoRes, commitsRes] = await Promise.all([
    gh.get(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`),
    gh.get(`/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/commits`, {
      params: { per_page: 5 }
    })
  ]);

  const r = repoRes.data;
  const commits = commitsRes.data;

  return {
    repo: {
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      htmlUrl: r.html_url,
      createdAt: r.created_at,
      updatedAt: r.updated_at,
      pushedAt: r.pushed_at,
      defaultBranch: r.default_branch,
      stargazersCount: r.stargazers_count,
      forksCount: r.forks_count,
      openIssuesCount: r.open_issues_count,
      ownerLogin: r.owner?.login
    },
    commits: commits.map((c) => ({
      sha: c.sha,
      message: c.commit?.message,
      authorName: c.commit?.author?.name,
      date: c.commit?.author?.date,
      htmlUrl: c.html_url
    }))
  };
}

module.exports = { searchUsers, getUserAndRepos, getRepoAndCommits };

