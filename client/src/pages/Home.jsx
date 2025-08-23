/**
 * pages/Home.jsx
 * ---------------
 * Landing page with a search box and a grid of user results.
 */

import React, { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";
import Spinner from "../components/Spinner.jsx";
import UserDetails from "../components/UserDetails.jsx";
import { getJSON } from "../api.js";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState(null);

  async function handleSearch(q) {
    try {
      setLoading(true);
      setError("");
      setResults(null);
      const data = await getJSON(`/api/search/users?q=${encodeURIComponent(q)}`);
      setResults(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {loading && <Spinner label="Searching users..." />}

      {error && (
        <div className="card" style={{ borderColor: "var(--danger)" }}>
          <strong>Error:</strong> {error}
        </div>
      )}

      {results && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="small" style={{ marginBottom: 8 }}>
            Found {results.totalCount} users
          </div>
          <div className="grid">
            {results.items.map((u) => (
              <UserDetails key={u.id} user={u} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
