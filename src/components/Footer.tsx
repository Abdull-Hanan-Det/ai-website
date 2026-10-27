import React from 'react';
import { ArrowUpRight, Mail, MessageSquare, Code, Terminal } from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioConfig';

interface FooterProps {
  onOpenDeployModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDeployModal }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#090A0F] border-t border-white/[0.08] py-14">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <a
              href="#home"
              className="font-display text-xl font-bold tracking-tight text-[#F8FAFC] inline-block"
            >
              {PORTFOLIO_CONFIG.brand.logoText}
            </a>
            <p className="text-sm text-[#94A3B8] max-w-sm leading-relaxed">
              {PORTFOLIO_CONFIG.brand.fullName} — {PORTFOLIO_CONFIG.brand.role}. Building practical AI agents, n8n workflow automations, and scalable business systems.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onOpenDeployModal}
                className="text-xs font-mono text-[#06B6D4] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" aria-hidden="true" />
                <span>How to Export &amp; Deploy to Vercel</span>
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-display text-xs font-semibold text-[#F8FAFC] tracking-wide">
              Sections
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-[#94A3B8]">
              {PORTFOLIO_CONFIG.navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="hover:text-[#F8FAFC] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#process"
                  className="hover:text-[#F8FAFC] transition-colors"
                >
                  Work Process
                </a>
              </li>
            </ul>
          </div>

          {/* Configurable Social & Direct Links Column */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-display text-xs font-semibold text-[#F8FAFC] tracking-wide">
              Connect &amp; Social Profiles
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href={PORTFOLIO_CONFIG.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#F8FAFC] inline-flex items-center gap-2 transition-colors"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c0c1ff]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#F8FAFC] inline-flex items-center gap-2 transition-colors"
                >
                  <Code className="w-3.5 h-3.5 text-[#94A3B8]" aria-hidden="true" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c0c1ff]" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.socials.email}
                  className="text-[#94A3B8] hover:text-[#F8FAFC] inline-flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                  <span>{PORTFOLIO_CONFIG.socials.emailAddress}</span>
                </a>
              </li>
              <li>
                <a
                  href={PORTFOLIO_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94A3B8] hover:text-[#F8FAFC] inline-flex items-center gap-2 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                  <span>WhatsApp ({PORTFOLIO_CONFIG.socials.whatsappNumber})</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#c0c1ff]" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Clean Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#94A3B8]">
          <div>
            &copy; {currentYear} {PORTFOLIO_CONFIG.brand.fullName} ({PORTFOLIO_CONFIG.brand.logoText}). All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>AI Automation Engineer</span>
            <span aria-hidden="true">·</span>
            <span>AI Agent Developer</span>
            <span aria-hidden="true">·</span>
            <span>BBA Graduate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
