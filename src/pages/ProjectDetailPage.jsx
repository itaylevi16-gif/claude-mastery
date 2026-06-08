import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { getProjectById } from '../data/projects';
import { useProgress } from '../hooks/useProgress';
import { CodeBlock } from '../components/CodeBlock';
import { Quiz } from '../components/Quiz';

function renderInstructions(instructions) {
  return (
    <ol className="step-instructions">
      {instructions.map((item, i) => (
        <li key={i} className="step-instruction-item">
          <span className="step-num">{i + 1}</span>
          <span>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function StepCard({ step, index, isOpen, onToggle, isDone, onMarkDone, onNext, isLast }) {
  return (
    <div className={`step-card ${isDone ? 'step-done' : ''} ${isOpen ? 'step-open' : ''}`}>
      <button className="step-card-header" onClick={onToggle}>
        <div className="step-header-left">
          <div className={`step-circle ${isDone ? 'done' : isOpen ? 'active' : ''}`}>
            {isDone ? <CheckCircle size={14} /> : <span>{index + 1}</span>}
          </div>
          <div className="step-header-text">
            <span className="step-type-badge">{step.type}</span>
            <h3 className="step-title">{step.title}</h3>
          </div>
        </div>
        <div className="step-header-right">
          <span className="step-duration"><Clock size={12} />{step.duration}</span>
          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </div>
      </button>

      {isOpen && (
        <div className="step-body">
          <p className="step-content">{step.content}</p>

          {step.instructions && renderInstructions(step.instructions)}

          {step.code && (
            <CodeBlock
              code={step.code.code}
              language={step.code.language}
              label={step.code.label}
            />
          )}

          {step.callout && (
            <div className={`callout callout-${step.callout.variant}`}>
              <div className="callout-body">{step.callout.content}</div>
            </div>
          )}

          {step.quiz && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <Quiz
                quiz={step.quiz}
                lessonId={step.id}
                onPass={() => onMarkDone(step.id)}
              />
            </div>
          )}

          {!step.quiz && (
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '10px' }}>
              {!isDone && (
                <button
                  className="complete-btn"
                  style={{ background: '#059669' }}
                  onClick={() => onMarkDone(step.id)}
                >
                  <CheckCircle size={15} />
                  Mark step complete
                </button>
              )}
              {isDone && !isLast && (
                <button
                  className="next-lesson-btn"
                  style={{ background: '#059669' }}
                  onClick={onNext}
                >
                  Next step <ArrowRight size={15} />
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProjectDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isComplete, markComplete } = useProgress();
  const [openStep, setOpenStep] = useState(0);

  const project = getProjectById(id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div className="lesson-not-found">
        <p>Project not found.</p>
        <button onClick={() => navigate('/projects')}>← Back to projects</button>
      </div>
    );
  }

  const doneSteps = project.steps.filter(s => isComplete(s.id)).length;
  const pct = Math.round((doneSteps / project.steps.length) * 100);

  const handleMarkDone = (stepId) => {
    markComplete(stepId);
    const idx = project.steps.findIndex(s => s.id === stepId);
    if (idx < project.steps.length - 1) {
      setTimeout(() => setOpenStep(idx + 1), 300);
    }
  };

  return (
    <div className="project-detail-page">
      {/* Header */}
      <div className="project-detail-header">
        <button className="back-btn" onClick={() => navigate('/projects')}>
          <ArrowLeft size={16} /> All projects
        </button>

        <div className="project-detail-cover"
          style={{ background: project.bg }}>
          <img
            src={project.canva_image}
            alt={project.title}
            className="project-detail-cover-img"
            onError={e => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="project-detail-meta">
          <span className="project-level-badge" style={{ background: project.color, color: '#fff' }}>
            {project.level}
          </span>
          <span className="lesson-duration-tag"><Clock size={12} />{project.duration}</span>
        </div>

        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-desc">{project.description}</p>

        <div className="project-detail-build-box" style={{ borderColor: project.color, background: project.bg }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <Zap size={14} style={{ color: project.color }} />
            <strong style={{ fontSize: 13, color: project.color }}>What you'll build</strong>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            {project.what_you_build}
          </p>
        </div>

        <div className="project-detail-prereqs">
          <strong style={{ fontSize: 12, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Prerequisites
          </strong>
          <ul style={{ marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4 }}>
            {project.prerequisites.map((p, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: project.color }}>→</span> {p}
              </li>
            ))}
          </ul>
        </div>

        {/* Progress */}
        <div className="project-detail-progress">
          <div className="progress-bar-track" style={{ maxWidth: '100%' }}>
            <div className="progress-bar-fill"
              style={{ width: `${pct}%`, background: project.color }} />
          </div>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 6, display: 'block' }}>
            {doneSteps} of {project.steps.length} steps complete
          </span>
        </div>
      </div>

      {/* Steps */}
      <div className="project-steps">
        {project.steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            index={i}
            isOpen={openStep === i}
            onToggle={() => setOpenStep(openStep === i ? -1 : i)}
            isDone={isComplete(step.id)}
            onMarkDone={handleMarkDone}
            onNext={() => setOpenStep(i + 1)}
            isLast={i === project.steps.length - 1}
          />
        ))}
      </div>

      {doneSteps === project.steps.length && (
        <div className="project-complete-banner">
          <span style={{ fontSize: 28 }}>🎉</span>
          <div>
            <strong>Project complete!</strong>
            <p>You built {project.what_you_build.slice(0, 60)}...</p>
          </div>
          <button className="next-lesson-btn" style={{ background: project.color }}
            onClick={() => navigate('/projects')}>
            More projects <ArrowRight size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
