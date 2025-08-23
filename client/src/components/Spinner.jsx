/**
 * Spinner.jsx
 * -----------
 * Reusable loading indicator. Use whenever a component loads data.
 */

import React from "react";

const Spinner = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
