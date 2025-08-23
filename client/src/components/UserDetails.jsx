/**
 * UserCard.jsx
 * ------------
 * Shows a GitHub user's avatar and username, linking to the in-app user page.
 */

import React from "react";
import { Link } from "react-router-dom";

export default function UserCard({ user }) {
  // Guard: if the expected shape isn't present, render nothing.
  if (!user?.login) return null;

  return (
    <div className="card" data-testid="user-card">
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <img
          src={user.avatarUrl}
          alt={`${user.login} avatar`}
          width="56"
          height="56"
          style={{ borderRadius: "50%" }}
        />
        <div>
          <Link to={`/user/${user.login}`}>
            <strong>{user.login}</strong>
          </Link>
          <div className="small">View details</div>
        </div>
      </div>
    </div>
  );
}
