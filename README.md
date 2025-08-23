# GitHub Explorer — React + Express (Capstone)

This is a **from-scratch, fully commented** starter for your Capstone Project. It meets the brief:

- **Full-stack** app using **React** (Vite) + **Express**
- Integrates with the **GitHub REST API** (public endpoints only)
- **Backend** handles all third‑party API calls (frontend calls your `/api/*` routes)
- Attractive, intuitive UI with external links in a different colour
- Loading icons where appropriate
- **Helmet** enabled on the server for basic security hardening
- **Tests**: at least one **snapshot test** (frontend) and **unit/integration tests** for **both** frontend and backend
- Well‑structured file layout, meaningful names, and code comments following Google-style principles

> ⚠️ You **do not** need DB/auth/caching for this task. Only public GitHub endpoints are used.

---

## Project Structure

```
github-explorer/
├── server/                # Express backend
│   ├── src/
│   │   ├── index.js
│   │   ├── app.js
│   │   ├── routes/
│   │   │   └── github.js
│   │   ├── services/
│   │   │   └── githubService.js
│   │   └── middleware/
│   │       └── errorHandler.js
│   ├── __tests__/github.routes.test.js
│   ├── jest.config.cjs
│   ├── package.json
│   └── .gitignore
├── client/                # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.js
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── styles.css
│   │   ├── api.js
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── UserCard.jsx
│   │   │   ├── ExternalLink.jsx
│   │   │   └── Spinner.jsx
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── UserDetails.jsx
│   │       └── RepoDetails.jsx
│   ├── __tests__/
│   │   ├── UserCard.test.jsx        # snapshot + unit render
│   │   └── api.test.js              # unit test for API helper
│   ├── jest.config.cjs
│   ├── setupTests.js
│   ├── package.json
│   └── .gitignore
├── .gitignore
├── README.md
└── repo.txt                         # put your repo link here when you submit
```

---

## Quick Start

### 1) Install dependencies

Open **two terminals** in `github-explorer/`:

**Backend**
```bash
cd server
npm install
npm run dev
# Server runs on http://localhost:4000
```

**Frontend**
```bash
cd client
npm install
npm run dev
# Vite dev server on http://localhost:5173
# Proxy forwards /api/* to the Express server
```

### 2) Run tests

**Backend tests**
```bash
cd server
npm test
```

**Frontend tests**
```bash
cd client
npm test
```

### 3) Build for production (optional)

```bash
cd client
npm run build
# This creates a production build in client/dist
```

> For production, you could serve the static build from Express. For the capstone brief, running dev servers is sufficient.

---

## What to Screenshot for Submission

- A screenshot of your **UI** showing:
  - Search box with results
  - User details page (avatar, bio, some repos)
  - Repo details page with **last 5 commit messages**
  - **External links** in a different colour
  - **Loading spinner** visible during network calls

- A screenshot of your **backend with Helmet** enabled (e.g., terminal logs or code snippet in `server/src/app.js`).

- Your **tests passing** in both `server` and `client` (screenshots of terminal with green tests).

- The **repo link** in `repo.txt` pushed to GitHub.

---

## Notes

- Unauthenticated GitHub API requests are limited (~60 requests/hour per IP). Keep your testing light.
- Error handling shows friendly messages if limit is hit or a user/repo isn't found.
- Code is heavily **commented** for readability and learning.
- Variable and component names are descriptive per Google style guidelines.

Good luck & have fun!
