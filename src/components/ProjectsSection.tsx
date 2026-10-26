import React, { useState, useEffect } from 'react';
import {
  ArrowUpRight,
  Code2,
  ExternalLink,
  X,
  ChevronRight,
  Check,
  Terminal,
} from 'lucide-react';
import { PORTFOLIO_CONFIG, ProjectItem } from '../data/portfolioConfig';

interface ProjectsSectionProps {
  onSelectProjectInquiry: (projectTitle: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProjectInquiry }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [inspectedProject, setInspectedProject] = useState<ProjectItem | null>(null);

  const categories = ['All', 'AI Agents', 'n8n Workflows', 'Web Applications'];

  const filteredProjects =
    selectedCategory === 'All'
      ? PORTFOLIO_CONFIG.projects
      : PORTFOLIO_CONFIG.projects.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setInspectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleRequestSimilar = (project: ProjectItem) => {
    setInspectedProject(null);
    onSelectProjectInquiry(`Similar to: ${project.title}`);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="projects"
      className="py-20 lg:py-28 border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header + Category Filter Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] mb-3">
              <span>03. Featured Projects</span>
              <span aria-hidden="true">·</span>
              <span>Production Case Studies</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F8FAFC] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              Engineered AI Agents, n8n Pipelines &amp; Web Applications
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#0E1017] border border-white/[0.08] self-start lg:self-auto"
          >
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#6366F1] text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects 2-Column Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
          {filteredProjects.map((project, index) => (
            <article
              key={project.id}
              className="glass-panel glass-panel-interactive rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
            >
              <div>
                {/* Top Metadata Line (Clean Unboxed Text with Separators) */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#94A3B8] mb-3">
                  <span>
                    0{index + 1} · {project.category}
                  </span>
                  <span className="text-[#06B6D4]">
                    {project.techStack.slice(0, 4).join(' · ')}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-display text-2xl font-semibold text-[#F8FAFC] mb-1.5">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-[#c0c1ff] mb-4">
                  {project.subtitle}
                </p>

                {/* Visual Workflow Architecture Preview Diagram */}
                <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.07] mb-5">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#94A3B8] mb-3">
                    <span>System Pipeline Architecture</span>
                    <span>3-Stage Execution</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {project.workflowNodes.map((node, idx) => (
                      <div
                        key={node.step}
                        className="p-3 rounded-lg bg-[#0E1017] border border-white/[0.06] flex flex-col justify-between relative"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-[#06B6D4] mb-1">
                          <span>Step {node.step}</span>
                          {idx < project.workflowNodes.length - 1 && (
                            <ChevronRight
                              className="hidden sm:block w-3.5 h-3.5 text-[#6366F1]"
                              aria-hidden="true"
                            />
                          )}
                        </div>
                        <div className="font-display text-xs font-semibold text-[#F8FAFC] mb-1">
                          {node.label}
                        </div>
                        <p className="text-[11px] text-[#94A3B8] leading-snug">
                          {node.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Problem & Architecture Summary */}
                <div className="space-y-3 mb-6">
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#e3e1e9] font-medium">Operational Challenge: </strong>
                    {project.problem}
                  </p>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    <strong className="text-[#e3e1e9] font-medium">Engineered Solution: </strong>
                    {project.architectureSummary}
                  </p>
                </div>
              </div>

              {/* Card Bottom: Unboxed Stack List & Configurable Action Links */}
              <div className="pt-5 border-t border-white/[0.08] space-y-4">
                <div className="text-xs text-[#94A3B8] flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="text-[#F8FAFC] font-medium">Technologies:</span>
                  {project.techStack.map((tech, idx) => (
                    <React.Fragment key={tech}>
                      <span>{tech}</span>
                      {idx < project.techStack.length - 1 && (
                        <span aria-hidden="true">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => setInspectedProject(project)}
                    className="btn-secondary-vanguard px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                    <span>Inspect Architecture &amp; JSON</span>
                  </button>

                  <div className="flex items-center gap-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium text-[#94A3B8] hover:text-[#F8FAFC] inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>GitHub</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>

                    <button
                      type="button"
                      onClick={() => handleRequestSimilar(project)}
                      className="text-xs font-medium text-[#c0c1ff] hover:text-white inline-flex items-center gap-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>Request Similar Build</span>
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Fullscreen / Modal Architecture & JSON Inspector */}
      {inspectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          onClick={() => setInspectedProject(null)}
        >
          <div
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121318] border border-white/[0.12] p-6 sm:p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08]">
              <div>
                <div className="text-xs font-mono text-[#06B6D4] mb-1">
                  {inspectedProject.category} · System Specification
                </div>
                <h3
                  id="modal-project-title"
                  className="font-display text-2xl font-bold text-[#F8FAFC]"
                >
                  {inspectedProject.title}
                </h3>
                <p className="text-sm text-[#94A3B8] mt-1">{inspectedProject.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setInspectedProject(null)}
                aria-label="Close project specification modal"
                className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-display text-sm font-semibold text-[#F8FAFC] mb-2">
                  Key Capabilities &amp; Guardrails
                </h4>
                <ul className="space-y-2">
                  {inspectedProject.keyCapabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-start gap-2.5 text-sm text-[#94A3B8] leading-relaxed"
                    >
                      <Check
                        className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-2">
                  <span className="inline-flex items-center gap-1.5 text-[#F8FAFC]">
                    <Terminal className="w-4 h-4 text-[#c0c1ff]" aria-hidden="true" />
                    <span>Sample Pipeline JSON Payload</span>
                  </span>
                  <span>Structured Schema</span>
                </div>
                <pre className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.08] text-xs font-mono text-[#e3e1e9] overflow-x-auto leading-relaxed">
                  {inspectedProject.samplePayload}
                </pre>
              </div>

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-[#94A3B8]">
                  Stack: {inspectedProject.techStack.join(' · ')}
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href={inspectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary-vanguard px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
                  >
                    <span>GitHub Profile</span>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                  <button
                    type="button"
                    onClick={() => handleRequestSimilar(inspectedProject)}
                    className="btn-primary-vanguard px-4 py-2 rounded-lg text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Build Similar System</span>
                    <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
