import React from 'react';
import { Info, AlertTriangle, Lightbulb } from 'lucide-react';
import { Diagram } from './Diagrams';
import { CodeBlock } from './CodeBlock';
import { Sandbox } from './Sandbox';

function parseMarkdown(text) {
  // Bold
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return <strong key={i}>{p.slice(2, -2)}</strong>;
    }
    if (p.startsWith('`') && p.endsWith('`')) {
      return <code key={i} className="inline-code">{p.slice(1, -1)}</code>;
    }
    return <span key={i}>{p}</span>;
  });
}

function renderLine(line, i) {
  if (line.startsWith('• ') || line.startsWith('- ')) {
    return (
      <li key={i} className="content-list-item">
        {parseMarkdown(line.slice(2))}
      </li>
    );
  }
  if (line === '') return <br key={i} />;
  return <p key={i} className="content-para">{parseMarkdown(line)}</p>;
}

function renderText(content) {
  const lines = content.split('\n');
  const elements = [];
  let listBuffer = [];

  lines.forEach((line, i) => {
    if (line.startsWith('• ') || line.startsWith('- ')) {
      listBuffer.push(renderLine(line, i));
    } else {
      if (listBuffer.length > 0) {
        elements.push(<ul key={`ul-${i}`} className="content-list">{listBuffer}</ul>);
        listBuffer = [];
      }
      elements.push(renderLine(line, i));
    }
  });
  if (listBuffer.length > 0) {
    elements.push(<ul key="ul-end" className="content-list">{listBuffer}</ul>);
  }
  return elements;
}

export function LessonContent({ sections }) {
  return (
    <div className="lesson-sections">
      {sections.map((section, i) => {
        switch (section.type) {
          case 'text':
            return (
              <div key={i} className="section-text">
                {renderText(section.content)}
              </div>
            );

          case 'callout': {
            const icons = {
              tip: <Lightbulb size={16} />,
              warning: <AlertTriangle size={16} />,
              info: <Info size={16} />,
            };
            return (
              <div key={i} className={`callout callout-${section.variant}`}>
                <div className="callout-icon">{icons[section.variant]}</div>
                <div className="callout-body">{renderText(section.content)}</div>
              </div>
            );
          }

          case 'code':
            return (
              <CodeBlock
                key={i}
                code={section.code}
                language={section.language}
                label={section.label}
              />
            );

          case 'diagram':
            return (
              <div key={i} className="diagram-wrapper">
                {section.title && <p className="diagram-label">{section.title}</p>}
                <Diagram type={section.diagram} />
              </div>
            );

          case 'sandbox':
            return (
              <Sandbox
                key={i}
                title={section.title}
                prompt={section.prompt}
                answer={section.answer}
                hint={section.hint}
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
