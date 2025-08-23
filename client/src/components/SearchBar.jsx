/**
 * SearchBar.jsx
 * -------------
 * Simple controlled input that calls onSearch(term) on submit.
 * The input supports keyboard submission (Enter) and button click.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    setError(""); // Clear previous errors

    if (!query.trim()) { // Prevent empty search
      setError("Please enter a GitHub username.");
      setResults([]);
      return;
    }

    setLoading(true); // Start loading
    setResults([]);   // Clear previous results

    try {
      const res = await fetch(`/api/search/users?q=${query}`);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.items || []);

      if (!data.items || data.items.length === 0) {
        setError("No users found."); // Show no results message
      }
    } catch (err) {
      console.error(err);
      setError("Could not fetch users.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div>
      <h2>Search GitHub Users</h2>
      <input
        type="text"
        placeholder="Enter GitHub username"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress} // Trigger search on Enter
      />
      <button onClick={handleSearch} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {loading && <Spinner />}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {results.map((user) => (
          <li key={user.id}>
            <img src={user.avatarUrl} alt={user.login} width={50} />
            <strong>{user.login}</strong>{" "}
            <button onClick={() => navigate(`/user/${user.login}`)}>
              View Profile
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;

