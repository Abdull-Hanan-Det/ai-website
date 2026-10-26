import React, { useEffect } from 'react';
import { X, CheckCircle2, Terminal, FileCode } from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="deploy-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121318] border border-white/[0.12] p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-5 mb-6 border-b border-white/[0.08]">
          <div>
            <div className="text-xs font-mono text-[#06B6D4] mb-1">
              Configuration &amp; Production Deployment Guide
            </div>
            <h3
              id="deploy-modal-title"
              className="font-display text-2xl font-bold text-[#F8FAFC]"
            >
              Exporting &amp; Deploying HANAN.AI to Vercel
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close deployment guide modal"
            className="p-2 rounded-lg text-[#94A3B8] hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6 text-sm text-[#94A3B8] leading-relaxed">
          {/* Step 1 */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-display font-semibold text-[#F8FAFC]">
              <FileCode className="w-4 h-4 text-[#c0c1ff]" aria-hidden="true" />
              <span>1. Customize Personal Info &amp; Social Links in One File</span>
            </div>
            <p className="text-xs sm:text-sm">
              Open <code className="text-[#06B6D4] font-mono">src/data/portfolioConfig.ts</code> to update your LinkedIn URL, GitHub URL, WhatsApp number, email address, project links (<code className="text-[#c0c1ff] font-mono">liveUrl</code> / <code className="text-[#c0c1ff] font-mono">githubUrl</code>), or bio copy in one single place.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-display font-semibold text-[#F8FAFC]">
              <Terminal className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />
              <span>2. Export Codebase from Google AI Studio</span>
            </div>
            <p className="text-xs sm:text-sm">
              Click the <strong>Download / Export ZIP</strong> or <strong>Sync to GitHub</strong> button in the top bar of Google AI Studio. If downloading a ZIP, extract it on your computer and push it to a new GitHub repository:
            </p>
            <pre className="p-3 rounded-lg bg-[#0E1017] border border-white/[0.06] text-xs font-mono text-[#e3e1e9] overflow-x-auto">
{`git init
git add .
git commit -m "Initial commit: HANAN.AI portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/hanan-ai-portfolio.git
git push -u origin main`}
            </pre>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.08] space-y-2">
            <div className="flex items-center gap-2 font-display font-semibold text-[#F8FAFC]">
              <CheckCircle2 className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />
              <span>3. One-Click Import &amp; Deploy on Vercel</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm list-disc list-inside">
              <li>
                Log in to <strong>vercel.com</strong> and click <strong>Add New... → Project</strong>.
              </li>
              <li>
                Import your GitHub repository (<code className="text-[#c0c1ff] font-mono">hanan-ai-portfolio</code>).
              </li>
              <li>
                Vercel automatically detects <strong>Vite</strong> (<code className="text-[#e3e1e9] font-mono">Build Command: npm run build</code>, <code className="text-[#e3e1e9] font-mono">Output Directory: dist</code>) and configures the included <code className="text-[#06B6D4] font-mono">/api/contact.ts</code> Serverless Function.
              </li>
              <li>
                <em>Optional n8n Webhook Integration:</em> In Vercel Project Settings → Environment Variables, add <code className="text-[#c0c1ff] font-mono">CONTACT_WEBHOOK_URL</code> pointing to your n8n Webhook URL to automatically forward every contact form submission straight into your n8n workflow!
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary-vanguard px-5 py-2.5 rounded-lg text-xs font-medium cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
