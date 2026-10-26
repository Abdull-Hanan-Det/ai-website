import React from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { PORTFOLIO_CONFIG, ServiceItem } from '../data/portfolioConfig';

interface ServicesSectionProps {
  onSelectService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const handleInquireClick = (service: ServiceItem) => {
    onSelectService(service.title);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="services"
      className="py-20 lg:py-28 border-b border-white/[0.06] relative"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] mb-3">
              <span>02. Services</span>
              <span aria-hidden="true">·</span>
              <span>Production Automation Capabilities</span>
            </div>
            <h2
              className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F8FAFC] leading-tight"
              style={{ textWrap: 'balance' }}
            >
              AI Automation Services Engineered for Real Operational Impact
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#94A3B8] max-w-md">
            From autonomous LangGraph agents to multi-node n8n pipelines, select any capability below to pre-load a tailored project inquiry.
          </p>
        </div>

        {/* 7 Services Grid: First 6 in 3-col / 2-col responsive grid, 7th full-width featured architecture card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_CONFIG.services.map((service, idx) => {
            const isFullWidthFeatured = idx === 6;
            return (
              <article
                key={service.id}
                className={`glass-panel glass-panel-interactive rounded-2xl p-6 sm:p-7 flex flex-col justify-between ${
                  isFullWidthFeatured ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div>
                  {/* Clean Editorial Index & Category Metadata */}
                  <div className="flex items-center justify-between gap-2 text-xs font-mono text-[#94A3B8] mb-3">
                    <span className="text-[#c0c1ff]">
                      {service.index}. {service.category}
                    </span>
                    <span>{service.tools.join(' · ')}</span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display text-xl font-semibold text-[#F8FAFC] mb-3">
                    {service.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-[#94A3B8] leading-relaxed mb-5">
                    {service.summary}
                  </p>

                  {/* Workflow Pipeline Node Visualization */}
                  <div className="p-3.5 rounded-xl bg-[#090A0F]/80 border border-white/[0.06] mb-5">
                    <div className="text-[11px] font-mono text-[#94A3B8] mb-2">
                      Pipeline Execution Flow
                    </div>
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono text-[#e3e1e9]">
                      {service.workflowNodes.map((node, nodeIdx) => (
                        <React.Fragment key={node}>
                          <span className="text-[#F8FAFC]">{node}</span>
                          {nodeIdx < service.workflowNodes.length - 1 && (
                            <ChevronRight
                              className="w-3.5 h-3.5 text-[#06B6D4] shrink-0"
                              aria-hidden="true"
                            />
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>

                  {/* Key Deliverables List */}
                  <div className="space-y-2 mb-6">
                    <div className="text-xs font-medium text-[#e3e1e9]">Key Deliverables:</div>
                    <ul
                      className={`grid grid-cols-1 ${
                        isFullWidthFeatured ? 'lg:grid-cols-3 gap-4' : 'gap-2'
                      }`}
                    >
                      {service.deliverables.map((item) => (
                        <li
                          key={item}
                          className="text-xs text-[#94A3B8] leading-relaxed flex items-start gap-2"
                        >
                          <span className="text-[#6366F1] font-mono select-none">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer: Outcome & Direct Action */}
                <div className="pt-4 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-[#94A3B8] max-w-md">
                    {service.businessOutcome}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleInquireClick(service)}
                    className="text-xs font-medium text-[#c0c1ff] hover:text-white inline-flex items-center gap-1.5 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>Inquire About {service.title}</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
