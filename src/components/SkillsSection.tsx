import React, { useState } from 'react';
import { Terminal, CheckCircle2, Code2 } from 'lucide-react';
import { PORTFOLIO_CONFIG, SkillItem } from '../data/portfolioConfig';

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<SkillItem>(PORTFOLIO_CONFIG.skills[0]);

  const categories = [
    'All',
    'Orchestration & Agents',
    'Core Engineering',
    'Data & Integrations',
  ];

  const filteredSkills =
    selectedCategory === 'All'
      ? PORTFOLIO_CONFIG.skills
      : PORTFOLIO_CONFIG.skills.filter((s) => s.category === selectedCategory);

  return (
    <section
      id="skills"
      className="py-20 lg:py-28 border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] mb-3">
              <span>04. Technical Skills</span>
              <span aria-hidden="true">·</span>
              <span>10 Core Automation Competencies</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F8FAFC] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              The AI Automation &amp; Agent Engineering Stack
            </h2>
          </div>

          {/* Interactive Category Filter */}
          <div
            role="tablist"
            aria-label="Filter skills by category"
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
                  onClick={() => {
                    setSelectedCategory(cat);
                    const nextList =
                      cat === 'All'
                        ? PORTFOLIO_CONFIG.skills
                        : PORTFOLIO_CONFIG.skills.filter((s) => s.category === cat);
                    if (nextList.length > 0 && !nextList.some((s) => s.id === activeSkill.id)) {
                      setActiveSkill(nextList[0]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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

        {/* 12-Column Split: Left 7 Cols Skill Grid (All 10 Skills), Right 5 Cols Live Implementation Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 Cols: Interactive Skill Selector Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredSkills.map((skill, idx) => {
              const isSelected = activeSkill.id === skill.id;
              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => setActiveSkill(skill)}
                  className={`text-left p-5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#121318] border-[#6366F1] shadow-[0_8px_32px_-4px_rgba(99,102,241,0.18)]'
                      : 'bg-[#0E1017]/80 border-white/[0.08] hover:border-white/[0.18]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#94A3B8] mb-2">
                    <span className={isSelected ? 'text-[#06B6D4]' : 'text-[#94A3B8]'}>
                      {String(idx + 1).padStart(2, '0')} · {skill.category}
                    </span>
                    {isSelected && (
                      <span className="text-[11px] text-[#c0c1ff]">Inspecting</span>
                    )}
                  </div>

                  <h3 className="font-display text-lg font-semibold text-[#F8FAFC] mb-1">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-2">
                    {skill.description}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right 5 Cols: Active Skill Deep-Dive & Code/Config Sample */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="glass-panel rounded-2xl p-6 sm:p-7">
              <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#06B6D4] pb-3 mb-4 border-b border-white/[0.08]">
                <span>Capability Deep-Dive</span>
                <span>{activeSkill.category}</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-[#F8FAFC] mb-1">
                {activeSkill.name}
              </h3>
              <p className="text-xs font-medium text-[#c0c1ff] mb-4">
                {activeSkill.roleInStack}
              </p>

              <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                {activeSkill.description}
              </p>

              <div className="mb-6">
                <div className="text-xs font-semibold text-[#F8FAFC] mb-2.5">
                  Production Implementation Scenarios:
                </div>
                <ul className="space-y-2">
                  {activeSkill.practicalUseCases.map((useCase) => (
                    <li
                      key={useCase}
                      className="flex items-start gap-2 text-xs text-[#e3e1e9] leading-relaxed"
                    >
                      <CheckCircle2
                        className="w-3.5 h-3.5 text-[#06B6D4] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Code / Config Pattern Preview */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#94A3B8] mb-2">
                  <span className="inline-flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#c0c1ff]" aria-hidden="true" />
                    <span>Implementation Pattern</span>
                  </span>
                  <Terminal className="w-3.5 h-3.5 text-[#94A3B8]" aria-hidden="true" />
                </div>
                <pre className="p-3.5 rounded-xl bg-[#090A0F] border border-white/[0.08] text-[11px] font-mono text-[#e3e1e9] overflow-x-auto leading-relaxed">
                  {activeSkill.codeOrConfigSample}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
