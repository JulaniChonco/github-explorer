/**
 * src/App.jsx
 * ------------
 * Shared layout for all pages. The Outlet renders child routes.
 */

import React from "react";
import { Outlet, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="container">
      <nav className="nav">
        <Link to="/" className="brand" aria-label="Go to home">
          GitHub Explorer
        </Link>
        <a
          className="external"
          href="https://api.github.com"
          target="_blank"
          rel="noreferrer"
          title="External: GitHub API website"
        >
          GitHub API Docs ↗
        </a>
      </nav>
      <Outlet />
      <footer className="small" style={{ marginTop: 24 }}>
        Built with React + Express. External links are green.
      </footer>
    </div>
  );
}
