import React, { useState, useEffect } from 'react';
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Mail,
  MessageSquare,
  ArrowUpRight,
  RotateCcw,
  LogIn,
  LogOut,
  Database,
  Trash2,
  ShieldCheck,
} from 'lucide-react';
import { PORTFOLIO_CONFIG } from '../data/portfolioConfig';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { useFirebase } from '../context/FirebaseContext';

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
  savedToFirestore: boolean;
}

interface FirestoreInquiryItem {
  id: string;
  authorUid: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  status: 'received' | 'in_review' | 'replied' | 'closed';
  createdAt?: Timestamp | null;
  updatedAt?: Timestamp | null;
}

// Verbatim constants & regex patterns from firebase-blueprint.json
const ID_REGEX = /^[a-zA-Z0-9_\-]+$/;
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const NAME_MIN = 2;
const NAME_MAX = 100;
const EMAIL_MIN = 5;
const EMAIL_MAX = 150;
const PROJECT_TYPE_MIN = 2;
const PROJECT_TYPE_MAX = 120;
const MESSAGE_MIN = 15;
const MESSAGE_MAX = 2000;

export const ContactSection: React.FC<ContactSectionProps> = ({ preselectedProjectType }) => {
  const { user, isAuthReady, isAdmin, authError, loginWithGoogle, logout } = useFirebase();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('AI Agents');
  const [message, setMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<SubmissionReceipt | null>(null);

  // Real-time Firestore inquiries state for authenticated users / admin
  const [cloudInquiries, setCloudInquiries] = useState<FirestoreInquiryItem[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  useEffect(() => {
    if (preselectedProjectType) {
      setProjectType(preselectedProjectType.slice(0, PROJECT_TYPE_MAX));
    }
  }, [preselectedProjectType]);

  // Pre-fill name and email when user signs in with Google
  useEffect(() => {
    if (user) {
      if (!name && user.displayName) {
        setName(user.displayName.slice(0, NAME_MAX));
      }
      if (!email && user.email) {
        setEmail(user.email.slice(0, EMAIL_MAX));
      }
    }
  }, [user]);

  // Real-time Firestore listener (only attached when isAuthReady && user != null)
  useEffect(() => {
    if (!isAuthReady || !user || !user.emailVerified) {
      setCloudInquiries([]);
      return;
    }

    setLoadingInquiries(true);
    const path = 'inquiries';
    const inquiriesRef = collection(db, path);
    const q = isAdmin
      ? query(inquiriesRef)
      : query(inquiriesRef, where('authorUid', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: FirestoreInquiryItem[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            authorUid: String(data.authorUid || ''),
            name: String(data.name || ''),
            email: String(data.email || ''),
            projectType: String(data.projectType || ''),
            message: String(data.message || ''),
            status: (data.status as FirestoreInquiryItem['status']) || 'received',
            createdAt: data.createdAt || null,
            updatedAt: data.updatedAt || null,
          };
        });

        // Sort newest first in client memory
        items.sort((a, b) => {
          const timeA = a.createdAt?.toMillis?.() ?? 0;
          const timeB = b.createdAt?.toMillis?.() ?? 0;
          return timeB - timeA;
        });

        setCloudInquiries(items);
        setLoadingInquiries(false);
      },
      (error) => {
        setLoadingInquiries(false);
        handleFirestoreError(error, OperationType.LIST, path);
      }
    );

    return () => unsubscribe();
  }, [isAuthReady, user, isAdmin]);

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
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanType = projectType.trim();
    const cleanMsg = message.trim();

    if (cleanName.length < NAME_MIN || cleanName.length > NAME_MAX) {
      errors.name = `Please enter your name (${NAME_MIN}–${NAME_MAX} characters).`;
    }
    if (
      cleanEmail.length < EMAIL_MIN ||
      cleanEmail.length > EMAIL_MAX ||
      !EMAIL_REGEX.test(cleanEmail)
    ) {
      errors.email = 'Please enter a valid email address.';
    }
    if (cleanType.length < PROJECT_TYPE_MIN || cleanType.length > PROJECT_TYPE_MAX) {
      errors.projectType = 'Please select a valid project category.';
    }
    if (cleanMsg.length < MESSAGE_MIN || cleanMsg.length > MESSAGE_MAX) {
      errors.message = `Please describe your project (${MESSAGE_MIN}–${MESSAGE_MAX} characters).`;
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
    const cleanName = name.trim().slice(0, NAME_MAX);
    const cleanEmail = email.trim().slice(0, EMAIL_MAX);
    const cleanType = projectType.trim().slice(0, PROJECT_TYPE_MAX);
    const cleanMessage = message.trim().slice(0, MESSAGE_MAX);

    const generatedId = `INQ_${Date.now().toString(36).toUpperCase()}_${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    let savedToFirestore = false;

    try {
      // 1. If authenticated with a verified Google account, persist directly to Cloud Firestore
      if (user && user.emailVerified && ID_REGEX.test(generatedId) && ID_REGEX.test(user.uid)) {
        const docPath = `inquiries/${generatedId}`;
        try {
          await setDoc(doc(db, 'inquiries', generatedId), {
            authorUid: user.uid,
            name: cleanName,
            email: cleanEmail,
            projectType: cleanType,
            message: cleanMessage,
            status: 'received',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
          savedToFirestore = true;
        } catch (firestoreErr) {
          handleFirestoreError(firestoreErr, OperationType.CREATE, docPath);
        }
      }

      // 2. Also send to backend Express/Serverless endpoint /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cleanName,
          email: cleanEmail,
          projectType: cleanType,
          message: cleanMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        if (!savedToFirestore) {
          if (data.fieldErrors) {
            setFieldErrors(data.fieldErrors);
          }
          setServerError(data.error || 'Submission validation failed. Please review your entries.');
          setIsSubmitting(false);
          return;
        }
      }

      setReceipt({
        receiptId: savedToFirestore ? generatedId : data.receiptId || generatedId,
        submittedAt: data.submittedAt || new Date().toISOString(),
        name: cleanName,
        email: cleanEmail,
        projectType: cleanType,
        message: cleanMessage,
        savedToFirestore,
      });

      setMessage('');
      setFieldErrors({});
    } catch (err) {
      if (savedToFirestore) {
        setReceipt({
          receiptId: generatedId,
          submittedAt: new Date().toISOString(),
          name: cleanName,
          email: cleanEmail,
          projectType: cleanType,
          message: cleanMessage,
          savedToFirestore: true,
        });
        setMessage('');
      } else {
        setServerError(
          err instanceof Error
            ? err.message
            : 'Could not complete submission. Please check your connection or sign in with Google to save directly to Firebase Firestore.'
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdminStatusChange = async (
    inquiryId: string,
    nextStatus: FirestoreInquiryItem['status']
  ) => {
    const docPath = `inquiries/${inquiryId}`;
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        status: nextStatus,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, docPath);
    }
  };

  const handleDeleteInquiry = async (inquiryId: string) => {
    const docPath = `inquiries/${inquiryId}`;
    try {
      await deleteDoc(doc(db, 'inquiries', inquiryId));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, docPath);
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
          {/* Left 5 Columns: Contact Info, Direct Channels & Firebase Client Portal Auth */}
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

            {/* Firebase Cloud Portal Card */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#06B6D4]" aria-hidden="true" />
                  <h3 className="font-display text-sm font-semibold text-[#F8FAFC]">
                    Firebase Inquiry Tracking Portal
                  </h3>
                </div>
                {isAdmin && (
                  <span className="text-xs font-mono text-[#06B6D4] inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Admin Mode</span>
                  </span>
                )}
              </div>

              {!user ? (
                <div className="space-y-3">
                  <p className="text-xs text-[#94A3B8] leading-relaxed">
                    Sign in with Google to sync your project inquiries directly to Cloud Firestore and track live review statuses in real time.
                  </p>
                  <button
                    type="button"
                    onClick={loginWithGoogle}
                    className="btn-secondary-vanguard w-full px-4 py-2.5 rounded-lg text-xs font-medium inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <LogIn className="w-4 h-4 text-[#c0c1ff]" aria-hidden="true" />
                    <span>Sign In with Google for Cloud Tracking</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#090A0F] border border-white/[0.07]">
                    <div className="min-w-0">
                      <div className="text-xs font-medium text-[#F8FAFC] truncate">
                        {user.displayName || 'Authenticated User'}
                      </div>
                      <div className="text-[11px] font-mono text-[#94A3B8] truncate">
                        {user.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={logout}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#94A3B8] hover:text-white hover:bg-white/[0.06] inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}

              {authError && (
                <p className="text-xs text-[#ffb4ab] leading-snug">{authError}</p>
              )}
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
                      <div className="text-xs text-[#94A3B8]">Message on WhatsApp</div>
                      <div className="text-sm font-medium text-[#F8FAFC]">
                        {PORTFOLIO_CONFIG.socials.whatsappNumber}
                      </div>
                    </div>
                  </div>
                  <ArrowUpRight
                    className="w-4 h-4 text-[#94A3B8] group-hover:text-white shrink-0"
                    aria-hidden="true"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Validated Contact Form + Live Firestore Inquiries */}
          <div className="lg:col-span-7 space-y-8">
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
                        Receipt ID: {receipt.receiptId} ·{' '}
                        {receipt.savedToFirestore ? 'Synced to Cloud Firestore' : 'Saved on Server'}
                      </div>
                      <h3 className="font-display text-2xl font-bold text-[#F8FAFC]">
                        Inquiry Recorded Successfully
                      </h3>
                      <p className="text-sm text-[#94A3B8] mt-1 leading-relaxed">
                        Your project inquiry has been validated and stored ({new Date(receipt.submittedAt).toLocaleString()}).
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
                    <span className="text-xs font-mono text-[#94A3B8]">
                      {user ? 'Firestore + API Active' : 'Validated API Endpoint'}
                    </span>
                  </div>

                  {serverError && (
                    <div
                      role="alert"
                      className="p-4 rounded-xl bg-[#93000a]/30 border border-[#ffb4ab]/40 flex items-start gap-3 text-xs sm:text-sm text-[#ffdad6]"
                    >
                      <AlertCircle
                        className="w-4 h-4 text-[#ffb4ab] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
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
                        maxLength={NAME_MAX}
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
                        maxLength={EMAIL_MAX}
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
                        {message.trim().length}/{MESSAGE_MAX} chars (min {MESSAGE_MIN})
                      </span>
                    </div>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      maxLength={MESSAGE_MAX}
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
                      {user
                        ? 'Your inquiry will be saved to Cloud Firestore & validated by the server.'
                        : 'Validated by the server. Sign in with Google on the left to enable Cloud Firestore tracking.'}
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

            {/* Real-Time Cloud Firestore Inquiries List (Shown when authenticated) */}
            {user && (
              <div className="glass-panel rounded-2xl p-6 sm:p-8 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.08] pb-4">
                  <div>
                    <h3 className="font-display text-lg font-semibold text-[#F8FAFC]">
                      {isAdmin
                        ? 'Admin Inquiry Console (All Cloud Firestore Records)'
                        : 'Your Cloud-Synced Project Inquiries'}
                    </h3>
                    <p className="text-xs text-[#94A3B8] mt-0.5">
                      Real-time Firestore records protected by owner &amp; administrator security rules.
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#06B6D4]">
                    {loadingInquiries ? 'Syncing...' : `${cloudInquiries.length} Record(s)`}
                  </span>
                </div>

                {cloudInquiries.length === 0 ? (
                  <p className="text-xs sm:text-sm text-[#94A3B8] py-4">
                    No Cloud Firestore inquiries recorded for this account yet. Submit the form above while signed in to create your first real-time record.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cloudInquiries.map((inq) => (
                      <div
                        key={inq.id}
                        className="p-4 rounded-xl bg-[#090A0F] border border-white/[0.08] space-y-2.5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                          <span className="text-[#c0c1ff]">
                            {inq.id} · {inq.projectType}
                          </span>
                          <span className="text-[#06B6D4]">Status: {inq.status}</span>
                        </div>

                        <p className="text-xs sm:text-sm text-[#e3e1e9] leading-relaxed">
                          {inq.message}
                        </p>

                        <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs text-[#94A3B8]">
                          <span>
                            From: {inq.name} ({inq.email})
                          </span>

                          <div className="flex items-center gap-2">
                            {isAdmin && (
                              <select
                                aria-label={`Update status for inquiry ${inq.id}`}
                                value={inq.status}
                                onChange={(e) =>
                                  handleAdminStatusChange(
                                    inq.id,
                                    e.target.value as FirestoreInquiryItem['status']
                                  )
                                }
                                className="input-vanguard px-2.5 py-1 rounded text-xs font-mono"
                              >
                                <option value="received">received</option>
                                <option value="in_review">in_review</option>
                                <option value="replied">replied</option>
                                <option value="closed">closed</option>
                              </select>
                            )}

                            {(isAdmin || inq.status !== 'closed') && (
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inq.id)}
                                aria-label={`Delete inquiry ${inq.id}`}
                                className="p-1.5 rounded text-[#94A3B8] hover:text-[#ffb4ab] hover:bg-white/[0.05] transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
