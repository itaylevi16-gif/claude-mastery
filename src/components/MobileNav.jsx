import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, Bookmark, FileText } from 'lucide-react';

export function MobileNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const tabs = [
    { icon: Home,     label: 'Home',       route: '/' },
    { icon: Zap,      label: 'Projects',   route: '/projects' },
    { icon: Bookmark, label: 'Saved',      route: '/bookmarks' },
    { icon: FileText, label: 'Cheatsheet', route: '/cheatsheet' },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <div className="mobile-nav-inner">
        {tabs.map(({ icon: Icon, label, route }) => {
          const active = path === route || (route !== '/' && path.startsWith(route));
          return (
            <button
              key={route}
              className={`mobile-nav-btn ${active ? 'active' : ''}`}
              onClick={() => navigate(route)}
              aria-label={label}
              aria-current={active ? 'page' : undefined}
            >
              <Icon size={22} />
              <span className="mobile-nav-label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
