/**
 * pages/UserDetails.jsx
 * ---------------------
 * Displays a user's profile and a list of some of their repositories.
 */

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import ExternalLink from "../components/ExternalLink.jsx";
import { getJSON } from "../api.js";

export default function UserDetails() {
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        setLoading(true);
        setError("");
        const payload = await getJSON(`/api/users/${encodeURIComponent(username)}`);
        if (!ignore) setData(payload);
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load user");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [username]);

  if (loading) return <Spinner label="Loading user..." />;
  if (error) return <div className="card"><strong>Error:</strong> {error}</div>;
  if (!data) return null;

  const { user, repos } = data;

  return (
    <div className="card">
      <div style={{ display: "flex", gap: 16 }}>
        <img
          src={user.avatarUrl}
          alt={`${user.login} avatar`}
          width="96"
          height="96"
          style={{ borderRadius: "50%" }}
        />
        <div>
          <h2>{user.name || user.login}</h2>
          <div className="small" style={{ marginBottom: 8 }}>{user.bio || "No bio provided."}</div>
          <div className="small" style={{ display: "flex", gap: 16 }}>
            <span>Followers: {user.followers}</span>
            <span>Following: {user.following}</span>
            <span>Public repos: {user.publicRepos}</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <ExternalLink href={user.htmlUrl}>View on GitHub</ExternalLink>
          </div>
        </div>
      </div>

      <h3 style={{ marginTop: 24 }}>Repositories</h3>
      <div className="grid">
        {repos.map((r) => (
          <div key={r.id} className="card">
            <strong>{r.name}</strong>
            <div className="small" style={{ margin: "6px 0" }}>{r.description || "No description."}</div>
            <div className="small" style={{ display: "flex", gap: 12 }}>
              <span>★ {r.stargazersCount}</span>
              <span>⑂ {r.forksCount}</span>
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 12 }}>
              <Link to={`/repo/${r.ownerLogin}/${r.name}`}>Repo details</Link>
              <ExternalLink href={r.htmlUrl}>Open on GitHub</ExternalLink>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
