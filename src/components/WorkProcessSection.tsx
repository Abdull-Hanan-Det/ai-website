import React, { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioConfig';

export const WorkProcessSection: React.FC = () => {
  const [selectedStageIndex, setSelectedStageIndex] = useState<number>(0);
  const currentStage = PORTFOLIO_CONFIG.workProcess[selectedStageIndex];

  return (
    <section
      id="process"
      className="py-20 lg:py-28 border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] mb-3">
            <span>05. Work Process</span>
            <span aria-hidden="true">·</span>
            <span>Discover · Design · Build · Test · Optimize</span>
          </div>
          <h2
            className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F8FAFC] leading-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            A Structured 5-Stage Engineering Lifecycle
          </h2>
          <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
            Every AI agent and n8n workflow follows a disciplined delivery methodology—combining operational process analysis with rigorous payload testing.
          </p>
        </div>

        {/* 5-Stage Interactive Step Selector Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {PORTFOLIO_CONFIG.workProcess.map((item, idx) => {
            const isSelected = idx === selectedStageIndex;
            return (
              <button
                key={item.stage}
                type="button"
                onClick={() => setSelectedStageIndex(idx)}
                className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#121318] border-[#6366F1] shadow-[0_8px_30px_-4px_rgba(99,102,241,0.18)]'
                    : 'bg-[#0E1017]/80 border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className={isSelected ? 'text-[#06B6D4]' : 'text-[#94A3B8]'}>
                      Step {item.number}
                    </span>
                    {idx < PORTFOLIO_CONFIG.workProcess.length - 1 && (
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${
                          isSelected ? 'text-[#c0c1ff]' : 'text-white/20'
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-[#F8FAFC] mb-1">
                    {item.stage}
                  </h3>
                </div>
                <p className="text-xs text-[#94A3B8] leading-snug line-clamp-2 mt-2">
                  {item.headline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detailed Breakdown Card */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#06B6D4]">
                <span>Stage {currentStage.number} of 05</span>
                <span aria-hidden="true">·</span>
                <span>{currentStage.stage} Phase</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#F8FAFC]">
                {currentStage.number}. {currentStage.stage} — {currentStage.headline}
              </h3>

              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                {currentStage.description}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.07]">
                  <div className="text-xs font-mono text-[#94A3B8] mb-1">
                    Business Alignment
                  </div>
                  <div className="text-xs sm:text-sm text-[#e3e1e9] leading-relaxed">
                    {currentStage.businessFocus}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.07]">
                  <div className="text-xs font-mono text-[#94A3B8] mb-1">
                    Primary Deliverable
                  </div>
                  <div className="text-xs sm:text-sm text-[#c0c1ff] font-medium leading-relaxed">
                    {currentStage.technicalArtifact}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-xl bg-[#0E1017] border border-white/[0.08]">
              <h4 className="font-display text-sm font-semibold text-[#F8FAFC] mb-4">
                Stage {currentStage.number} Verification Checkpoints
              </h4>
              <ul className="space-y-3 mb-6">
                {currentStage.checkpoints.map((cp) => (
                  <li
                    key={cp}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#94A3B8] leading-relaxed"
                  >
                    <Check
                      className="w-4 h-4 text-[#06B6D4] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{cp}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <span className="text-xs font-mono text-[#94A3B8]">
                  Ready to start with 01. Discover?
                </span>
                <a
                  href="#contact"
                  className="text-xs font-medium text-[#c0c1ff] hover:text-white inline-flex items-center gap-1 transition-colors"
                >
                  <span>Schedule Discovery</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
