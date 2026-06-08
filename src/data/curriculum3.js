export const MODULES3 = [
  // ─────────────────────────────────────────────────────────────────────────────
  // MODULE: CLAUDE BASICS
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'basics',
    title: 'Claude Basics',
    subtitle: 'What Claude is and how it really works',
    color: '#0284C7',
    bg: '#E0F2FE',
    accent: '#0369A1',
    icon: 'info',
    lessons: [
      {
        id: 'bas1',
        title: 'What is Claude?',
        level: 'Beginner',
        duration: '8 min',
        description: 'Understand what Claude actually is under the hood — what kind of AI it is, what it can and cannot do, and how it differs from a search engine or chatbot.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Claude is a **Large Language Model (LLM)** built by Anthropic. It's not a search engine, not a database, and not a simple chatbot. Understanding what it actually is changes how you use it.`
            },
            {
              type: 'diagram',
              title: 'What Claude is — and is not',
              diagram: 'what-is-claude'
            },
            {
              type: 'text',
              content: `**What Claude actually is:**\n\nClaude is a statistical model trained on a massive amount of text. During training it learned patterns — how words, ideas, and reasoning connect. When you write a message, Claude predicts the most useful continuation based on everything it learned.\n\n**The key implications:**\n\n• Claude doesn't "look things up" — it generates responses from learned patterns\n• It has a knowledge cutoff date — it doesn't know about very recent events\n• It can be wrong — confidently, fluently wrong — especially on specific facts\n• It gets better with more context — the more you tell it, the better it performs\n• It has no memory between conversations by default`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**The right mental model:** Think of Claude as an extremely well-read colleague who has absorbed millions of books, papers, and conversations — but who hasn't checked the news in a while, and whose memory resets every time you meet.`
            },
            {
              type: 'text',
              content: `**Claude's three surfaces in 2026:**\n\n• **claude.ai** — the chat interface you're using right now. Conversations, file uploads, image analysis, artifacts, MCP connectors.\n• **Claude Code** — the terminal agent. Reads and edits real project files, runs commands, deploys code.\n• **Claude API** — the developer interface. Embed Claude into your own apps, products, and workflows.`
            },
            {
              type: 'callout',
              variant: 'warning',
              content: `**Never treat Claude's output as ground truth for important facts.** Always verify specific numbers, dates, laws, and medical/legal/financial information from primary sources. Claude is a reasoning tool, not a fact database.`
            }
          ],
          quiz: {
            question: 'You ask Claude "What happened in the news yesterday?" It gives you a confident, detailed answer. What should you do?',
            options: [
              'Trust it — Claude has access to the internet',
              'Verify it — Claude may be generating plausible-sounding but incorrect information about recent events',
              'Refresh the page and try again',
              'Switch to a more powerful model'
            ],
            answer: 1,
            explanation: 'Claude has a training cutoff and no real-time internet access by default. It may generate plausible-sounding but fabricated recent "news." Always verify time-sensitive facts from actual news sources.'
          }
        }
      },
      {
        id: 'bas2',
        title: 'Claude models — which one to use',
        level: 'Beginner',
        duration: '9 min',
        description: 'Learn the difference between Haiku, Sonnet, and Opus — when to use each, what they cost, and how to choose the right model for the right task.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Anthropic offers multiple Claude models, each with a different balance of speed, capability, and cost. Choosing the right one matters — not just for cost, but for quality and response time.`
            },
            {
              type: 'diagram',
              title: 'Claude model comparison',
              diagram: 'model-comparison'
            },
            {
              type: 'text',
              content: `**Claude Haiku** — The fast, affordable model\n• Best for: simple tasks, classification, short answers, high-volume processing\n• Speed: very fast (under 1 second for short responses)\n• Cost: cheapest — roughly 25x cheaper than Opus\n• Use when: you need speed, the task is simple, or you're doing bulk processing\n\n**Claude Sonnet** — The balanced model (default choice)\n• Best for: most everyday tasks, coding, writing, analysis, product features\n• Speed: fast (1-3 seconds)\n• Cost: moderate — best price/performance ratio\n• Use when: you're unsure which model to pick — Sonnet is almost always right\n\n**Claude Opus** — The most capable model\n• Best for: complex reasoning, research, nuanced judgment, hard architecture decisions\n• Speed: slower (3-8 seconds)\n• Cost: most expensive\n• Use when: the task genuinely requires deep reasoning and quality matters most`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**Practical rule:** Default to Sonnet for everything. Switch to Haiku when processing volume is high or speed is critical. Switch to Opus only when Sonnet gives you unsatisfying results on a genuinely complex task.`
            },
            {
              type: 'text',
              content: `**In claude.ai (the chat interface):**\nYou can switch models mid-conversation using the model picker at the top. Your Pro plan includes all models. Use Opus for deep strategy sessions, Sonnet for building and writing, Haiku when you just need a quick answer.\n\n**In Claude Code:**\nUse /model to switch. Default is Sonnet. Switch to Opus for architecture planning sessions.`
            },
            {
              type: 'code',
              language: 'javascript',
              label: 'Model selection in the API',
              code: `// Haiku — fast and cheap, bulk processing
model: 'claude-haiku-4-5-20251001'

// Sonnet — default for product features  
model: 'claude-sonnet-4-20250514'

// Opus — deep reasoning, complex tasks
model: 'claude-opus-4-6'`
            }
          ],
          quiz: {
            question: 'You\'re building a feature that reads 10,000 customer reviews and classifies each one as positive/negative/neutral. Which model should you use?',
            options: [
              'Opus — maximum accuracy for customer data',
              'Sonnet — the safe default choice',
              'Haiku — simple classification task, high volume, cost matters',
              'It doesn\'t matter, all models give the same result'
            ],
            answer: 2,
            explanation: 'Haiku is ideal here: the task is simple (3-way classification), the volume is high (10,000 reviews), and cost scales linearly. Haiku is ~25x cheaper than Opus and handles straightforward classification with the same accuracy.'
          }
        }
      },
      {
        id: 'bas3',
        title: 'Tokens — the currency of AI',
        level: 'Beginner',
        duration: '10 min',
        description: 'Understand what tokens are, how they\'re counted, why they matter for both cost and context limits, and how to think about token usage in your projects.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Everything in Claude — your input, the response, even the system prompt — is measured in **tokens**. Tokens are the basic unit of AI processing. They determine what you pay, how much Claude can "see" at once, and why conversations have limits.`
            },
            {
              type: 'diagram',
              title: 'How tokenization works',
              diagram: 'tokenization'
            },
            {
              type: 'text',
              content: `**What is a token?**\n\nA token is roughly 4 characters of text, or about 0.75 words. But it's not exactly words — it's how the model breaks text into chunks it can process:\n\n• "Hello" = 1 token\n• "tokenization" = 3 tokens (token + ization or similar)\n• A typical sentence = 15-25 tokens\n• A full page of text ≈ 400-500 tokens\n• This entire lesson ≈ 800 tokens`
            },
            {
              type: 'diagram',
              title: 'Token counting in practice',
              diagram: 'token-counting'
            },
            {
              type: 'text',
              content: `**The context window:**\n\nClaude can only "see" a fixed number of tokens at once — this is the context window. Claude Sonnet has a 200,000 token context window, which is roughly 150,000 words or a 500-page book. Everything within that window — your messages, Claude's responses, system prompts, file contents — counts toward the limit.\n\n**Why tokens affect cost:**\n\nYou're billed per 1 million tokens (MTok), separately for input and output:\n• Input tokens = what you send (your messages, files, system prompts)\n• Output tokens = what Claude generates (typically more expensive)\n• Cached tokens = repeated context you've marked for caching (up to 90% cheaper)`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**Token-saving habits:**\n• Use /compact in Claude Code to compress long sessions\n• Enable prompt caching for repeated system prompts in the API\n• Be concise in prompts — every word costs money at scale\n• Use max_tokens to limit output length when you don't need long answers`
            },
            {
              type: 'code',
              language: 'javascript',
              label: 'Check token usage in the API response',
              code: `const response = await client.messages.create({ ... });

// Token usage is in the response
console.log(response.usage);
// {
//   input_tokens: 842,
//   output_tokens: 156,
//   cache_read_input_tokens: 600,  // if caching enabled
//   cache_creation_input_tokens: 0
// }

// Estimate cost (Sonnet pricing):
const inputCost  = (842  / 1_000_000) * 3.00;   // $3/MTok input
const outputCost = (156  / 1_000_000) * 15.00;  // $15/MTok output
const totalCost  = inputCost + outputCost;
// ≈ $0.000002525 + $0.00000234 = $0.0000048 per call
// 1,000 calls = ~$0.005 — essentially free at this scale`
            }
          ],
          quiz: {
            question: 'Your system prompt is 2,000 tokens. You make 10,000 API calls per day. What\'s the most impactful cost optimization?',
            options: [
              'Switch to a cheaper model',
              'Shorten the system prompt to under 100 tokens',
              'Enable prompt caching — the 2,000-token system prompt gets cached and costs 90% less on every subsequent call',
              'Use max_tokens to limit response length'
            ],
            answer: 2,
            explanation: 'Prompt caching is the right answer. At 10,000 calls/day with a 2,000-token system prompt, you\'re sending 20M input tokens/day just for the system prompt. Caching reduces that cost by up to 90%, saving orders of magnitude more than any other optimization.'
          }
        }
      },
      {
        id: 'bas4',
        title: 'The API — what it is and why it matters',
        level: 'Beginner',
        duration: '10 min',
        description: 'Demystify the Anthropic API — what it is, how it differs from claude.ai, when you need it, and what you can build with it.',
        content: {
          sections: [
            {
              type: 'text',
              content: `The **API** (Application Programming Interface) is how you talk to Claude programmatically — from your own code, app, or product. It's what separates "using Claude" from "building with Claude."`
            },
            {
              type: 'diagram',
              title: 'claude.ai vs the API',
              diagram: 'api-vs-chat'
            },
            {
              type: 'text',
              content: `**claude.ai (the chat interface):**\n• You type, Claude responds\n• One user at a time\n• Anthropic controls the interface\n• Billed through your subscription ($20/mo Pro)\n• Great for: personal use, exploration, one-off tasks\n\n**The API:**\n• Your code sends a request, Claude responds with JSON\n• Unlimited users (your users)\n• You control the interface\n• Billed per token (pay as you go)\n• Great for: products, automation, embedding Claude in your app`
            },
            {
              type: 'code',
              language: 'bash',
              label: 'Get your API key',
              code: `# 1. Go to: console.anthropic.com
# 2. Click "API Keys" in the left sidebar
# 3. Click "Create Key" — give it a name
# 4. Copy the key (starts with sk-ant-...)
# 5. Store it safely — you only see it once

# In your project, store it as an environment variable:
# .env file (never commit this to git!)
ANTHROPIC_API_KEY=sk-ant-api03-your-key-here`
            },
            {
              type: 'code',
              language: 'javascript',
              label: 'Your first API call — 10 lines',
              code: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: 'claude-sonnet-4-20250514',
  max_tokens: 1024,
  messages: [
    { role: 'user', content: 'Explain tokens in one sentence.' }
  ],
});

console.log(message.content[0].text);
// "Tokens are the chunks of text that AI models process,
//  roughly 4 characters each, used to measure usage and cost."`
            },
            {
              type: 'callout',
              variant: 'warning',
              content: `**The golden rule:** Never put your API key in frontend code (React, HTML, JavaScript that runs in the browser). Anyone can view it in DevTools and use your credits. API keys belong in backend code only — Express routes, serverless functions, or scripts that run on your server.`
            },
            {
              type: 'text',
              content: `**When do you need the API vs claude.ai?**\n\n• Building a feature in your app → API\n• Processing data automatically → API\n• More than one user needs Claude → API\n• You need custom system prompts → API\n• Just chatting and exploring → claude.ai\n• Writing documents and code for yourself → claude.ai`
            }
          ],
          quiz: {
            question: 'You want to add an AI feature to PackLight that generates packing lists for users. Which approach is correct?',
            options: [
              'Have users log in to claude.ai and paste results into PackLight',
              'Put the API key in your React frontend so it can call Claude directly',
              'Call the Claude API from your backend and return results to the React frontend',
              'The API is only for large companies — use claude.ai for small apps'
            ],
            answer: 2,
            explanation: 'Backend-only API calls are the only correct approach. Your React frontend can\'t safely hold an API key. The pattern: user action → your Express/Node backend → Claude API → response back to React → render. The API is for every size of project.'
          }
        }
      },
      {
        id: 'bas5',
        title: 'Claude plans — Pro, Max, Team, Enterprise',
        level: 'Beginner',
        duration: '7 min',
        description: 'Understand the different Claude subscription plans, what each includes, and which one is right for your situation.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Claude comes in several flavors depending on how heavily you use it and what you need. Understanding the plans prevents both overpaying and hitting frustrating limits.`
            },
            {
              type: 'diagram',
              title: 'Claude plan comparison',
              diagram: 'claude-plans'
            },
            {
              type: 'text',
              content: `**Free** — $0/month\n• Limited messages per day\n• Claude Sonnet only\n• No file uploads, no Projects\n• Good for: trying Claude out, occasional use\n\n**Pro** — $20/month\n• Higher message limits (5x Free)\n• All models including Opus\n• File uploads, image analysis\n• Projects (persistent context folders)\n• Claude.ai web, mobile, and desktop apps\n• Good for: daily personal use, learning, freelancing\n\n**Max** — $100 or $200/month\n• Much higher limits (5x or 20x Pro)\n• Extended thinking\n• Claude Code included\n• Guest Pass invitations (3 passes)\n• Good for: power users, heavy Claude Code sessions\n\n**Team** — $30/user/month\n• Pro-level for a team\n• Shared Projects, admin controls\n• Usage analytics\n• Good for: small teams using Claude together\n\n**Enterprise** — custom pricing\n• Unlimited usage\n• SSO, SCIM provisioning\n• Custom retention policies\n• Dedicated account management\n• Good for: companies deploying Claude at scale`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**For most people learning Claude:** Start with Pro ($20/mo). It covers all models, Projects, and file uploads — everything in this course. Upgrade to Max when you start using Claude Code heavily (it uses significant credits in long sessions).`
            },
            {
              type: 'callout',
              variant: 'warning',
              content: `**API billing is separate from subscriptions.** Your Pro subscription covers claude.ai usage. Building with the API is billed separately via console.anthropic.com — you pay per token regardless of your subscription plan.`
            }
          ],
          quiz: {
            question: 'You\'re a solo developer building a SaaS product with Claude API, and you also use claude.ai daily for your own work. What\'s the most cost-effective setup?',
            options: [
              'Enterprise plan — covers everything',
              'Free plan — API billing covers the rest',
              'Pro plan ($20/mo) for claude.ai + separate API account for your product — they\'re billed independently',
              'Max plan — always the best choice for developers'
            ],
            answer: 2,
            explanation: 'Pro covers your daily claude.ai usage (all models, file uploads, Projects). Your product runs on the API which is billed per-token separately — completely independent of your subscription. This is the right setup for most developers.'
          }
        }
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // MODULE: SKILLS — THE PLUGIN SYSTEM
  // ─────────────────────────────────────────────────────────────────────────────
  {
    id: 'skills',
    title: 'Skills & Plugins',
    subtitle: 'Extend Claude with reusable knowledge',
    color: '#0891B2',
    bg: '#CFFAFE',
    accent: '#0E7490',
    icon: 'puzzle',
    lessons: [
      {
        id: 'sk1',
        title: 'What are Skills?',
        level: 'Beginner',
        duration: '9 min',
        description: 'Understand what Skills (SKILL.md files) are, why they exist, and how they give Claude environment-specific knowledge that its training data cannot provide.',
        content: {
          sections: [
            {
              type: 'text',
              content: `A **Skill** is a markdown file (always named \`SKILL.md\`) that Claude reads before performing a specific type of task. Skills encode best practices, environment constraints, available libraries, and known quirks — things that are specific to your setup and can't be in Claude's training data.`
            },
            {
              type: 'diagram',
              title: 'How Skills fit into Claude\'s workflow',
              diagram: 'skills-overview'
            },
            {
              type: 'text',
              content: `**Why Skills exist:**\n\nClaude's training taught it general knowledge. But every environment is different:\n• Which Python libraries are installed\n• Which file paths are writable\n• Which patterns work vs. break in this specific setup\n• Your team's naming conventions\n• Output format requirements\n\nSkills bridge the gap between Claude's general knowledge and your specific environment.`
            },
            {
              type: 'text',
              content: `**The mandatory reading rule:**\n\nWhen Claude (in Claude Code or Cowork) is about to create a specific file type — a Word doc, a PDF, an Excel spreadsheet, a React component — it must read the relevant SKILL.md first. This isn't optional. Skipping it leads to errors, wrong libraries, and broken output.\n\nThe skill tells Claude:\n• Exactly which library to use (e.g., python-docx, not docx)\n• Which version is installed\n• Where to write the output file\n• What patterns work and what breaks\n• Example code that's been tested`
            },
            {
              type: 'callout',
              variant: 'warning',
              content: `**Common mistake:** Asking Claude to "create a Word document" without reading the docx skill first. Claude will guess at the library name, the file paths, and the API — and it will often guess wrong. Reading the skill takes 2 seconds and prevents 80% of file creation errors.`
            },
            {
              type: 'diagram',
              title: 'Skill vs no-skill output quality',
              diagram: 'skill-quality'
            }
          ],
          quiz: {
            question: 'You ask Claude Code to create a PDF report. It generates Python code that fails with "ModuleNotFoundError: No module named \'fpdf\'". What most likely went wrong?',
            options: [
              'Python is not installed in your environment',
              'Claude didn\'t read the pdf SKILL.md first — it guessed the library name and guessed wrong',
              'PDFs can\'t be created with Python',
              'You need to upgrade Claude Code'
            ],
            answer: 1,
            explanation: 'Claude guessed "fpdf" but the environment uses a different library (e.g., reportlab or weasyprint). The pdf SKILL.md specifies exactly which library is installed and how to use it — reading it first prevents this error entirely.'
          }
        }
      },
      {
        id: 'sk2',
        title: 'Built-in Skills — the public library',
        level: 'Beginner',
        duration: '11 min',
        description: 'Tour the built-in public Skills: docx, pdf, pptx, xlsx, frontend-design, and data-analysis — what each covers and when to use them.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Anthropic ships a set of public Skills pre-installed at \`/mnt/skills/public/\`. These cover the most common file creation tasks and are maintained by Anthropic to stay accurate as libraries update.`
            },
            {
              type: 'code',
              language: 'bash',
              label: 'Browse available public Skills',
              code: `# View the Skills directory
ls /mnt/skills/public/

# Output:
# docx/           Word documents
# pdf/            PDF creation & manipulation
# pptx/           PowerPoint presentations
# xlsx/           Excel spreadsheets
# frontend-design/ React/HTML UI components
# data-analysis/  Charts and data from CSV

# Read any skill:
cat /mnt/skills/public/docx/SKILL.md`
            },
            {
              type: 'diagram',
              title: 'Built-in Skills and what they cover',
              diagram: 'builtin-skills'
            },
            {
              type: 'text',
              content: `**docx** — Word document creation\nLibrary: python-docx. Covers headings, tables, images, footers, numbered lists, styles. Use for: reports, memos, letters, proposals.\n\n**pdf** — PDF creation and manipulation\nLibrary: weasyprint (creation from HTML/CSS) + pypdf (manipulation). Covers creating PDFs from templates, merging, splitting, adding watermarks. Use for: invoices, certificates, forms.\n\n**pptx** — PowerPoint presentations\nLibrary: python-pptx. Covers slides, layouts, charts, images, speaker notes. Use for: decks, pitch presentations.\n\n**xlsx** — Excel spreadsheets\nLibrary: openpyxl. Covers cells, formulas, charts, conditional formatting, multiple sheets. Use for: financial models, data tables, trackers.\n\n**frontend-design** — React/HTML UI\nCovers design tokens, Tailwind patterns, component structures, dark mode, responsive layouts. Use for: any UI component or web page.\n\n**data-analysis** — Charts and analysis\nLibrary: pandas + matplotlib/plotly. Covers reading CSV, statistical analysis, chart generation. Use for: data visualization, reports from raw data.`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**How Claude uses Skills in practice:** When you ask "create a weekly report as a Word doc," Claude should automatically check if a docx Skill exists, read it, then write the code. If you're using Claude Code, you can explicitly say "read /mnt/skills/public/docx/SKILL.md first" to make sure.`
            },
            {
              type: 'sandbox',
              title: 'Practice: Match the task to the Skill',
              prompt: 'For each task below, which built-in Skill should Claude read first?\n1. Generate a bar chart from sales CSV data\n2. Create a quarterly investor update presentation\n3. Build a React dashboard component with dark mode\n4. Create a PDF invoice for a client\n5. Export financial data to a formatted Excel workbook',
              answer: '1. data-analysis\n2. pptx\n3. frontend-design\n4. pdf\n5. xlsx',
              hint: 'Match the output file format to the skill name. Charts from data = data-analysis.'
            }
          ],
          quiz: {
            question: 'You need Claude to create an Excel spreadsheet with formulas and conditional formatting. Which skill must it read first?',
            options: [
              'data-analysis — it handles spreadsheet data',
              'docx — the most general document skill',
              'xlsx — covers openpyxl patterns for Excel creation with formulas and formatting',
              'No skill needed — Claude knows Excel'
            ],
            answer: 2,
            explanation: 'xlsx is the dedicated skill for Excel creation. It specifies exactly how to use openpyxl, which patterns work for conditional formatting, how to apply cell styles, and where to write the output file. Without it, Claude will make mistakes on library-specific API calls.'
          }
        }
      },
      {
        id: 'sk3',
        title: 'Writing your own custom Skill',
        level: 'Intermediate',
        duration: '13 min',
        description: 'Learn how to write a SKILL.md that encodes your team\'s standards, tools, and conventions — making Claude an expert in your specific environment.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Custom Skills are where the real power lies. A well-written custom Skill turns Claude into a domain expert for your specific project — knowing your naming conventions, your approved libraries, your output paths, and your quality standards.`
            },
            {
              type: 'diagram',
              title: 'Anatomy of a custom SKILL.md',
              diagram: 'skill-anatomy'
            },
            {
              type: 'code',
              language: 'markdown',
              label: 'SKILL.md structure — the 7 sections',
              code: `---
name: my-skill-name
description: One sentence: what this skill does and when to use it
---

## Environment
What's installed, what versions, what OS assumptions.
Example:
- Python 3.11, reportlab 4.2
- Node 20, React 18, Tailwind 3.4
- Output writable at: /outputs/ only

## When to use this skill
Trigger conditions — what task types should read this skill.
Example: "Any time creating a PDF invoice or certificate"

## Patterns (what works)
Copy-paste ready code examples that are TESTED in this environment.
This is the most important section.
\`\`\`python
# Correct pattern for creating a PDF with reportlab
from reportlab.pdfgen import canvas
c = canvas.Canvas("/outputs/output.pdf")
c.drawString(72, 780, "Hello")
c.save()
\`\`\`

## Anti-patterns (what breaks)
What NOT to do — and why.
Example: "Never use fpdf2 — not installed. Never write to /tmp — not writable."

## Output conventions
File naming, path conventions, format requirements.
Example: "Always save to /outputs/YYYY-MM-DD-name.pdf"
Always print the output path when done.

## Quality checklist
What to verify before calling the task complete.
Example: "File exists? Size > 0? Opens correctly?"`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**The "Patterns" section is everything.** Claude reads it and directly uses the code snippets. Tested, working code examples in the Patterns section are worth 10x more than descriptions. Always include at least one complete working example.`
            },
            {
              type: 'code',
              language: 'markdown',
              label: 'Real example: Hebrew document skill',
              code: `---
name: hebrew-rtl-document
description: Create Hebrew RTL documents using python-docx with proper
             right-to-left text direction and Hebrew fonts
---

## Environment
- Python 3.11, python-docx 1.1
- System fonts: David CLM, Frank Ruehl CLM available
- Output writable at: /outputs/

## When to use this skill
Any time creating a Word document with Hebrew text or
mixed Hebrew/English content requiring RTL layout.

## Patterns (what works)
\`\`\`python
from docx import Document
from docx.oxml.ns import qn
from docx.oxml import OxmlElement

doc = Document()

# Set document RTL direction
body = doc.element.body
sectPr = body.get_or_add_sectPr()
bidi = OxmlElement('w:bidi')
sectPr.append(bidi)

# Add RTL paragraph
para = doc.add_paragraph('שלום עולם')
para.alignment = 2  # RIGHT alignment for Hebrew
pPr = para._p.get_or_add_pPr()
bidi = OxmlElement('w:bidi')
pPr.append(bidi)

doc.save('/outputs/document.docx')
print('Saved: /outputs/document.docx')
\`\`\`

## Anti-patterns (what breaks)
- Never use default paragraph alignment — Hebrew text appears
  on the left without explicit right alignment
- Never mix Hebrew and English in the same paragraph without
  setting the bidi property — rendering will be incorrect

## Output conventions
- Filename format: YYYY-MM-DD-description-he.docx
- Always include both Hebrew and transliterated title in filename
- Print saved path when complete`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**Your RTL opportunity:** The hebrew-rtl-document skill above is exactly what your reservist calculator project needs. Save it in your project as \`.claude/skills/hebrew-rtl-document/SKILL.md\` and Claude Code will use it automatically for any Hebrew document generation.`
            }
          ],
          quiz: {
            question: 'Your custom Skill has a "Patterns" section with working code. Your "Anti-patterns" section is empty. What risk does this create?',
            options: [
              'No risk — patterns are all that matters',
              'Claude may try alternative approaches that look reasonable but break in your environment, since it doesn\'t know what NOT to do',
              'The skill won\'t load without an anti-patterns section',
              'Claude will ask for confirmation before every action'
            ],
            answer: 1,
            explanation: 'Anti-patterns prevent Claude from "helping" in ways that break things. If Claude knows fpdf2 is not installed, it won\'t try it. If it doesn\'t know, it might reasonably attempt it and fail. Document every "don\'t do this" you\'ve learned through experience.'
          }
        }
      },
      {
        id: 'sk4',
        title: 'Skills vs MCP servers — choosing the right tool',
        level: 'Intermediate',
        duration: '10 min',
        description: 'Understand the fundamental difference between Skills (knowledge files) and MCP servers (live connections), and when to use each.',
        content: {
          sections: [
            {
              type: 'text',
              content: `Skills and MCP servers both extend Claude's capabilities — but in completely different ways. Using the wrong one for the job leads to wasted effort. This lesson clarifies the distinction permanently.`
            },
            {
              type: 'diagram',
              title: 'Skills vs MCP servers — the fundamental difference',
              diagram: 'skills-vs-mcp'
            },
            {
              type: 'text',
              content: `**Skills (SKILL.md) — static knowledge:**\n• A markdown file Claude reads before a task\n• Contains: patterns, anti-patterns, library versions, output conventions\n• No live connection — it's just text\n• Purpose: teach Claude how to do something correctly in your environment\n• When to use: creating files, following conventions, specialized tasks\n\n**MCP servers — live connections:**\n• A running server Claude connects to via a protocol\n• Provides: real-time data, live actions, external service access\n• Active connection required — the server must be running\n• Purpose: give Claude access to live data and the ability to take real actions\n• When to use: reading live data, sending messages, querying databases, taking actions in external services`
            },
            {
              type: 'text',
              content: `**Decision framework:**\n\n"Do I need Claude to **know how** to do something?" → **Skill**\n"Do I need Claude to **access live data or take actions**?" → **MCP server**\n\n**Examples:**\n• Generate a Hebrew Word doc → Skill (how to use python-docx with RTL)\n• Read my emails → MCP (live Gmail connection)\n• Create a chart from CSV → Skill (how to use matplotlib in this env)\n• Query my database → MCP (live database connection)\n• Build a React component in our style → Skill (our design conventions)\n• Post a Slack message → MCP (live Slack connection)`
            },
            {
              type: 'callout',
              variant: 'tip',
              content: `**You often need both.** Example: building a weekly report feature. Skill = how to format the report as a Word doc using python-docx. MCP = connecting to your database to pull the week's data. Claude reads the skill first, then queries the MCP for live data, then creates the formatted doc.`
            },
            {
              type: 'sandbox',
              title: 'Practice: Skill or MCP?',
              prompt: 'Classify each of these — should it be a Skill (S) or an MCP server (M)?\n1. Creating Excel files in our company\'s standard format\n2. Reading issues from GitHub\n3. Following our Hebrew RTL document conventions\n4. Sending emails via Gmail\n5. Creating charts using the exact matplotlib version we have installed\n6. Getting live stock prices',
              answer: '1. S — static knowledge about our Excel format\n2. M — live GitHub connection needed\n3. S — static convention knowledge\n4. M — live Gmail action\n5. S — environment-specific library knowledge\n6. M — live data required',
              hint: 'Ask: does this need live data or live actions? → MCP. Does this need static knowledge about how to do something? → Skill.'
            }
          ],
          quiz: {
            question: 'You want Claude to generate monthly invoices using your company\'s exact formatting. The invoice data comes from your database. What do you build?',
            options: [
              'Just a Skill — it handles everything',
              'Just an MCP server — it handles everything',
              'Both: a Skill for the invoice formatting conventions + an MCP server for the database connection',
              'Neither — just describe everything in a system prompt'
            ],
            answer: 2,
            explanation: 'This needs both. The Skill teaches Claude your invoice format, your PDF library, and your output conventions (static knowledge). The MCP server connects Claude to your database to pull the actual invoice data (live connection). Together they produce a correctly formatted invoice with real data.'
          }
        }
      }
    ]
  }
];
