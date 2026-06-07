import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Home as HomeIcon, FileText } from 'lucide-react';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import CheatsheetPage from './pages/CheatsheetPage';
import './App.css';

function Nav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="main-nav">
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => navigate('/')}>
          <span className="nav-logo-icon">✦</span>
          <span className="nav-logo-text">Claude Mastery</span>
        </button>
        <div className="nav-links">
          <button
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            <HomeIcon size={15} />
            Home
          </button>
          <button
            className={`nav-link ${location.pathname === '/cheatsheet' ? 'active' : ''}`}
            onClick={() => navigate('/cheatsheet')}
          >
            <FileText size={15} />
            Cheatsheet
          </button>
          <a
            href="https://docs.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link nav-link-external"
          >
            <BookOpen size={15} />
            Docs
          </a>
        </div>
      </div>
    </nav>
  );
}

function Layout({ children }) {
  return (
    <div className="app-layout">
      <Nav />
      <div className="app-content">{children}</div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/cheatsheet" element={<CheatsheetPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
