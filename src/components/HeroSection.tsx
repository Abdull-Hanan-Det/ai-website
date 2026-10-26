import React, { useState } from 'react';
import {
  ArrowRight,
  Play,
  RotateCcw,
  Terminal,
  Workflow,
  CheckCircle2,
  ChevronRight,
  Cpu,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioConfig';

interface HeroSectionProps {
  onSelectServiceForContact: (serviceName: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onSelectServiceForContact }) => {
  const [selectedPresetIndex, setSelectedPresetIndex] = useState(0);
  const [activeStepIndex, setActiveStepIndex] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);

  const currentPreset = PORTFOLIO_CONFIG.heroSimulations[selectedPresetIndex];

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStepIndex(0);

    setTimeout(() => {
      setActiveStepIndex(1);
    }, 450);

    setTimeout(() => {
      setActiveStepIndex(2);
      setIsSimulating(false);
    }, 950);
  };

  const handleSelectPreset = (index: number) => {
    setSelectedPresetIndex(index);
    setActiveStepIndex(2);
    setIsSimulating(false);
  };

  return (
    <section
      id="home"
      className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden border-b border-white/[0.06]"
    >
      {/* Subtle Atmospheric Radial Backdrops (Synthetic Vanguard Base Ground) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/4 w-[520px] h-[520px] rounded-full bg-[#6366F1]/12 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-10 w-[420px] h-[420px] rounded-full bg-[#06B6D4]/10 blur-[130px]"
      />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Typographic Hierarchy & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#94A3B8] mb-5 font-medium">
              <span className="text-[#c0c1ff]">{PORTFOLIO_CONFIG.brand.fullName}</span>
              <span aria-hidden="true">·</span>
              <span>{PORTFOLIO_CONFIG.brand.role}</span>
              <span aria-hidden="true">·</span>
              <span>BBA Graduate</span>
            </div>

            <h1
              className="font-display text-4xl sm:text-5xl lg:text-[58px] font-bold tracking-[-0.03em] text-[#F8FAFC] leading-[1.12] mb-6"
              style={{ textWrap: 'balance' }}
            >
              I Build AI Automations That Save Time &amp; Scale Businesses.
            </h1>

            <p className="text-base sm:text-lg text-[#94A3B8] leading-relaxed max-w-2xl mb-8">
              {PORTFOLIO_CONFIG.brand.subheadline}
            </p>

            {/* Primary & Secondary Action Controls */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#projects"
                className="btn-primary-vanguard px-6 py-3.5 rounded-lg text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                onClick={() => onSelectServiceForContact('AI Agents')}
                className="btn-secondary-vanguard px-6 py-3.5 rounded-lg text-sm font-medium inline-flex items-center gap-2 whitespace-nowrap shrink-0"
              >
                <span>Hire Me for Automation</span>
              </a>
            </div>

            {/* Clean Unboxed Technical Metadata Line */}
            <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#94A3B8]">
              <span className="text-[#F8FAFC] font-medium">Core Stack:</span>
              <span>n8n</span>
              <span aria-hidden="true">·</span>
              <span>Python</span>
              <span aria-hidden="true">·</span>
              <span>LangChain</span>
              <span aria-hidden="true">·</span>
              <span>LangGraph</span>
              <span aria-hidden="true">·</span>
              <span>LLMs</span>
              <span aria-hidden="true">·</span>
              <span>REST APIs &amp; Webhooks</span>
            </div>
          </div>

          {/* Right Column: Interactive AI Workflow Architecture Simulator */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="glass-panel rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
              {/* Top Header & Blueprint Switcher */}
              <div>
                <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <Workflow className="w-4 h-4 text-[#06B6D4] shrink-0" aria-hidden="true" />
                    <span className="font-display text-sm font-semibold text-[#F8FAFC]">
                      Interactive Pipeline Simulator
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={handleRunSimulation}
                    disabled={isSimulating}
                    className="px-3 py-1.5 rounded-md text-xs font-medium bg-[#6366F1]/20 hover:bg-[#6366F1]/30 text-[#c0c1ff] border border-[#6366F1]/35 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    {isSimulating ? (
                      <>
                        <RotateCcw className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                        <span>Executing...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Simulate Flow</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Preset Selector Tabs */}
                <div
                  role="tablist"
                  aria-label="Select workflow blueprint"
                  className="grid grid-cols-3 gap-1.5 p-1 rounded-lg bg-[#090A0F]/90 border border-white/[0.06] mb-5"
                >
                  {PORTFOLIO_CONFIG.heroSimulations.map((preset, idx) => {
                    const active = idx === selectedPresetIndex;
                    const shortLabels = ['Support Agent', 'Email Triage', 'Lead Engine'];
                    return (
                      <button
                        key={preset.id}
                        role="tab"
                        aria-selected={active}
                        type="button"
                        onClick={() => handleSelectPreset(idx)}
                        className={`px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap truncate cursor-pointer ${
                          active
                            ? 'bg-[#1e1f25] text-[#F8FAFC] border border-white/[0.1]'
                            : 'text-[#94A3B8] hover:text-[#F8FAFC]'
                        }`}
                      >
                        {shortLabels[idx]}
                      </button>
                    );
                  })}
                </div>

                {/* Trigger Info */}
                <div className="mb-3 flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>{currentPreset.name}</span>
                  <span className="font-mono text-[#06B6D4]">{currentPreset.triggerLabel}</span>
                </div>

                {/* Pipeline Nodes List */}
                <div className="space-y-3">
                  {currentPreset.steps.map((step, index) => {
                    const isCompletedOrActive = index <= activeStepIndex;
                    const isFocused = index === activeStepIndex;
                    return (
                      <div key={step.nodeName} className="relative">
                        <button
                          type="button"
                          onClick={() => setActiveStepIndex(index)}
                          className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                            isFocused
                              ? 'bg-[#121318] border-[#6366F1]/50'
                              : isCompletedOrActive
                              ? 'bg-[#0E1017]/90 border-white/[0.08] hover:border-white/[0.16]'
                              : 'bg-[#090A0F]/60 border-white/[0.04] opacity-60'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <div className="flex items-center gap-2 min-w-0">
                              <span className="font-mono text-xs text-[#c0c1ff] shrink-0">
                                0{index + 1}.
                              </span>
                              <span className="font-display text-sm font-semibold text-[#F8FAFC] truncate">
                                {step.nodeName}
                              </span>
                            </div>
                            <span className="text-[11px] font-mono text-[#94A3B8] shrink-0">
                              {step.nodeType}
                            </span>
                          </div>
                          <p className="text-xs text-[#94A3B8] leading-relaxed pl-6">
                            {step.description}
                          </p>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Output JSON Inspector Box */}
              <div className="mt-4 pt-4 border-t border-white/[0.08]">
                <div className="flex items-center justify-between text-xs text-[#94A3B8] mb-2">
                  <span className="inline-flex items-center gap-1.5 font-mono">
                    <Terminal className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                    <span>Node 0{activeStepIndex + 1} Output Payload</span>
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#06B6D4] font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Schema Verified</span>
                  </span>
                </div>
                <pre className="p-3 rounded-lg bg-[#090A0F] border border-white/[0.06] text-[11px] font-mono text-[#e3e1e9] overflow-x-auto leading-relaxed">
                  {currentPreset.steps[activeStepIndex]?.outputPreview}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Architectural Pillars Strip Below Hero Split */}
        <div className="mt-14 pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_CONFIG.heroHighlights.map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-xl bg-[#0E1017]/80 border border-white/[0.07] flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono text-[#94A3B8] mb-1.5">{item.label}</div>
                <div className="font-display text-base font-semibold text-[#F8FAFC] mb-1.5">
                  {item.value}
                </div>
              </div>
              <p className="text-xs text-[#94A3B8] leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
