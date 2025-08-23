/**
 * Backend tests using Supertest (HTTP) and Nock (mock GitHub API).
 */

const request = require("supertest");
const nock = require("nock");
const app = require("../src/app");

const GITHUB_BASE = "https://api.github.com";

describe("GitHub API routes", () => {
  afterEach(() => {
    // Clean mocks between tests
    nock.cleanAll();
  });

  test("GET /api/search/users requires q", async () => {
    const res = await request(app).get("/api/search/users");
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/q/i);
  });

  test("GET /api/search/users returns simplified users", async () => {
    // Mock GitHub's response
    nock(GITHUB_BASE)
      .get("/search/users")
      .query({ q: "octocat", per_page: 20 })
      .reply(200, {
        total_count: 1,
        items: [
          { id: 1, login: "octocat", avatar_url: "http://avatar" }
        ]
      });

    const res = await request(app).get("/api/search/users?q=octocat");
    expect(res.status).toBe(200);
    expect(res.body.totalCount).toBe(1);
    expect(res.body.items[0]).toEqual({
      id: 1,
      login: "octocat",
      avatarUrl: "http://avatar"
    });
  });

  test("GET /api/users/:username returns user + repos", async () => {
    nock(GITHUB_BASE)
      .get("/users/octocat")
      .reply(200, {
        login: "octocat",
        name: "The Octocat",
        avatar_url: "http://avatar",
        bio: "Mascot",
        html_url: "http://gh/octocat",
        followers: 10,
        following: 1,
        public_repos: 2,
        created_at: "2020-01-01T00:00:00Z"
      });

    nock(GITHUB_BASE)
      .get("/users/octocat/repos")
      .query({ sort: "updated", per_page: 20 })
      .reply(200, [
        {
          id: 11,
          name: "repo-1",
          full_name: "octocat/repo-1",
          description: "Desc",
          stargazers_count: 5,
          forks_count: 1,
          html_url: "http://gh/repo-1",
          updated_at: "2024-01-01T00:00:00Z",
          default_branch: "main",
          owner: { login: "octocat" }
        }
      ]);

    const res = await request(app).get("/api/users/octocat");
    expect(res.status).toBe(200);
    expect(res.body.user.login).toBe("octocat");
    expect(res.body.repos).toHaveLength(1);
  });

  test("GET /api/repos/:owner/:repo returns repo + last 5 commits", async () => {
    nock(GITHUB_BASE)
      .get("/repos/octocat/hello-world")
      .reply(200, {
        id: 99,
        name: "hello-world",
        full_name: "octocat/hello-world",
        description: "Demo repo",
        html_url: "http://gh/repo",
        created_at: "2020-01-01T00:00:00Z",
        updated_at: "2024-01-01T00:00:00Z",
        pushed_at: "2024-07-01T00:00:00Z",
        default_branch: "main",
        stargazers_count: 42,
        forks_count: 3,
        open_issues_count: 0,
        owner: { login: "octocat" }
      });

    nock(GITHUB_BASE)
      .get("/repos/octocat/hello-world/commits")
      .query({ per_page: 5 })
      .reply(200, [
        {
          sha: "abc123",
          commit: {
            message: "Initial commit",
            author: { name: "Alice", date: "2024-07-01T00:00:00Z" }
          },
          html_url: "http://gh/commit/abc123"
        }
      ]);

    const res = await request(app).get("/api/repos/octocat/hello-world");
    expect(res.status).toBe(200);
    expect(res.body.repo.name).toBe("hello-world");
    expect(res.body.commits[0].message).toMatch(/Initial/);
  });
});
