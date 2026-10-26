import React, { useState, useEffect } from 'react';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageSquare,
  ArrowUpRight,
  RotateCcw,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioConfig';

interface ContactSectionProps {
  preselectedProjectType: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  projectType?: string;
  message?: string;
}

interface SubmissionReceipt {
  receiptId: string;
  submittedAt: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedProjectType }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('AI Agents');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  useEffect(() => {
    if (preselectedProjectType) {
      setProjectType(preselectedProjectType);
    }
  }, [preselectedProjectType]);

  const projectTypeOptions = [
    'AI Agents',
    'n8n Workflow Automation',
    'AI Chatbots',
    'API Integration',
    'Email Automation',
    'Lead Generation Automation',
    'Business Process Automation',
    'Similar to: AI Customer Support Agent',
    'Similar to: Cold Email Reply Classification',
    'Similar to: n8n Email Automation',
    'Similar to: FineEasy Web App',
    'Custom AI Automation Consultation',
  ];

  const validateClient = (): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim() || name.trim().length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!projectType.trim()) {
      errors.projectType = 'Please select a project type.';
    }
    if (!message.trim() || message.trim().length < 15) {
      errors.message = 'Please provide at least 15 characters describing your workflow or project.';
    }
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    const errors = validateClient();
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          projectType: projectType.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        }
        setServerError(data.error || 'Submission validation failed. Please review your entries.');
        setIsSubmitting(false);
        return;
      }

      setReceipt({
        receiptId: data.receiptId,
        submittedAt: data.submittedAt,
        name: name.trim(),
        email: email.trim(),
        projectType: projectType.trim(),
        message: message.trim(),
      });
      setName('');
      setEmail('');
      setMessage('');
      setFieldErrors({});
    } catch {
      setServerError(
        'Could not reach the backend API server. You can retry or use the direct Email / WhatsApp links on this section.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buildMailtoHref = (r: SubmissionReceipt) => {
    const subject = encodeURIComponent(`[HANAN.AI Inquiry ${r.receiptId}] ${r.projectType}`);
    const body = encodeURIComponent(
      `Hi Abdull Hanan,\n\nName: ${r.name}\nEmail: ${r.email}\nProject Type: ${r.projectType}\nReceipt ID: ${r.receiptId}\n\nProject Details:\n${r.message}`
    );
    return `mailto:${PORTFOLIO_CONFIG.socials.emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left 5 Columns: Contact Info & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#c0c1ff] mb-3">
                <span>06. Contact</span>
                <span aria-hidden="true">·</span>
                <span>Start an Automation Project</span>
              </div>
              <h2
                className="font-display text-3xl sm:text-4xl font-semibold tracking-[-0.02em] text-[#F8FAFC] leading-tight mb-4"
                style={{ textWrap: 'balance' }}
              >
                Let&apos;s Automate Your Most Time-Consuming Workflows
              </h2>
              <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
                Whether you need a custom LangGraph AI agent, an end-to-end n8n workflow pipeline, or seamless API integrations across your stack, send your project details below.
              </p>
            </div>

            {/* Direct Channels Card */}
            <div className="glass-panel rounded-2xl p-6 space-y-5">
              <h3 className="font-display text-base font-semibold text-[#F8FAFC]">
                Direct Communication Channels
              </h3>

              <div className="space-y-3.5 text-sm">
                <a
                  href={PORTFOLIO_CONFIG.socials.email}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#090A0F] border border-white/[0.07] hover:border-[#6366F1]/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-[#c0c1ff] shrink-0" aria-hidden="true" />
                    <div className="truncate">
                      <div className="text-xs text-[#94A3B8]">Email Address</div>
                      <div className="text-sm font-medium text-[#F8FAFC] truncate">
                        {PORTFOLIO_CONFIG.socials.emailAddress}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#94A3B8] group-hover:text-white shrink-0"
                    aria-hidden="true"
                  />
                </a>

                <a
                  href={PORTFOLIO_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[#090A0F] border border-white/[0.07] hover:border-[#06B6D4]/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <MessageSquare className="w-4 h-4 text-[#06B6D4] shrink-0" aria-hidden="true" />
                    <div className="truncate">
                      <div className="text-xs text-[#94A3B8]">WhatsApp Direct</div>
                      <div className="text-sm font-medium text-[#F8FAFC]">
                        Message on WhatsApp
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#94A3B8] group-hover:text-white shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>

              <div className="pt-3 border-t border-white/[0.08] text-xs text-[#94A3B8] leading-relaxed">
                All social and contact URLs are centralized in{' '}
                <code className="text-[#c0c1ff] font-mono">src/data/portfolioConfig.ts</code> for easy customization.
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Contact Form Connected to /api/contact */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-2xl p-6 sm:p-8">
              {receipt ? (
                <div className="space-y-6 py-4" role="status" aria-live="polite">
                  <div className="flex items-start gap-3.5">
                    <CheckCircle2
                      className="w-6 h-6 text-[#06B6D4] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <div>
                      <div className="text-xs font-mono text-[#06B6D4] mb-1">
                        Backend Server Receipt: {receipt.receiptId}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#F8FAFC]">
                        Inquiry Recorded Successfully
                      </h3>
                      <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">
                        Your project inquiry has been validated and stored by the backend API server ({new Date(receipt.submittedAt).toLocaleString()}).
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.08] space-y-2 text-xs font-mono text-[#e3e1e9]">
                    <div>
                      <span className="text-[#94A3B8]">Name:</span> {receipt.name}
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Email:</span> {receipt.email}
                    </div>
                    <div>
                      <span className="text-[#94A3B8]">Project Type:</span> {receipt.projectType}
                    </div>
                    <div className="pt-1 border-t border-white/[0.06] text-[#94A3B8]">
                      Message: <span className="text-[#F8FAFC]">{receipt.message}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <a
                        href={buildMailtoHref(receipt)}
                        className="btn-primary-vanguard px-4 py-2.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        <span>Also Open in Email Client</span>
                      </a>
                      <a
                        href={PORTFOLIO_CONFIG.socials.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-vanguard px-4 py-2.5 rounded-lg text-xs font-medium inline-flex items-center gap-1.5"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#06B6D4]" aria-hidden="true" />
                        <span>Follow Up on WhatsApp</span>
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={() => setReceipt(null)}
                      className="text-xs font-medium text-[#94A3B8] hover:text-white inline-flex items-center gap-1 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Send Another Inquiry</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                    <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">
                      Project Inquiry Specification
                    </h3>
                    <span className="text-xs font-mono text-[#94A3B8]">POST /api/contact</span>
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 flex items-start gap-3 text-xs sm:text-sm text-[#ffdad6]"
                    >
                      <AlertCircle className="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{serverError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name Field */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#e3e1e9] mb-2"
                      >
                        Full Name <span className="text-[#c0c1ff]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({ ...prev, name: undefined }));
                          }
                        }}
                        placeholder="e.g., Sarah Jenkins"
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? 'error-name' : undefined}
                        className="input-vanguard w-full px-4 py-3 rounded-lg text-sm placeholder:text-[#94A3B8]/50"
                      />
                      {fieldErrors.name && (
                        <p id="error-name" className="mt-1.5 text-xs text-[#ffb4ab]">
                          {fieldErrors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#e3e1e9] mb-2"
                      >
                        Email Address <span className="text-[#c0c1ff]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="you@company.com"
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'error-email' : undefined}
                        className="input-vanguard w-full px-4 py-3 rounded-lg text-sm placeholder:text-[#94A3B8]/50"
                      />
                      {fieldErrors.email && (
                        <p id="error-email" className="mt-1.5 text-xs text-[#ffb4ab]">
                          {fieldErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Type Field */}
                  <div>
                    <label
                      htmlFor="contact-project-type"
                      className="block text-xs font-medium text-[#e3e1e9] mb-2"
                    >
                      Project Type / Service <span className="text-[#c0c1ff]">*</span>
                    </label>
                    <select
                      id="contact-project-type"
                      name="projectType"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="input-vanguard w-full px-4 py-3 rounded-lg text-sm"
                    >
                      {projectTypeOptions.map((option) => (
                        <option key={option} value={option} className="bg-[#0E1017] text-[#F8FAFC]">
                          {option}
                        </option>
                      ))}
                    </select>
                    {fieldErrors.projectType && (
                      <p className="mt-1.5 text-xs text-[#ffb4ab]">{fieldErrors.projectType}</p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-medium text-[#e3e1e9]"
                      >
                        Project Scope &amp; Workflow Details <span className="text-[#c0c1ff]">*</span>
                      </label>
                      <span className="text-[11px] font-mono text-[#94A3B8]">
                        {message.trim().length} chars (min 15)
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: undefined }));
                        }
                      }}
                      placeholder="Describe the manual process you want to automate, the tools in your current stack (e.g., n8n, HubSpot, Gmail, Slack), and your target outcome..."
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'error-message' : undefined}
                      className="input-vanguard w-full px-4 py-3 rounded-lg text-sm placeholder:text-[#94A3B8]/50 resize-y"
                    />
                    {fieldErrors.message && (
                      <p id="error-message" className="mt-1.5 text-xs text-[#ffb4ab]">
                        {fieldErrors.message}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-[#94A3B8]">
                      Validated and recorded directly via the backend endpoint.
                    </p>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary-vanguard px-6 py-3.5 rounded-lg text-sm font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-50"
                    >
                      <span>{isSubmitting ? 'Validating & Saving...' : 'Send Project Inquiry'}</span>
                      <Send className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
