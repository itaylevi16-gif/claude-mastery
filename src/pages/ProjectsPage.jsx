import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, Zap, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useProgress } from '../hooks/useProgress';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { isComplete } = useProgress();

  return (
    <div className="projects-page">
      <div className="projects-hero">
        <div className="projects-hero-badge">
          <Zap size={13} />
          <span>Hands-on builds</span>
        </div>
        <h1 className="projects-hero-title">Projects</h1>
        <p className="projects-hero-sub">
          Guided builds that apply everything from the lessons to your real projects. Step-by-step, with working code you can use immediately.
        </p>
      </div>

      <div className="projects-grid">
        {PROJECTS.map(project => {
          const totalSteps = project.steps.length;
          const doneSteps = project.steps.filter(s => isComplete(s.id)).length;
          const pct = Math.round((doneSteps / totalSteps) * 100);
          const isStarted = doneSteps > 0;
          const isDone = doneSteps === totalSteps;

          return (
            <div
              key={project.id}
              className="project-card"
              onClick={() => navigate(`/project/${project.id}`)}
            >
              {/* Cover image */}
              <div
                className="project-card-cover"
                style={{ background: project.bg }}
              >
                <img
                  src={project.canva_image}
                  alt={project.title}
                  className="project-cover-img"
                  onError={e => { e.target.style.display = 'none'; }}
                />
                <div className="project-cover-overlay">
                  <span
                    className="project-level-badge"
                    style={{ background: project.color, color: '#fff' }}
                  >
                    {project.level}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="project-card-body">
                <div className="project-card-meta">
                  <span className="project-duration">
                    <Clock size={12} />
                    {project.duration}
                  </span>
                  <span className="project-steps-count">
                    {totalSteps} steps
                  </span>
                  {isDone && (
                    <span className="project-done-tag">
                      <CheckCircle size={12} />
                      Done
                    </span>
                  )}
                </div>

                <h3 className="project-card-title">{project.title}</h3>
                <p className="project-card-desc">{project.description}</p>

                <div className="project-card-footer">
                  <div className="project-progress-track">
                    <div
                      className="project-progress-fill"
                      style={{ width: `${pct}%`, background: project.color }}
                    />
                  </div>
                  <span className="project-progress-label" style={{ color: project.color }}>
                    {isStarted ? `${doneSteps}/${totalSteps} steps` : 'Not started'}
                  </span>
                </div>

                <button
                  className="project-start-btn"
                  style={{ background: project.color }}
                >
                  {isDone ? '✓ Review project' : isStarted ? 'Continue →' : 'Start project'}
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
