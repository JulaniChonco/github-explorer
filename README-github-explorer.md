# GitHub Explorer — Repos, Profiles & Issues Viewer

A React web app for searching GitHub users and repositories, viewing profiles, stars, languages, and navigating to issues. Great for learning API fetching, pagination, and client-side routing.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Deployment](#deployment)
- [Credits](#credits)

## About
GitHub Explorer is a lightweight UI for exploring the GitHub ecosystem via the REST API. It focuses on clean API usage, sensible caching, and responsive UI.

## Features
- Search **users** and **repositories**
- View user profile details (avatar, bio, followers, stars)
- Repo list with language, stars, forks
- Pagination / infinite scroll (depending on branch)
- Client-side routing for clean navigation
- Error & loading states

## Tech Stack
- **Framework:** React (Vite)
- **Language:** JavaScript/TypeScript (depending on branch)
- **UI:** React + CSS modules/Tailwind (if present)
- **API:** GitHub REST API v3
- **Build:** CRA / React Scripts

## Installation
```bash
# 1) Clone
git clone <your-repo-url> github-explorer
cd github-explorer/

# 2) Install deps
npm install

# 3) Run dev server
npm start

# 4) Build for production
# (add build script if missing)
```

### Environment Variables (optional)
This app can run **without** a token using public endpoints, but you may hit rate limits. Optionally add:

- `PORT`

## Usage
1. In the search bar, type a GitHub **username** (e.g., `torvalds`) or a **repo query** (e.g., `react language:TypeScript`).
2. Open a user to see profile info and repositories.
3. Click a repository to view details and open issues on github.com.
4. (Optional) Add a GitHub **personal access token** to increase rate limits (see below).

## Screenshots
Place screenshots in `docs/screenshots/` and reference them here:
- `docs/screenshots/home-search.png`
- `docs/screenshots/user-profile.png`
- `docs/screenshots/repo-list.png`

## Deployment
- Deploy to **Vercel**, **Netlify**, or **GitHub Pages**.
- Remember to set your environment variable (token) on the host if used.
- **Deployed link:** https://<your-live-site>

## Credits
- Author: Julani Victor Chonco ([@JulaniChonco](https://github.com/JulaniChonco))
- Data: GitHub REST API v3
