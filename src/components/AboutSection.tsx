import React, { useState } from 'react';
import { Briefcase, Cpu, Check, ArrowUpRight, Layers } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioConfig';

interface AboutSectionProps {
  onOpenDeployModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenDeployModal }) => {
  const [activeLens, setActiveLens] = useState<'both' | 'business' | 'engineering'>('both');

  return (
    <section
      id="about"
      className="py-20 lg:py-28 border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] mb-3">
            <span>01. About Me</span>
            <span aria-hidden="true">·</span>
            <span>Business Strategy &amp; AI Engineering</span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F8FAFC] leading-tight mb-5"
            style={{ textWrap: 'balance' }}
          >
            {PORTFOLIO_CONFIG.about.headline}
          </h2>
          <p className="text-base sm:text-lg text-[#e3e1e9] leading-relaxed">
            {PORTFOLIO_CONFIG.about.lead}
          </p>
        </div>

        {/* Main Asymmetric 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left 5 Columns: Narrative & Profile Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div>
                  <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">
                    {PORTFOLIO_CONFIG.brand.fullName}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-0.5">
                    {PORTFOLIO_CONFIG.brand.education}
                  </p>
                </div>
              </div>

              {PORTFOLIO_CONFIG.about.paragraphs.map((paragraph, idx) => (
                <p key={idx} className="text-sm sm:text-[15px] text-[#94A3B8] leading-relaxed">
                  {paragraph}
                </p>
              ))}

              <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-3">
                <a
                  href="#contact"
                  className="text-xs sm:text-sm font-medium text-[#c0c1ff] hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>Discuss Your Business Workflow</span>
                  <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                </a>

                <button
                  type="button"
                  onClick={onOpenDeployModal}
                  className="text-xs font-mono text-[#94A3B8] hover:text-[#06B6D4] transition-colors cursor-pointer underline underline-offset-4"
                >
                  Config &amp; Vercel Guide
                </button>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Interactive Business + Engineering Dual Lens */}
          <div className="lg:col-span-7 flex flex-col space-y-5">
            {/* Segmented Filter Control */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono text-[#94A3B8]">
                Architectural Perspective Filter
              </span>
              <div
                role="tablist"
                aria-label="Filter About perspective"
                className="inline-flex items-center gap-1 p-1 rounded-lg bg-[#0E1017] border border-white/[0.08]"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLens === 'both'}
                  onClick={() => setActiveLens('both')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeLens === 'both'
                      ? 'bg-[#6366F1] text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  Combined Approach
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLens === 'business'}
                  onClick={() => setActiveLens('business')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeLens === 'business'
                      ? 'bg-[#6366F1] text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  BBA Business Focus
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeLens === 'engineering'}
                  onClick={() => setActiveLens('engineering')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    activeLens === 'engineering'
                      ? 'bg-[#6366F1] text-white'
                      : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                  }`}
                >
                  AI Systems Engineering
                </button>
              </div>
            </div>

            {/* Perspective Panels */}
            <div
              className={`grid grid-cols-1 ${
                activeLens === 'both' ? 'md:grid-cols-2' : 'md:grid-cols-1'
              } gap-6`}
            >
              {(activeLens === 'both' || activeLens === 'business') && (
                <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-[#c0c1ff] mb-3">
                      <Briefcase className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-mono">Operational Strategy</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[#F8FAFC] mb-4">
                      {PORTFOLIO_CONFIG.about.perspectives.business.title}
                    </h3>
                    <ul className="space-y-3">
                      {PORTFOLIO_CONFIG.about.perspectives.business.points.map((pt, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-[#94A3B8] leading-relaxed"
                        >
                          <Check
                            className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-[#94A3B8]">
                    Focus: SOP Optimization · Time Savings · Practical ROI
                  </div>
                </div>
              )}

              {(activeLens === 'both' || activeLens === 'engineering') && (
                <div className="glass-panel rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2.5 text-[#06B6D4] mb-3">
                      <Cpu className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span className="text-xs font-mono">Technical Execution</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[#F8FAFC] mb-4">
                      {PORTFOLIO_CONFIG.about.perspectives.engineering.title}
                    </h3>
                    <ul className="space-y-3">
                      {PORTFOLIO_CONFIG.about.perspectives.engineering.points.map((pt, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-2.5 text-sm text-[#94A3B8] leading-relaxed"
                        >
                          <Check
                            className="w-4 h-4 text-[#c0c1ff] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-[#94A3B8]">
                    Focus: LangGraph · n8n · Python · Structured JSON APIs
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Summary Banner */}
            <div className="p-5 rounded-xl bg-[#0E1017] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3">
                <Layers className="w-5 h-5 text-[#6366F1] shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-[#e3e1e9]">
                  Every system is built to be transparent, well-documented, and maintainable by your team—without vendor lock-in or bloated subscriptions.
                </p>
              </div>
              <a
                href="#services"
                className="text-xs font-medium text-[#06B6D4] hover:text-white whitespace-nowrap shrink-0 transition-colors"
              >
                Explore 7 Core Services →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
