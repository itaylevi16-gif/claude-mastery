import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader, AlertCircle, Sparkles, Settings, Cpu, Cloud } from 'lucide-react';

// ─── System prompt ────────────────────────────────────────────────────────────
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

Rules:
1. Only answer what you know with high confidence. Never guess.
2. If unsure about pricing, features, or recent changes — say so and point to docs.anthropic.com.
3. Never fabricate API parameters or capabilities.
4. Be encouraging, clear, and conversational.
5. For frequently-changing info, add: "Verify at docs.anthropic.com".
6. If asked off-topic, redirect: "I'm focused on Claude and Anthropic topics for this platform."`;

// ─── Mode constants ───────────────────────────────────────────────────────────
const MODE_LOCAL  = 'local';   // Ollama — free, runs on user's machine
const MODE_API    = 'api';     // Anthropic API — user's own key

// ─── Ollama call (local, free, no tokens) ────────────────────────────────────
async function callOllama(messages, model = 'llama3') {
  const response = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      stream: false,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role, content: m.content })),
      ],
    }),
  });
  if (!response.ok) throw new Error(`Ollama error ${response.status}`);
  const data = await response.json();
  return data.message?.content || '';
}

// ─── Anthropic API call (user's own key, fallback) ───────────────────────────
async function callAnthropicAPI(messages, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 768,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({ role: m.role, content: m.content })),
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || `API error ${response.status}`);
  return data.content?.[0]?.text || '';
}

// ─── Main component ───────────────────────────────────────────────────────────
export function AIAgentChat() {
  const [open, setOpen]       = useState(false);
  const [mode, setMode]       = useState(MODE_LOCAL);
  const [showSettings, setShowSettings] = useState(false);
  const [ollamaModel, setOllamaModel]   = useState('llama3');
  const [apiKey, setApiKey]   = useState(() => { try { return localStorage.getItem('cm_apikey') || ''; } catch { return ''; } });
  const [ollamaOk, setOllamaOk] = useState(null); // null=unknown, true=ok, false=down
  const [messages, setMessages] = useState([{
    role: 'assistant',
    content: "Hey! I'm your Claude Mastery assistant 👋\n\nAsk me anything about Claude, the API, MCP, Skills, prompting, or anything else on the platform.\n\nI run locally on your machine — no API key needed, completely free.",
  }]);
  const [input, setInput]     = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(null);

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 120); }, [open]);

  // Check Ollama on open
  useEffect(() => {
    if (!open) return;
    fetch('http://localhost:11434/api/tags')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.models) {
          setOllamaOk(true);
          // Auto-pick best available model
          const names = data.models.map(m => m.name);
          const preferred = ['llama3', 'llama3:latest', 'mistral', 'phi3', 'gemma'];
          const found = preferred.find(p => names.some(n => n.startsWith(p)));
          if (found) setOllamaModel(found);
        } else {
          setOllamaOk(false);
        }
      })
      .catch(() => setOllamaOk(false));
  }, [open]);

  const saveApiKey = (key) => {
    setApiKey(key);
    try { localStorage.setItem('cm_apikey', key); } catch {}
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      let reply = '';
      const history = newMessages.map(m => ({ role: m.role, content: m.content }));

      if (mode === MODE_LOCAL) {
        reply = await callOllama(history, ollamaModel);
      } else {
        if (!apiKey) throw new Error('No API key set. Add it in settings ⚙️');
        reply = await callAnthropicAPI(history, apiKey);
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      const isOllamaDown = mode === MODE_LOCAL && (
        err.message.includes('Failed to fetch') ||
        err.message.includes('NetworkError') ||
        err.message.includes('Ollama error')
      );
      if (isOllamaDown) {
        setOllamaOk(false);
        setError('ollama_down');
      } else {
        setError(err.message || 'Something went wrong. Try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Chat cleared! Ask me anything about Claude. 👋" }]);
    setError(null);
  };

  const suggestions = [
    "What's the difference between Haiku and Sonnet?",
    "How do I set up Supabase MCP in Claude Code?",
    "What is prompt caching and how does it save money?",
    "How do Skills differ from MCP servers?",
  ];

  const modeLabel = mode === MODE_LOCAL
    ? (ollamaOk ? `🟢 Local · ${ollamaModel}` : '🔴 Local · Ollama offline')
    : '☁️ API · Claude Haiku';

  return (
    <>
      {/* FAB */}
      <button
        className={`agent-fab ${open ? 'agent-fab-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close assistant' : 'Open AI assistant'}
      >
        {open
          ? <X size={22} />
          : <><MessageCircle size={20} /><span className="agent-fab-label">Ask AI</span></>
        }
      </button>

      {/* Panel */}
      {open && (
        <div className="agent-panel" role="dialog" aria-label="AI Assistant">

          {/* Header */}
          <div className="agent-header">
            <div className="agent-header-left">
              <div className="agent-avatar"><Sparkles size={16} /></div>
              <div>
                <div className="agent-title">Claude Mastery Assistant</div>
                <div className="agent-subtitle">{modeLabel}</div>
              </div>
            </div>
            <div className="agent-header-actions">
              <button className="agent-clear-btn" onClick={clearChat} title="Clear chat">↺</button>
              <button className="agent-settings-btn" onClick={() => setShowSettings(s => !s)} title="Settings">
                <Settings size={14} />
              </button>
              <button className="agent-close" onClick={() => setOpen(false)} aria-label="Close"><X size={16} /></button>
            </div>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="agent-settings-panel">
              <p className="agent-settings-heading">AI Mode</p>

              {/* Local mode */}
              <label className={`agent-mode-option ${mode === MODE_LOCAL ? 'selected' : ''}`}>
                <input type="radio" name="mode" value={MODE_LOCAL}
                  checked={mode === MODE_LOCAL}
                  onChange={() => { setMode(MODE_LOCAL); setError(null); }} />
                <Cpu size={15} />
                <div className="agent-mode-text">
                  <strong>Local (Ollama) — Free</strong>
                  <span>Runs on your machine. No API key. No cost.</span>
                </div>
                {ollamaOk === true  && <span className="agent-badge ok">Online</span>}
                {ollamaOk === false && <span className="agent-badge fail">Offline</span>}
              </label>

              {mode === MODE_LOCAL && ollamaOk === false && (
                <div className="agent-install-hint">
                  <p><strong>Install Ollama to use local mode:</strong></p>
                  <ol>
                    <li>Download from <a href="https://ollama.com" target="_blank" rel="noopener noreferrer">ollama.com</a></li>
                    <li>Run: <code>ollama pull llama3</code></li>
                    <li>Refresh this page</li>
                  </ol>
                  <p style={{marginTop: 8}}>Or switch to API mode below.</p>
                </div>
              )}

              {mode === MODE_LOCAL && ollamaOk === true && (
                <div className="agent-model-row">
                  <label style={{fontSize:11, color:'var(--text-secondary)'}}>Model</label>
                  <input
                    className="agent-model-input"
                    value={ollamaModel}
                    onChange={e => setOllamaModel(e.target.value)}
                    placeholder="llama3"
                  />
                </div>
              )}

              {/* API mode */}
              <label className={`agent-mode-option ${mode === MODE_API ? 'selected' : ''}`} style={{marginTop: 8}}>
                <input type="radio" name="mode" value={MODE_API}
                  checked={mode === MODE_API}
                  onChange={() => { setMode(MODE_API); setError(null); }} />
                <Cloud size={15} />
                <div className="agent-mode-text">
                  <strong>Anthropic API</strong>
                  <span>Your own key. Faster. Uses tokens.</span>
                </div>
              </label>

              {mode === MODE_API && (
                <input
                  className="agent-key-input"
                  type="password"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={e => saveApiKey(e.target.value)}
                  style={{marginTop: 8}}
                />
              )}
            </div>
          )}

          {/* Ollama down inline banner */}
          {error === 'ollama_down' && (
            <div className="agent-setup-banner">
              <AlertCircle size={14} />
              <div>
                <strong>Ollama is not running.</strong> Either start Ollama on your machine, or switch to API mode in ⚙️ settings.
                <br /><a href="https://ollama.com" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)'}}>Download Ollama →</a>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="agent-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`agent-msg agent-msg-${msg.role}`}>
                <div className="agent-msg-avatar">
                  {msg.role === 'assistant' ? <Sparkles size={13} /> : <span style={{fontSize:12}}>You</span>}
                </div>
                <div className="agent-msg-bubble">
                  {msg.content.split('\n').map((line, li) => (
                    <p key={li} style={{ margin: li > 0 && line ? '6px 0 0' : 0 }}>{line}</p>
                  ))}
                </div>
              </div>
            ))}

            {loading && (
              <div className="agent-msg agent-msg-assistant">
                <div className="agent-msg-avatar"><Sparkles size={13} /></div>
                <div className="agent-msg-bubble agent-typing"><span /><span /><span /></div>
              </div>
            )}

            {error && error !== 'ollama_down' && (
              <div className="agent-error">
                <AlertCircle size={14} />
                <span>{error}</span>
              </div>
            )}

            {messages.length === 1 && !loading && (
              <div className="agent-suggestions">
                <p className="agent-suggestions-label">Try asking:</p>
                {suggestions.map((s, i) => (
                  <button key={i} className="agent-suggestion"
                    onClick={() => { setInput(s); inputRef.current?.focus(); }}>
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
              placeholder={
                mode === MODE_LOCAL && ollamaOk === false
                  ? 'Install Ollama to use local mode...'
                  : 'Ask anything about Claude...'
              }
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={loading || (mode === MODE_LOCAL && ollamaOk === false && !apiKey)}
              aria-label="Your question"
            />
            <button className="agent-send"
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              aria-label="Send">
              {loading ? <Loader size={16} className="agent-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
