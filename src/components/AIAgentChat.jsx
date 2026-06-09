import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Loader, AlertCircle } from 'lucide-react';

const SYSTEM_PROMPT = `You are a helpful AI assistant for Claude Mastery, an interactive learning platform about Claude AI, Anthropic's products, and AI development.

You answer questions about:
- Claude models (Haiku, Sonnet, Opus) and their capabilities
- Claude Code — the terminal-based coding agent
- Cowork — desktop automation tool
- MCP (Model Context Protocol) — connecting Claude to external services
- Skills / SKILL.md — the plugin system
- The Anthropic API — endpoints, parameters, pricing, models
- Prompting techniques and best practices
- Building products with Claude
- Claude plans (Free, Pro, Max, Team, Enterprise)
- Tokens, context windows, and cost optimization

IMPORTANT RULES — follow these strictly:

1. ONLY answer based on what you know with high confidence from Anthropic's official documentation and well-established facts about Claude. Never guess or speculate.

2. If you are not 100% sure about something — especially specific pricing numbers, exact feature availability, or recent changes — say so clearly. Example: "I'm not certain about the current pricing — please check console.anthropic.com for up-to-date rates."

3. Never make up features, API parameters, or capabilities. If you don't know, say "I don't have reliable information on that — I'd recommend checking docs.anthropic.com."

4. Keep answers practical and focused on what the student can actually use right now in their projects.

5. Be encouraging, clear, and direct. You're talking to someone learning — keep explanations accessible but accurate.

6. For anything that changes frequently (pricing, rate limits, latest model versions), always add: "Verify this at docs.anthropic.com — this may have changed."

7. If asked about topics outside Claude/Anthropic/AI development, politely redirect: "I'm focused on Claude and Anthropic topics — for that question I'd recommend a general search."`;

export function AIAgentChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hey! I'm your Claude Mastery assistant. Ask me anything about Claude, the API, MCP, Skills, prompting — whatever you're stuck on. I'll be honest when I'm not sure about something rather than guess. 🤝"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(() => {
    try { return localStorage.getItem('cm_agent_key') || ''; } catch { return ''; }
  });
  const [showKeyInput, setShowKeyInput] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  const saveKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem('cm_agent_key', key); } catch {}
    setShowKeyInput(false);
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    if (!apiKey) {
      setShowKeyInput(true);
      return;
    }

    const userMsg = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        const errMsg = data?.error?.message || `API error ${res.status}`;
        if (res.status === 401) {
          setError('Invalid API key. Click the key icon to update it.');
        } else {
          setError(`Error: ${errMsg}`);
        }
        setLoading(false);
        return;
      }

      const reply = data.content?.[0]?.text || 'Sorry, I got an empty response.';
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setError('Network error. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const suggestions = [
    "What's the difference between Haiku and Sonnet?",
    "How do I set up a Supabase MCP server?",
    "What is prompt caching and how do I enable it?",
    "How do Skills differ from MCP servers?",
  ];

  return (
    <>
      {/* Floating button */}
      <button
        className={`agent-fab ${open ? 'agent-fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        title="Ask the AI assistant"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
        {!open && <span className="agent-fab-label">Ask AI</span>}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="agent-panel" role="dialog" aria-label="AI Assistant">
          {/* Header */}
          <div className="agent-header">
            <div className="agent-header-left">
              <div className="agent-avatar">
                <Bot size={18} />
              </div>
              <div>
                <div className="agent-title">Claude Mastery Assistant</div>
                <div className="agent-subtitle">Powered by Claude · honest about uncertainty</div>
              </div>
            </div>
            <div className="agent-header-actions">
              <button
                className="agent-key-btn"
                onClick={() => setShowKeyInput(v => !v)}
                title="Set API key"
                aria-label="Configure API key"
              >
                🔑
              </button>
              <button className="agent-close" onClick={() => setOpen(false)} aria-label="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          {/* API key input */}
          {showKeyInput && (
            <div className="agent-key-panel">
              <p className="agent-key-info">
                Enter your Anthropic API key to use the assistant.
                Get one at <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">console.anthropic.com</a>.
                It's stored locally on your device only.
              </p>
              <input
                className="agent-key-input"
                type="password"
                placeholder="sk-ant-..."
                defaultValue={apiKey}
                onKeyDown={e => { if (e.key === 'Enter') saveKey(e.target.value); }}
                autoFocus
              />
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button
                  className="agent-key-save"
                  onClick={e => saveKey(e.target.closest('.agent-key-panel').querySelector('input').value)}
                >
                  Save key
                </button>
                {apiKey && (
                  <button className="agent-key-clear" onClick={() => { saveKey(''); setShowKeyInput(false); }}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="agent-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`agent-msg agent-msg-${msg.role}`}>
                <div className="agent-msg-avatar">
                  {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                </div>
                <div className="agent-msg-bubble">
                  {msg.content.split('\n').map((line, li) => (
                    <p key={li} style={{ margin: li > 0 ? '6px 0 0' : 0 }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="agent-msg agent-msg-assistant">
                <div className="agent-msg-avatar"><Bot size={14} /></div>
                <div className="agent-msg-bubble agent-typing">
                  <span/><span/><span/>
                </div>
              </div>
            )}

            {error && (
              <div className="agent-error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="agent-suggestions">
                <p className="agent-suggestions-label">Try asking:</p>
                {suggestions.map((s, i) => (
                  <button key={i} className="agent-suggestion" onClick={() => { setInput(s); inputRef.current?.focus(); }}>
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="agent-input-row">
            <textarea
              ref={inputRef}
              className="agent-input"
              placeholder={apiKey ? "Ask anything about Claude..." : "Set your API key first (🔑 above)"}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={!apiKey || loading}
              aria-label="Your question"
            />
            <button
              className="agent-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading || !apiKey}
              aria-label="Send message"
            >
              {loading ? <Loader size={16} className="agent-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
