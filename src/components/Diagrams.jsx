import React from 'react';

export function Diagram({ type }) {
  switch (type) {
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
