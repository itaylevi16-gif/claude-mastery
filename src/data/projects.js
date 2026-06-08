export const PROJECTS = [
  {
    id: 'proj1',
    title: 'Build an AI Packing List feature for PackLight',
    subtitle: 'End-to-end AI feature with streaming',
    level: 'Intermediate',
    duration: '45 min',
    color: '#7C3AED',
    bg: '#EDE9FE',
    accent: '#5B21B6',
    description: 'Wire Claude\'s API into your PackLight app to generate personalized packing lists from a destination input — with streaming output, structured JSON, and a polished React UI.',
    what_you_build: 'A working "/packing-list" page in PackLight that takes a destination + trip duration and streams a categorized packing list back to the user in real time.',
    prerequisites: ['Basic React (useState, useEffect)', 'Node.js / Express basics', 'PackLight project on your machine'],
    canva_image: 'https://design.canva.ai/h6KU09bN9Ac9uqH',
    steps: [
      {
        id: 'p1s1',
        title: 'Set up your API key safely',
        duration: '5 min',
        type: 'setup',
        content: `Before writing a single line of AI code, you need your Anthropic API key stored securely — never in your frontend code.`,
        instructions: [
          'Go to console.anthropic.com → API Keys → Create key',
          'Create a file called `.env` in your project root (not inside /src)',
          'Add: `ANTHROPIC_API_KEY=sk-ant-your-key-here`',
          'Add `.env` to your `.gitignore` — this is critical, never commit your key',
          'In your Express backend, use `process.env.ANTHROPIC_API_KEY`'
        ],
        code: {
          language: 'bash',
          label: '.env file (never commit this)',
          code: `# .env — in project root, NOT in /src
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxx

# .gitignore — add this line
.env`
        },
        callout: {
          variant: 'warning',
          content: '**Never** call the Anthropic API from your React frontend. Your API key would be exposed in the browser. Always route through your own backend.'
        },
        quiz: {
          question: 'Where should your ANTHROPIC_API_KEY live in a React + Express project?',
          options: [
            'In src/config.js so React can access it',
            'In a .env file at the project root, used only by the Express backend',
            'Hardcoded in the API route for simplicity',
            'In localStorage so it persists between sessions'
          ],
          answer: 1,
          explanation: 'The backend (.env → Express) is the only safe place. The frontend (React) runs in the browser — anything there is visible to anyone who opens DevTools.'
        }
      },
      {
        id: 'p1s2',
        title: 'Design your data schema first',
        duration: '5 min',
        type: 'design',
        content: `Before writing the prompt, design the JSON structure your React component will render. Working backwards from the UI is the fastest path to a clean implementation.`,
        instructions: [
          'Think about what the UI needs to display',
          'Design the JSON schema Claude will return',
          'Write the schema as a TypeScript-style interface or comment',
          'This schema becomes your system prompt\'s output contract'
        ],
        code: {
          language: 'javascript',
          label: 'Your packing list JSON schema',
          code: `// Design this FIRST — before writing any prompt
const PACKING_LIST_SCHEMA = {
  destination: "string",          // "Patagonia, Argentina"
  duration_days: "number",        // 14
  season: "string",               // "Summer (Dec-Feb)"
  weather_note: "string",         // "Expect rain and wind"
  categories: [
    {
      name: "string",             // "Clothing"
      icon: "string",             // "👕"
      priority: "essential | recommended | optional",
      items: [
        {
          name: "string",         // "Waterproof jacket"
          qty: "number",          // 1
          note: "string"          // "Non-negotiable for Patagonia"
        }
      ]
    }
  ]
};`
        },
        callout: {
          variant: 'tip',
          content: 'Design the schema from the UI backwards. Ask: "What does my React component need to render?" Then make the schema match that exactly.'
        },
        quiz: {
          question: 'Why design the JSON schema before writing the Claude prompt?',
          options: [
            'It\'s required by the Anthropic API',
            'The schema defines the contract — your prompt enforces it and your React component depends on it',
            'It makes the API call faster',
            'It\'s only needed if you use TypeScript'
          ],
          answer: 1,
          explanation: 'Schema-first ensures your prompt, backend, and frontend are all aligned on the same data shape. Without it, you\'ll constantly adjust all three when Claude returns something unexpected.'
        }
      },
      {
        id: 'p1s3',
        title: 'Write the system prompt',
        duration: '8 min',
        type: 'build',
        content: `The system prompt is the most important part of your AI feature. It defines Claude\'s role, enforces the JSON schema, and sets the constraints for every request.`,
        instructions: [
          'Create a new file: server/prompts/packingList.js',
          'Write the system prompt using the schema from step 2',
          'Be explicit: "Return ONLY valid JSON. No markdown. No explanation."',
          'Include the full schema as an example in the prompt',
          'Add domain constraints (budget focus, practical items only)'
        ],
        code: {
          language: 'javascript',
          label: 'server/prompts/packingList.js',
          code: `export const PACKING_LIST_SYSTEM_PROMPT = \`
You are a travel packing expert for PackLight, an app for 
backpackers exploring South America.

Return ONLY valid JSON matching this exact schema.
No markdown fences, no explanation, no preamble.

{
  "destination": string,
  "duration_days": number,
  "season": string,
  "weather_note": string,
  "categories": [
    {
      "name": string,
      "icon": string (single emoji),
      "priority": "essential" | "recommended" | "optional",
      "items": [
        { "name": string, "qty": number, "note": string }
      ]
    }
  ]
}

Rules:
- Focus on backpacker / budget travel — no luxury items
- Always include: Documents, Clothing, Toiletries, Electronics, Health
- Adjust items based on destination climate and duration
- Max 8 items per category
- Weather note should be specific to the destination and season
\`;`
        },
        quiz: {
          question: 'Why include "No markdown fences, no explanation, no preamble" in the system prompt?',
          options: [
            'Claude ignores markdown by default anyway',
            'JSON.parse() fails on any non-JSON characters — even ```json would break it',
            'It makes Claude respond faster',
            'It\'s only needed for Opus, not Sonnet'
          ],
          answer: 1,
          explanation: 'JSON.parse() is strict — any character outside the JSON (a markdown fence, a sentence before the JSON, a trailing comment) will throw a SyntaxError. Being explicit in the prompt prevents this.'
        }
      },
      {
        id: 'p1s4',
        title: 'Build the streaming API route',
        duration: '10 min',
        type: 'build',
        content: `Now wire up the Express route that calls Claude with streaming. Streaming gives users instant feedback — they see the response building in real-time instead of staring at a spinner.`,
        instructions: [
          'Install the Anthropic SDK: npm install @anthropic-ai/sdk',
          'Create the route file: server/routes/packing.js',
          'Set up Server-Sent Events (SSE) headers',
          'Stream the response token by token',
          'Send a [DONE] signal when complete'
        ],
        code: {
          language: 'javascript',
          label: 'server/routes/packing.js',
          code: `import Anthropic from '@anthropic-ai/sdk';
import { PACKING_LIST_SYSTEM_PROMPT } from '../prompts/packingList.js';

const anthropic = new Anthropic({ 
  apiKey: process.env.ANTHROPIC_API_KEY 
});

export async function packingListRoute(req, res) {
  const { destination, days, style = 'backpacker' } = req.body;

  // Set up streaming headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: PACKING_LIST_SYSTEM_PROMPT,
      messages: [{
        role: 'user',
        content: \`Destination: \${destination}
Duration: \${days} days
Travel style: \${style}\`
      }]
    });

    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && 
          chunk.delta.type === 'text_delta') {
        res.write(\`data: \${chunk.delta.text}\\n\\n\`);
      }
    }

    res.write('data: [DONE]\\n\\n');
    res.end();

  } catch (error) {
    res.write(\`data: [ERROR] \${error.message}\\n\\n\`);
    res.end();
  }
}`
        },
        callout: {
          variant: 'tip',
          content: 'The `for await` loop is the key pattern — it iterates over streaming chunks as they arrive from Claude, forwarding each one immediately to the browser.'
        },
        quiz: {
          question: 'Why send a [DONE] signal at the end of the stream?',
          options: [
            'Required by the Anthropic API',
            'The frontend needs to know the stream is complete so it can parse the accumulated JSON',
            'It closes the database connection',
            'It triggers the billing calculation'
          ],
          answer: 1,
          explanation: 'The frontend accumulates all streamed text chunks. Only when it receives [DONE] does it know the full JSON is ready to parse. Without [DONE], the frontend doesn\'t know when to call JSON.parse().'
        }
      },
      {
        id: 'p1s5',
        title: 'Build the React hook',
        duration: '8 min',
        type: 'build',
        content: `Create a clean React hook that handles the streaming connection, accumulates text, and exposes loading/data/error state to your component.`,
        instructions: [
          'Create src/hooks/usePackingList.js',
          'Use fetch() with ReadableStream to read the SSE stream',
          'Accumulate text chunks, parse JSON on [DONE]',
          'Expose: { data, loading, rawStream, error, generate }'
        ],
        code: {
          language: 'javascript',
          label: 'src/hooks/usePackingList.js',
          code: `import { useState, useCallback } from 'react';

export function usePackingList() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rawStream, setRawStream] = useState('');

  const generate = useCallback(async ({ destination, days, style }) => {
    setLoading(true);
    setError(null);
    setData(null);
    setRawStream('');

    try {
      const res = await fetch('/api/packing-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destination, days, style })
      });

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\\n').filter(l => l.startsWith('data: '));

        for (const line of lines) {
          const text = line.slice(6); // remove "data: "

          if (text === '[DONE]') {
            try {
              setData(JSON.parse(accumulated));
            } catch {
              setError('Claude returned invalid JSON. Try again.');
            }
          } else if (text.startsWith('[ERROR]')) {
            setError(text.slice(8));
          } else {
            accumulated += text;
            setRawStream(accumulated); // show live stream
          }
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, rawStream, generate };
}`
        },
        quiz: {
          question: 'Why do we set both `rawStream` (as text arrives) and `data` (when [DONE] is received)?',
          options: [
            'rawStream is for debugging only',
            'rawStream drives the live UI animation, data drives the final rendered component',
            'They contain different information',
            'rawStream is faster to update than data'
          ],
          answer: 1,
          explanation: '`rawStream` updates on every chunk — powering the "typing" animation your UI shows while loading. `data` is the parsed JSON only available after the full response — powering the final rendered packing list.'
        }
      },
      {
        id: 'p1s6',
        title: 'Build the React component',
        duration: '10 min',
        type: 'build',
        content: `Wire everything together in a PackingList page component. Show a streaming preview while loading, then render the full structured list when complete.`,
        instructions: [
          'Create src/pages/PackingList.jsx',
          'Build the input form (destination, days, travel style)',
          'Show rawStream as streaming preview',
          'Render data as structured category cards when done',
          'Add priority color coding (essential = red, recommended = amber, optional = gray)'
        ],
        code: {
          language: 'jsx',
          label: 'src/pages/PackingList.jsx (core structure)',
          code: `import { useState } from 'react';
import { usePackingList } from '../hooks/usePackingList';

const PRIORITY_COLORS = {
  essential:    { bg: '#FEE2E2', text: '#7F1D1D', border: '#FCA5A5' },
  recommended:  { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D' },
  optional:     { bg: '#F1EFE8', text: '#444441', border: '#D1CFC8' },
};

export default function PackingListPage() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(7);
  const { data, loading, rawStream, error, generate } = usePackingList();

  const handleGenerate = () => {
    if (!destination) return;
    generate({ destination, days, style: 'backpacker' });
  };

  return (
    <div className="packing-page">
      {/* Input form */}
      <div className="packing-form">
        <input 
          value={destination}
          onChange={e => setDestination(e.target.value)}
          placeholder="Where are you going? (e.g. Patagonia)"
        />
        <input 
          type="number" value={days} min={1} max={90}
          onChange={e => setDays(Number(e.target.value))}
        />
        <button onClick={handleGenerate} disabled={loading || !destination}>
          {loading ? 'Generating...' : 'Generate packing list'}
        </button>
      </div>

      {/* Streaming preview */}
      {loading && rawStream && (
        <div className="stream-preview">
          <pre>{rawStream}</pre>
        </div>
      )}

      {/* Structured output */}
      {data && (
        <div className="packing-result">
          <h2>{data.destination} — {data.duration_days} days</h2>
          <p className="weather-note">{data.weather_note}</p>
          <div className="categories-grid">
            {data.categories.map(cat => (
              <div key={cat.name} className="category-card"
                style={{ borderColor: PRIORITY_COLORS[cat.priority].border }}>
                <div className="category-header">
                  <span>{cat.icon}</span>
                  <h3>{cat.name}</h3>
                  <span className="priority-badge"
                    style={PRIORITY_COLORS[cat.priority]}>
                    {cat.priority}
                  </span>
                </div>
                <ul>
                  {cat.items.map(item => (
                    <li key={item.name}>
                      <span className="item-qty">×{item.qty}</span>
                      <span className="item-name">{item.name}</span>
                      {item.note && <span className="item-note">{item.note}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
      {error && <div className="error-msg">{error}</div>}
    </div>
  );
}`
        },
        callout: {
          variant: 'tip',
          content: 'Show `rawStream` during loading to give users immediate feedback. It looks like Claude is "thinking out loud" — far better UX than a blank spinner for 3 seconds.'
        },
        quiz: {
          question: 'The streaming preview shows raw JSON characters like `{"destination":"Lima"...`. Should you show this to users?',
          options: [
            'Yes — users appreciate seeing the raw output',
            'No — show a loading skeleton instead, or parse partial JSON for a nicer preview',
            'Yes but only in dark mode',
            'No — hide everything until [DONE]'
          ],
          answer: 1,
          explanation: 'Raw JSON is ugly for end users. Better options: a loading skeleton, a simple "Generating your list..." progress indicator, or a more advanced partial-JSON parser that renders items as they stream. The rawStream approach shown here is a starting point — polish it for production.'
        }
      }
    ]
  },
  {
    id: 'proj2',
    title: 'Set up CLAUDE.md for your real project',
    subtitle: 'Build your project memory file',
    level: 'Beginner',
    duration: '20 min',
    color: '#059669',
    bg: '#D1FAE5',
    accent: '#047857',
    description: 'Build a production-quality CLAUDE.md for one of your real projects (PackLight or the reservist calculator) that will save you hours of context-setting across every future session.',
    what_you_build: 'A complete, professional CLAUDE.md file tailored to your actual project — ready to drop into your repo and use immediately.',
    prerequisites: ['A project you\'re actively working on', 'Claude Code installed'],
    canva_image: 'https://design.canva.ai/XLbW_XK48hZbQPO',
    steps: [
      {
        id: 'p2s1',
        title: 'Audit your project',
        duration: '5 min',
        type: 'setup',
        content: 'Before writing CLAUDE.md, do a quick audit of your project so you know exactly what to include.',
        instructions: [
          'Open your project in the file explorer',
          'Note your exact tech stack (framework, key libraries, versions)',
          'List the commands you use daily (dev server, build, test)',
          'Note any patterns or conventions you always follow',
          'Note the 3 biggest current challenges or open issues'
        ],
        code: {
          language: 'bash',
          label: 'Run these to check your stack',
          code: `# Check Node version
node --version

# See all your dependencies
cat package.json | grep -A 50 '"dependencies"'

# See your scripts
cat package.json | grep -A 10 '"scripts"'`
        },
        callout: {
          variant: 'tip',
          content: 'Spend 5 minutes on this audit — the quality of your CLAUDE.md is directly proportional to how well you understand your own project right now.'
        },
        quiz: {
          question: 'Which item is MOST important to include in CLAUDE.md?',
          options: [
            'Your personal biography',
            'The commands to run the dev server, tests, and build',
            'A list of all files in the project',
            'The history of how the project started'
          ],
          answer: 1,
          explanation: 'Commands are used every session. Claude needs to know `npm run dev` vs `yarn dev` vs `python manage.py runserver` — without this, it can\'t run your code or verify changes work.'
        }
      },
      {
        id: 'p2s2',
        title: 'Write the core sections',
        duration: '10 min',
        type: 'build',
        content: 'Now write your CLAUDE.md using the professional template below. Adapt every section to your actual project.',
        instructions: [
          'Create CLAUDE.md in your project root',
          'Fill in every section — don\'t leave placeholders',
          'Be specific: "React 18 + Vite 4" not just "React"',
          'List real constraints you\'ve learned the hard way',
          'Add your current open issues — this is the most valuable section'
        ],
        code: {
          language: 'markdown',
          label: 'Professional CLAUDE.md template',
          code: `# [Project Name] — CLAUDE.md

## Stack
- Frontend: [e.g. React 18 + Vite 5 + Tailwind CSS 3 + Lucide React]
- Backend: [e.g. Node.js 20 + Express 4 + MongoDB 7 + Mongoose]
- Auth: [e.g. JWT — not yet implemented]
- State: [e.g. Zustand for global, useState for local]
- Testing: [e.g. Vitest + React Testing Library]

## Commands
\`\`\`bash
npm run dev        # Start dev server → http://localhost:5173
npm run build      # Production build → /dist
npm run test       # Run test suite
npm run lint       # ESLint check
\`\`\`

## Architecture
\`\`\`
/src
  /components     # Reusable UI (PascalCase filenames)
  /pages          # Route-level components
  /hooks          # Custom hooks (use prefix)
  /utils          # Pure functions, helpers
  /data           # Static data, constants
/server
  /routes         # Express route handlers
  /models         # Mongoose schemas
\`\`\`

## Conventions
- Components: PascalCase, one per file
- Hooks: camelCase with 'use' prefix
- Hebrew/RTL: always dir="rtl" on root element
- CSS: Tailwind only — no inline styles for layout
- Never use 'any' type — always be explicit
- Imports: absolute from /src, relative for siblings

## Current status
[One paragraph on where the project is right now]
[What was just completed]
[What is actively being worked on]

## Open issues
1. [Specific bug or task #1]
2. [Specific bug or task #2]
3. [Specific bug or task #3]

## Never do
- Never delete files without confirming with me first
- Never commit directly to main — always use a feature branch
- Never use npm packages not already in package.json without asking
- Never modify the auth logic without explicit instruction`
        },
        quiz: {
          question: 'You\'ve been debugging an RTL layout bug all week. Where does this belong in CLAUDE.md?',
          options: [
            'Don\'t include it — it\'s a temporary issue',
            'In "Open issues" AND in "Conventions" (if you found the fix)',
            'Only in "Stack"',
            'Only in "Commands"'
          ],
          answer: 1,
          explanation: 'Active bugs go in "Open issues" so Claude knows they exist. If you found the pattern that fixes it (e.g. "always use dir=rtl"), it goes in "Conventions" as a permanent rule — preventing Claude from reintroducing the bug.'
        }
      },
      {
        id: 'p2s3',
        title: 'Test it in a real session',
        duration: '5 min',
        type: 'test',
        content: 'Drop your CLAUDE.md into your project and verify Claude reads it correctly at session start.',
        instructions: [
          'Save CLAUDE.md to your project root',
          'Open a new Claude Code session: `claude`',
          'Ask: "What\'s our tech stack?" — Claude should answer from CLAUDE.md',
          'Ask: "What\'s the command to start the dev server?" — should be instant',
          'Ask: "What are the current open issues?" — should list exactly what you wrote',
          'If any answer is wrong, update CLAUDE.md and try again'
        ],
        code: {
          language: 'bash',
          label: 'Verify CLAUDE.md is working',
          code: `# Start a new session
claude

# Test these prompts:
# "What's our tech stack?"
# "How do I run the dev server?"
# "What are the open issues?"
# "What branch should I work on?"
# "What's our component naming convention?"`
        },
        callout: {
          variant: 'tip',
          content: 'If Claude can\'t answer any of these from memory, that section is missing or unclear in your CLAUDE.md. Update it and re-test. A good CLAUDE.md answers all of these without Claude needing to look at any files.'
        },
        quiz: {
          question: 'Claude answers "I don\'t have information about your branch conventions." What do you do?',
          options: [
            'Tell Claude at the start of every session instead',
            'Add a "Git workflow" section to CLAUDE.md with your branch naming rules',
            'Use /model to switch to Opus — it remembers more',
            'It\'s fine — Claude will figure it out from the code'
          ],
          answer: 1,
          explanation: 'Every gap in Claude\'s knowledge means you\'ll need to re-explain that thing in every session. Add it to CLAUDE.md once and it\'s solved permanently. CLAUDE.md is a living document — keep improving it.'
        }
      }
    ]
  },
  {
    id: 'proj3',
    title: 'Build your first Cowork workflow',
    subtitle: 'Automate a real weekly task',
    level: 'Beginner',
    duration: '25 min',
    color: '#D97706',
    bg: '#FEF3C7',
    accent: '#B45309',
    description: 'Build a real Cowork workflow that automatically organizes your project files every week — zero code required. By the end you\'ll have a workflow you can run every Monday morning.',
    what_you_build: 'A Cowork workflow that scans your Downloads folder, identifies project files, and organizes them into a clean folder structure — saving 15 minutes every week.',
    prerequisites: ['Cowork installed on your Mac', 'A messy Downloads folder (everyone has one)'],
    canva_image: 'https://design.canva.ai/hmcxnHCzBY2cL8v',
    steps: [
      {
        id: 'p3s1',
        title: 'Map the task manually first',
        duration: '5 min',
        type: 'setup',
        content: 'Before automating anything, do the task once manually and write down every decision you make. This becomes your workflow brief.',
        instructions: [
          'Open your Downloads folder',
          'Pick 10 random files and decide where each one should go',
          'Notice the patterns in your decisions',
          'Write down the rules you used (e.g. "invoices go to /Accounting/2025")',
          'Note any edge cases or files you\'d skip'
        ],
        callout: {
          variant: 'tip',
          content: 'The manual pass is not wasted time — it\'s requirements gathering. If you can\'t do the task manually in a consistent way, Claude can\'t automate it reliably either.'
        },
        quiz: {
          question: 'Why do the task manually before automating it?',
          options: [
            'Cowork requires a manual run first to learn from',
            'Manual execution surfaces the decision rules you need to write in your workflow brief',
            'It\'s faster than writing a brief',
            'To verify Cowork is installed correctly'
          ],
          answer: 1,
          explanation: 'Automation is only as good as the rules behind it. Manual execution forces you to articulate every decision — which becomes the constraints and steps in your workflow brief. Skip this and your automation will make the wrong decisions.'
        }
      },
      {
        id: 'p3s2',
        title: 'Write your workflow brief',
        duration: '8 min',
        type: 'build',
        content: 'Turn your manual decisions into a formal workflow brief using the 5-part structure.',
        instructions: [
          'Open Cowork',
          'Create a new workflow',
          'Write the brief using the template below',
          'Be very specific in the constraints section',
          'Save the workflow'
        ],
        code: {
          language: 'markdown',
          label: 'Your workflow brief',
          code: `## Workflow: Weekly Downloads organizer

Trigger: Manual (I'll run it every Monday morning)

Input: ~/Downloads folder — all files

Sorting rules:
  - PDF invoices/receipts → ~/Documents/Accounting/2025/
  - Screenshots (IMG_, Screenshot) → ~/Documents/Screenshots/[YYYY-MM]/
  - Project files (.jsx, .js, .tsx, .css) → ~/Projects/inbox/
  - ZIP archives → ~/Documents/Archives/
  - .docx/.xlsx files → ~/Documents/Work/
  - Everything else → leave in place (don't touch)

Output: 
  - Files moved to correct folders
  - Print a summary: "Moved X files: Y to Accounting, Z to Screenshots..."

Constraints:
  - NEVER delete any file — only move
  - NEVER move files older than 30 days (leave them alone)
  - NEVER move files currently open in another app
  - NEVER move files named "KEEP_*" or "IMPORTANT_*"
  - If destination folder doesn't exist, create it first
  - If a filename already exists at destination, add _2, _3 suffix`
        },
        callout: {
          variant: 'warning',
          content: 'The constraints section is what separates a safe workflow from a dangerous one. "NEVER delete any file" should be in every file-handling workflow you ever write.'
        },
        quiz: {
          question: 'Your workflow moves a file but one with the same name already exists at the destination. Without a constraint, what might Claude do?',
          options: [
            'Always keep both files',
            'Ask you every time — safe by default',
            'Overwrite the existing file — losing it permanently',
            'Skip the file and continue'
          ],
          answer: 2,
          explanation: 'Without an explicit constraint, Claude may overwrite — permanently losing the existing file. The "add _2, _3 suffix" constraint prevents this. Always anticipate destructive edge cases and handle them explicitly.'
        }
      },
      {
        id: 'p3s3',
        title: 'Test on a safe subset first',
        duration: '7 min',
        type: 'test',
        content: 'Never run a new workflow on your real data first. Always test on a small, recoverable sample.',
        instructions: [
          'Create a test folder: ~/Desktop/test-downloads/',
          'Copy (don\'t move) 10-15 files into it — a mix of types',
          'Modify your workflow brief: change Input to ~/Desktop/test-downloads/',
          'Run the workflow and review every action before confirming',
          'Verify files landed in the right places',
          'Only then switch Input back to ~/Downloads and run for real'
        ],
        callout: {
          variant: 'tip',
          content: 'The test-on-copy habit saves you from data loss. It takes 2 extra minutes and gives you complete confidence before touching real files.'
        },
        code: {
          language: 'bash',
          label: 'Create your test folder',
          code: `# Create test folder
mkdir ~/Desktop/test-downloads

# Copy a sample of files (adjust path as needed)
cp ~/Downloads/*.pdf ~/Desktop/test-downloads/ 2>/dev/null
cp ~/Downloads/Screenshot* ~/Desktop/test-downloads/ 2>/dev/null
cp ~/Downloads/*.zip ~/Desktop/test-downloads/ 2>/dev/null

# Now run the workflow on ~/Desktop/test-downloads/ first`
        },
        quiz: {
          question: 'Your test run worked perfectly on 15 files. You\'re ready to run on your real Downloads folder with 400 files. What do you do?',
          options: [
            'Run it — if 15 worked, 400 will too',
            'Run it but watch carefully and be ready to interrupt (Escape) if anything looks wrong',
            'Test on 50 files first, then 100, then the full 400',
            'Wait until you have a backup of Downloads before running'
          ],
          answer: 1,
          explanation: 'Scale-up is always slightly risky. Run with your finger on Escape — ready to cancel if Claude does something unexpected. Having a backup (Time Machine) is also good practice before running any bulk file operation.'
        }
      }
    ]
  }
];

export function getProjectById(id) {
  return PROJECTS.find(p => p.id === id) || null;
}
