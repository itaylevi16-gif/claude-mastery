import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Home as HomeIcon, FileText, Sun, Moon, Zap, Bookmark } from 'lucide-react';
import Home from './pages/Home';
import LessonPage from './pages/LessonPage';
import CheatsheetPage from './pages/CheatsheetPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BookmarksPage from './pages/BookmarksPage';
import { MobileNav } from './components/MobileNav';
import { SearchOverlay, SearchButton } from './components/SearchOverlay';
import './App.css';

function Nav({ dark, toggleDark, onSearch }) {
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
            className={`nav-link ${location.pathname.startsWith('/project') ? 'active' : ''}`}
            onClick={() => navigate('/projects')}
          >
            <Zap size={15} />
            Projects
          </button>
          <button
            className={`nav-link ${location.pathname === '/bookmarks' ? 'active' : ''}`}
            onClick={() => navigate('/bookmarks')}
          >
            <Bookmark size={15} />
            Saved
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
          <SearchButton onClick={onSearch} />
          <button
            className="theme-toggle"
            onClick={toggleDark}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {dark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

function Layout({ children, dark, toggleDark, onSearch }) {
  return (
    <div className="app-layout">
      <Nav dark={dark} toggleDark={toggleDark} onSearch={onSearch} />
      <div className="app-content">{children}</div>
      <MobileNav />
    </div>
  );
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem('cm_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch { return false; }
  });
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    try { localStorage.setItem('cm_theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);

  const toggleDark = () => setDark(d => !d);

  return (
    <BrowserRouter>
      <Layout dark={dark} toggleDark={toggleDark} onSearch={() => setSearchOpen(true)}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/cheatsheet" element={<CheatsheetPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/bookmarks" element={<BookmarksPage />} />
        </Routes>
      </Layout>
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </BrowserRouter>
  );
}
