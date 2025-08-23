/**
 * src/main.jsx
 * -------------
 * App root: sets up React Router and global styles.
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import UserDetails from "./pages/UserDetails.jsx";
import RepoDetails from "./pages/RepoDetails.jsx";
import "./styles.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "user/:username", element: <UserDetails /> },
      { path: "repo/:owner/:repo", element: <RepoDetails /> }
    ]
  }
]);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
