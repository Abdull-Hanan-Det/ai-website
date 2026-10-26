import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contact-submissions.json');

interface ContactPayload {
  name: string;
  email: string;
  projectType: string;
  message: string;
  company?: string;
}

interface StoredSubmission extends ContactPayload {
  id: string;
  submittedAt: string;
}

function ensureStorage(): StoredSubmission[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2), 'utf-8');
      return [];
    }
    const raw = fs.readFileSync(SUBMISSIONS_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveSubmission(entry: StoredSubmission): void {
  const existing = ensureStorage();
  existing.unshift(entry);
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(existing.slice(0, 200), null, 2), 'utf-8');
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    const submissions = ensureStorage();
    res.json({
      status: 'ok',
      backend: 'express-storage-active',
      storedCount: submissions.length,
    });
  });

  app.get('/api/contact', (_req: Request, res: Response) => {
    const submissions = ensureStorage();
    res.json({
      submissions: submissions.slice(0, 10),
    });
  });

  app.post('/api/contact', (req: Request, res: Response) => {
    const { name, email, projectType, message, company } = (req.body || {}) as Partial<ContactPayload>;

    const errors: Record<string, string> = {};

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      errors.name = 'Please enter your full name (at least 2 characters).';
    }
    if (!email || typeof email !== 'string' || !isValidEmail(email)) {
      errors.email = 'Please provide a valid email address.';
    }
    if (!projectType || typeof projectType !== 'string' || projectType.trim().length === 0) {
      errors.projectType = 'Please select a project category.';
    }
    if (!message || typeof message !== 'string' || message.trim().length < 15) {
      errors.message = 'Please describe your automation goals or project scope (at least 15 characters).';
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({
        ok: false,
        error: 'Validation failed. Please check the highlighted fields.',
        fieldErrors: errors,
      });
      return;
    }

    const submission: StoredSubmission = {
      id: `INQ-${Date.now().toString(36).toUpperCase()}`,
      name: name!.trim(),
      email: email!.trim(),
      projectType: projectType!.trim(),
      company: company ? String(company).trim() : undefined,
      message: message!.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      saveSubmission(submission);
      res.status(201).json({
        ok: true,
        receiptId: submission.id,
        submittedAt: submission.submittedAt,
        message: 'Your inquiry has been validated and recorded on the server.',
        submission,
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        error: err instanceof Error ? err.message : 'Unable to persist inquiry on the server.',
      });
    }
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
