import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, BookOpen, Zap, ArrowRight } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';

export function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('');
  const results = useSearch(query);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleSelect = (result) => {
    navigate(result.route);
    onClose();
  };

  return (
    <div className="search-overlay" onClick={onClose}>
      <div className="search-modal" onClick={e => e.stopPropagation()}>
        {/* Input */}
        <div className="search-input-row">
          <Search size={18} className="search-input-icon" />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search lessons, projects, topics..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            autoComplete="off"
          />
          {query && (
            <button className="search-clear" onClick={() => setQuery('')} aria-label="Clear">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="search-results">
          {query.length < 2 && (
            <div className="search-hint">
              <p>Start typing to search across all <strong>{39}</strong> lessons and projects</p>
              <div className="search-suggestions">
                {['tokens', 'CLAUDE.md', 'MCP', 'packing list', 'Skills', 'freelancing'].map(s => (
                  <button key={s} className="search-suggestion" onClick={() => setQuery(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.length >= 2 && results.length === 0 && (
            <div className="search-empty">
              <Search size={28} style={{ color: 'var(--text-tertiary)', margin: '0 auto 8px', display: 'block' }} />
              <p>No results for <strong>"{query}"</strong></p>
              <p style={{ fontSize: 13, color: 'var(--text-tertiary)', marginTop: 4 }}>Try different keywords</p>
            </div>
          )}

          {results.map((result, i) => (
            <button
              key={result.id}
              className="search-result-item"
              onClick={() => handleSelect(result)}
              style={{ '--result-color': result.color }}
            >
              <div
                className="search-result-icon"
                style={{ background: result.color + '20', color: result.color }}
              >
                {result.type === 'lesson' ? <BookOpen size={15} /> : <Zap size={15} />}
              </div>
              <div className="search-result-text">
                <div className="search-result-title">{highlight(result.title, query)}</div>
                <div className="search-result-sub">{result.subtitle}</div>
                {result.description && (
                  <div className="search-result-desc">{result.description.slice(0, 90)}...</div>
                )}
              </div>
              <ArrowRight size={14} className="search-result-arrow" />
            </button>
          ))}
        </div>

        <div className="search-footer">
          <span>↑↓ navigate</span>
          <span>↵ open</span>
          <span>Esc close</span>
        </div>
      </div>
    </div>
  );
}

function highlight(text, query) {
  if (!query.trim()) return text;
  const regex = new RegExp(`(${query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, i) =>
    regex.test(part)
      ? <mark key={i} style={{ background: '#FEF08A', color: '#713F12', borderRadius: 2, padding: '0 1px' }}>{part}</mark>
      : part
  );
}

export function SearchButton({ onClick }) {
  useEffect(() => {
    const onKey = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClick();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClick]);

  return (
    <button className="search-trigger" onClick={onClick} aria-label="Search">
      <Search size={15} />
      <span className="search-trigger-text">Search</span>
      <span className="search-trigger-kbd">⌘K</span>
    </button>
  );
}
