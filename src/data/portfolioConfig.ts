export interface SocialLinks {
  linkedin: string;
  github: string;
  email: string;
  whatsapp: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  title: string;
  category: string;
  summary: string;
  businessOutcome: string;
  deliverables: string[];
  workflowNodes: string[];
  tools: string[];
}

export interface ProjectNode {
  step: string;
  label: string;
  detail: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI Agents' | 'n8n Workflows' | 'Web Applications';
  subtitle: string;
  problem: string;
  architectureSummary: string;
  keyCapabilities: string[];
  techStack: string[];
  workflowNodes: ProjectNode[];
  samplePayload: string;
  liveUrl: string;
  githubUrl: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Orchestration & Agents' | 'Core Engineering' | 'Data & Integrations';
  roleInStack: string;
  description: string;
  practicalUseCases: string[];
  codeOrConfigSample: string;
}

export interface ProcessStage {
  number: string;
  stage: 'Discover' | 'Design' | 'Build' | 'Test' | 'Optimize';
  headline: string;
  description: string;
  businessFocus: string;
  technicalArtifact: string;
  checkpoints: string[];
}

export interface PipelineSimulationPreset {
  id: string;
  name: string;
  triggerLabel: string;
  steps: {
    nodeName: string;
    nodeType: string;
    description: string;
    outputPreview: string;
  }[];
}

