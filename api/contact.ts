// Vercel Serverless Function handler for /api/contact
// When deployed to Vercel, this endpoint validates contact submissions and returns a receipt.
// Optional: Configure CONTACT_WEBHOOK_URL in Vercel Environment Variables to forward directly to an n8n webhook!

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      backend: 'vercel-serverless-active',
      submissions: [],
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { name, email, projectType, message, company } = req.body || {};
  const errors: Record<string, string> = {};

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    errors.name = 'Please enter your full name (at least 2 characters).';
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }
  if (!projectType || typeof projectType !== 'string' || projectType.trim().length === 0) {
    errors.projectType = 'Please select a project category.';
  }
  if (!message || typeof message !== 'string' || message.trim().length < 15) {
    errors.message = 'Please describe your automation goals or project scope (at least 15 characters).';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      ok: false,
      error: 'Validation failed. Please check the highlighted fields.',
      fieldErrors: errors,
    });
  }

  const submission = {
    id: `INQ-${Date.now().toString(36).toUpperCase()}`,
    name: name.trim(),
    email: email.trim(),
    projectType: projectType.trim(),
    company: company ? String(company).trim() : undefined,
    message: message.trim(),
    submittedAt: new Date().toISOString(),
  };

  // Optional n8n webhook forwarding if configured via environment variable on Vercel
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submission),
      });
    } catch (err) {
      console.error('Webhook forwarding error:', err);
    }
  }

  return res.status(201).json({
    ok: true,
    receiptId: submission.id,
    submittedAt: submission.submittedAt,
    message: 'Your inquiry has been validated and processed by the serverless endpoint.',
    submission,
  });
}
