/**
 * ExternalLink.jsx
 * ----------------
 * Renders an anchor tag styled as an **external** link. The colour differs
 * from internal links to satisfy the spec.
 */

import React from "react";

export default function ExternalLink({ href, children }) {
  return (
    <a className="external" href={href} target="_blank" rel="noreferrer">
      {children} ↗
    </a>
  );
}
