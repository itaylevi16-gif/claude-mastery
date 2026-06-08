import React from 'react';

export function Diagram({ type }) {
  switch (type) {
    // Original modules 1-4
    case 'cc-vs-chat': return <CCvsChat />;
    case 'claude-md-flow': return <ClaudeMdFlow />;
    case 'debug-flow': return <DebugFlow />;
    case 'tools-landscape': return <ToolsLandscape />;
    case 'workflow-brief': return <WorkflowBrief />;
    case 'mcp-arch': return <McpArch />;
    case 'context-window': return <ContextWindow />;
    case 'prompt-framework': return <PromptFramework />;
    case 'system-prompt': return <SystemPromptDiagram />;
    case 'token-costs': return <TokenCosts />;
    case 'integration-patterns': return <IntegrationPatterns />;
    case 'mcp-server-arch': return <McpServerArch />;
    case 'multi-agent': return <MultiAgent />;
    case 'agentic-loop': return <AgenticLoop />;
    case 'e2e-feature': return <E2EFeature />;
    // Module 5: Build a Website
    case 'website-pipeline': return <WebsitePipeline />;
    case 'design-brief': return <DesignBrief />;
    case 'vercel-deploy': return <VercelDeploy />;
    case 'figma-workflow': return <FigmaWorkflow />;
    // Module 6: Build an App
    case 'fullstack-arch': return <FullstackArch />;
    case 'supabase-mcp': return <SupabaseMcp />;
    case 'feature-workflow': return <FeatureWorkflow />;
    case 'debug-loop': return <DebugLoop />;
    // Module 7: Build a Product
    case 'product-discovery': return <ProductDiscovery />;
    case 'prd-quality': return <PrdQuality />;
    case 'prd-to-product': return <PrdToProduct />;
    // Module 8: Connect Third-Party Apps
    case 'mcp-explained': return <McpExplained />;
    case 'mcp-landscape': return <McpLandscape />;
    case 'api-models': return <ApiModels />;
    // Module 9: Earn with Claude
    case 'income-map': return <IncomeMap />;
    case 'income-timeline': return <IncomeTimeline />;
    case 'freelancer-map': return <FreelancerMap />;
    case 'saas-economics': return <SaasEconomics />;
    case 'skills-marketplace': return <SkillsMarketplace />;
    default: return null;
  }
}

function CCvsChat() {
  return (
    <svg viewBox="0 0 600 200" className="w-full" style={{maxHeight:200}}>
      <rect x="20" y="20" width="240" height="160" rx="12" fill="#F3F0FF" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="140" y="50" textAnchor="middle" fill="#5B21B6" fontSize="13" fontWeight="600">claude.ai chat</text>
      <rect x="40" y="65" width="200" height="28" rx="6" fill="#fff" stroke="#C4B5FD" strokeWidth="1"/>
      <text x="140" y="83" textAnchor="middle" fill="#7C3AED" fontSize="11">Your message → Response</text>
      <rect x="40" y="102" width="200" height="28" rx="6" fill="#fff" stroke="#C4B5FD" strokeWidth="1"/>
      <text x="140" y="120" textAnchor="middle" fill="#7C3AED" fontSize="11">Sandboxed — no file access</text>
      <rect x="40" y="139" width="200" height="28" rx="6" fill="#fff" stroke="#C4B5FD" strokeWidth="1"/>
      <text x="140" y="157" textAnchor="middle" fill="#7C3AED" fontSize="11">Copy-paste workflow</text>

      <line x1="280" y1="100" x2="320" y2="100" stroke="#9CA3AF" strokeWidth="2"/>
      <text x="300" y="93" textAnchor="middle" fill="#6B7280" fontSize="11">vs</text>

      <rect x="340" y="20" width="240" height="160" rx="12" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
      <text x="460" y="50" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="600">Claude Code</text>
      <rect x="360" y="65" width="200" height="28" rx="6" fill="#fff" stroke="#6EE7B7" strokeWidth="1"/>
      <text x="460" y="83" textAnchor="middle" fill="#059669" fontSize="11">Natural language → real actions</text>
      <rect x="360" y="102" width="200" height="28" rx="6" fill="#fff" stroke="#6EE7B7" strokeWidth="1"/>
      <text x="460" y="120" textAnchor="middle" fill="#059669" fontSize="11">Full filesystem + terminal access</text>
      <rect x="360" y="139" width="200" height="28" rx="6" fill="#fff" stroke="#6EE7B7" strokeWidth="1"/>
      <text x="460" y="157" textAnchor="middle" fill="#059669" fontSize="11">Reads + edits real project files</text>
    </svg>
  );
}

function ClaudeMdFlow() {
  return (
    <svg viewBox="0 0 600 160" className="w-full" style={{maxHeight:160}}>
      <rect x="20" y="40" width="130" height="80" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
      <text x="85" y="72" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="600">CLAUDE.md</text>
      <text x="85" y="90" textAnchor="middle" fill="#B45309" fontSize="10">Stack · Commands</text>
      <text x="85" y="105" textAnchor="middle" fill="#B45309" fontSize="10">Conventions · Rules</text>

      <path d="M155 80 L210 80" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arr)"/>
      <defs><marker id="arr" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      <text x="182" y="72" textAnchor="middle" fill="#6B7280" fontSize="9">auto-loads</text>

      <rect x="215" y="40" width="130" height="80" rx="10" fill="#F3F0FF" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="280" y="72" textAnchor="middle" fill="#5B21B6" fontSize="12" fontWeight="600">Session start</text>
      <text x="280" y="90" textAnchor="middle" fill="#7C3AED" fontSize="10">Claude reads context</text>
      <text x="280" y="105" textAnchor="middle" fill="#7C3AED" fontSize="10">instantly</text>

      <path d="M350 80 L405 80" stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arr)"/>
      <text x="377" y="72" textAnchor="middle" fill="#6B7280" fontSize="9">ready</text>

      <rect x="410" y="40" width="165" height="80" rx="10" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
      <text x="492" y="65" textAnchor="middle" fill="#065F46" fontSize="12" fontWeight="600">Every session</text>
      <text x="492" y="83" textAnchor="middle" fill="#059669" fontSize="10">No re-explaining stack</text>
      <text x="492" y="98" textAnchor="middle" fill="#059669" fontSize="10">No re-explaining rules</text>
      <text x="492" y="113" textAnchor="middle" fill="#059669" fontSize="10">Just start working</text>
    </svg>
  );
}