export const PORTFOLIO_CONFIG = {
  brand: {
    logoText: 'HANAN.AI',
    fullName: 'Abdull Hanan',
    role: 'AI Automation Engineer & AI Agent Developer',
    education: 'BBA Graduate — Business Administration & Systems Strategy',
    tagline: 'I Build AI Automations That Save Time & Scale Businesses.',
    subheadline:
      'Bridging business operations strategy with production-grade AI engineering. I design and deploy autonomous AI agents, n8n workflow pipelines, and custom API integrations that eliminate manual bottlenecks.',
    location: 'Available Worldwide · Remote & Contract',
  },

  /**
   * Single source of truth for social & contact links.
   * Update these URLs anytime before or after deploying to Vercel.
   */
  socials: {
    linkedin: 'https://www.linkedin.com/in/abdull-hanan',
    github: 'https://github.com/abdull-hanan',
    email: 'mailto:abdullhanan212@gmail.com',
    emailAddress: 'abdullhanan212@gmail.com',
    whatsappNumber: '0305-3859437',
    whatsapp: 'https://wa.me/923053859437?text=Hi%20Abdull%20Hanan%2C%20I%20would%20like%20to%20discuss%20an%20AI%20automation%20project.',
  },

  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ],

  heroHighlights: [
    {
      label: 'Core Focus',
      value: 'AI Agents & n8n Orchestration',
      detail: 'Stateful LangGraph agents & multi-node automation pipelines',
    },
    {
      label: 'Academic Foundation',
      value: 'BBA Business Strategy',
      detail: 'Process mapping, operational ROI & workflow bottleneck analysis',
    },
    {
      label: 'Integration Architecture',
      value: 'Webhooks, REST APIs & JSON',
      detail: 'Reliable schema validation, retries & event-driven synchronization',
    },
    {
      label: 'Delivery Standard',
      value: 'Production-Ready Systems',
      detail: 'Structured logging, human-in-the-loop fallbacks & documentation',
    },
  ],

  heroSimulations: [
    {
      id: 'support-triage',
      name: 'AI Customer Support Agent Pipeline',
      triggerLabel: 'Webhook: Incoming Support Ticket',
      steps: [
        {
          nodeName: 'Webhook Ingest & JSON Parser',
          nodeType: 'n8n Webhook Node',
          description: 'Normalizes incoming customer inquiry payload, customer tier, and conversation thread history.',
          outputPreview: '{ "ticketId": "TCK-8492", "channel": "email", "intent_ candidate": "billing_inquiry" }',
        },
        {
          nodeName: 'LangGraph Context & RAG Retrieval',
          nodeType: 'Python + LangChain',
          description: 'Queries knowledge base documentation and account ledger to assemble verified context.',
          outputPreview: '{ "matchedDocs": 3, "policyVerified": true, "requiresHumanEscalation": false }',
        },
        {
          nodeName: 'LLM Response Synthesis & Guardrail Check',
          nodeType: 'Structured LLM Output',
          description: 'Generates accurate, policy-compliant response or routes edge cases to support staff.',
          outputPreview: '{ "status": "resolved_auto", "confidence": "high", "crmUpdated": true }',
        },
      ],
    },
    {
      id: 'cold-email-classifier',
      name: 'Cold Email Reply Classification Flow',
      triggerLabel: 'IMAP / Webhook: Campaign Reply Received',
      steps: [
        {
          nodeName: 'Email Thread Sanitizer',
          nodeType: 'n8n Code Node',
          description: 'Strips quoted thread signatures and extracts clean prospect reply body.',
          outputPreview: '{ "sender": "vp_ops@prospect.io", "cleanText": "Can we review pricing next Tuesday?" }',
        },
        {
          nodeName: 'Intent & Sentiment Classifier',
          nodeType: 'LLM JSON Schema',
          description: 'Classifies reply into Interested, Objection, Out-of-Office, Referral, or Unsubscribe.',
          outputPreview: '{ "category": "INTERESTED_MEETING", "urgency": "high", "suggestedAction": "send_calendar" }',
        },
        {
          nodeName: 'CRM Sync & Draft Generation',
          nodeType: 'REST API + Slack Alert',
          description: 'Updates CRM opportunity stage, drafts personalized reply, and notifies account owner.',
          outputPreview: '{ "crmStage": "Qualified Lead", "draftCreated": true, "slackNotified": true }',
        },
      ],
    },
    {
      id: 'lead-enrichment',
      name: 'Lead Generation & Enrichment Engine',
      triggerLabel: 'Schedule / Form Webhook Trigger',
      steps: [
        {
          nodeName: 'Multi-Source Lead Ingestion',
          nodeType: 'Webhook + API Fetch',
          description: 'Captures inbound or scraped company records and deduplicates against existing CRM entries.',
          outputPreview: '{ "domain": "acme-logistics.com", "isDuplicate": false, "enrichmentQueued": true }',
        },
        {
          nodeName: 'AI Qualification & ICP Fit Analysis',
          nodeType: 'Python + LLM Agent',
          description: 'Evaluates company profile against Ideal Customer Profile criteria and identifies automation pain points.',
          outputPreview: '{ "icpMatch": "Strong Fit", "recommendedService": "Workflow Automation" }',
        },
        {
          nodeName: 'Automated Outreach Sequence Sync',
          nodeType: 'CRM & Email API',
          description: 'Pushes structured JSON record to CRM and enrolls lead in tailored outreach workflow.',
          outputPreview: '{ "crmRecordId": "LD-4091", "sequenceEnrolled": true }',
        },
      ],
    },
  ] as PipelineSimulationPreset[],

  about: {
    headline: 'Where Business Administration Meets Autonomous AI Engineering',
    lead: 'As a Bachelor of Business Administration (BBA) graduate specializing in AI Automation and AI Agent Development, I approach every technical build through the lens of operational efficiency, process clarity, and measurable business value.',
    paragraphs: [
      'Many automation projects fail because they automate broken processes or deploy complex AI models without understanding the underlying business workflow. My background in Business Administration allows me to audit standard operating procedures (SOPs), identify true operational bottlenecks, and design systems that teams actually rely on.',
      'On the engineering side, I architect modular, maintainable systems using n8n, Python, LangChain, and LangGraph. Whether building a stateful AI customer support agent, classifying thousands of email replies via structured LLM outputs, or linking disconnected SaaS tools through resilient REST APIs and webhooks, my focus is always reliability and clarity.',
    ],
    perspectives: {
      business: {
        title: 'Business Operations Lens (BBA Foundation)',
        points: [
          'Maps end-to-end operational workflows before writing a single line of code or configuring nodes.',
          'Prioritizes automations that reduce manual data entry, speed up lead response times, and eliminate human error.',
          'Designs clear human-in-the-loop approval checkpoints so business owners stay in control of critical decisions.',
          'Focuses on maintainable documentation and clean handoffs for non-technical stakeholders.',
        ],
      },
      engineering: {
        title: 'AI Systems Architecture Lens (Technical Execution)',
        points: [
          'Builds stateful, multi-step AI agents using LangChain and LangGraph with deterministic tool calling.',
          'Architects event-driven n8n workflows with webhook triggers, JSON schema validation, and error retry branches.',
          'Integrates LLMs with strict structured output schemas so downstream APIs never break on malformed data.',
          'Connects CRMs, email providers, databases, and internal web apps via clean REST APIs and webhooks.',
        ],
      },
    },
  },

  services: [
    {
      id: 'ai-agents',
      index: '01',
      title: 'AI Agents',
      category: 'Autonomous Systems',
      summary:
        'Custom autonomous and semi-autonomous AI agents built with LangChain and LangGraph that reason over business data, invoke external tools, and execute multi-step tasks.',
      businessOutcome: 'Delegates complex research, triage, and operational routing to reliable agent workflows.',
      deliverables: [
        'Stateful LangGraph agent architecture with memory & tool definitions',
        'Structured JSON output validation & deterministic fallback handling',
        'Human-in-the-loop escalation triggers for high-stakes actions',
      ],
      workflowNodes: ['Event Trigger', 'LangGraph Router', 'Tool Execution', 'Verified State Update'],
      tools: ['LangGraph', 'LangChain', 'Python', 'LLMs'],
    },
    {
      id: 'n8n-workflow-automation',
      index: '02',
      title: 'n8n Workflow Automation',
      category: 'Pipeline Orchestration',
      summary:
        'Production-grade n8n workflows that connect your entire software stack through event-driven webhooks, conditional branching, custom code nodes, and automated error recovery.',
      businessOutcome: 'Replaces repetitive manual copy-pasting across apps with resilient 24/7 background pipelines.',
      deliverables: [
        'Modular n8n workflow blueprints with clean webhook & cron triggers',
        'JavaScript/Python code nodes for custom JSON data transformation',
        'Automated error-handling workflows with instant Slack/Email alerts',
      ],
      workflowNodes: ['Webhook Listener', 'Data Transform', 'Conditional Branch', 'Multi-App Sync'],
      tools: ['n8n', 'Webhooks', 'JSON', 'APIs'],
    },
    {
      id: 'ai-chatbots',
      index: '03',
      title: 'AI Chatbots',
      category: 'Conversational AI',
      summary:
        'Domain-specific conversational AI assistants grounded in your company documentation, policies, and product catalog to handle customer inquiries and lead qualification.',
      businessOutcome: 'Provides instant, accurate responses around the clock while capturing qualified prospect details.',
      deliverables: [
        'Knowledge-base retrieval (RAG) pipeline tuned to company SOPs',
        'Multi-turn conversation memory and lead capture webhook integration',
        'Seamless handoff to human support teams with full conversation summaries',
      ],
      workflowNodes: ['User Query', 'Knowledge Retrieval', 'Grounded LLM Reply', 'CRM Handoff'],
      tools: ['LangChain', 'LLMs', 'Python', 'APIs'],
    },
    {
      id: 'api-integration',
      index: '04',
      title: 'API Integration',
      category: 'Systems Connectivity',
      summary:
        'Seamless bi-directional integration between CRMs, payment processors, communication tools, databases, and custom internal software using REST APIs and webhooks.',
      businessOutcome: 'Eliminates data silos and keeps records synchronized across every platform in real time.',
      deliverables: [
        'Custom REST API connectors with authentication & rate-limit handling',
        'Real-time webhook listeners and payload transformation layers',
        'Idempotent data synchronization to prevent duplicate records',
      ],
      workflowNodes: ['Auth & Token Refresh', 'REST Request', 'Schema Mapping', 'Target Database Sync'],
      tools: ['APIs', 'Webhooks', 'JSON', 'Python'],
    },
    {
      id: 'email-automation',
      index: '05',
      title: 'Email Automation',
      category: 'Inbox Intelligence',
      summary:
        'Intelligent email triage, reply classification, data extraction from attachments, and context-aware draft generation powered by LLMs and n8n.',
      businessOutcome: 'Turns cluttered shared inboxes into structured, prioritized action pipelines.',
      deliverables: [
        'Automated reply intent classification (Interested, Support, Billing, OOO)',
        'Structured data extraction from incoming emails and PDF/CSV attachments',
        'Context-aware draft creation and automated CRM activity logging',
      ],
      workflowNodes: ['Inbox Trigger', 'LLM Intent Classifier', 'Attachment Parser', 'Draft & Route'],
      tools: ['n8n', 'LLMs', 'JSON', 'Workflow Automation'],
    },
    {
      id: 'lead-generation-automation',
      index: '06',
      title: 'Lead Generation Automation',
      category: 'Growth Systems',
      summary:
        'Automated inbound and outbound lead pipelines that capture prospects, enrich company profiles, evaluate Ideal Customer Profile (ICP) fit with AI, and sync with your CRM.',
      businessOutcome: 'Ensures sales teams spend their time talking to qualified prospects rather than researching spreadsheets.',
      deliverables: [
        'Automated lead capture and multi-source company profile enrichment',
        'AI-driven qualification scoring and personalized icebreaker generation',
        'Instant CRM record creation and sales rep notification workflows',
      ],
      workflowNodes: ['Lead Capture', 'Data Enrichment API', 'AI ICP Evaluation', 'CRM Pipeline Entry'],
      tools: ['n8n', 'APIs', 'LLMs', 'Workflow Automation'],
    },
    {
      id: 'business-process-automation',
      index: '07',
      title: 'Business Process Automation',
      category: 'Operations Engineering',
      summary:
        'End-to-end digital transformation of core business operations—from client onboarding and document generation to internal reporting and cross-department task routing.',
      businessOutcome: 'Creates predictable, auditable operational systems that scale without adding administrative overhead.',
      deliverables: [
        'SOP audit and operational bottleneck mapping (BBA methodology)',
        'Automated onboarding, invoicing, and document generation pipelines',
        'Centralized operational notifications and exception tracking',
      ],
      workflowNodes: ['SOP Trigger', 'Document & Task Engine', 'Approval Checkpoint', 'Audit Log'],
      tools: ['Workflow Automation', 'n8n', 'Python', 'AI Agents'],
    },
  ] as ServiceItem[],

  projects: [
    {
      id: 'ai-customer-support-agent',
      title: 'AI Customer Support Agent',
      category: 'AI Agents',
      subtitle: 'Autonomous Ticket Resolution & Context-Aware Escalation System',
      problem:
        'Support teams often spend hours answering repetitive policy, order status, and troubleshooting questions while urgent high-value tickets wait in the queue.',
      architectureSummary:
        'Engineered a stateful AI Customer Support Agent using Python, LangChain, and LangGraph. Incoming tickets arrive via webhook, pass through an intent and urgency classifier, retrieve verified answers from company documentation, and either resolve the inquiry automatically or escalate complex issues to human agents with a structured briefing.',
      keyCapabilities: [
        'Multi-step stateful reasoning with LangGraph to verify customer context before responding',
        'Strict guardrails preventing hallucinated policies or unauthorized account commitments',
        'Automated urgency triage and structured summary generation for human support handoffs',
        'Full webhook integration with helpdesk and CRM platforms via clean JSON payloads',
      ],
      techStack: ['Python', 'LangChain', 'LangGraph', 'LLMs', 'Webhooks', 'JSON', 'APIs'],
      workflowNodes: [
        {
          step: '01',
          label: 'Webhook Ticket Ingest',
          detail: 'Captures customer message, metadata, and prior conversation history.',
        },
        {
          step: '02',
          label: 'LangGraph Intent & Policy Node',
          detail: 'Classifies issue type and retrieves relevant knowledge-base articles.',
        },
        {
          step: '03',
          label: 'Resolution or Escalation Router',
          detail: 'Sends verified response or creates a prioritized agent briefing in CRM.',
        },
      ],
      samplePayload: `{
  "agent": "support_langgraph_v1",
  "ticket_id": "SUP-2049",
  "classification": {
    "category": "subscription_billing",
    "urgency": "medium",
    "auto_resolvable": true
  },
  "action_taken": "sent_verified_policy_response",
  "human_escalation": false
}`,
      liveUrl: '#contact',
      githubUrl: 'https://github.com/abdull-hanan',
    },
    {
      id: 'cold-email-reply-classification',
      title: 'Cold Email Reply Classification',
      category: 'AI Agents',
      subtitle: 'Automated Outbound Reply Triage, Intent Analysis & CRM Synchronization',
      problem:
        'High-volume outbound email campaigns generate hundreds of varied replies—ranging from positive meeting requests and pricing objections to out-of-office auto-replies and unsubscribe requests—creating manual inbox bottlenecks.',
      architectureSummary:
        'Built an automated classification pipeline that listens for incoming campaign replies via webhooks, cleans thread noise, uses an LLM with enforced JSON schemas to classify prospect intent, updates CRM opportunity stages, and routes hot leads to sales reps in real time.',
      keyCapabilities: [
        'Classifies replies into actionable categories: Interested, Objection, Referral, Out-of-Office, and Unsubscribe',
        'Extracts key entities such as proposed meeting times, alternate contact emails, and specific objections',
        'Automatically pauses sequences for unsubscribes and routes positive replies to Slack with drafted follow-ups',
        'Structured JSON output ensures 100% compatibility with downstream CRM REST APIs',
      ],
      techStack: ['n8n', 'LLMs', 'JSON', 'Webhooks', 'APIs', 'Workflow Automation'],
      workflowNodes: [
        {
          step: '01',
          label: 'Reply Webhook & Thread Cleaner',
          detail: 'Extracts the latest prospect message and strips email signatures.',
        },
        {
          step: '02',
          label: 'LLM Structured Intent Classifier',
          detail: 'Outputs validated JSON with intent label, sentiment, and extracted dates.',
        },
        {
          step: '03',
          label: 'CRM Update & Rep Alert',
          detail: 'Updates lead status via REST API and posts actionable card to team channel.',
        },
      ],
      samplePayload: `{
  "pipeline": "cold_email_reply_classifier",
  "prospect_email": "ops.director@enterprise-client.com",
  "intent": "POSITIVE_MEETING_REQUEST",
  "extracted_entities": {
    "preferred_day": "Thursday afternoon",
    "topic": "workflow_audit"
  },
  "crm_action": "stage_moved_to_qualified"
}`,
      liveUrl: '#contact',
      githubUrl: 'https://github.com/abdull-hanan',
    },
    {
      id: 'n8n-email-automation',
      title: 'n8n Email Automation',
      category: 'n8n Workflows',
      subtitle: 'Event-Driven Inbox Orchestration, Data Extraction & Automated Routing',
      problem:
        'Businesses receive critical operational emails—invoices, vendor updates, client intake forms, and support requests—in shared inboxes that require manual reading, sorting, and data entry.',
      architectureSummary:
        'Designed a multi-branch n8n workflow automation system that monitors incoming emails, parses body text and attachments into structured JSON, routes tasks to the appropriate department, triggers automated confirmation emails, and logs every execution in a centralized tracking sheet/database.',
      keyCapabilities: [
        'Event-driven IMAP/Webhook trigger in n8n with deduplication and attachment handling',
        'AI-assisted extraction of structured fields (sender, reference IDs, line items, action required)',
        'Conditional routing rules for finance, operations, and customer success teams',
        'Built-in error recovery node that logs failed executions and alerts administrators',
      ],
      techStack: ['n8n', 'Workflow Automation', 'JSON', 'Webhooks', 'APIs', 'LLMs'],
      workflowNodes: [
        {
          step: '01',
          label: 'n8n Email Trigger & Filter',
          detail: 'Monitors inbox and filters out automated newsletters or spam.',
        },
        {
          step: '02',
          label: 'JSON Data Extractor & Formatter',
          detail: 'Transforms unstructured email content into clean key-value fields.',
        },
        {
          step: '03',
          label: 'Multi-Channel Router & Logger',
          detail: 'Dispatches tasks, sends templated replies, and records audit logs.',
        },
      ],
      samplePayload: `{
  "workflow": "n8n_inbox_orchestrator",
  "trigger": "imap_new_message",
  "parsed_data": {
    "document_type": "vendor_onboarding_form",
    "priority": "standard",
    "assigned_team": "operations"
  },
  "execution_status": "completed_logged"
}`,
      liveUrl: '#contact',
      githubUrl: 'https://github.com/abdull-hanan',
    },
    {
      id: 'fineeasy-web-app',
      title: 'FineEasy Web App',
      category: 'Web Applications',
      subtitle: 'Streamlined Financial & Business Workflow Management Application',
      problem:
        'Small businesses and independent operators struggle with fragmented spreadsheets when tracking operational transactions, categorizing workflows, and reviewing clear business summaries.',
      architectureSummary:
        'Developed FineEasy, a modern responsive web application built with a clean component architecture that simplifies financial record organization, automated categorization workflows, and clear visual reporting aligned with practical business administration principles.',
      keyCapabilities: [
        'Intuitive dashboard for organizing business records, categories, and workflow statuses',
        'Clean, accessible interface engineered for fast daily operational input and review',
        'Structured data models supporting seamless export and webhook/API extensibility',
        'Designed from the ground up around real-world BBA financial and operational clarity',
      ],
      techStack: ['Python', 'APIs', 'JSON', 'Workflow Automation'],
      workflowNodes: [
        {
          step: '01',
          label: 'Structured Transaction & Entry Input',
          detail: 'Validates user entries and normalizes financial/operational categories.',
        },
        {
          step: '02',
          label: 'Automated Categorization & Aggregation',
          detail: 'Computes real-time summaries and organizes records by business workflow.',
        },
        {
          step: '03',
          label: 'Actionable Reporting & Export',
          detail: 'Presents clear operational insights ready for business decision-making.',
        },
      ],
      samplePayload: `{
  "application": "FineEasy_Web_App",
  "module": "workflow_ledger_summary",
  "status": "synchronized",
  "capabilities": [
    "automated_categorization",
    "clean_financial_overview",
    "structured_json_export"
  ]
}`,
      liveUrl: '#contact',
      githubUrl: 'https://github.com/abdull-hanan',
    },
  ] as ProjectItem[],

  skills: [
    {
      id: 'n8n',
      name: 'n8n',
      category: 'Orchestration & Agents',
      roleInStack: 'Primary Visual & Code Workflow Orchestrator',
      description:
        'Designing complex multi-node automations, custom JavaScript/Python code nodes, webhook listeners, sub-workflows, and resilient error-handling pipelines.',
      practicalUseCases: [
        'Multi-step CRM and inbox synchronization',
        'Webhook-triggered AI classification pipelines',
        'Scheduled data aggregation and automated reporting',
      ],
      codeOrConfigSample: `// n8n Code Node: Normalize Incoming Webhook Payload
return $input.all().map(item => ({
  json: {
    leadId: item.json.id,
    normalizedEmail: (item.json.email || '').trim().toLowerCase(),
    routedAt: new Date().toISOString()
  }
}));`,
    },
    {
      id: 'python',
      name: 'Python',
      category: 'Core Engineering',
      roleInStack: 'Backend Logic, Agent Scripting & Data Processing',
      description:
        'Writing clean, modular Python code for custom AI agent backends, API wrappers, data transformation scripts, and structured LLM orchestration.',
      practicalUseCases: [
        'Building LangChain & LangGraph agent services',
        'Custom REST API clients and data validation with Pydantic',
        'Automating data parsing, cleaning, and report generation',
      ],
      codeOrConfigSample: `from pydantic import BaseModel, Field

class ReplyClassification(BaseModel):
    intent: str = Field(description="INTERESTED, OBJECTION, OOO, or UNSUBSCRIBE")
    requires_human: bool
    summary: str`,
    },
    {
      id: 'langchain',
      name: 'LangChain',
      category: 'Orchestration & Agents',
      roleInStack: 'LLM Chaining, Prompt Templates & RAG Pipelines',
      description:
        'Composing modular LLM chains, document loaders, vector retrieval pipelines, and structured output parsers connected to business data sources.',
      practicalUseCases: [
        'Context-aware customer support retrieval (RAG)',
        'Structured extraction from unstructured emails and documents',
        'Tool-calling pipelines that query live business APIs',
      ],
      codeOrConfigSample: `chain = (
    prompt_template
    | llm.with_structured_output(ReplyClassification)
)
result = chain.invoke({"email_body": clean_reply_text})`,
    },
    {
      id: 'langgraph',
      name: 'LangGraph',
      category: 'Orchestration & Agents',
      roleInStack: 'Stateful Multi-Step & Multi-Agent Architecture',
      description:
        'Engineering cyclic, stateful agent graphs with explicit state schemas, conditional routing edges, persistence, and human-in-the-loop checkpoints.',
      practicalUseCases: [
        'Autonomous customer support agents with escalation rules',
        'Multi-step research and lead qualification workflows',
        'Deterministic retry loops when tool calls or validations fail',
      ],
      codeOrConfigSample: `workflow = StateGraph(AgentState)
workflow.add_node("classify", classify_ticket)
workflow.add_node("retrieve_docs", retrieve_knowledge)
workflow.add_conditional_edges("classify", route_by_urgency)`,
    },
    {
      id: 'llms',
      name: 'LLMs',
      category: 'Orchestration & Agents',
      roleInStack: 'Reasoning, Classification & Synthesis Engine',
      description:
        'Leveraging modern Large Language Models with system prompt engineering, temperature control, token optimization, and strict schema enforcement.',
      practicalUseCases: [
        'Zero-shot and few-shot email intent classification',
        'Automated summarization of long customer threads',
        'Drafting personalized, policy-compliant business communications',
      ],
      codeOrConfigSample: `{
  "system_instruction": "You are a precise B2B operations classifier. Output strictly valid JSON matching the schema.",
  "temperature": 0.1,
  "response_mime_type": "application/json"
}`,
    },
    {
      id: 'apis',
      name: 'APIs',
      category: 'Data & Integrations',
      roleInStack: 'Cross-Platform System Connectivity (REST & GraphQL)',
      description:
        'Integrating third-party SaaS platforms (CRMs, Slack, Notion, Gmail, Airtable) and custom backends using authenticated HTTP requests, pagination, and rate limiting.',
      practicalUseCases: [
        'Bi-directional CRM contact and deal stage updates',
        'Automated enrichment calls to company data providers',
        'Connecting AI agents to live order and inventory endpoints',
      ],
      codeOrConfigSample: `POST /v1/crm/contacts/sync HTTP/1.1
Authorization: Bearer <TOKEN>
Content-Type: application/json

{ "email": "client@company.com", "stage": "AI_Qualified" }`,
    },
    {
      id: 'webhooks',
      name: 'Webhooks',
      category: 'Data & Integrations',
      roleInStack: 'Real-Time Event-Driven Triggers',
      description:
        'Architecting instant, event-driven listeners and outbound webhook dispatchers so automations run the millisecond a form is submitted, an email arrives, or a deal updates.',
      practicalUseCases: [
        'Instant lead capture from landing pages into n8n',
        'Real-time support ticket ingestion from helpdesk platforms',
        'Triggering downstream notifications upon AI agent completion',
      ],
      codeOrConfigSample: `{
  "event": "ticket.created",
  "webhook_id": "wh_98231a",
  "timestamp": "2026-10-26T14:00:00Z",
  "payload": { "ticketId": "SUP-2049", "priority": "high" }
}`,
    },
    {
      id: 'json',
      name: 'JSON',
      category: 'Data & Integrations',
      roleInStack: 'Universal Data Contract & Schema Validation',
      description:
        'Structuring, transforming, and validating deeply nested JSON payloads to guarantee clean communication between LLMs, n8n nodes, and REST APIs.',
      practicalUseCases: [
        'Enforcing structured JSON outputs from LLM responses',
        'Mapping complex API responses into flat CRM fields',
        'Designing clean webhook contracts across microservices',
      ],
      codeOrConfigSample: `{
  "schema_version": "1.0",
  "valid": true,
  "data": {
    "category": "Billing",
    "confidence_score": 0.96,
    "next_node": "send_invoice_copy"
  }
}`,
    },
    {
      id: 'ai-agents',
      name: 'AI Agents',
      category: 'Orchestration & Agents',
      roleInStack: 'Goal-Directed Autonomous Decision Systems',
      description:
        'Combining LLM reasoning with memory, planning, and external tool execution to build reliable agents that solve real operational problems.',
      practicalUseCases: [
        '24/7 tier-1 customer support resolution and triage',
        'Autonomous inbound lead research and briefing generation',
        'Internal SOP assistant for operations teams',
      ],
      codeOrConfigSample: `Agent Loop:
1. Observe incoming webhook state
2. Reason over SOP context & constraints
3. Execute verified API tool call
4. Emit structured audit log`,
    },
    {
      id: 'workflow-automation',
      name: 'Workflow Automation',
      category: 'Core Engineering',
      roleInStack: 'End-to-End Business Process Engineering',
      description:
        'Combining BBA operational analysis with technical orchestration to turn manual, error-prone business routines into reliable, self-documenting digital pipelines.',
      practicalUseCases: [
        'End-to-end client onboarding and task provisioning',
        'Automated inbox-to-CRM pipeline orchestration',
        'Cross-functional alerting and operational reporting',
      ],
      codeOrConfigSample: `Pipeline Blueprint:
[Trigger: Form / Email]
  → [Validate & Enrich JSON]
  → [AI Classification Node]
  → [Update CRM & Notify Team]`,
    },
  ] as SkillItem[],

  workProcess: [
    {
      number: '01',
      stage: 'Discover',
      headline: 'Audit Operations & Identify High-ROI Bottlenecks',
      description:
        'We start by mapping your current manual workflows, tools, and team handoffs. Drawing on my BBA background, I focus on finding where repetitive work costs you the most time or delays customer response.',
      businessFocus: 'Clarify operational pain points, target outcomes, and edge cases.',
      technicalArtifact: 'Current-State SOP Map & Automation Opportunity Brief',
      checkpoints: [
        'Audit existing SaaS stack, APIs, and data sources',
        'Define clear success criteria and human-in-the-loop boundaries',
        'Prioritize highest-impact workflow for fast delivery',
      ],
    },
    {
      number: '02',
      stage: 'Design',
      headline: 'Architect the Workflow, Data Schemas & Agent Logic',
      description:
        'Before building, I design a transparent system blueprint covering webhook triggers, n8n node logic, LangGraph state transitions, JSON data contracts, and fallback paths.',
      businessFocus: 'Ensure predictable behavior and zero disruption to existing operations.',
      technicalArtifact: 'Workflow Architecture Diagram & JSON Schema Specification',
      checkpoints: [
        'Map webhook triggers, API endpoints, and authentication flows',
        'Design structured LLM prompts and output validation schemas',
        'Specify error-handling and human escalation rules',
      ],
    },
    {
      number: '03',
      stage: 'Build',
      headline: 'Develop Clean n8n Pipelines, AI Agents & Integrations',
      description:
        'I build the automation system using modular n8n workflows, Python/LangChain/LangGraph agents, and clean REST API connectors—keeping every component readable and maintainable.',
      businessFocus: 'Rapid, transparent engineering with iterative progress previews.',
      technicalArtifact: 'Production n8n Workflows, Agent Codebase & API Connectors',
      checkpoints: [
        'Configure webhook listeners, custom code nodes, and API integrations',
        'Implement AI agent reasoning nodes with strict guardrail checks',
        'Connect CRM, email, and notification channels',
      ],
    },
    {
      number: '04',
      stage: 'Test',
      headline: 'Stress-Test Edge Cases, Payloads & Failure Recovery',
      description:
        'Every automation is rigorously tested against real-world messy inputs, malformed JSON, API timeouts, and edge-case customer inquiries to ensure rock-solid reliability.',
      businessFocus: 'Verify accuracy and safety before touching live customer or business data.',
      technicalArtifact: 'Validation Test Suite & Execution Audit Logs',
      checkpoints: [
        'Run end-to-end payload simulations across all conditional branches',
        'Verify LLM classification accuracy and hallucination guardrails',
        'Confirm error notifications and fallback queues work as expected',
      ],
    },
    {
      number: '05',
      stage: 'Optimize',
      headline: 'Deploy, Document & Refine for Long-Term Scale',
      description:
        'Once live, we monitor real execution logs, refine prompts and routing thresholds, reduce token/API overhead, and provide clear documentation so your team owns the system with confidence.',
      businessFocus: 'Sustained time savings, clean documentation, and scalable operations.',
      technicalArtifact: 'Live Deployment, Operations Runbook & Handover Guide',
      checkpoints: [
        'Monitor initial live executions and fine-tune prompt parameters',
        'Optimize API calls and token usage for speed and cost efficiency',
        'Deliver complete workflow documentation and walkthrough',
      ],
    },
  ] as ProcessStage[],
};
