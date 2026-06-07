import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

export function CodeBlock({ code, language = 'bash', label }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper">
      {label && (
        <div className="code-label">
          <span>{label}</span>
          <button onClick={handleCopy} className="copy-btn" aria-label="Copy code">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          margin: 0,
          borderRadius: label ? '0 0 10px 10px' : '10px',
          fontSize: '13px',
          lineHeight: '1.7',
          background: '#F8F7FF',
        }}
        showLineNumbers={code.split('\n').length > 8}
        wrapLongLines
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