function DebugFlow() {
  return (
    <svg viewBox="0 0 580 180" className="w-full" style={{maxHeight:180}}>
      {[
        {x:20,label:'Describe\nsymptom',sub:'Not your theory',col:'#FEF3C7',stroke:'#D97706',tc:'#92400E',sc:'#B45309'},
        {x:155,label:'Ask for\nplan first',sub:'Before any edits',col:'#EDE9FE',stroke:'#7C3AED',tc:'#4C1D95',sc:'#6D28D9'},
        {x:290,label:'Claude\nruns code',sub:'Reproduces error',col:'#E0F2FE',stroke:'#0284C7',tc:'#075985',sc:'#0369A1'},
        {x:425,label:'Review &\napprove',sub:'One change at a time',col:'#ECFDF5',stroke:'#059669',tc:'#064E3B',sc:'#047857'},
      ].map((s,i) => (
        <g key={i}>
          <rect x={s.x} y="30" width="120" height="100" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          <text x={s.x+60} y="68" textAnchor="middle" fill={s.tc} fontSize="12" fontWeight="600">{s.label.split('\n')[0]}</text>
          <text x={s.x+60} y="84" textAnchor="middle" fill={s.tc} fontSize="12" fontWeight="600">{s.label.split('\n')[1]}</text>
          <text x={s.x+60} y="104" textAnchor="middle" fill={s.sc} fontSize="10">{s.sub}</text>
          {i<3 && <path d={`M${s.x+125} 80 L${s.x+145} 80`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#arr2)"/>}
        </g>
      ))}
      <defs><marker id="arr2" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
    </svg>
  );
}

function ToolsLandscape() {
  return (
    <svg viewBox="0 0 580 200" className="w-full" style={{maxHeight:200}}>
      <rect x="10" y="10" width="175" height="180" rx="12" fill="#F3F0FF" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="97" y="38" textAnchor="middle" fill="#5B21B6" fontSize="13" fontWeight="700">Claude Code</text>
      <text x="97" y="58" textAnchor="middle" fill="#7C3AED" fontSize="10">Terminal / CLI</text>
      <text x="97" y="80" textAnchor="middle" fill="#6D28D9" fontSize="10">• Real filesystem access</text>
      <text x="97" y="98" textAnchor="middle" fill="#6D28D9" fontSize="10">• Run commands</text>
      <text x="97" y="116" textAnchor="middle" fill="#6D28D9" fontSize="10">• Edit code files</text>
      <text x="97" y="134" textAnchor="middle" fill="#6D28D9" fontSize="10">• Git workflow</text>
      <rect x="30" y="155" width="135" height="24" rx="6" fill="#7C3AED"/>
      <text x="97" y="170" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">For developers</text>

      <rect x="202" y="10" width="175" height="180" rx="12" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
      <text x="289" y="38" textAnchor="middle" fill="#065F46" fontSize="13" fontWeight="700">Cowork</text>
      <text x="289" y="58" textAnchor="middle" fill="#059669" fontSize="10">Desktop app</text>
      <text x="289" y="80" textAnchor="middle" fill="#047857" fontSize="10">• File & folder tasks</text>
      <text x="289" y="98" textAnchor="middle" fill="#047857" fontSize="10">• Desktop automation</text>
      <text x="289" y="116" textAnchor="middle" fill="#047857" fontSize="10">• Scheduled workflows</text>
      <text x="289" y="134" textAnchor="middle" fill="#047857" fontSize="10">• No coding needed</text>
      <rect x="222" y="155" width="135" height="24" rx="6" fill="#059669"/>
      <text x="289" y="170" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">For everyone</text>

      <rect x="394" y="10" width="175" height="180" rx="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
      <text x="481" y="38" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="700">API / claude.ai</text>
      <text x="481" y="58" textAnchor="middle" fill="#D97706" fontSize="10">Chat + API</text>
      <text x="481" y="80" textAnchor="middle" fill="#B45309" fontSize="10">• Conversational AI</text>
      <text x="481" y="98" textAnchor="middle" fill="#B45309" fontSize="10">• Build AI features</text>
      <text x="481" y="116" textAnchor="middle" fill="#B45309" fontSize="10">• Custom integrations</text>
      <text x="481" y="134" textAnchor="middle" fill="#B45309" fontSize="10">• MCP connectors</text>
      <rect x="414" y="155" width="135" height="24" rx="6" fill="#D97706"/>
      <text x="481" y="170" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">For products</text>
    </svg>
  );
}

function WorkflowBrief() {
  const steps = [
    {n:'1',label:'Trigger',sub:'When does it run?',col:'#EDE9FE',stroke:'#7C3AED',tc:'#4C1D95'},
    {n:'2',label:'Input',sub:'What data/files?',col:'#DBEAFE',stroke:'#2563EB',tc:'#1E3A8A'},
    {n:'3',label:'Steps',sub:'Ordered actions',col:'#D1FAE5',stroke:'#059669',tc:'#064E3B'},
    {n:'4',label:'Output',sub:'What exists after?',col:'#FEF3C7',stroke:'#D97706',tc:'#92400E'},
    {n:'5',label:'Constraints',sub:'What NEVER to do',col:'#FEE2E2',stroke:'#DC2626',tc:'#7F1D1D'},
  ];
  return (
    <svg viewBox="0 0 580 130" className="w-full" style={{maxHeight:130}}>
      <defs><marker id="arr3" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#D1D5DB"/></marker></defs>
      {steps.map((s,i) => (
        <g key={i}>
          <rect x={10+i*114} y="15" width="104" height="90" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          <circle cx={10+i*114+52} cy="42" r="14" fill={s.stroke}/>
          <text x={10+i*114+52} y="47" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{s.n}</text>
          <text x={10+i*114+52} y="72" textAnchor="middle" fill={s.tc} fontSize="11" fontWeight="600">{s.label}</text>
          <text x={10+i*114+52} y="88" textAnchor="middle" fill={s.tc} fontSize="9">{s.sub}</text>
          {i<4 && <path d={`M${10+i*114+107} 60 L${10+i*114+112} 60`} stroke="#D1D5DB" strokeWidth="2" markerEnd="url(#arr3)"/>}
        </g>
      ))}
    </svg>
  );
}

function McpArch() {
  return (
    <svg viewBox="0 0 580 180" className="w-full" style={{maxHeight:180}}>
      <rect x="20" y="60" width="120" height="60" rx="10" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="80" y="86" textAnchor="middle" fill="#5B21B6" fontSize="12" fontWeight="600">Claude</text>
      <text x="80" y="104" textAnchor="middle" fill="#7C3AED" fontSize="10">(your session)</text>

      <rect x="220" y="20" width="140" height="50" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
      <text x="290" y="43" textAnchor="middle" fill="#065F46" fontSize="11" fontWeight="600">MCP Server</text>
      <text x="290" y="60" textAnchor="middle" fill="#059669" fontSize="9">Exposes tools + resources</text>

      {['Gmail','Google Drive','Your App DB','Canva'].map((s,i) => (
        <g key={i}>
          <rect x={420} y={15+i*38} width="130" height="28" rx="6" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1"/>
          <text x={485} y={34+i*38} textAnchor="middle" fill="#374151" fontSize="10">{s}</text>
          <path d={`M420 ${29+i*38} L380 ${29+i*38}`} stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="4,2"/>
        </g>
      ))}

      <path d="M145 90 L218 45" stroke="#7C3AED" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr4)"/>
      <path d="M145 90 L218 90" stroke="#7C3AED" strokeWidth="2" strokeDasharray="5,3" markerEnd="url(#arr4)"/>
      <defs><marker id="arr4" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#7C3AED"/></marker></defs>
      <text x="185" y="60" fill="#7C3AED" fontSize="9">MCP protocol</text>
    </svg>
  );
}

function ContextWindow() {
  return (
    <svg viewBox="0 0 580 160" className="w-full" style={{maxHeight:160}}>
      <rect x="20" y="20" width="540" height="120" rx="12" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5"/>
      <text x="40" y="42" fill="#6B7280" fontSize="10" fontWeight="600">CONTEXT WINDOW (everything Claude sees at once)</text>
      <rect x="30" y="52" width="90" height="30" rx="6" fill="#FEE2E2" stroke="#FCA5A5"/>
      <text x="75" y="71" textAnchor="middle" fill="#991B1B" fontSize="9">System prompt</text>
      <rect x="128" y="52" width="90" height="30" rx="6" fill="#DBEAFE" stroke="#93C5FD"/>
      <text x="173" y="71" textAnchor="middle" fill="#1E3A8A" fontSize="9">Your message 1</text>
      <rect x="226" y="52" width="90" height="30" rx="6" fill="#ECFDF5" stroke="#6EE7B7"/>
      <text x="271" y="71" textAnchor="middle" fill="#065F46" fontSize="9">Response 1</text>
      <rect x="324" y="52" width="90" height="30" rx="6" fill="#DBEAFE" stroke="#93C5FD"/>
      <text x="369" y="71" textAnchor="middle" fill="#1E3A8A" fontSize="9">Your message 2</text>
      <rect x="422" y="52" width="118" height="30" rx="6" fill="#FEF3C7" stroke="#FCD34D" strokeWidth="2"/>
      <text x="481" y="71" textAnchor="middle" fill="#92400E" fontSize="9" fontWeight="600">← Most important</text>
      <rect x="30" y="95" width="150" height="20" rx="4" fill="#E5E7EB"/>
      <text x="105" y="109" textAnchor="middle" fill="#6B7280" fontSize="9">lower weight (older)</text>
      <rect x="400" y="95" width="150" height="20" rx="4" fill="#FEF3C7"/>
      <text x="475" y="109" textAnchor="middle" fill="#92400E" fontSize="9">higher weight (recent)</text>
    </svg>
  );
}

function PromptFramework() {
  const parts = [
    {label:'Role',desc:'Who Claude should be',col:'#EDE9FE',stroke:'#7C3AED',tc:'#4C1D95'},
    {label:'Context',desc:'The situation & stack',col:'#DBEAFE',stroke:'#2563EB',tc:'#1E3A8A'},
    {label:'Task',desc:'Exactly what you need',col:'#D1FAE5',stroke:'#059669',tc:'#064E3B'},
    {label:'Constraints',desc:'Rules & limits',col:'#FEE2E2',stroke:'#DC2626',tc:'#7F1D1D'},
    {label:'Format',desc:'How output should look',col:'#FEF3C7',stroke:'#D97706',tc:'#92400E'},
  ];
  return (
    <svg viewBox="0 0 580 110" className="w-full" style={{maxHeight:110}}>
      {parts.map((p,i) => (
        <g key={i}>
          <rect x={10+i*115} y="10" width="105" height="85" rx="10" fill={p.col} stroke={p.stroke} strokeWidth="1.5"/>
          <text x={10+i*115+52} y="40" textAnchor="middle" fill={p.tc} fontSize="13" fontWeight="700">{i+1}</text>
          <text x={10+i*115+52} y="60" textAnchor="middle" fill={p.tc} fontSize="11" fontWeight="600">{p.label}</text>
          <text x={10+i*115+52} y="80" textAnchor="middle" fill={p.stroke} fontSize="9">{p.desc}</text>
        </g>
      ))}
    </svg>
  );
}

function SystemPromptDiagram() {
  return (
    <svg viewBox="0 0 580 170" className="w-full" style={{maxHeight:170}}>
      <rect x="20" y="10" width="540" height="60" rx="10" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2"/>
      <text x="290" y="35" textAnchor="middle" fill="#7F1D1D" fontSize="13" fontWeight="700">System Prompt (set by you — the developer)</text>
      <text x="290" y="55" textAnchor="middle" fill="#B91C1C" fontSize="11">Permanent rules · Persona · Constraints · Product knowledge</text>
      <text x="290" y="85" textAnchor="middle" fill="#6B7280" fontSize="11">↓ applies to every user turn  ↓</text>
      <rect x="20" y="95" width="540" height="60" rx="10" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5"/>
      <text x="290" y="120" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="700">User Turn</text>
      <text x="290" y="140" textAnchor="middle" fill="#2563EB" fontSize="11">What the user types  ·  Cannot override system prompt rules</text>
    </svg>
  );
}

function TokenCosts() {
  const models = [
    {name:'Haiku',input:0.80,output:4,col:'#D1FAE5',stroke:'#059669',tc:'#065F46'},
    {name:'Sonnet',input:3,output:15,col:'#FEF3C7',stroke:'#D97706',tc:'#92400E'},
    {name:'Opus',input:15,output:75,col:'#FEE2E2',stroke:'#DC2626',tc:'#7F1D1D'},
  ];
  return (
    <svg viewBox="0 0 500 150" className="w-full" style={{maxHeight:150}}>
      {models.map((m,i) => (
        <g key={i}>
          <rect x={20+i*165} y="15" width="150" height="120" rx="10" fill={m.col} stroke={m.stroke} strokeWidth="1.5"/>
          <text x={20+i*165+75} y="42" textAnchor="middle" fill={m.tc} fontSize="14" fontWeight="700">{m.name}</text>
          <text x={20+i*165+75} y="66" textAnchor="middle" fill={m.tc} fontSize="11">Input: ${m.input}/M tokens</text>
          <text x={20+i*165+75} y="86" textAnchor="middle" fill={m.tc} fontSize="11">Output: ${m.output}/M tokens</text>
          <text x={20+i*165+75} y="116" textAnchor="middle" fill={m.stroke} fontSize="10" fontWeight="600">
            {i===0?'Simple tasks':i===1?'Most features':'Hard reasoning'}
          </text>
        </g>
      ))}
    </svg>
  );
}

function IntegrationPatterns() {
  const patterns = [
    {n:'1',title:'Direct API',desc:'Backend calls Claude per action',col:'#EDE9FE',stroke:'#7C3AED',tc:'#4C1D95'},
    {n:'2',title:'Streaming',desc:'Real-time token output to UI',col:'#D1FAE5',stroke:'#059669',tc:'#064E3B'},
    {n:'3',title:'MCP Server',desc:'Claude connects to your data',col:'#FEF3C7',stroke:'#D97706',tc:'#92400E'},
    {n:'4',title:'Structured JSON',desc:'Claude as a data source',col:'#DBEAFE',stroke:'#2563EB',tc:'#1E3A8A'},
  ];
  return (
    <svg viewBox="0 0 580 130" className="w-full" style={{maxHeight:130}}>
      {patterns.map((p,i) => (
        <g key={i}>
          <rect x={10+i*143} y="10" width="133" height="110" rx="10" fill={p.col} stroke={p.stroke} strokeWidth="1.5"/>
          <circle cx={10+i*143+66} cy="38" r="15" fill={p.stroke}/>
          <text x={10+i*143+66} y="43" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{p.n}</text>
          <text x={10+i*143+66} y="70" textAnchor="middle" fill={p.tc} fontSize="11" fontWeight="600">{p.title}</text>
          <text x={10+i*143+66} y="89" textAnchor="middle" fill={p.stroke} fontSize="9">{p.desc}</text>
        </g>
      ))}
    </svg>
  );
}

function McpServerArch() {
  return (
    <svg viewBox="0 0 580 160" className="w-full" style={{maxHeight:160}}>
      <rect x="20" y="50" width="120" height="60" rx="10" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="80" y="76" textAnchor="middle" fill="#5B21B6" fontSize="12" fontWeight="600">Claude</text>
      <text x="80" y="94" textAnchor="middle" fill="#7C3AED" fontSize="10">Agent / Code</text>

      <path d="M144 80 L220 80" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#ar5)" strokeDasharray="5,3"/>
      <text x="182" y="72" textAnchor="middle" fill="#7C3AED" fontSize="9">MCP calls</text>
      <defs><marker id="ar5" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#7C3AED"/></marker></defs>

      <rect x="224" y="30" width="140" height="100" rx="10" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
      <text x="294" y="55" textAnchor="middle" fill="#065F46" fontSize="12" fontWeight="600">Your MCP Server</text>
      <rect x="234" y="65" width="120" height="22" rx="4" fill="#fff" stroke="#6EE7B7"/>
      <text x="294" y="80" textAnchor="middle" fill="#059669" fontSize="10">list_tools()</text>
      <rect x="234" y="95" width="120" height="22" rx="4" fill="#fff" stroke="#6EE7B7"/>
      <text x="294" y="110" textAnchor="middle" fill="#059669" fontSize="10">call_tool(name, args)</text>

      <path d="M367 80 L430 80" stroke="#059669" strokeWidth="2" markerEnd="url(#ar6)"/>
      <defs><marker id="ar6" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#059669"/></marker></defs>

      <rect x="434" y="20" width="130" height="40" rx="8" fill="#FEF3C7" stroke="#D97706"/>
      <text x="499" y="43" textAnchor="middle" fill="#92400E" fontSize="11">MongoDB / DB</text>
      <rect x="434" y="68" width="130" height="40" rx="8" fill="#DBEAFE" stroke="#2563EB"/>
      <text x="499" y="91" textAnchor="middle" fill="#1E3A8A" fontSize="11">External APIs</text>
      <rect x="434" y="116" width="130" height="30" rx="8" fill="#EDE9FE" stroke="#7C3AED"/>
      <text x="499" y="135" textAnchor="middle" fill="#5B21B6" fontSize="11">Your App Logic</text>
    </svg>
  );
}

function MultiAgent() {
  return (
    <svg viewBox="0 0 560 200" className="w-full" style={{maxHeight:200}}>
      <rect x="190" y="10" width="160" height="50" rx="10" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2"/>
      <text x="270" y="32" textAnchor="middle" fill="#7F1D1D" fontSize="12" fontWeight="700">Orchestrator</text>
      <text x="270" y="50" textAnchor="middle" fill="#B91C1C" fontSize="10">Breaks task, assigns work</text>

      {[
        {x:20,label:'Subagent A',sub:'Lima research',col:'#EDE9FE',stroke:'#7C3AED',tc:'#4C1D95'},
        {x:170,label:'Subagent B',sub:'Cusco research',col:'#D1FAE5',stroke:'#059669',tc:'#064E3B'},
        {x:320,label:'Subagent C',sub:'Transport data',col:'#FEF3C7',stroke:'#D97706',tc:'#92400E'},
        {x:470,label:'Subagent D',sub:'Budget estimates',col:'#DBEAFE',stroke:'#2563EB',tc:'#1E3A8A'},
      ].map((s,i) => (
        <g key={i}>
          <path d={`M270 63 L${s.x+70} 110`} stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4,2"/>
          <rect x={s.x} y="110" width="130" height="60" rx="8" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          <text x={s.x+65} y="136" textAnchor="middle" fill={s.tc} fontSize="11" fontWeight="600">{s.label}</text>
          <text x={s.x+65} y="154" textAnchor="middle" fill={s.stroke} fontSize="9">{s.sub}</text>
        </g>
      ))}

      <text x="270" y="190" textAnchor="middle" fill="#059669" fontSize="10" fontWeight="600">↑ All run in parallel → orchestrator synthesizes</text>
    </svg>
  );
}

function AgenticLoop() {
  const steps = ['Think','Call tool','Observe result','Think again','Done'];
  const cols = ['#EDE9FE','#DBEAFE','#D1FAE5','#FEF3C7','#D1FAE5'];
  const strokes = ['#7C3AED','#2563EB','#059669','#D97706','#059669'];
  const tcs = ['#4C1D95','#1E3A8A','#064E3B','#92400E','#064E3B'];
  return (
    <svg viewBox="0 0 600 110" className="w-full" style={{maxHeight:110}}>
      <defs><marker id="ar7" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {steps.map((s,i) => (
        <g key={i}>
          <rect x={10+i*116} y="20" width="106" height="68" rx="10" fill={cols[i]} stroke={strokes[i]} strokeWidth="1.5"/>
          <text x={10+i*116+53} y="50" textAnchor="middle" fill={tcs[i]} fontSize="11" fontWeight="600">{s.split(' ')[0]}</text>
          {s.split(' ')[1] && <text x={10+i*116+53} y="67" textAnchor="middle" fill={tcs[i]} fontSize="11" fontWeight="600">{s.split(' ').slice(1).join(' ')}</text>}
          {i<4 && <path d={`M${10+i*116+108} 54 L${10+i*116+114} 54`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#ar7)"/>}
        </g>
      ))}
      <path d="M10 105 Q300 130 590 105" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="4,2" fill="none"/>
      <text x="300" y="125" textAnchor="middle" fill="#9CA3AF" fontSize="9">loops until task is complete</text>
    </svg>
  );
}

function E2EFeature() {
  const nodes = [
    {x:10,label:'User\nclicks Generate',col:'#EDE9FE',stroke:'#7C3AED',tc:'#4C1D95'},
    {x:140,label:'React\nhook fires',col:'#DBEAFE',stroke:'#2563EB',tc:'#1E3A8A'},
    {x:270,label:'Backend\nAPI route',col:'#FEF3C7',stroke:'#D97706',tc:'#92400E'},
    {x:400,label:'Claude\nstreams JSON',col:'#D1FAE5',stroke:'#059669',tc:'#064E3B'},
    {x:520,label:'React\nrenders UI',col:'#FEE2E2',stroke:'#DC2626',tc:'#7F1D1D'},
  ];
  return (
    <svg viewBox="0 0 640 130" className="w-full" style={{maxHeight:130}}>
      <defs><marker id="ar8" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {nodes.map((n,i) => (
        <g key={i}>
          <rect x={n.x} y="20" width="118" height="80" rx="10" fill={n.col} stroke={n.stroke} strokeWidth="1.5"/>
          <text x={n.x+59} y="55" textAnchor="middle" fill={n.tc} fontSize="11" fontWeight="600">{n.label.split('\n')[0]}</text>
          <text x={n.x+59} y="72" textAnchor="middle" fill={n.tc} fontSize="11" fontWeight="600">{n.label.split('\n')[1]}</text>
          {i<4 && <path d={`M${n.x+120} 60 L${n.x+138} 60`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#ar8)"/>}
        </g>
      ))}
    </svg>
  );
}

// ─── MODULE 5: BUILD A WEBSITE ───────────────────────────────────────────────

function WebsitePipeline() {
  const stages = [
    { icon: '✦', label: 'Claude Design', sub: 'Prompt → Visual', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { icon: '⚡', label: 'Claude Code', sub: 'Design → Build', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { icon: '🚀', label: 'Vercel / GH', sub: 'Build → Live URL', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
  ];
  return (
    <svg viewBox="0 0 580 130" className="w-full" style={{ maxHeight: 130 }}>
      <defs><marker id="wa1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={20 + i * 190} y="15" width="165" height="95" rx="12" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          <text x={20 + i * 190 + 82} y="48" textAnchor="middle" fontSize="22">{s.icon}</text>
          <text x={20 + i * 190 + 82} y="72" textAnchor="middle" fill={s.tc} fontSize="13" fontWeight="600">{s.label}</text>
          <text x={20 + i * 190 + 82} y="92" textAnchor="middle" fill={s.stroke} fontSize="10">{s.sub}</text>
          {i < 2 && <path d={`M${20 + i * 190 + 167} 62 L${20 + i * 190 + 188} 62`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#wa1)"/>}
        </g>
      ))}
    </svg>
  );
}

function DesignBrief() {
  const items = [
    { n: '1', label: 'Purpose', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { n: '2', label: 'Vibe', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
    { n: '3', label: 'Colors', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { n: '4', label: 'Sections', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { n: '5', label: 'Content', col: '#FCE7F3', stroke: '#EC4899', tc: '#9D174D' },
    { n: '6', label: 'Constraints', col: '#FEE2E2', stroke: '#DC2626', tc: '#7F1D1D' },
  ];
  return (
    <svg viewBox="0 0 580 110" className="w-full" style={{ maxHeight: 110 }}>
      {items.map((item, i) => (
        <g key={i}>
          <rect x={10 + i * 95} y="10" width="85" height="88" rx="10" fill={item.col} stroke={item.stroke} strokeWidth="1.5"/>
          <circle cx={10 + i * 95 + 42} cy="38" r="14" fill={item.stroke}/>
          <text x={10 + i * 95 + 42} y="43" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">{item.n}</text>
          <text x={10 + i * 95 + 42} y="72" textAnchor="middle" fill={item.tc} fontSize="11" fontWeight="600">{item.label}</text>
        </g>
      ))}
    </svg>
  );
}

function VercelDeploy() {
  const steps = [
    { label: 'npm run build', sub: 'Creates /dist', col: '#F3F0FF', stroke: '#7C3AED', tc: '#4C1D95' },
    { label: 'git push', sub: 'Triggers Vercel', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { label: 'Live URL', sub: 'your-app.vercel.app', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
  ];
  return (
    <svg viewBox="0 0 500 110" className="w-full" style={{ maxHeight: 110 }}>
      <defs><marker id="vd1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={20 + i * 160} y="15" width="140" height="80" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          <text x={20 + i * 160 + 70} y="50" textAnchor="middle" fill={s.tc} fontSize="13" fontWeight="600" fontFamily="monospace">{s.label}</text>
          <text x={20 + i * 160 + 70} y="70" textAnchor="middle" fill={s.stroke} fontSize="10">{s.sub}</text>
          {i < 2 && <path d={`M${20 + i * 160 + 142} 55 L${20 + i * 160 + 158} 55`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#vd1)"/>}
        </g>
      ))}
    </svg>
  );
}

function FigmaWorkflow() {
  return (
    <svg viewBox="0 0 580 150" className="w-full" style={{ maxHeight: 150 }}>
      <defs>
        <marker id="fw1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#7C3AED"/></marker>
        <marker id="fw2" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#059669"/></marker>
      </defs>
      <rect x="20" y="40" width="130" height="70" rx="10" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="85" y="72" textAnchor="middle" fill="#4C1D95" fontSize="13" fontWeight="600">Figma Design</text>
      <text x="85" y="92" textAnchor="middle" fill="#7C3AED" fontSize="10">Frames + Components</text>

      <rect x="220" y="40" width="140" height="70" rx="10" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5"/>
      <text x="290" y="65" textAnchor="middle" fill="#064E3B" fontSize="12" fontWeight="600">Figma MCP</text>
      <text x="290" y="83" textAnchor="middle" fill="#059669" fontSize="10">Colors · Spacing · Fonts</text>
      <text x="290" y="99" textAnchor="middle" fill="#059669" fontSize="10">90-93% fidelity</text>

      <rect x="430" y="40" width="130" height="70" rx="10" fill="#DBEAFE" stroke="#2563EB" strokeWidth="1.5"/>
      <text x="495" y="72" textAnchor="middle" fill="#1E3A8A" fontSize="13" fontWeight="600">Claude Code</text>
      <text x="495" y="92" textAnchor="middle" fill="#2563EB" fontSize="10">Pixel-accurate code</text>

      <path d="M152 75 L218 75" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#fw1)"/>
      <path d="M362 75 L428 75" stroke="#059669" strokeWidth="2" markerEnd="url(#fw2)"/>

      <path d="M495 112 Q495 135 290 135 Q85 135 85 112" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="5,3" fill="none"/>
      <text x="290" y="148" textAnchor="middle" fill="#9CA3AF" fontSize="9">html.to.design — reverse: code → Figma</text>
    </svg>
  );
}

// ─── MODULE 6: BUILD AN APP ───────────────────────────────────────────────────

function FullstackArch() {
  return (
    <svg viewBox="0 0 580 180" className="w-full" style={{ maxHeight: 180 }}>
      <rect x="10" y="10" width="170" height="160" rx="12" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="95" y="38" textAnchor="middle" fill="#4C1D95" fontSize="13" fontWeight="700">Frontend</text>
      <text x="95" y="60" textAnchor="middle" fill="#7C3AED" fontSize="11">Next.js 15 + React</text>
      <text x="95" y="78" textAnchor="middle" fill="#7C3AED" fontSize="11">Tailwind CSS</text>
      <text x="95" y="96" textAnchor="middle" fill="#7C3AED" fontSize="11">TypeScript</text>
      <rect x="25" y="112" width="140" height="22" rx="6" fill="#7C3AED"/>
      <text x="95" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">Deploy → Vercel</text>

      <rect x="205" y="10" width="170" height="160" rx="12" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5"/>
      <text x="290" y="38" textAnchor="middle" fill="#064E3B" fontSize="13" fontWeight="700">Supabase</text>
      <text x="290" y="60" textAnchor="middle" fill="#059669" fontSize="11">PostgreSQL DB</text>
      <text x="290" y="78" textAnchor="middle" fill="#059669" fontSize="11">Auth (email/OAuth)</text>
      <text x="290" y="96" textAnchor="middle" fill="#059669" fontSize="11">Storage + Edge Fn</text>
      <rect x="220" y="112" width="140" height="22" rx="6" fill="#059669"/>
      <text x="290" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">MCP: 32 tools</text>

      <rect x="400" y="10" width="170" height="160" rx="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5"/>
      <text x="485" y="38" textAnchor="middle" fill="#92400E" fontSize="13" fontWeight="700">Claude API</text>
      <text x="485" y="60" textAnchor="middle" fill="#D97706" fontSize="11">AI features</text>
      <text x="485" y="78" textAnchor="middle" fill="#D97706" fontSize="11">Streaming output</text>
      <text x="485" y="96" textAnchor="middle" fill="#D97706" fontSize="11">Structured JSON</text>
      <rect x="415" y="112" width="140" height="22" rx="6" fill="#D97706"/>
      <text x="485" y="126" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">Sonnet / Haiku</text>

      <path d="M182 90 L202 90" stroke="#9CA3AF" strokeWidth="2"/>
      <path d="M377 90 L397 90" stroke="#9CA3AF" strokeWidth="2"/>
    </svg>
  );
}

function SupabaseMcp() {
  const tools = [
    'apply_migration', 'execute_sql', 'generate_types',
    'deploy_edge_fn', 'manage_auth', '+ 27 more tools'
  ];
  return (
    <svg viewBox="0 0 560 150" className="w-full" style={{ maxHeight: 150 }}>
      <rect x="20" y="20" width="130" height="110" rx="12" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5"/>
      <text x="85" y="50" textAnchor="middle" fill="#064E3B" fontSize="13" fontWeight="700">Supabase</text>
      <text x="85" y="68" textAnchor="middle" fill="#059669" fontSize="10">Official Connector</text>
      <text x="85" y="86" textAnchor="middle" fill="#059669" fontSize="10">Feb 2026</text>
      <rect x="35" y="100" width="100" height="20" rx="5" fill="#059669"/>
      <text x="85" y="113" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">32 MCP Tools</text>

      <defs><marker id="sm1" markerWidth="7" markerHeight="5" refX="5" refY="2.5" orient="auto"><polygon points="0 0,7 2.5,0 5" fill="#059669"/></marker></defs>
      {tools.map((t, i) => (
        <g key={i}>
          <rect x={180} y={15 + i * 22} width={160} height={18} rx="5" fill="#F0FDF4" stroke="#6EE7B7" strokeWidth="1"/>
          <text x={260} y={28 + i * 22} textAnchor="middle" fill="#065F46" fontSize="10" fontFamily="monospace">{t}</text>
          <path d={`M152 ${24 + i * 22} L178 ${24 + i * 22}`} stroke="#059669" strokeWidth="1.5" markerEnd="url(#sm1)"/>
        </g>
      ))}
    </svg>
  );
}

function FeatureWorkflow() {
  const steps = [
    { label: 'Write plain-English\nfeature request', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { label: 'Claude shows\nplan + files', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { label: 'You review\n& approve ✓', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { label: 'Claude builds\n+ runs tests', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
  ];
  return (
    <svg viewBox="0 0 560 120" className="w-full" style={{ maxHeight: 120 }}>
      <defs><marker id="fw3" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={10 + i * 138} y="10" width="124" height="95" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          {s.label.split('\n').map((line, li) => (
            <text key={li} x={10 + i * 138 + 62} y={52 + li * 18} textAnchor="middle" fill={s.tc} fontSize="11" fontWeight="600">{line}</text>
          ))}
          {i < 3 && <path d={`M${10 + i * 138 + 126} 57 L${10 + i * 138 + 136} 57`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#fw3)"/>}
        </g>
      ))}
    </svg>
  );
}

function DebugLoop() {
  return (
    <svg viewBox="0 0 560 160" className="w-full" style={{ maxHeight: 160 }}>
      <defs><marker id="dl1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {[
        { x: 20, label: 'Describe\nsymptom', col: '#FEE2E2', stroke: '#DC2626', tc: '#7F1D1D' },
        { x: 160, label: 'Claude reads\nfiles', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
        { x: 300, label: 'Runs code\nreproduces', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
        { x: 420, label: 'Shows fix\nfor review', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="20" width="120" height="90" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          {s.label.split('\n').map((l, li) => (
            <text key={li} x={s.x + 60} y={60 + li * 18} textAnchor="middle" fill={s.tc} fontSize="11" fontWeight="600">{l}</text>
          ))}
          {i < 3 && <path d={`M${s.x + 122} 65 L${s.x + 158} 65`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#dl1)"/>}
        </g>
      ))}
      <rect x="420" y="130" width="120" height="22" rx="6" fill="#D1FAE5" stroke="#059669"/>
      <text x="480" y="145" textAnchor="middle" fill="#065F46" fontSize="10" fontWeight="600">Apply fix ✓</text>
    </svg>
  );
}

// ─── MODULE 7: BUILD A PRODUCT ────────────────────────────────────────────────

function ProductDiscovery() {
  const stages = [
    { label: 'Discovery\nInterview', sub: 'Claude asks hard Qs', col: '#FCE7F3', stroke: '#EC4899', tc: '#9D174D' },
    { label: 'BRIEF.md', sub: 'One-page concept', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { label: 'PRD', sub: 'Full requirements', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { label: 'Build', sub: '30-day MVP sprint', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { label: 'Ship + Learn', sub: '10 real users', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
  ];
  return (
    <svg viewBox="0 0 570 115" className="w-full" style={{ maxHeight: 115 }}>
      <defs><marker id="pd1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {stages.map((s, i) => (
        <g key={i}>
          <rect x={8 + i * 112} y="10" width="102" height="90" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          {s.label.split('\n').map((l, li) => (
            <text key={li} x={8 + i * 112 + 51} y={48 + li * 17} textAnchor="middle" fill={s.tc} fontSize="11" fontWeight="600">{l}</text>
          ))}
          <text x={8 + i * 112 + 51} y={84} textAnchor="middle" fill={s.stroke} fontSize="9">{s.sub}</text>
          {i < 4 && <path d={`M${8 + i * 112 + 104} 55 L${8 + i * 112 + 110} 55`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#pd1)"/>}
        </g>
      ))}
    </svg>
  );
}

function PrdQuality() {
  const dims = [
    { label: 'Clarity', col: '#EDE9FE', stroke: '#7C3AED' },
    { label: 'Feasibility', col: '#D1FAE5', stroke: '#059669' },
    { label: 'UX Quality', col: '#DBEAFE', stroke: '#2563EB' },
    { label: 'Dependencies', col: '#FEF3C7', stroke: '#D97706' },
    { label: 'Success\nCriteria', col: '#FCE7F3', stroke: '#EC4899' },
    { label: 'Risk\nCoverage', col: '#FEE2E2', stroke: '#DC2626' },
    { label: 'Scope\nSimplicity', col: '#F0FDF4', stroke: '#10B981' },
  ];
  return (
    <svg viewBox="0 0 560 120" className="w-full" style={{ maxHeight: 120 }}>
      {dims.map((d, i) => (
        <g key={i}>
          <rect x={6 + i * 79} y="10" width="70" height="95" rx="8" fill={d.col} stroke={d.stroke} strokeWidth="1.5"/>
          <text x={6 + i * 79 + 35} y="35" textAnchor="middle" fill={d.stroke} fontSize="18" fontWeight="700">{String.fromCharCode(65)}</text>
          {d.label.split('\n').map((l, li) => (
            <text key={li} x={6 + i * 79 + 35} y={68 + li * 15} textAnchor="middle" fill={d.stroke} fontSize="9" fontWeight="600">{l}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

function PrdToProduct() {
  const steps = [
    { label: 'PRD\nGrade B+', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { label: 'ADR\nArchitecture', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { label: 'Design\nDocument', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
    { label: 'Build\n+ Tests', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { label: 'Deploy\n🚀 Live', col: '#FCE7F3', stroke: '#EC4899', tc: '#9D174D' },
  ];
  return (
    <svg viewBox="0 0 560 115" className="w-full" style={{ maxHeight: 115 }}>
      <defs><marker id="pp1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#9CA3AF"/></marker></defs>
      {steps.map((s, i) => (
        <g key={i}>
          <rect x={8 + i * 110} y="10" width="100" height="90" rx="10" fill={s.col} stroke={s.stroke} strokeWidth="1.5"/>
          {s.label.split('\n').map((l, li) => (
            <text key={li} x={8 + i * 110 + 50} y={52 + li * 18} textAnchor="middle" fill={s.tc} fontSize="11" fontWeight="600">{l}</text>
          ))}
          {i < 4 && <path d={`M${8 + i * 110 + 102} 55 L${8 + i * 110 + 108} 55`} stroke="#9CA3AF" strokeWidth="2" markerEnd="url(#pp1)"/>}
          <text x={8 + i * 110 + 50} y="18" textAnchor="middle" fill={s.stroke} fontSize="9" fontWeight="600">✓ approve</text>
        </g>
      ))}
    </svg>
  );
}

// ─── MODULE 8: CONNECT THIRD-PARTY APPS ──────────────────────────────────────

function McpExplained() {
  return (
    <svg viewBox="0 0 560 160" className="w-full" style={{ maxHeight: 160 }}>
      <defs><marker id="me1" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto"><polygon points="0 0,8 3,0 6" fill="#7C3AED"/></marker></defs>
      <rect x="20" y="50" width="120" height="60" rx="10" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="2"/>
      <text x="80" y="77" textAnchor="middle" fill="#4C1D95" fontSize="13" fontWeight="700">Claude</text>
      <text x="80" y="96" textAnchor="middle" fill="#7C3AED" fontSize="10">Sends tool calls</text>

      <rect x="220" y="30" width="120" height="100" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="2"/>
      <text x="280" y="58" textAnchor="middle" fill="#92400E" fontSize="12" fontWeight="700">MCP Server</text>
      <text x="280" y="76" textAnchor="middle" fill="#D97706" fontSize="10">list_tools()</text>
      <text x="280" y="94" textAnchor="middle" fill="#D97706" fontSize="10">call_tool(name, args)</text>
      <text x="280" y="112" textAnchor="middle" fill="#D97706" fontSize="10">Returns data</text>

      {[['Gmail', '#DBEAFE', '#2563EB'], ['GitHub', '#D1FAE5', '#059669'], ['Notion', '#EDE9FE', '#7C3AED'], ['Slack', '#FEE2E2', '#DC2626']].map(([name, bg, stroke], i) => (
        <g key={i}>
          <rect x="420" y={18 + i * 32} width="110" height="24" rx="6" fill={bg} stroke={stroke} strokeWidth="1"/>
          <text x="475" y={34 + i * 32} textAnchor="middle" fill={stroke} fontSize="11" fontWeight="500">{name}</text>
          <path d={`M420 ${30 + i * 32} L342 ${80}`} stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="4,3"/>
        </g>
      ))}

      <path d="M142 80 L218 80" stroke="#7C3AED" strokeWidth="2" markerEnd="url(#me1)"/>
      <text x="180" y="72" textAnchor="middle" fill="#7C3AED" fontSize="9">MCP protocol</text>
    </svg>
  );
}

function McpLandscape() {
  const categories = [
    { label: 'Dev Tools', items: ['GitHub', 'Supabase', 'Figma', 'Linear'], col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { label: 'Productivity', items: ['Gmail', 'Google Drive', 'Notion', 'Slack'], col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { label: 'Business', items: ['Salesforce', 'HubSpot', 'Stripe', 'Jira'], col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { label: 'Data', items: ['PostgreSQL', 'MongoDB', 'Airtable', 'Sheets'], col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
  ];
  return (
    <svg viewBox="0 0 560 160" className="w-full" style={{ maxHeight: 160 }}>
      {categories.map((cat, ci) => (
        <g key={ci}>
          <rect x={10 + ci * 138} y="10" width="128" height="140" rx="10" fill={cat.col} stroke={cat.stroke} strokeWidth="1.5"/>
          <text x={10 + ci * 138 + 64} y="32" textAnchor="middle" fill={cat.tc} fontSize="12" fontWeight="700">{cat.label}</text>
          {cat.items.map((item, ii) => (
            <g key={ii}>
              <rect x={20 + ci * 138} y={42 + ii * 26} width="108" height="20" rx="5" fill="white" stroke={cat.stroke} strokeWidth="0.8"/>
              <text x={74 + ci * 138} y={57 + ii * 26} textAnchor="middle" fill={cat.tc} fontSize="10">{item}</text>
            </g>
          ))}
        </g>
      ))}
      <text x="280" y="152" textAnchor="middle" fill="#9CA3AF" fontSize="9">200+ verified connectors in the Anthropic Connectors Directory</text>
    </svg>
  );
}

function ApiModels() {
  const models = [
    { name: 'Haiku', speed: '⚡⚡⚡', cost: '$', use: 'Classification\nExtraction\nSimple tasks', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { name: 'Sonnet', speed: '⚡⚡', cost: '$$', use: 'Most features\nReasoning\nCode gen', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { name: 'Opus', speed: '⚡', cost: '$$$', use: 'Hard problems\nArchitecture\nComplex logic', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
  ];
  return (
    <svg viewBox="0 0 500 165" className="w-full" style={{ maxHeight: 165 }}>
      {models.map((m, i) => (
        <g key={i}>
          <rect x={10 + i * 163} y="10" width="153" height="145" rx="12" fill={m.col} stroke={m.stroke} strokeWidth="2"/>
          <text x={10 + i * 163 + 76} y="42" textAnchor="middle" fill={m.tc} fontSize="16" fontWeight="700">{m.name}</text>
          <text x={10 + i * 163 + 76} y="62" textAnchor="middle" fill={m.stroke} fontSize="13">{m.speed}</text>
          <text x={10 + i * 163 + 76} y="80" textAnchor="middle" fill={m.tc} fontSize="12" fontWeight="600">Cost: {m.cost}</text>
          {m.use.split('\n').map((u, ui) => (
            <text key={ui} x={10 + i * 163 + 76} y={104 + ui * 16} textAnchor="middle" fill={m.stroke} fontSize="10">{u}</text>
          ))}
        </g>
      ))}
    </svg>
  );
}

// ─── MODULE 9: EARN WITH CLAUDE ───────────────────────────────────────────────

function IncomeMap() {
  const paths = [
    { rank: '1', label: 'Freelancing', sub: '$35-400/hr', time: 'First $ in weeks', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B' },
    { rank: '2', label: 'Niche SaaS', sub: '$0 → $62K MRR', time: '3-12 months', col: '#EDE9FE', stroke: '#7C3AED', tc: '#4C1D95' },
    { rank: '3', label: 'Teaching', sub: '$2-10K/mo', time: '6-12 months', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E' },
    { rank: '4', label: 'Skills/plugins', sub: '$50-3K/mo', time: '1-6 months', col: '#DBEAFE', stroke: '#2563EB', tc: '#1E3A8A' },
  ];
  return (
    <svg viewBox="0 0 560 120" className="w-full" style={{ maxHeight: 120 }}>
      {paths.map((p, i) => (
        <g key={i}>
          <rect x={8 + i * 138} y="10" width="128" height="98" rx="10" fill={p.col} stroke={p.stroke} strokeWidth="2"/>
          <circle cx={8 + i * 138 + 64} cy="36" r="16" fill={p.stroke}/>
          <text x={8 + i * 138 + 64} y="41" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="700">{p.rank}</text>
          <text x={8 + i * 138 + 64} y="68" textAnchor="middle" fill={p.tc} fontSize="12" fontWeight="700">{p.label}</text>
          <text x={8 + i * 138 + 64} y="83" textAnchor="middle" fill={p.stroke} fontSize="10" fontWeight="600">{p.sub}</text>
          <text x={8 + i * 138 + 64} y="99" textAnchor="middle" fill={p.tc} fontSize="9">{p.time}</text>
        </g>
      ))}
    </svg>
  );
}

function IncomeTimeline() {
  const months = [
    { m: '0-1', label: 'Portfolio', sub: '3 projects', col: '#F9FAFB', tc: '#6B7280' },
    { m: '1-3', label: 'First clients', sub: '$35-60/hr', col: '#D1FAE5', tc: '#059669' },
    { m: '3-6', label: 'Rate increase', sub: '$100-150/hr', col: '#FEF3C7', tc: '#D97706' },
    { m: '6-9', label: 'Micro-SaaS', sub: '$0→$3K MRR', col: '#EDE9FE', tc: '#7C3AED' },
    { m: '9-12', label: 'Scale', sub: '$10K+ MRR', col: '#DBEAFE', tc: '#2563EB' },
  ];
  return (
    <svg viewBox="0 0 560 115" className="w-full" style={{ maxHeight: 115 }}>
      <line x1="20" y1="70" x2="540" y2="70" stroke="#E5E7EB" strokeWidth="2"/>
      {months.map((m, i) => (
        <g key={i}>
          <circle cx={20 + i * 130} cy="70" r="14" fill={m.col} stroke={m.tc} strokeWidth="2"/>
          <text x={20 + i * 130} y="75" textAnchor="middle" fill={m.tc} fontSize="9" fontWeight="700">{m.m}</text>
          <text x={20 + i * 130} y="98" textAnchor="middle" fill={m.tc} fontSize="11" fontWeight="600">{m.label}</text>
          <text x={20 + i * 130} y="112" textAnchor="middle" fill="#9CA3AF" fontSize="9">{m.sub}</text>
        </g>
      ))}
    </svg>
  );
}

function FreelancerMap() {
  return (
    <svg viewBox="0 0 560 165" className="w-full" style={{ maxHeight: 165 }}>
      <rect x="10" y="10" width="250" height="145" rx="12" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5"/>
      <text x="135" y="35" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="700">What you sell</text>
      {['Website builds ($500-2K)', 'App features ($400-1.5K)', 'Automation workflows ($300-800)', 'Claude consulting ($150-400/hr)', 'PRD + product strategy ($500-1K)'].map((item, i) => (
        <g key={i}>
          <circle cx="28" cy={52 + i * 22} r="4" fill="#059669"/>
          <text x="40" y={57 + i * 22} fill="#374151" fontSize="10">{item}</text>
        </g>
      ))}

      <rect x="300" y="10" width="250" height="145" rx="12" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5"/>
      <text x="425" y="35" textAnchor="middle" fill="#374151" fontSize="12" fontWeight="700">Rate progression</text>
      {[['Beginner (0-6mo)', '$35-60/hr', '#059669'], ['Mid-level (6-18mo)', '$100-150/hr', '#D97706'], ['Expert (18mo+)', '$200-400/hr', '#7C3AED'], ['Senior specialist', '$300-500/hr', '#DC2626']].map(([level, rate, col], i) => (
        <g key={i}>
          <rect x="312" y={48 + i * 27} width="230" height="22" rx="5" fill="white" stroke="#E5E7EB"/>
          <text x="330" y={63 + i * 27} fill="#374151" fontSize="10">{level}</text>
          <text x="520" y={63 + i * 27} textAnchor="end" fill={col} fontSize="10" fontWeight="600">{rate}</text>
        </g>
      ))}
    </svg>
  );
}

function SaasEconomics() {
  return (
    <svg viewBox="0 0 560 170" className="w-full" style={{ maxHeight: 170 }}>
      <rect x="10" y="10" width="250" height="150" rx="12" fill="#F0FDF4" stroke="#059669" strokeWidth="1.5"/>
      <text x="135" y="35" textAnchor="middle" fill="#064E3B" fontSize="13" fontWeight="700">Revenue (10 users)</text>
      <text x="135" y="75" textAnchor="middle" fill="#059669" fontSize="32" fontWeight="700">$190</text>
      <text x="135" y="96" textAnchor="middle" fill="#064E3B" fontSize="11">10 × $19/month</text>
      <line x1="25" y1="108" x2="245" y2="108" stroke="#A7F3D0" strokeWidth="1"/>
      <text x="135" y="122" textAnchor="middle" fill="#065F46" fontSize="11">Claude API (Haiku): ~$2</text>
      <text x="135" y="138" textAnchor="middle" fill="#065F46" fontSize="11">Vercel + Supabase: $0</text>
      <text x="135" y="152" textAnchor="middle" fill="#065F46" fontSize="11">Stripe fees: ~$6</text>

      <rect x="300" y="10" width="250" height="150" rx="12" fill="#EDE9FE" stroke="#7C3AED" strokeWidth="1.5"/>
      <text x="425" y="35" textAnchor="middle" fill="#4C1D95" fontSize="13" fontWeight="700">Net margin</text>
      <text x="425" y="85" textAnchor="middle" fill="#7C3AED" fontSize="40" fontWeight="700">95%</text>
      <text x="425" y="108" textAnchor="middle" fill="#5B21B6" fontSize="11">10 users → $182 profit/mo</text>
      <text x="425" y="126" textAnchor="middle" fill="#5B21B6" fontSize="11">100 users → ~$1,820/mo</text>
      <text x="425" y="144" textAnchor="middle" fill="#5B21B6" fontSize="11">1000 users → ~$18,200/mo</text>
    </svg>
  );
}

function SkillsMarketplace() {
  return (
    <svg viewBox="0 0 560 155" className="w-full" style={{ maxHeight: 155 }}>
      {[
        { label: 'Top Skills', range: '$500–3K/mo', ex: 'Industry-specific\ndocs, localized', col: '#D1FAE5', stroke: '#059669', tc: '#064E3B', pct: '~15%' },
        { label: 'Mid Skills', range: '$50–500/mo', ex: 'Niche domain\nworkflows', col: '#FEF3C7', stroke: '#D97706', tc: '#92400E', pct: '~35%' },
        { label: 'Median Skills', range: '< $50/mo', ex: 'Generic writing\ntools', col: '#FEE2E2', stroke: '#DC2626', tc: '#7F1D1D', pct: '~50%' },
      ].map((t, i) => (
        <g key={i}>
          <rect x={8 + i * 185} y="10" width="175" height="135" rx="12" fill={t.col} stroke={t.stroke} strokeWidth="1.5"/>
          <text x={8 + i * 185 + 87} y="38" textAnchor="middle" fill={t.tc} fontSize="13" fontWeight="700">{t.label}</text>
          <text x={8 + i * 185 + 87} y="60" textAnchor="middle" fill={t.stroke} fontSize="14" fontWeight="700">{t.range}</text>
          {t.ex.split('\n').map((l, li) => (
            <text key={li} x={8 + i * 185 + 87} y={82 + li * 16} textAnchor="middle" fill={t.tc} fontSize="10">{l}</text>
          ))}
          <rect x={18 + i * 185} y="118" width="155" height="18" rx="5" fill={t.stroke}/>
          <text x={8 + i * 185 + 87} y="130" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="600">{t.pct} of all skills</text>
        </g>
      ))}
    </svg>
  );
}

// ─── End of Diagrams ─────────────────────────────────────────────────────────
