/**
 * pages/RepoDetails.jsx
 * ---------------------
 * Displays repository information and the last 5 commit messages.
 */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner.jsx";
import ExternalLink from "../components/ExternalLink.jsx";
import { getJSON } from "../api.js";

export default function RepoDetails() {
  const { owner, repo } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    let ignore = false;
    async function run() {
      try {
        setLoading(true);
        setError("");
        const payload = await getJSON(`/api/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`);
        if (!ignore) setData(payload);
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load repository");
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [owner, repo]);

  if (loading) return <Spinner label="Loading repository..." />;
  if (error) return <div className="card"><strong>Error:</strong> {error}</div>;
  if (!data) return null;

  const { repo: r, commits } = data;

  return (
    <div className="card">
      <h2 style={{ marginBottom: 0 }}>{r.fullName}</h2>
      <div className="small">{r.description || "No description."}</div>
      <div className="small" style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <span>★ {r.stargazersCount}</span>
        <span>⑂ {r.forksCount}</span>
        <span>Default branch: {r.defaultBranch}</span>
      </div>
      <div style={{ marginTop: 8 }}>
        <ExternalLink href={r.htmlUrl}>Open on GitHub</ExternalLink>
      </div>

      <h3 style={{ marginTop: 24 }}>Last 5 commits</h3>
      <ul>
        {commits.map((c) => (
          <li key={c.sha} style={{ marginBottom: 8 }}>
            <div><strong>{c.message?.split("\n")[0]}</strong></div>
            <div className="small">
              {c.authorName} — {new Date(c.date).toLocaleString()}
              {" · "}
              <a className="external" href={c.htmlUrl} target="_blank" rel="noreferrer">view commit ↗</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
