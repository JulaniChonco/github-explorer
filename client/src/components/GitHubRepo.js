import React, { useState } from "react";
import Spinner from "./Spinner";


function GitHubRepo() {
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");
  const [repoData, setRepoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepoData = async () => {
    setLoading(true);
    setError("");
    setRepoData(null);

    try {
      const response = await fetch(`http://localhost:5000/api/repos/${owner}/${repo}`);
      if (!response.ok) {
        throw new Error("Repository not found or error fetching data.");
      }
      const data = await response.json();
      setRepoData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>View GitHub Repository</h2>
      <input
        type="text"
        placeholder="Owner (username)"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Repository name"
        value={repo}
        onChange={(e) => setRepo(e.target.value)}
      />
      <button onClick={fetchRepoData}>Fetch Repo</button>

      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {repoData && (
        <div>
          <h3>{repoData.name}</h3>
          <p>{repoData.description}</p>
          <p>⭐ Stars: {repoData.stars}</p>
          <p>🍴 Forks: {repoData.forks}</p>
          <h4>Last 5 Commits:</h4>
          <ul>
            {repoData.commits?.map((commit, index) => (
              <li key={index}>
                <strong>{commit.message}</strong> by {commit.author} on{" "}
                {new Date(commit.date).toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default GitHubRepo;
