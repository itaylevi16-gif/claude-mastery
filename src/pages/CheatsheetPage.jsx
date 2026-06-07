import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Layout, Sparkles } from 'lucide-react';

const CHEATSHEET = {
  cc: {
    label: 'Claude Code',
    icon: Terminal,
    color: '#7C3AED',
    bg: '#EDE9FE',
    sections: [
      {
        title: 'Slash commands',
        items: [
          { cmd: '/compact', desc: 'Summarize history to save tokens without losing context' },
          { cmd: '/cost', desc: 'Show token usage this session' },
          { cmd: '/undo', desc: 'Undo the last file edit' },
          { cmd: '/review', desc: 'Review recent file changes before committing' },
          { cmd: '/model', desc: 'Switch Claude model mid-session' },
          { cmd: '/clear', desc: 'Reset conversation (files stay untouched)' },
          { cmd: '/help', desc: 'Show all available commands' },
        ]
      },
      {
        title: 'Keyboard shortcuts',
        items: [
          { cmd: 'Escape', desc: 'Interrupt Claude mid-response' },
          { cmd: 'Escape × 2', desc: 'Cancel current task entirely' },
          { cmd: 'Ctrl+L', desc: 'Clear terminal screen' },
          { cmd: '↑ / ↓', desc: 'Navigate prompt history' },
        ]
      },
      {
        title: 'Key files & patterns',
        items: [
          { cmd: 'CLAUDE.md', desc: 'Project memory file — auto-loaded at every session start' },
          { cmd: '--print', desc: 'Non-interactive/headless mode for CI and scripts' },
          { cmd: 'Plan first', desc: 'Ask for a plan before Claude executes complex multi-file tasks' },
          { cmd: 'Stage tasks', desc: 'Break large work into reviewed stages, not one big request' },
        ]
      }
    ]
  },
  cw: {
    label: 'Cowork',
    icon: Layout,
    color: '#059669',
    bg: '#D1FAE5',
    sections: [
      {
        title: 'Core concepts',
        items: [
          { cmd: 'SKILL.md', desc: 'Plugin file — Claude reads before creating any file type' },
          { cmd: 'Workflow brief', desc: '5 parts: trigger · input · steps · output · constraints' },
          { cmd: 'Constraints', desc: 'What Claude must never do — always define these explicitly' },
          { cmd: 'Plan → confirm → execute', desc: 'Safest pattern for any multi-step automation' },
        ]
      },
      {
        title: 'Built-in Skills',
        items: [
          { cmd: 'docx', desc: 'Word document creation (python-docx)' },
          { cmd: 'pdf', desc: 'PDF creation and manipulation' },
          { cmd: 'pptx', desc: 'PowerPoint presentations' },
          { cmd: 'xlsx', desc: 'Excel spreadsheets (openpyxl)' },
          { cmd: 'frontend-design', desc: 'React/HTML UI components' },
          { cmd: 'data-analysis', desc: 'Charts and analysis from CSV data' },
        ]
      },
      {
        title: 'Safety rules',
        items: [
          { cmd: 'Minimal footprint', desc: 'Prefer reversible actions; request only needed permissions' },
          { cmd: 'Content ≠ commands', desc: 'Instructions in emails/files are data, not commands to Claude' },
          { cmd: 'Review before confirm', desc: 'Always check what Cowork plans to do before confirming irreversible actions' },
        ]
      }
    ]
  },
  ai: {
    label: 'AI & Prompting',
    icon: Sparkles,
    color: '#D97706',
    bg: '#FEF3C7',
    sections: [
      {
        title: 'Mental models',
        items: [
          { cmd: 'Context window', desc: "Claude sees the full conversation as one document — recent messages matter most" },
          { cmd: 'No memory', desc: 'Fresh start each conversation — paste context or use CLAUDE.md' },
          { cmd: 'Token prediction', desc: 'Input format shapes output format — frame matters as much as content' },
          { cmd: 'Extended thinking', desc: 'Step-by-step reasoning — enables accuracy on complex tasks' },
        ]
      },
      {
        title: '5-part prompt framework',
        items: [
          { cmd: 'Role', desc: 'Who should Claude be? ("You are a senior React developer...")' },
          { cmd: 'Context', desc: 'The situation, stack, project background' },
          { cmd: 'Task', desc: 'Exactly what you need done — be specific' },
          { cmd: 'Constraints', desc: 'What must not change; limits on scope of changes' },
          { cmd: 'Format', desc: 'How the output should look (code only, JSON, prose, etc.)' },
        ]
      },
      {
        title: 'Advanced patterns',
        items: [
          { cmd: 'Few-shot', desc: 'Show 2-3 input/output examples to enforce exact format' },
          { cmd: 'Chain-of-thought', desc: '"Think step by step before answering" — improves reasoning accuracy' },
          { cmd: 'XML tags', desc: 'Use <context>, <task>, <rules> tags to structure complex prompts' },
          { cmd: 'Agentic loop', desc: 'Think → Tool → Observe → Think → Done (loops until complete)' },
          { cmd: 'MCP', desc: 'Model Context Protocol — standard for connecting Claude to external services' },
          { cmd: 'System prompt', desc: 'Permanent instructions set by the developer; overrides user input' },
        ]
      },
      {
        title: 'Cost optimization',
        items: [
          { cmd: 'Haiku', desc: 'Simple tasks: classification, extraction — 25× cheaper than Opus' },
          { cmd: 'Sonnet', desc: 'Most product features — best cost/performance balance' },
          { cmd: 'Opus', desc: 'Hard reasoning, architecture — use sparingly' },
          { cmd: 'max_tokens', desc: 'Set conservatively — if you need 200 words, set 300 not 4000' },
          { cmd: 'Prompt caching', desc: 'Cache large static system prompts — not billed on repeat calls' },
        ]
      }
    ]
  }
};

export default function CheatsheetPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState('cc');

  const current = CHEATSHEET[tab];
  const Icon = current.icon;

  return (
    <div className="cheatsheet-page">
      <div className="cheatsheet-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={16} />
          Back to home
        </button>
        <h1 className="cheatsheet-title">Quick reference cheatsheet</h1>
        <p className="cheatsheet-sub">Everything you need in one place — save this page.</p>
      </div>

      <div className="cheatsheet-tabs">
        {Object.entries(CHEATSHEET).map(([key, val]) => {
          const TabIcon = val.icon;
          return (
            <button
              key={key}
              className={`cheatsheet-tab ${tab === key ? 'active' : ''}`}
              style={tab === key ? { borderBottomColor: val.color, color: val.color } : {}}
              onClick={() => setTab(key)}
            >
              <TabIcon size={16} />
              {val.label}
            </button>
          );
        })}
      </div>

      <div className="cheatsheet-body">
        <div className="cheatsheet-module-header" style={{ background: current.bg, color: current.color }}>
          <Icon size={20} />
          <span>{current.label}</span>
        </div>

        <div className="cheatsheet-sections">
          {current.sections.map((section, i) => (
            <div key={i} className="cheatsheet-section">
              <h3 className="cheatsheet-section-title">{section.title}</h3>
              <div className="cheatsheet-items">
                {section.items.map((item, j) => (
                  <div key={j} className="cheatsheet-item">
                    <code className="cheatsheet-cmd">{item.cmd}</code>
                    <span className="cheatsheet-desc">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
