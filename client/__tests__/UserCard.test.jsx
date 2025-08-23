/**
 * UserDetails.test.jsx
 * -----------------
 * Snapshot + simple render test for the UserDetails component.
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import UserDetails from "../src/components/UserDetails.jsx";

const mockUser = {
  id: 1,
  login: "octocat",
  avatarUrl: "http://avatar"
};

test("renders and matches snapshot", () => {
  const { asFragment } = render(
    <MemoryRouter>
      <UserDetails user={mockUser} />
    </MemoryRouter>
  );

  // Snapshot test: first run writes snapshot, subsequent runs compare
  expect(asFragment()).toMatchSnapshot();

  // Basic assertion
  expect(screen.getByText(/octocat/i)).toBeInTheDocument();
});
