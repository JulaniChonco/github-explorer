import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import UserDetails from "./pages/UserDetails";
import GitHubRepo from "./components/GitHubRepo";

function App() {
  return (
    <Router>
      <div>
        <h1>GitHub Explorer</h1>
        <Routes>
          <Route path="/" element={<SearchBar />} />
          <Route path="/user/:username" element={<UserDetails />} />
          <Route path="/repo" element={<GitHubRepo />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
