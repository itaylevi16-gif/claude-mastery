# Claude Mastery — Interactive Learning Platform

A full-featured React learning platform for mastering Claude Code, Cowork, and AI prompting.

## Features

- **24 interactive lessons** across 4 modules
- **Live code sandboxes** with Monaco editor (VS Code in the browser)
- **SVG diagrams** illustrating every key concept
- **Knowledge checks** with animated feedback
- **Progress tracking** saved to your device (localStorage — no login needed)
- **Quick reference cheatsheet** for all commands and patterns
- **GitHub Pages ready** — one command to deploy

## Modules

| Module | Lessons | Topics covered |
|--------|---------|----------------|
| Claude Code | 6 | What it is, commands, CLAUDE.md, debugging, Git workflow, agentic mode |
| Cowork | 4 | What it is, Skills/plugins, workflow briefs, MCP connectors |
| AI & Prompting | 6 | How Claude thinks, 5-part framework, system prompts, JSON output, prompt patterns, cost optimization |
| Advanced Patterns | 4 | Embedding Claude in apps, building MCP servers, multi-agent patterns, testing AI features + full capstone |

---

## Getting started (local dev)

```bash
# Clone your repo
git clone https://github.com/YOUR-USERNAME/claude-mastery.git
cd claude-mastery

# Install dependencies
npm install

# Start dev server
npm run dev
# Open → http://localhost:5173/claude-mastery/
```

---

## Deploy to GitHub Pages — step by step

### Step 1: Create the GitHub repo

Go to github.com → New repository → name it `claude-mastery` → Create (don't add README).

Then in your terminal:

```bash
git init
git add .
git commit -m "Initial commit: Claude Mastery platform"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/claude-mastery.git
git push -u origin main
```

### Step 2: Update your username in package.json

Open `package.json` and change:
```json
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/claude-mastery"
```
Replace `YOUR-GITHUB-USERNAME` with your actual GitHub username.

### Step 3: Deploy

```bash
npm run deploy
```

This builds the app and pushes it to a `gh-pages` branch automatically.

### Step 4: Enable GitHub Pages in repo settings

1. Go to your repo on GitHub.com
2. Settings → Pages (left sidebar)
3. Source: "Deploy from a branch"
4. Branch: `gh-pages` → `/ (root)` → Save

Your platform will be live in ~2 minutes at:
`https://YOUR-USERNAME.github.io/claude-mastery`

---

## Re-deploying after changes

```bash
git add .
git commit -m "Update: what you changed"
git push
npm run deploy
```

---

## Project structure

```
src/
├── data/
│   └── curriculum.js       # All 24 lessons with content, diagrams, quizzes
├── hooks/
│   └── useProgress.js      # localStorage progress tracking hook
├── components/
│   ├── Diagrams.jsx         # SVG diagrams for every lesson concept
│   ├── CodeBlock.jsx        # Syntax-highlighted code with copy button
│   ├── Sandbox.jsx          # Monaco editor interactive practice areas
│   ├── Quiz.jsx             # Knowledge check with animated feedback
│   └── LessonContent.jsx    # Renders text/code/diagram/callout/sandbox sections
├── pages/
│   ├── Home.jsx             # Dashboard — all modules + progress
│   ├── LessonPage.jsx       # Individual lesson with sidebar nav
│   └── CheatsheetPage.jsx   # Quick reference cheatsheet
├── App.jsx                  # Router + top navigation
└── App.css                  # Full design system (DM Sans + Playfair Display)
```

---

## Adding your own lessons

All content is in `src/data/curriculum.js`. Each lesson follows this structure:

```js
{
  id: 'unique-id',
  title: 'Lesson title',
  level: 'Beginner' | 'Intermediate' | 'Advanced',
  duration: '8 min',
  description: 'One-sentence description shown on the card',
  content: {
    sections: [
      { type: 'text', content: 'Your content here. **Bold** and `code` work.' },
      { type: 'code', language: 'bash', label: 'Optional label', code: '...' },
      { type: 'diagram', diagram: 'diagram-key', title: 'Caption text' },
      { type: 'callout', variant: 'tip', content: 'Tip text here' },
      { type: 'sandbox', title: 'Practice title', prompt: 'Task description', 
        answer: 'Example answer', hint: 'Hint text' },
    ],
    quiz: {
      question: 'Your question',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 1,  // 0-indexed: which option is correct
      explanation: 'Why this answer is correct'
    }
  }
}
```

To add a new diagram, add a React component to `src/components/Diagrams.jsx` and add its key to the switch statement.

---

## Tech stack

- **React 19** + **Vite 8** — build tooling
- **React Router v7** — client-side routing
- **@monaco-editor/react** — VS Code editor in sandboxes
- **react-syntax-highlighter** — code block syntax highlighting
- **Lucide React** — icon library
- **gh-pages** — GitHub Pages deployment
- **Google Fonts** — DM Sans + DM Mono + Playfair Display

---

## License

MIT — fork it, extend it, make it yours.
