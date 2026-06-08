import React, { useState } from 'react';
import { Diagram } from './Diagrams';
import { X } from 'lucide-react';

export function DiagramZoom({ type, title }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className="diagram-wrapper"
        onClick={() => setOpen(true)}
        role="button"
        tabIndex={0}
        aria-label={`Expand diagram: ${title}`}
        onKeyDown={e => e.key === 'Enter' && setOpen(true)}
      >
        {title && <p className="diagram-label">{title}</p>}
        <Diagram type={type} />
        <div style={{
          position: 'absolute', bottom: 8, right: 10,
          fontSize: 10, color: 'var(--text-tertiary)',
          fontWeight: 500, letterSpacing: '0.04em',
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          click to zoom
        </div>
      </div>

      {open && (
        <div
          className="diagram-zoom-overlay"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={`Zoomed diagram: ${title}`}
        >
          <div className="diagram-zoom-inner" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              {title && (
                <p style={{
                  fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--accent)',
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span style={{ display: 'inline-block', width: 14, height: 2, background: 'var(--accent)', borderRadius: 2 }} />
                  {title}
                </p>
              )}
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'var(--bg-subtle)', border: '1px solid var(--border)',
                  borderRadius: 8, padding: 6, cursor: 'pointer',
                  color: 'var(--text-secondary)', display: 'flex',
                  marginLeft: 'auto',
                }}
                aria-label="Close diagram"
              >
                <X size={16} />
              </button>
            </div>
            <Diagram type={type} />
          </div>
        </div>
      )}
    </>
  );
}
