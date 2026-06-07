import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Lightbulb, ChevronDown } from 'lucide-react';

export function Sandbox({ title, prompt, answer, hint }) {
  const [value, setValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="sandbox-wrapper">
      <div className="sandbox-header">
        <span className="sandbox-badge">Practice</span>
        <h4 className="sandbox-title">{title}</h4>
      </div>
      <p className="sandbox-prompt">{prompt}</p>

      <div className="sandbox-editor">
        <Editor
          height="140px"
          defaultLanguage="markdown"
          value={value}
          onChange={v => setValue(v || '')}
          theme="light"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            lineNumbers: 'off',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            overviewRulerLanes: 0,
            padding: { top: 10, bottom: 10 },
            lineHeight: 22,
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            placeholder: 'Type your answer here...',
          }}
        />
      </div>

      <div className="sandbox-actions">
        {hint && (
          <button
            className="hint-btn"
            onClick={() => setShowHint(!showHint)}
          >
            <Lightbulb size={14} />
            {showHint ? 'Hide hint' : 'Show hint'}
          </button>
        )}
        {answer && (
          <button
            className="answer-btn"
            onClick={() => setShowAnswer(!showAnswer)}
          >
            <ChevronDown size={14} style={{ transform: showAnswer ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            {showAnswer ? 'Hide answer' : 'Show answer'}
          </button>
        )}
      </div>

      {showHint && hint && (
        <div className="hint-box">
          <strong>Hint:</strong> {hint}
        </div>
      )}

      {showAnswer && answer && (
        <div className="answer-box">
          <strong>Example answer:</strong>
          <pre className="answer-pre">{answer}</pre>
        </div>
      )}
    </div>
  );
}
