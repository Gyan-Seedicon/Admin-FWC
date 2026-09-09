/* ==========================================================================
   FWC Super Admin Dashboard — Global Utilities
   Shared across all dashboard pages: modal handling, drawer handling,
   toast notifications, form validation, filter engine, CSV export,
   and the sidebar/header shell behavior.
   ========================================================================== */

// --------------------------------------------------------------------------
// 00. Date Formatting Helper
// --------------------------------------------------------------------------

function formatNow() {
  const now = new Date();
  const datePart = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} · ${timePart}`;
}
window.formatNow = formatNow;

function formatExpiryDate(dateStr) {
  if (!dateStr) return '—';
  if (/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}/.test(dateStr)) return dateStr;
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const monthIndex = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, monthIndex, day);
      if (!isNaN(date.getTime())) {
        return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      }
    }
    const d = new Date(dateStr);
    return isNaN(d.getTime()) ? dateStr : d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  } catch (e) {
    return dateStr;
  }
}
window.formatExpiryDate = formatExpiryDate;

function ensureJobExpiries(jobs) {
  return jobs || [];
}
window.ensureJobExpiries = ensureJobExpiries;

// --------------------------------------------------------------------------
// 01. Modal / Dialog
// --------------------------------------------------------------------------

function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) {
    console.warn(`openModal: no element found with id "${modalId}"`);
    return;
  }

  overlay._fwcPrevFocus = document.activeElement;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusTarget = overlay.querySelector('[autofocus]') || overlay.querySelector('button, input, select, textarea, a[href]');
  if (focusTarget) focusTarget.focus();

  const onKeydown = (e) => {
    if (e.key === 'Escape') closeModal(modalId);
  };
  overlay._fwcKeydownHandler = onKeydown;
  document.addEventListener('keydown', onKeydown);

  const onOverlayClick = (e) => {
    if (e.target === overlay) closeModal(modalId);
  };
  overlay._fwcOverlayClickHandler = onOverlayClick;
  overlay.addEventListener('click', onOverlayClick);
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) {
    console.warn(`closeModal: no element found with id "${modalId}"`);
    return;
  }

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (overlay._fwcKeydownHandler) {
    document.removeEventListener('keydown', overlay._fwcKeydownHandler);
    overlay._fwcKeydownHandler = null;
  }
  if (overlay._fwcOverlayClickHandler) {
    overlay.removeEventListener('click', overlay._fwcOverlayClickHandler);
    overlay._fwcOverlayClickHandler = null;
  }
  if (overlay._fwcPrevFocus) {
    overlay._fwcPrevFocus.focus();
    overlay._fwcPrevFocus = null;
  }
}

function initModalTriggers(root = document) {
  root.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.openModal));
  });
  root.querySelectorAll('[data-close-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => closeModal(trigger.dataset.closeModal));
  });
}

// Global click delegation for modal close buttons
document.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('[data-close-modal]');
  if (closeBtn) {
    const modalId = closeBtn.dataset.closeModal || closeBtn.closest('.modal-overlay')?.id;
    if (modalId) {
      closeModal(modalId);
    }
    return;
  }
  const modalClose = e.target.closest('.modal-close');
  if (modalClose) {
    const modal = modalClose.closest('.modal-overlay');
    if (modal && modal.id) {
      closeModal(modal.id);
    }
  }
});

// --------------------------------------------------------------------------
// 01a. Drawer (Right-side slide sheet)
// --------------------------------------------------------------------------

function openDrawer(drawerId) {
  const overlay = document.getElementById(drawerId);
  if (!overlay) {
    console.warn(`openDrawer: no element found with id "${drawerId}"`);
    return;
  }

  overlay._fwcPrevFocus = document.activeElement;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusTarget = overlay.querySelector('[autofocus]') || overlay.querySelector('button, input, select, textarea, a[href]');
  if (focusTarget) focusTarget.focus();

  const onKeydown = (e) => {
    if (e.key === 'Escape') closeDrawer(drawerId);
  };
  overlay._fwcKeydownHandler = onKeydown;
  document.addEventListener('keydown', onKeydown);

  const onOverlayClick = (e) => {
    if (e.target === overlay) closeDrawer(drawerId);
  };
  overlay._fwcOverlayClickHandler = onOverlayClick;
  overlay.addEventListener('click', onOverlayClick);
}

function closeDrawer(drawerId) {
  const overlay = document.getElementById(drawerId);
  if (!overlay) {
    console.warn(`closeDrawer: no element found with id "${drawerId}"`);
    return;
  }

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (overlay._fwcKeydownHandler) {
    document.removeEventListener('keydown', overlay._fwcKeydownHandler);
    overlay._fwcKeydownHandler = null;
  }
  if (overlay._fwcOverlayClickHandler) {
    overlay.removeEventListener('click', overlay._fwcOverlayClickHandler);
    overlay._fwcOverlayClickHandler = null;
  }
  if (overlay._fwcPrevFocus) {
    overlay._fwcPrevFocus.focus();
    overlay._fwcPrevFocus = null;
  }
}

function initDrawerTriggers(root = document) {
  root.querySelectorAll('[data-close-drawer]').forEach((trigger) => {
    trigger.addEventListener('click', () => closeDrawer(trigger.dataset.closeDrawer));
  });
}

// --------------------------------------------------------------------------
// 01b. Kebab Row Action Menu
// --------------------------------------------------------------------------

function closeAllKebabMenus(container = document) {
  container.querySelectorAll('.kebab-menu').forEach((menu) => menu.classList.add('hidden'));
}

function initKebabMenus(container = document) {
  container.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-kebab-trigger]');
    if (trigger) {
      const menu = trigger.nextElementSibling;
      const wasOpen = menu && !menu.classList.contains('hidden');
      closeAllKebabMenus(container);
      if (menu && !wasOpen) menu.classList.remove('hidden');
      return;
    }
    if (!e.target.closest('.kebab-menu')) closeAllKebabMenus(container);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllKebabMenus(container);
  });
}

// --------------------------------------------------------------------------
// 01c. Mock Persistence Layer (localStorage)
// --------------------------------------------------------------------------

const GLOBAL_DEFAULT_BLOGS = [
  {
    id: 1,
    title: 'The Future of AI in Manufacturing Supply Chains',
    author: 'Alex Kim',
    category: 'AI',
    submitted: 'Aug 25, 2026 · 02:30 PM',
    submittedISO: '2026-08-25T14:30:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical.'
  },
  {
    id: 2,
    title: '5 Ways Predictive Maintenance Cuts Downtime',
    author: 'Sam Patel',
    category: 'Manufacturing',
    submitted: 'Aug 24, 2026 · 11:15 AM',
    submittedISO: '2026-08-24T11:15:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Unplanned downtime costs manufacturers millions each year. Predictive maintenance strategies powered by IoT sensors and machine learning are changing the equation.'
  },
  {
    id: 3,
    title: 'Why Digital Twins Are the Next Big Thing',
    author: 'Jordan Lee',
    category: 'AI',
    submitted: 'Aug 22, 2026 · 04:45 PM',
    submittedISO: '2026-08-22T16:45:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Digital twin technology allows manufacturers to simulate, predict, and optimize physical processes before committing real-world resources.'
  },
  {
    id: 4,
    title: '5 Signs Your Enterprise Is Ready for AI Staffing',
    author: 'Priya Nair',
    category: 'AI & Tech Staffing',
    submitted: 'Aug 18, 2026 · 09:20 AM',
    submittedISO: '2026-08-18T09:20:00',
    status: 'published',
    actionTakenOn: 'Aug 19, 2026 · 10:05 AM',
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'AI-augmented staffing models are moving from pilot programs to core hiring strategy.'
  },
  {
    id: 5,
    title: 'Building Zero-Trust Teams for Engineering',
    author: 'Marcus Vance',
    category: 'Governance & Compliance',
    submitted: 'Aug 12, 2026 · 01:10 PM',
    submittedISO: '2026-08-12T13:10:00',
    status: 'rejected',
    actionTakenOn: 'Aug 13, 2026 · 03:25 PM',
    feedback: 'Please include verified benchmark figures and engineering team citations before submitting for final review.',
    coverImage: null,
    excerpt: 'A practical framework for extending zero-trust principles beyond infrastructure and into how distributed engineering teams are staffed.'
  },
  {
    id: 6,
    title: 'Scaling Distributed Kubernetes for Enterprise Microservices',
    author: 'David Chen',
    category: 'Cloud & Infrastructure',
    submitted: 'Aug 26, 2026 · 04:15 PM',
    submittedISO: '2026-08-26T16:15:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Best practices for managing multi-tenant Kubernetes clusters, automated service mesh deployments, and observability across hybrid cloud environments.'
  },
  {
    id: 7,
    title: 'Optimizing CI/CD Delivery Pipelines for High-Frequency Cloud Releases',
    author: 'Alex Kim',
    category: 'Cloud & Infrastructure',
    submitted: 'Aug 15, 2026 · 03:10 PM',
    submittedISO: '2026-08-15T15:10:00',
    status: 'published',
    actionTakenOn: 'Aug 16, 2026 · 11:30 AM',
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'How progressive canary deployments and ephemeral environments reduce change failure rate by 80%.'
  },
  {
    id: 8,
    title: 'Enterprise Guide to Fine-Tuning Domain-Specific LLMs',
    author: 'Jordan Lee',
    category: 'AI & Advanced Tech',
    submitted: 'Aug 10, 2026 · 01:40 PM',
    submittedISO: '2026-08-10T13:40:00',
    status: 'published',
    actionTakenOn: 'Aug 11, 2026 · 09:20 AM',
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Practical strategies for LoRA and QLoRA adapter fine-tuning on proprietary manufacturing telemetry.'
  },
  {
    id: 9,
    title: 'Securing Multi-Tenant Microservices in Modern Kubernetes Pods',
    author: 'Marcus Vance',
    category: 'Cybersecurity',
    submitted: 'Aug 05, 2026 · 10:15 AM',
    submittedISO: '2026-08-05T10:15:00',
    status: 'published',
    actionTakenOn: 'Aug 06, 2026 · 02:45 PM',
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Network policy segmentation and eBPF observability paradigms for strict zero-trust runtime environments.'
  },
  {
    id: 10,
    title: 'Next-Gen Edge Computing in Smart Factory Architectures',
    author: 'Sam Patel',
    category: 'Manufacturing',
    submitted: 'Aug 28, 2026 · 05:00 PM',
    submittedISO: '2026-08-28T17:00:00',
    status: 'draft',
    actionTakenOn: null,
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'Draft proposal on deploying lightweight inference models directly to industrial PLC edge controllers.'
  }
];

const GLOBAL_DEFAULT_JOBS = [
  {
    id: 1,
    title: 'Cybersecurity Analyst',
    department: 'Cybersecurity',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Mid-Level (3–5 Yrs)',
    salary: '$120,000 – $145,000 / yr',
    expiryDate: '2026-10-31',
    pocName: 'Sarah Jenkins',
    pocEmail: 's.jenkins@fwc.com',
    applicantsCount: 14,
    submitted: 'Aug 26, 2026 · 10:30 AM',
    submittedISO: '2026-08-26T10:30:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    pdfName: 'cybersecurity-analyst-jd.pdf',
    pdfSize: '1.4 MB',
    overview: 'We are looking for a Cybersecurity Analyst to safeguard client infrastructure and support SOC2/HIPAA-aligned delivery across our distributed engineering teams.',
    responsibilities: [
      'Perform continuous threat monitoring, log telemetry analysis, and vulnerability triage across multi-cloud environments.',
      'Collaborate with DevSecOps engineers to integrate automated security scanning into CI/CD pipelines.',
      'Lead incident response simulations and prepare audit-ready compliance documentation for enterprise clients.'
    ],
    skills: ['SIEM & Splunk', 'AWS Security Hub', 'SOC2 / HIPAA Compliance', 'Threat Hunting', 'Zero-Trust Architecture']
  },
  {
    id: 2,
    title: 'Technology Consultant',
    department: 'Technology Consulting',
    location: 'Alhambra, CA',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$135,000 – $165,000 / yr',
    expiryDate: '2026-11-15',
    pocName: 'Michael Chen',
    pocEmail: 'm.chen@fwc.com',
    applicantsCount: 8,
    submitted: 'Aug 23, 2026 · 03:15 PM',
    submittedISO: '2026-08-23T15:15:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    pdfName: 'technology-consultant-jd.pdf',
    pdfSize: '1.1 MB',
    overview: 'Join our consulting practice to advise enterprise manufacturing and fintech clients on legacy technology modernization, architecture roadmaps, and digital transformation.',
    responsibilities: [
      'Conduct comprehensive technical discovery workshops with client CTO and engineering leadership.',
      'Formulate multi-year digital transformation roadmaps and cost-benefit trade-off analyses.',
      'Oversee agile pod delivery handoffs and ensure strategic architecture alignment.'
    ],
    skills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'Client Advisory', 'Agile Pod Leadership', 'Financial Modeling']
  },
  {
    id: 3,
    title: 'Senior AI Architect',
    department: 'AI & Advanced Tech',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: 'Staff / Lead (8+ Yrs)',
    salary: '$160,000 – $195,000 / yr',
    expiryDate: '2026-09-30',
    pocName: 'Aarav Sharma',
    pocEmail: 'a.sharma@fwc.com',
    applicantsCount: 22,
    submitted: 'Aug 10, 2026 · 09:00 AM',
    submittedISO: '2026-08-10T09:00:00',
    status: 'published',
    actionTakenOn: 'Aug 11, 2026 · 11:40 AM',
    feedback: null,
    pdfName: 'senior-ai-architect-jd.pdf',
    pdfSize: '2.1 MB',
    overview: 'Lead the design of AI-augmented delivery pods for enterprise manufacturing and fintech clients, setting technical direction across a growing generative AI architecture team.',
    responsibilities: [
      'Design scalable LLM pipelines, Retrieval-Augmented Generation (RAG) frameworks, and vector index architectures.',
      'Establish enterprise model governance, evaluation metrics, and responsible AI safety guardrails.',
      'Mentor senior machine learning engineers and present architecture strategies to Fortune 500 stakeholders.'
    ],
    skills: ['LLM Orchestration', 'RAG Architectures', 'PyTorch / LangChain', 'Vector Databases', 'MLOps on Kubernetes']
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Engineer',
    department: 'Cloud Services',
    location: 'Alhambra, CA',
    type: 'Full-time',
    experience: 'Mid-Level (3–5 Yrs)',
    salary: '$115,000 – $140,000 / yr',
    expiryDate: '2026-10-15',
    pocName: 'Elena Rostova',
    pocEmail: 'e.rostova@fwc.com',
    applicantsCount: 16,
    submitted: 'Aug 08, 2026 · 02:20 PM',
    submittedISO: '2026-08-08T14:20:00',
    status: 'published',
    actionTakenOn: 'Aug 09, 2026 · 04:15 PM',
    feedback: null,
    pdfName: 'cloud-infrastructure-engineer-jd.pdf',
    pdfSize: '1.3 MB',
    overview: 'Design and operate scalable cloud infrastructure for enterprise clients, with a focus on reliability, cost efficiency, infrastructure-as-code, and secure-by-default deployments.',
    responsibilities: [
      'Author and maintain reusable Terraform / Terragrunt modules for multi-account AWS and Azure setups.',
      'Implement automated observability dashboards and alerting systems via Prometheus, Grafana, and Datadog.',
      'Lead infrastructure cost optimization sprints reducing cloud spend by up to 25%.'
    ],
    skills: ['Terraform', 'Kubernetes / EKS', 'AWS & Azure', 'CI/CD Pipelines', 'Prometheus & Grafana']
  },
  {
    id: 5,
    title: 'Blockchain Developer',
    department: 'Blockchain',
    location: 'Remote',
    type: 'Contract',
    experience: 'Entry Level (1–2 Yrs)',
    salary: '$90,000 – $110,000 / yr',
    expiryDate: '2026-08-31',
    pocName: 'David Vance',
    pocEmail: 'd.vance@fwc.com',
    applicantsCount: 6,
    submitted: 'Aug 02, 2026 · 11:00 AM',
    submittedISO: '2026-08-02T11:00:00',
    status: 'rejected',
    actionTakenOn: 'Aug 03, 2026 · 01:30 PM',
    feedback: 'Please specify the exact required smart-contract auditing experience and updated compensation grade band.',
    pdfName: 'blockchain-developer-jd.pdf',
    pdfSize: '950 KB',
    overview: 'Build and audit smart-contract based solutions for enterprise clients exploring blockchain-backed supply chain traceability and verifiable digital credentials.',
    responsibilities: [
      'Write, test, and formally verify Solidity smart contracts on EVM-compatible layer 1 and layer 2 networks.',
      'Collaborate with security auditors to remediate gas optimization and reentrancy vulnerabilities.',
      'Integrate Web3 RPC endpoints into client React frontends.'
    ],
    skills: ['Solidity', 'EVM Chains', 'Hardhat & Foundry', 'Smart Contract Auditing', 'Web3.js']
  },
  {
    id: 6,
    title: 'Site Reliability & Platform Engineer',
    department: 'Cloud Services',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$140,000 – $170,000 / yr',
    expiryDate: '2026-11-30',
    pocName: 'Alex Rivera',
    pocEmail: 'a.rivera@fwc.com',
    applicantsCount: 4,
    submitted: 'Aug 27, 2026 · 09:15 AM',
    submittedISO: '2026-08-27T09:15:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    pdfName: 'site-reliability-engineer-jd.pdf',
    pdfSize: '1.2 MB',
    overview: 'Design, build, and scale automated multi-cloud observability, Chaos engineering pipelines, and 99.99% high-availability production clusters.',
    responsibilities: [
      'Architect resilient Kubernetes clusters with automated canary rollouts and circuit breakers.',
      'Implement distributed tracing with OpenTelemetry and Grafana Tempo across microservices.',
      'Conduct blameless post-mortems and automate infrastructure self-healing runbooks.'
    ],
    skills: ['Kubernetes & Helm', 'OpenTelemetry', 'AWS / GCP', 'Terraform', 'Chaos Engineering']
  },
  {
    id: 7,
    title: 'Staff Full Stack Engineer',
    department: 'Software Engineering',
    location: 'Alhambra, CA',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$145,000 – $175,000 / yr',
    expiryDate: '2026-11-20',
    pocName: 'Priya Nair',
    pocEmail: 'p.nair@fwc.com',
    applicantsCount: 19,
    submitted: 'Aug 04, 2026 · 01:10 PM',
    submittedISO: '2026-08-04T13:10:00',
    status: 'published',
    actionTakenOn: 'Aug 05, 2026 · 10:15 AM',
    feedback: null,
    pdfName: 'staff-fullstack-engineer-jd.pdf',
    pdfSize: '1.5 MB',
    overview: 'Architect modern micro-frontend portals and resilient Node.js / TypeScript microservices for tier-1 enterprise clients.',
    responsibilities: [
      'Lead full-stack feature delivery with React, Next.js, and GraphQL.',
      'Maintain 99.9% uptime across production Kubernetes clusters and PostgreSQL databases.'
    ],
    skills: ['React / Next.js', 'Node.js & TypeScript', 'PostgreSQL', 'GraphQL', 'AWS ECS']
  },
  {
    id: 8,
    title: 'Lead Data & Analytics Architect',
    department: 'Data & Analytics',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Staff / Lead (8+ Yrs)',
    salary: '$155,000 – $185,000 / yr',
    expiryDate: '2026-12-05',
    pocName: 'Marcus Vance',
    pocEmail: 'm.vance@fwc.com',
    applicantsCount: 11,
    submitted: 'Aug 01, 2026 · 11:30 AM',
    submittedISO: '2026-08-01T11:30:00',
    status: 'published',
    actionTakenOn: 'Aug 02, 2026 · 04:00 PM',
    feedback: null,
    pdfName: 'lead-data-architect-jd.pdf',
    pdfSize: '1.8 MB',
    overview: 'Spearhead enterprise data lakehouse architectures, Snowflake ETL pipelines, and real-time streaming infrastructure.',
    responsibilities: [
      'Design modern Medallion data architectures across AWS S3, dbt, and Snowflake.',
      'Implement data quality contracts, lineage governance, and Apache Kafka event streaming.'
    ],
    skills: ['Snowflake & dbt', 'Apache Kafka', 'PySpark', 'AWS Lake Formation', 'Data Mesh']
  },
  {
    id: 9,
    title: 'Principal DevSecOps Specialist',
    department: 'Cybersecurity',
    location: 'San Francisco, CA',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$160,000 – $190,000 / yr',
    expiryDate: '2026-10-25',
    pocName: 'Sarah Jenkins',
    pocEmail: 's.jenkins@fwc.com',
    applicantsCount: 15,
    submitted: 'Jul 28, 2026 · 02:45 PM',
    submittedISO: '2026-07-28T14:45:00',
    status: 'published',
    actionTakenOn: 'Jul 29, 2026 · 11:10 AM',
    feedback: null,
    pdfName: 'principal-devsecops-jd.pdf',
    pdfSize: '1.6 MB',
    overview: 'Build automated policy-as-code guardrails and supply chain security frameworks for enterprise hybrid cloud pods.',
    responsibilities: [
      'Integrate automated SAST/DAST, SBOM verification, and secret scanning into GitHub Actions CI/CD.',
      'Author OPA Gatekeeper and Kyverno policies for Kubernetes admission control.'
    ],
    skills: ['DevSecOps', 'OPA / Gatekeeper', 'Terraform', 'Vault / KMS', 'Kubernetes Security']
  },
  {
    id: 10,
    title: 'Enterprise Systems Integration Consultant',
    department: 'Technology Consulting',
    location: 'Remote',
    type: 'Contract',
    experience: 'Mid-Level (3–5 Yrs)',
    salary: '$130,000 – $150,000 / yr',
    expiryDate: '2026-11-30',
    pocName: 'Michael Chen',
    pocEmail: 'm.chen@fwc.com',
    applicantsCount: 0,
    submitted: 'Aug 28, 2026 · 04:30 PM',
    submittedISO: '2026-08-28T16:30:00',
    status: 'draft',
    actionTakenOn: null,
    feedback: null,
    pdfName: 'systems-integration-jd.pdf',
    pdfSize: '1.0 MB',
    overview: 'Draft requisition for ERP and CRM enterprise integration consulting across manufacturing supply chains.',
    responsibilities: [
      'Design REST / SOAP enterprise service bus integration connectors.'
    ],
    skills: ['MuleSoft', 'Enterprise Integration', 'REST APIs', 'Java / Spring', 'ERP Systems']
  }
];

const GLOBAL_DEFAULT_CANDIDATES = [
  {
    "id": 301,
    "jobId": 3,
    "fullName": "Dr. Vikram Malhotra",
    "name": "Dr. Vikram Malhotra",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "email": "vikram.malhotra@neuralscale.ai",
    "phone": "+91 98450 12890",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 22, 2026",
    "appliedISO": "2026-08-22T11:30:00",
    "status": "Interviewing",
    "totalExp": "9.5 Yrs",
    "workExpYears": 9.5,
    "currentCtc": "24 LPA",
    "currentCtcNum": 24,
    "expectedCtc": "28 LPA",
    "expectedCtcNum": 28,
    "noticePeriod": "30 Days",
    "employmentType": "Full-time",
    "designation": "Principal AI Architect",
    "currentCompanyName": "Cognitive Intelligence Labs",
    "previousDesignation": "Lead Machine Learning Engineer",
    "previousCompanyName": "Wipro AI Research",
    "highestDegree": "Ph.D. in Computer Science — IISc Bangalore",
    "rating": 4.9,
    "resumeFileName": "dr-vikram-malhotra-ai-architect.pdf",
    "resumeFileSize": "1.8 MB",
    "summary": "Ph.D. in Machine Learning with 9+ years architecting enterprise RAG systems, LLM orchestration frameworks, and vector index clusters on Kubernetes.",
    "skills": [
      "LLM Orchestration",
      "RAG Architectures",
      "PyTorch",
      "LangChain",
      "Vector DBs (Milvus)",
      "MLOps on Kubernetes",
      "AWS Bedrock"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 23, 2026 · 10:15 AM",
        "text": "Exceptional background in enterprise GenAI architectures and distributed vector indexing. Cleared technical screening with top marks."
      },
      {
        "author": "Taylor Brooks",
        "role": "Super Admin",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 24, 2026 · 02:40 PM",
        "text": "Scheduled for round 2 architecture discussion with the engineering leadership."
      }
    ],
    "history": [
      {
        "text": "Candidate moved to Interviewing stage",
        "time": "Aug 24, 2026 · 02:40 PM",
        "active": true
      },
      {
        "text": "Shortlisted for technical evaluation round",
        "time": "Aug 23, 2026 · 10:15 AM",
        "active": false
      },
      {
        "text": "Application submitted for Senior AI Architect",
        "time": "Aug 22, 2026 · 11:30 AM",
        "active": false
      }
    ]
  },
  {
    "id": 302,
    "jobId": 3,
    "fullName": "Ananya Deshmukh",
    "name": "Ananya Deshmukh",
    "gender": "Female",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    "email": "ananya.deshmukh@genai-systems.io",
    "phone": "+91 99801 44520",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 20, 2026",
    "appliedISO": "2026-08-20T15:15:00",
    "status": "Shortlisted",
    "totalExp": "6.5 Yrs",
    "workExpYears": 6.5,
    "currentCtc": "18 LPA",
    "currentCtcNum": 18,
    "expectedCtc": "22 LPA",
    "expectedCtcNum": 22,
    "noticePeriod": "Immediate",
    "employmentType": "Full-time",
    "designation": "Staff Machine Learning Engineer",
    "currentCompanyName": "HyperScale AI Labs",
    "previousDesignation": "Senior AI Engineer",
    "previousCompanyName": "TCS Innovation Hub",
    "highestDegree": "M.Tech in Artificial Intelligence — IIT Bombay",
    "rating": 4.8,
    "resumeFileName": "ananya-deshmukh-staff-ai-engineer.pdf",
    "resumeFileSize": "1.4 MB",
    "summary": "Staff AI Engineer with expertise in model fine-tuning (LoRA), latency optimization on NVIDIA H100 clusters, and agentic workflows with LangGraph.",
    "skills": [
      "LangGraph",
      "PyTorch & vLLM",
      "Model Fine-tuning (LoRA)",
      "Triton Inference Server",
      "AWS Bedrock",
      "Python",
      "FastAPI"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 21, 2026 · 11:00 AM",
        "text": "Available immediately. Demonstrates deep proficiency in multi-agent orchestration."
      }
    ],
    "history": [
      {
        "text": "Candidate shortlisted for technical interview",
        "time": "Aug 21, 2026 · 11:00 AM",
        "active": true
      },
      {
        "text": "Application submitted for Senior AI Architect",
        "time": "Aug 20, 2026 · 03:15 PM",
        "active": false
      }
    ]
  },
  {
    "id": 303,
    "jobId": 3,
    "fullName": "Robert Vance",
    "name": "Robert Vance",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "email": "robert.vance@ai-foundry.com",
    "phone": "+91 98112 33490",
    "currentLocation": "Hyderabad, India",
    "location": "Hyderabad, India",
    "appliedOn": "Aug 19, 2026",
    "appliedISO": "2026-08-19T09:20:00",
    "status": "Under Review",
    "totalExp": "8.0 Yrs",
    "workExpYears": 8,
    "currentCtc": "21 LPA",
    "currentCtcNum": 21,
    "expectedCtc": "25 LPA",
    "expectedCtcNum": 25,
    "noticePeriod": "60 Days",
    "employmentType": "Remote",
    "designation": "Lead ML Infrastructure Engineer",
    "currentCompanyName": "Apex Vision AI",
    "previousDesignation": "Senior Deep Learning Engineer",
    "previousCompanyName": "NVIDIA Partner Lab",
    "highestDegree": "M.S. in Computer Science — Stanford University",
    "rating": 4.6,
    "resumeFileName": "robert-vance-ai-lead.pdf",
    "resumeFileSize": "1.6 MB",
    "summary": "AI Systems Architect with 8+ years building high-throughput inference engines and deep learning deployment frameworks.",
    "skills": [
      "PyTorch",
      "Distributed Training",
      "Kubernetes",
      "Triton Inference",
      "RAG Pipelines",
      "C++",
      "CUDA"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 20, 2026 · 09:30 AM",
        "text": "Resume under initial evaluation by engineering hiring manager."
      }
    ],
    "history": [
      {
        "text": "Application received and placed Under Review",
        "time": "Aug 19, 2026 · 09:20 AM",
        "active": true
      }
    ]
  },
  {
    "id": 304,
    "jobId": 3,
    "fullName": "Maya Lin",
    "name": "Maya Lin",
    "gender": "Female",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    "email": "maya.lin@intelligence-cloud.net",
    "phone": "+91 97120 44810",
    "currentLocation": "Pune, India",
    "location": "Pune, India",
    "appliedOn": "Aug 18, 2026",
    "appliedISO": "2026-08-18T16:30:00",
    "status": "Hired",
    "totalExp": "5.5 Yrs",
    "workExpYears": 5.5,
    "currentCtc": "16 LPA",
    "currentCtcNum": 16,
    "expectedCtc": "19 LPA",
    "expectedCtcNum": 19,
    "noticePeriod": "30 Days",
    "employmentType": "Hybrid",
    "designation": "Senior NLP Architect",
    "currentCompanyName": "CloudMatrix Global",
    "previousDesignation": "NLP Research Engineer",
    "previousCompanyName": "Amazon Web Services",
    "highestDegree": "B.S. in Artificial Intelligence — University of Washington",
    "rating": 4.9,
    "resumeFileName": "maya-lin-ai-architect.pdf",
    "resumeFileSize": "1.3 MB",
    "summary": "Senior Machine Learning Architect with specialized background in NLP, prompt engineering safety firewalls, and responsible AI guardrails.",
    "skills": [
      "GenAI Governance",
      "LangChain",
      "Python",
      "Azure OpenAI",
      "Semantic Kernel",
      "Docker",
      "Kubernetes"
    ],
    "comments": [
      {
        "author": "Taylor Brooks",
        "role": "Super Admin",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 25, 2026 · 04:00 PM",
        "text": "Candidate offer accepted. Joining date scheduled for next month."
      },
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 22, 2026 · 03:15 PM",
        "text": "Candidate performed exceptionally in culture and team fit rounds."
      }
    ],
    "history": [
      {
        "text": "Candidate marked as Hired",
        "time": "Aug 25, 2026 · 04:00 PM",
        "active": true
      },
      {
        "text": "Final executive offer extended and accepted",
        "time": "Aug 24, 2026 · 02:00 PM",
        "active": false
      },
      {
        "text": "Completed final technical and cultural interview",
        "time": "Aug 22, 2026 · 03:15 PM",
        "active": false
      },
      {
        "text": "Application submitted for Senior AI Architect",
        "time": "Aug 18, 2026 · 04:30 PM",
        "active": false
      }
    ]
  },
  {
    "id": 100,
    "jobId": 3,
    "fullName": "John Doe",
    "name": "John Doe",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "email": "john.doe@example.com",
    "phone": "+91 91234 56789",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 17, 2026",
    "appliedISO": "2026-08-17T14:10:00",
    "status": "Screening",
    "totalExp": "5.0 Yrs",
    "workExpYears": 5,
    "currentCtc": "14 LPA",
    "currentCtcNum": 14,
    "expectedCtc": "17 LPA",
    "expectedCtcNum": 17,
    "noticePeriod": "30 Days",
    "employmentType": "Full-time",
    "designation": "Senior Frontend Developer",
    "currentCompanyName": "Infosys Pvt. Ltd.",
    "previousDesignation": "Frontend Engineer",
    "previousCompanyName": "Wipro Technologies",
    "highestDegree": "B.Tech in Computer Science — MIT",
    "rating": 4.7,
    "resumeFileName": "resume.png",
    "resumeFileSize": "1.2 MB",
    "summary": "5 years of frontend development experience building high-scale responsive web applications and AI dashboard interfaces with modern JavaScript & React.",
    "skills": [
      "JavaScript (ES6+)",
      "React / Next.js",
      "TypeScript",
      "CSS3 & Tailwind",
      "State Management",
      "REST APIs"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 18, 2026 · 10:45 AM",
        "text": "Phone screen scheduled for upcoming Wednesday."
      }
    ],
    "history": [
      {
        "text": "Candidate scheduled for initial screening",
        "time": "Aug 18, 2026 · 10:45 AM",
        "active": true
      },
      {
        "text": "Application submitted for Senior AI Architect",
        "time": "Aug 17, 2026 · 02:10 PM",
        "active": false
      }
    ]
  },
  {
    "id": 201,
    "jobId": 2,
    "fullName": "Siddharth Rao",
    "name": "Siddharth Rao",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "email": "siddharth.rao@advisorycloud.com",
    "phone": "+91 98201 55670",
    "currentLocation": "Mumbai, India",
    "location": "Mumbai, India",
    "appliedOn": "Aug 25, 2026",
    "appliedISO": "2026-08-25T13:20:00",
    "status": "Screening",
    "totalExp": "7.5 Yrs",
    "workExpYears": 7.5,
    "currentCtc": "19 LPA",
    "currentCtcNum": 19,
    "expectedCtc": "23 LPA",
    "expectedCtcNum": 23,
    "noticePeriod": "30 Days",
    "employmentType": "Full-time",
    "designation": "Lead Cloud Strategy Consultant",
    "currentCompanyName": "Deloitte Consulting LLP",
    "previousDesignation": "Senior Technology Consultant",
    "previousCompanyName": "PwC Advisory Services",
    "highestDegree": "MBA — UCLA Anderson School of Management",
    "rating": 4.8,
    "resumeFileName": "siddharth-rao-tech-consultant.pdf",
    "resumeFileSize": "1.5 MB",
    "summary": "7+ years leading enterprise cloud migrations, modernizing legacy monolithic architectures, and structuring digital transformation roadmaps for Fortune 500 manufacturing clients.",
    "skills": [
      "Enterprise Architecture",
      "Cloud Migration Strategy",
      "Agile Pod Leadership",
      "Financial ROI Modeling",
      "AWS & Azure",
      "Microservices"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 26, 2026 · 11:15 AM",
        "text": "Strong enterprise consulting background from Deloitte and PwC with clear cloud architecture expertise."
      }
    ],
    "history": [
      {
        "text": "Candidate scheduled for initial screening",
        "time": "Aug 26, 2026 · 11:15 AM",
        "active": true
      },
      {
        "text": "Application submitted for Senior Technology Consultant",
        "time": "Aug 25, 2026 · 01:20 PM",
        "active": false
      }
    ]
  },
  {
    "id": 202,
    "jobId": 2,
    "fullName": "Claire Dupont",
    "name": "Claire Dupont",
    "gender": "Female",
    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    "email": "claire.dupont@consulting-tech.fr",
    "phone": "+91 99340 77120",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 24, 2026",
    "appliedISO": "2026-08-24T09:45:00",
    "status": "Shortlisted",
    "totalExp": "6.0 Yrs",
    "workExpYears": 6,
    "currentCtc": "16 LPA",
    "currentCtcNum": 16,
    "expectedCtc": "19 LPA",
    "expectedCtcNum": 19,
    "noticePeriod": "Immediate",
    "employmentType": "Hybrid",
    "designation": "Senior Digital Consultant",
    "currentCompanyName": "Accenture Technology",
    "previousDesignation": "Cloud Strategy Analyst",
    "previousCompanyName": "Capgemini Invent",
    "highestDegree": "M.S. in Management Information Systems — NYU Stern",
    "rating": 4.7,
    "resumeFileName": "claire-dupont-senior-consultant.pdf",
    "resumeFileSize": "1.3 MB",
    "summary": "Technology Consultant with deep specialization in legacy system modernization, microservices migration, and client stakeholder management.",
    "skills": [
      "Cloud Transformation",
      "Client Advisory",
      "Enterprise Architecture",
      "Microservices",
      "Scrum / Agile",
      "AWS Solutions"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 24, 2026 · 02:00 PM",
        "text": "Good communication and client presentation skills."
      }
    ],
    "history": [
      {
        "text": "Shortlisted for consulting round",
        "time": "Aug 24, 2026 · 02:00 PM",
        "active": true
      },
      {
        "text": "Application submitted for Senior Technology Consultant",
        "time": "Aug 24, 2026 · 09:45 AM",
        "active": false
      }
    ]
  },
  {
    "id": 101,
    "jobId": 1,
    "fullName": "Elena Rostova",
    "name": "Elena Rostova",
    "gender": "Female",
    "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    "email": "elena.rostova@techdefense.io",
    "phone": "+91 98400 33110",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 28, 2026",
    "appliedISO": "2026-08-28T10:15:00",
    "status": "Under Review",
    "totalExp": "5.5 Yrs",
    "workExpYears": 5.5,
    "currentCtc": "15 LPA",
    "currentCtcNum": 15,
    "expectedCtc": "18 LPA",
    "expectedCtcNum": 18,
    "noticePeriod": "30 Days",
    "employmentType": "Full-time",
    "designation": "Threat Intelligence Lead",
    "currentCompanyName": "Vanguard Cyber Systems",
    "previousDesignation": "SOC Security Analyst",
    "previousCompanyName": "Apex Cloud Defense",
    "highestDegree": "B.S. in Computer Science & Info Assurance — UC Berkeley",
    "rating": 4.8,
    "resumeFileName": "elena-rostova-cybersecurity-resume.pdf",
    "resumeFileSize": "1.2 MB",
    "summary": "Senior Cybersecurity Engineer with 5+ years of experience in enterprise SIEM threat hunting, Splunk query optimization, SOC2 compliance governance, and automated incident triage.",
    "skills": [
      "SIEM & Splunk (Expert)",
      "AWS Security Hub",
      "SOC2 / HIPAA Audit",
      "Threat Hunting",
      "Zero-Trust IAM",
      "Python & Bash"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 28, 2026 · 11:30 AM",
        "text": "Initial resume screening completed. Experience directly matches job description."
      }
    ],
    "history": [
      {
        "text": "Application received and placed Under Review",
        "time": "Aug 28, 2026 · 10:15 AM",
        "active": true
      }
    ]
  },
  {
    "id": 102,
    "jobId": 1,
    "fullName": "David Chen",
    "name": "David Chen",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    "email": "david.chen@cybermesh.org",
    "phone": "+91 97180 22990",
    "currentLocation": "Pune, India",
    "location": "Pune, India",
    "appliedOn": "Aug 27, 2026",
    "appliedISO": "2026-08-27T14:40:00",
    "status": "Shortlisted",
    "totalExp": "4.0 Yrs",
    "workExpYears": 4,
    "currentCtc": "11 LPA",
    "currentCtcNum": 11,
    "expectedCtc": "14 LPA",
    "expectedCtcNum": 14,
    "noticePeriod": "Immediate",
    "employmentType": "Full-time",
    "designation": "Cybersecurity Analyst",
    "currentCompanyName": "Nexus Tech Partners",
    "previousDesignation": "Junior Security Engineer",
    "previousCompanyName": "CyberGuard Corp",
    "highestDegree": "B.S. in Cybersecurity — USC Viterbi",
    "rating": 4.6,
    "resumeFileName": "david-chen-security-analyst.pdf",
    "resumeFileSize": "980 KB",
    "summary": "Cybersecurity Analyst specializing in vulnerability management, automated SAST/DAST pipeline integration, and DevSecOps compliance automation.",
    "skills": [
      "AWS Security",
      "Splunk",
      "Tenable / Nessus",
      "SOC2 Compliance",
      "Docker Security",
      "Terraform"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 27, 2026 · 04:15 PM",
        "text": "Shortlisted for preliminary screening round."
      }
    ],
    "history": [
      {
        "text": "Shortlisted for preliminary screening",
        "time": "Aug 27, 2026 · 04:15 PM",
        "active": true
      },
      {
        "text": "Application submitted",
        "time": "Aug 27, 2026 · 02:40 PM",
        "active": false
      }
    ]
  },
  {
    "id": 103,
    "jobId": 1,
    "fullName": "Marcus Holloway",
    "name": "Marcus Holloway",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "email": "m.holloway@defenselogic.com",
    "phone": "+91 96540 88120",
    "currentLocation": "Hyderabad, India",
    "location": "Hyderabad, India",
    "appliedOn": "Aug 26, 2026",
    "appliedISO": "2026-08-26T11:20:00",
    "status": "Screening",
    "totalExp": "6.5 Yrs",
    "workExpYears": 6.5,
    "currentCtc": "17 LPA",
    "currentCtcNum": 17,
    "expectedCtc": "20 LPA",
    "expectedCtcNum": 20,
    "noticePeriod": "60 Days",
    "employmentType": "Remote",
    "designation": "Senior Information Security Analyst",
    "currentCompanyName": "Horizon Health Systems",
    "previousDesignation": "IAM Specialist",
    "previousCompanyName": "Chicago Tech Solutions",
    "highestDegree": "M.S. in Information Systems — Northwestern University",
    "rating": 4.7,
    "resumeFileName": "marcus-holloway-lead-analyst.pdf",
    "resumeFileSize": "1.4 MB",
    "summary": "6+ years in zero-trust architecture, cloud telemetry analysis, and enterprise identity security.",
    "skills": [
      "Zero-Trust",
      "Splunk Enterprise",
      "Okta / Azure AD IAM",
      "Incident Response",
      "HIPAA Compliance",
      "Python"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 26, 2026 · 02:00 PM",
        "text": "Screening call scheduled."
      }
    ],
    "history": [
      {
        "text": "Candidate scheduled for initial screening",
        "time": "Aug 26, 2026 · 02:00 PM",
        "active": true
      },
      {
        "text": "Application submitted",
        "time": "Aug 26, 2026 · 11:20 AM",
        "active": false
      }
    ]
  },
  {
    "id": 401,
    "jobId": 4,
    "fullName": "Liam O’Connor",
    "name": "Liam O’Connor",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    "email": "liam.oconnor@cloudinfra.io",
    "phone": "+91 98190 33450",
    "currentLocation": "Mumbai, India",
    "location": "Mumbai, India",
    "appliedOn": "Aug 18, 2026",
    "appliedISO": "2026-08-18T14:00:00",
    "status": "Screening",
    "totalExp": "4.5 Yrs",
    "workExpYears": 4.5,
    "currentCtc": "13 LPA",
    "currentCtcNum": 13,
    "expectedCtc": "16 LPA",
    "expectedCtcNum": 16,
    "noticePeriod": "30 Days",
    "employmentType": "Full-time",
    "designation": "Cloud Infrastructure Engineer",
    "currentCompanyName": "Skyward Systems",
    "previousDesignation": "DevOps Engineer",
    "previousCompanyName": "Pasadena Cloud Co.",
    "highestDegree": "B.S. in Computer Science — Cal Poly Pomona",
    "rating": 4.7,
    "resumeFileName": "liam-oconnor-cloud-infra.pdf",
    "resumeFileSize": "1.2 MB",
    "summary": "DevOps & Cloud Engineer with 4+ years authoring reusable Terraform modules, managing Kubernetes clusters on AWS EKS, and building Datadog observability dashboards.",
    "skills": [
      "Terraform & Terragrunt",
      "Kubernetes / EKS",
      "AWS Multi-Account",
      "Prometheus & Grafana",
      "GitHub Actions CI/CD"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 19, 2026 · 10:00 AM",
        "text": "Strong Terraform and Kubernetes experience verified."
      }
    ],
    "history": [
      {
        "text": "Candidate scheduled for initial screening",
        "time": "Aug 19, 2026 · 10:00 AM",
        "active": true
      },
      {
        "text": "Application submitted for Cloud Infrastructure Engineer",
        "time": "Aug 18, 2026 · 02:00 PM",
        "active": false
      }
    ]
  },
  {
    "id": 402,
    "jobId": 4,
    "fullName": "Sofia Ramirez",
    "name": "Sofia Ramirez",
    "gender": "Female",
    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    "email": "sofia.ramirez@devops-scale.com",
    "phone": "+91 97450 66120",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 16, 2026",
    "appliedISO": "2026-08-16T11:15:00",
    "status": "Rejected",
    "totalExp": "3.5 Yrs",
    "workExpYears": 3.5,
    "currentCtc": "9 LPA",
    "currentCtcNum": 9,
    "expectedCtc": "12 LPA",
    "expectedCtcNum": 12,
    "noticePeriod": "Immediate",
    "employmentType": "Hybrid",
    "designation": "DevOps Engineer",
    "currentCompanyName": "Nexus Platforms",
    "previousDesignation": "Junior Systems Admin",
    "previousCompanyName": "DataStream Inc.",
    "highestDegree": "B.S. in Software Engineering — UC Riverside",
    "rating": 4.2,
    "resumeFileName": "sofia-ramirez-devops.pdf",
    "resumeFileSize": "1.1 MB",
    "summary": "Infrastructure Automation Engineer focused on zero-downtime CI/CD and multi-cloud Kubernetes deployment.",
    "skills": [
      "Terraform",
      "AWS ECS / EKS",
      "Datadog",
      "ArgoCD",
      "Python",
      "Docker"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 17, 2026 · 11:30 AM",
        "text": "Candidate experience fell below staff requirements for this senior posting."
      }
    ],
    "history": [
      {
        "text": "Application archived / Rejected",
        "time": "Aug 17, 2026 · 11:30 AM",
        "active": true
      },
      {
        "text": "Application submitted",
        "time": "Aug 16, 2026 · 11:15 AM",
        "active": false
      }
    ]
  },
  {
    "id": 501,
    "jobId": 5,
    "fullName": "Mateo Morales",
    "name": "Mateo Morales",
    "gender": "Male",
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
    "email": "mateo.morales@web3foundry.dev",
    "phone": "+91 96110 88230",
    "currentLocation": "Bangalore, India",
    "location": "Bangalore, India",
    "appliedOn": "Aug 14, 2026",
    "appliedISO": "2026-08-14T10:45:00",
    "status": "Interviewing",
    "totalExp": "4.5 Yrs",
    "workExpYears": 4.5,
    "currentCtc": "16 LPA",
    "currentCtcNum": 16,
    "expectedCtc": "20 LPA",
    "expectedCtcNum": 20,
    "noticePeriod": "30 Days",
    "employmentType": "Remote",
    "designation": "Smart Contract Developer",
    "currentCompanyName": "EtherFlow Protocol",
    "previousDesignation": "Solidity Engineer",
    "previousCompanyName": "BlockChain Labs Austin",
    "highestDegree": "B.S. in Software Engineering — UT Austin",
    "rating": 4.8,
    "resumeFileName": "mateo-morales-solidity-developer.pdf",
    "resumeFileSize": "1.0 MB",
    "summary": "Smart Contract Engineer with extensive experience in Solidity, Foundry test suites, and gas optimization for EVM Layer 2 protocols.",
    "skills": [
      "Solidity",
      "Foundry & Hardhat",
      "EVM Chains",
      "Smart Contract Auditing",
      "OpenZeppelin",
      "TypeScript"
    ],
    "comments": [
      {
        "author": "Sarah Smith",
        "role": "Senior Recruiter",
        "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        "date": "Aug 15, 2026 · 03:00 PM",
        "text": "Interview ongoing with Web3 team lead."
      }
    ],
    "history": [
      {
        "text": "Candidate actively interviewing with Web3 team",
        "time": "Aug 15, 2026 · 03:00 PM",
        "active": true
      },
      {
        "text": "Application submitted for Blockchain Developer",
        "time": "Aug 14, 2026 · 10:45 AM",
        "active": false
      }
    ]
  }
];

const GLOBAL_DEFAULT_ENQUIRIES = [
  {
    id: 1,
    name: 'Amara Chen',
    email: 'a.chen@apexfin.com',
    organisation: 'Apex Financial Technologies',
    region: 'North America (US)',
    industry: 'Financial Services & Banking',
    enquiry: 'Seeking a dedicated pod of 4 Senior Cloud Data Engineers for our real-time credit scoring pipeline migration to AWS.',
    submitted: 'Aug 26, 2026 · 02:40 PM',
    submittedISO: '2026-08-26T14:40:00'
  },
  {
    id: 2,
    name: 'Rajesh Nair',
    email: 'rajesh.n@trivancore-tech.in',
    organisation: 'Trivancore Industrial Labs',
    region: 'APAC (India)',
    industry: 'Industrial Manufacturing',
    enquiry: 'We require IoT telemetry pipeline development and automated predictive maintenance models for 12 assembly lines.',
    submitted: 'Aug 24, 2026 · 11:20 AM',
    submittedISO: '2026-08-24T11:20:00'
  },
  {
    id: 3,
    name: 'Sofia Bergström',
    email: 'sofia.b@nordicpay.se',
    organisation: 'NordicPay Systems AB',
    region: 'EMEA (Sweden)',
    industry: 'Fintech & Payments',
    enquiry: 'Looking for a specialized audit and implementation team for EU PSD2 / DORA compliance and high-throughput transaction clearing.',
    submitted: 'Aug 21, 2026 · 04:15 PM',
    submittedISO: '2026-08-21T16:15:00'
  },
  {
    id: 4,
    name: 'David Okafor',
    email: 'd.okafor@zenithhealth.ng',
    organisation: 'Zenith Health Solutions',
    region: 'EMEA (Nigeria)',
    industry: 'Healthcare & Life Sciences',
    enquiry: 'Need HIPAA-compliant microservices architecture for telemedicine platform serving 250k active regional patients.',
    submitted: 'Aug 17, 2026 · 09:30 AM',
    submittedISO: '2026-08-17T09:30:00'
  },
  {
    id: 5,
    name: 'Mei Lin Tan',
    email: 'meilin.tan@singalearning.sg',
    organisation: 'SingaLearning Global Pte',
    region: 'APAC (Singapore)',
    industry: 'EdTech & Training',
    enquiry: 'Contract concluded for AI adaptive assessment engine. All deliverables deployed and accepted.',
    submitted: 'Aug 10, 2026 · 01:15 PM',
    submittedISO: '2026-08-10T13:15:00'
  }
];

const GLOBAL_DEFAULT_PARTNERSHIPS = [
  {
    id: 101,
    name: 'Elena Rostova',
    email: 'e.rostova@hyperioncloud.io',
    organisation: 'Hyperion Cloud Infrastructure',
    region: 'North America (US)',
    industry: 'Cloud & DevOps Solutions',
    message: 'Proposing a strategic technology co-selling partnership for enterprise hybrid cloud migrations and joint Kubernetes engineering practice.',
    submitted: 'Aug 27, 2026 · 04:15 PM',
    submittedISO: '2026-08-27T16:15:00'
  },
  {
    id: 102,
    name: 'Marcus Vance',
    email: 'm.vance@vancecap.co.uk',
    organisation: 'Vance Capital Ventures',
    region: 'EMEA (UK)',
    industry: 'Venture Capital & Advisory',
    message: 'Seeking preferred engineering partner status for our portfolio of 18 Series A/B AI and SaaS startups in London and Berlin.',
    submitted: 'Aug 25, 2026 · 01:45 PM',
    submittedISO: '2026-08-25T13:45:00'
  },
  {
    id: 103,
    name: 'Dr. Hiroshi Tanaka',
    email: 'tanaka@tokyo-cyberlabs.jp',
    organisation: 'Tokyo Cyber Security Labs',
    region: 'APAC (Japan)',
    industry: 'Cybersecurity & Defense',
    message: 'Interest in establishing an APAC cross-border joint venture for autonomous threat intelligence and regulatory compliance auditing.',
    submitted: 'Aug 22, 2026 · 10:10 AM',
    submittedISO: '2026-08-22T10:10:00'
  },
  {
    id: 104,
    name: 'Claire Dupont',
    email: 'c.dupont@alliance-digital.fr',
    organisation: 'Alliance Digital Systems',
    region: 'EMEA (France)',
    industry: 'System Integration',
    message: 'Exploring an official channel partnership to deliver FWC engineering pods across French and Benelux enterprise accounts.',
    submitted: 'Aug 18, 2026 · 03:20 PM',
    submittedISO: '2026-08-18T15:20:00'
  }
];

const GLOBAL_DEFAULT_AGENT_REQUESTS = [
  {
    id: 201,
    name: 'Vikram Malhotra',
    email: 'v.malhotra@synthetix.ai',
    organisation: 'Synthetix AI Labs',
    industry: 'Financial Services & Banking',
    agentType: 'Autonomous Risk & Underwriting Agent',
    message: 'We require an autonomous AI agent capable of ingesting financial statements, bank feeds, and credit bureau data to generate automated risk scores and preliminary underwriting memos for SME loan requests.',
    submitted: 'Aug 28, 2026 · 11:30 AM',
    submittedISO: '2026-08-28T11:30:00'
  },
  {
    id: 202,
    name: 'Rachel Adams',
    email: 'rachel.adams@biogenix.com',
    organisation: 'BioGenix Therapeutics',
    industry: 'Healthcare & Life Sciences',
    agentType: 'Clinical Trial Protocol & Triage Agent',
    message: 'Seeking a HIPAA/GDPR-compliant multi-modal AI agent to assist researchers with screening clinical trial candidate profiles, matching genetic biomarkers, and summarising trial inclusion criteria.',
    submitted: 'Aug 26, 2026 · 03:15 PM',
    submittedISO: '2026-08-26T15:15:00'
  },
  {
    id: 203,
    name: 'Karthik Subramanian',
    email: 'karthik.s@kredencelogix.in',
    organisation: 'Kredence Logistics Corp',
    industry: 'Supply Chain & Logistics',
    agentType: 'Supply Chain Dispatch & Route Optimization Agent',
    message: 'Need an agentic workflow that continuously monitors port congestion, weather APIs, and fleet telemetry to autonomously re-route cross-dock container freight and notify dispatch managers.',
    submitted: 'Aug 24, 2026 · 09:45 AM',
    submittedISO: '2026-08-24T09:45:00'
  },
  {
    id: 204,
    name: 'Elena Vasquez',
    email: 'elena.v@novaretail.com',
    organisation: 'NovaRetail Omnichannel',
    industry: 'E-Commerce & Retail',
    agentType: 'Multilingual Customer Support & Sales Agent',
    message: 'Looking to deploy a 24/7 conversational commerce agent on WhatsApp and Web that handles product recommendations, return logistics, and inventory queries in English, Spanish, and French.',
    submitted: 'Aug 20, 2026 · 05:20 PM',
    submittedISO: '2026-08-20T17:20:00'
  },
  {
    id: 205,
    name: 'Tariq Mansoor',
    email: 'tariq@aerologix.ae',
    organisation: 'AeroDynamics Defense Systems',
    industry: 'Aerospace & Defense',
    agentType: 'Automated Code Review & Security Compliance Agent',
    message: 'Seeking an air-gapped on-premises LLM agent to perform static AST code analysis, SBOM verification, and ISO 27001 / DO-178C avionics software safety compliance checks.',
    submitted: 'Aug 15, 2026 · 01:10 PM',
    submittedISO: '2026-08-15T13:10:00'
  }
];

const GLOBAL_DEFAULT_ADMINS = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'superadmin@fwc.com',
    role: 'Super Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    lastActive: 'Just now'
  },
  {
    id: 2,
    name: 'Sarah Jenkins',
    email: 's.jenkins@fwc.com',
    role: 'Recruiter Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastActive: '10 mins ago'
  },
  {
    id: 3,
    name: 'Michael Chen',
    email: 'm.chen@fwc.com',
    role: 'Moderator',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastActive: '1 hour ago'
  },
  {
    id: 4,
    name: 'Priya Nair',
    email: 'p.nair@fwc.com',
    role: 'Editor Admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    lastActive: 'Yesterday'
  }
];

function loadCollection(key, seedData) {
  let masterSeed = seedData;
  if (!masterSeed || (Array.isArray(masterSeed) && masterSeed.length === 0)) {
    if (key === 'fwc-job-listings') masterSeed = GLOBAL_DEFAULT_JOBS;
    else if (key === 'fwc-blog-posts') masterSeed = GLOBAL_DEFAULT_BLOGS;
    else if (key === 'fwc-job-candidates') masterSeed = GLOBAL_DEFAULT_CANDIDATES;
    else if (key === 'fwc-enquiries') masterSeed = GLOBAL_DEFAULT_ENQUIRIES;
    else if (key === 'fwc-partnerships') masterSeed = GLOBAL_DEFAULT_PARTNERSHIPS;
    else if (key === 'fwc-agent-requests') masterSeed = GLOBAL_DEFAULT_AGENT_REQUESTS;
    else if (key === 'fwc-admins') masterSeed = GLOBAL_DEFAULT_ADMINS;
  }

  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Automatically backfill any missing items from masterSeed and enrich missing fields (like pocName, pocEmail)
        if (Array.isArray(masterSeed) && masterSeed.length > 0) {
          let modified = false;
          masterSeed.forEach((seedItem) => {
            const existing = parsed.find((item) => item.id === seedItem.id);
            if (!existing) {
              parsed.push({ ...seedItem });
              modified = true;
            } else {
              Object.keys(seedItem).forEach((k) => {
                if (existing[k] === undefined || existing[k] === null || existing[k] === '') {
                  existing[k] = seedItem[k];
                  modified = true;
                }
              });
            }
          });
          if (modified) {
            localStorage.setItem(key, JSON.stringify(parsed));
          }
        }
        return parsed;
      }
    } catch (e) {
      console.warn(`loadCollection: could not parse stored "${key}", reseeding.`);
    }
  }

  const seeded = (masterSeed || []).map((item) => ({ ...item }));
  if (seeded.length > 0) {
    localStorage.setItem(key, JSON.stringify(seeded));
  }
  return seeded;
}

function saveCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

function initGlobalCollections() {
  try {
    loadCollection('fwc-blog-posts', GLOBAL_DEFAULT_BLOGS);
    loadCollection('fwc-job-listings', GLOBAL_DEFAULT_JOBS);
    loadCollection('fwc-job-candidates', GLOBAL_DEFAULT_CANDIDATES);
    loadCollection('fwc-enquiries', GLOBAL_DEFAULT_ENQUIRIES);
    loadCollection('fwc-partnerships', GLOBAL_DEFAULT_PARTNERSHIPS);
    loadCollection('fwc-agent-requests', GLOBAL_DEFAULT_AGENT_REQUESTS);
    loadCollection('fwc-admins', GLOBAL_DEFAULT_ADMINS);
  } catch (e) {
    console.warn('initGlobalCollections error:', e);
  }
}

// Global window assignments for guaranteed cross-script access
window.GLOBAL_DEFAULT_BLOGS = GLOBAL_DEFAULT_BLOGS;
window.GLOBAL_DEFAULT_JOBS = GLOBAL_DEFAULT_JOBS;
window.GLOBAL_DEFAULT_CANDIDATES = GLOBAL_DEFAULT_CANDIDATES;
window.GLOBAL_DEFAULT_ENQUIRIES = GLOBAL_DEFAULT_ENQUIRIES;
window.GLOBAL_DEFAULT_PARTNERSHIPS = GLOBAL_DEFAULT_PARTNERSHIPS;
window.GLOBAL_DEFAULT_AGENT_REQUESTS = GLOBAL_DEFAULT_AGENT_REQUESTS;
window.GLOBAL_DEFAULT_ADMINS = GLOBAL_DEFAULT_ADMINS;
window.loadCollection = loadCollection;
window.saveCollection = saveCollection;
window.initGlobalCollections = initGlobalCollections;

// Auto-seed immediately on initial script evaluation
initGlobalCollections();

// --------------------------------------------------------------------------
// 02. Toast Notifications
// --------------------------------------------------------------------------

const TOAST_ICONS = {
  success: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/></svg>',
  error: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/></svg>',
  info: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/></svg>'
};

function getToastContainer() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = 'info', duration = 3500) {
  const container = getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</span>
    <span class="toast-message"></span>
    <button type="button" class="toast-close" aria-label="Dismiss notification"><svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg></button>
  `;
  toast.querySelector('.toast-message').textContent = message;

  const dismiss = () => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));
  setTimeout(dismiss, duration);

  return toast;
}

function setFlashToast(message, type = 'success') {
  try {
    sessionStorage.setItem('fwc-flash-toast', JSON.stringify({ message, type }));
  } catch (e) {
    console.warn('Could not set flash toast:', e);
  }
}

function checkFlashToast() {
  try {
    const raw = sessionStorage.getItem('fwc-flash-toast');
    if (raw) {
      sessionStorage.removeItem('fwc-flash-toast');
      const data = JSON.parse(raw);
      if (data && data.message) {
        setTimeout(() => {
          showToast(data.message, data.type || 'success');
        }, 150);
      }
    }
  } catch (e) {
    console.warn('Could not read flash toast:', e);
  }
}

// --------------------------------------------------------------------------
// 03. Form Validation
// --------------------------------------------------------------------------

function setFieldError(field, message) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const errorEl = group.querySelector('.form-error-text');
  if (errorEl && message) errorEl.textContent = message;
}

function clearFieldError(field) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.remove('has-error');
}

function validateForm(formEl) {
  const fields = formEl.querySelectorAll('[required]');
  let isValid = true;

  fields.forEach((field) => {
    clearFieldError(field);

    const value = field.value ? field.value.trim() : (field.innerText ? field.innerText.trim() : '');
    if (!value) {
      setFieldError(field, field.dataset.errorMessage || 'This field is required.');
      isValid = false;
      return;
    }
    if (field.checkValidity && !field.checkValidity()) {
      setFieldError(field, field.dataset.errorMessage || field.validationMessage);
      isValid = false;
    }
  });

  return isValid;
}

function initLiveFieldValidation(formEl) {
  formEl.querySelectorAll('.form-input, .form-select, .form-textarea').forEach((field) => {
    field.addEventListener('input', () => clearFieldError(field));
    field.addEventListener('change', () => clearFieldError(field));
  });
}

// --------------------------------------------------------------------------
// 04. Tabs (Segmented Pill)
// --------------------------------------------------------------------------

function initTabs(container) {
  const tabButtons = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tabs-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabButtons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      panels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.id !== targetId);
      });
    });
  });
}

// --------------------------------------------------------------------------
// 05. Dashboard Shell — Sidebar & Header Popovers
// --------------------------------------------------------------------------

function initSidebarActiveLink() {
  const pathname = (window.location && window.location.pathname) || '';
  const currentPage = pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav-link').forEach((link) => {
    const linkPage = (link.getAttribute('href') || '').split('/').pop();
    const isActive = linkPage === currentPage || (currentPage === '' && linkPage === 'index.html');
    link.classList.toggle('active', isActive);
  });
}

function initSidebarCollapse() {
  const shell = document.querySelector('.dashboard-shell');
  const toggleBtn = document.querySelector('.sidebar-collapse-btn');
  if (!shell || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const collapsed = shell.classList.toggle('sidebar-collapsed');
    toggleBtn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  });
}

function updateSidebarCounts() {
  try {
    const blogs = loadCollection('fwc-blog-posts', GLOBAL_DEFAULT_BLOGS);
    const jobs = loadCollection('fwc-job-listings', GLOBAL_DEFAULT_JOBS);
    const enquiries = loadCollection('fwc-enquiries', GLOBAL_DEFAULT_ENQUIRIES);
    const partnerships = loadCollection('fwc-partnerships', GLOBAL_DEFAULT_PARTNERSHIPS);
    const agentRequests = loadCollection('fwc-agent-requests', GLOBAL_DEFAULT_AGENT_REQUESTS);

    const pendingBlogs = blogs.filter(b => b && (b.status === 'pending' || b.status === 'pending review' || b.status === 'pending_review')).length;
    const pendingJobs = jobs.filter(j => j && (j.status === 'pending' || j.status === 'pending review' || j.status === 'pending_review')).length;
    const totalPending = pendingBlogs + pendingJobs;

    const liveBlogs = blogs.filter(b => b && (b.status === 'published' || b.status === 'draft')).length;
    const liveJobs = jobs.filter(j => j && (j.status === 'published' || j.status === 'draft')).length;
    const totalEnquiries = enquiries.length + partnerships.length + agentRequests.length;

    document.querySelectorAll('.sidebar-nav-link').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('/').pop();
      const label = link.querySelector('.sidebar-nav-label');
      if (!label) return;

      if (href === 'approval-requests.html') {
        label.textContent = `Approval requests (${totalPending > 0 ? totalPending : 5})`;
      } else if (href === 'blog-posts.html') {
        label.textContent = `Blog posts (${liveBlogs > 0 ? liveBlogs : 5})`;
      } else if (href === 'job-listings.html') {
        label.textContent = `Job listings (${liveJobs > 0 ? liveJobs : 6})`;
      } else if (href === 'enquiry.html') {
        label.textContent = `Enquiry (${totalEnquiries > 0 ? totalEnquiries : 14})`;
      }
    });
  } catch (e) {
    console.warn('updateSidebarCounts error:', e);
  }
}

function initPopover(triggerId, panelId) {
  const trigger = document.getElementById(triggerId);
  const panel = document.getElementById(panelId);
  if (!trigger || !panel) return;

  const closeMenu = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    // Close any other open popovers first
    document.querySelectorAll('.header-popover.is-open').forEach((p) => {
      if (p !== panel) {
        p.classList.remove('is-open');
        p.setAttribute('aria-hidden', 'true');
      }
    });
    document.querySelectorAll('[aria-expanded="true"]').forEach((t) => {
      if (t !== trigger && (t.id === 'user-menu-trigger' || t.id === 'notifications-trigger')) {
        t.setAttribute('aria-expanded', 'false');
      }
    });

    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

function initToggleSwitches(root = document) {
  root.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
      input.dispatchEvent(new CustomEvent('fwc:toggle-change', {
        bubbles: true,
        detail: { checked: input.checked, id: input.dataset.adminId }
      }));
    });
  });
}

// --------------------------------------------------------------------------
// 05a. Rich Text Editor Floating Formatting Bar
// --------------------------------------------------------------------------

function initRichTextToolbar(toolbarEl) {
  if (!toolbarEl) return;
  let activeEditable = null;

  document.addEventListener('focusin', (e) => {
    if (e.target.classList && e.target.classList.contains('rich-text-editable')) {
      activeEditable = e.target;
      toolbarEl.classList.add('is-visible');
    } else if (!toolbarEl.contains(e.target)) {
      toolbarEl.classList.remove('is-visible');
      activeEditable = null;
    }
  });

  toolbarEl.querySelectorAll('[data-cmd]').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!activeEditable) return;
      const cmd = btn.dataset.cmd;
      let value;
      if (cmd === 'createLink') {
        value = window.prompt('Enter link URL:');
        if (!value) return;
      }
      document.execCommand(cmd, false, value);
      activeEditable.focus();
    });
  });
}

// --------------------------------------------------------------------------
// 05b. Notifications Data & Render
// --------------------------------------------------------------------------

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'blog',
    title: 'Blog Post Submitted',
    text: 'David Chen submitted "Scaling Distributed Kubernetes" for approval.',
    time: '2 hours ago',
    unread: true,
    url: 'approval-requests.html'
  },
  {
    id: 2,
    type: 'job',
    title: 'Job Requisition Submitted',
    text: 'Site Reliability & Platform Engineer submitted for approval.',
    time: '5 hours ago',
    unread: true,
    url: 'approval-requests.html'
  },
  {
    id: 3,
    type: 'candidate',
    title: 'New Candidate Application',
    text: 'Elena Rostova applied for Senior AI Architect.',
    time: '1 day ago',
    unread: true,
    url: 'job-applicants.html?jobId=3'
  },
  {
    id: 4,
    type: 'enquiry',
    title: 'Enterprise Client Enquiry',
    text: 'Amara Chen (BFSI practice) requested a consultation.',
    time: '2 days ago',
    unread: false,
    url: 'enquiry.html'
  }
];

function getNotificationIcon(type) {
  if (type === 'blog') {
    return `<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"/></svg>`;
  }
  if (type === 'job') {
    return `<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,200H40V72H216V200Z"/></svg>`;
  }
  if (type === 'candidate') {
    return `<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Z"/></svg>`;
  }
  return `<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16"><path d="M216,80H184V48a16,16,0,0,0-16-16H40A16,16,0,0,0,24,48V176a8,8,0,0,0,13,6.22L72,154V184a16,16,0,0,0,16,16h93.59L219,230.22a8,8,0,0,0,5,1.78,8,8,0,0,0,8-8V96A16,16,0,0,0,216,80Z"/></svg>`;
}

function renderNotifications() {
  const list = document.getElementById('notification-list');
  const dot = document.getElementById('notification-dot');
  const unreadCountEl = document.getElementById('notification-unread-count');
  if (!list) return;

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  if (dot) {
    if (unreadCount > 0) {
      dot.classList.remove('hidden');
    } else {
      dot.classList.add('hidden');
    }
  }

  if (unreadCountEl) {
    unreadCountEl.textContent = unreadCount > 0 ? `${unreadCount} new` : '0 new';
  }

  if (NOTIFICATIONS.length === 0) {
    list.innerHTML = '<p class="notification-empty">You\'re all caught up.</p>';
    return;
  }

  list.innerHTML = NOTIFICATIONS.map((n) => `
    <a href="${n.url || '#'}" class="notification-card ${n.unread ? 'unread' : ''}" data-id="${n.id}">
      <div class="notification-icon-wrap type-${n.type || 'blog'}">
        ${getNotificationIcon(n.type)}
      </div>
      <div class="notification-body">
        <div class="notification-title-row">
          <span class="notification-title">${n.title}</span>
          ${n.unread ? '<span class="notification-unread-dot"></span>' : ''}
        </div>
        <p class="notification-text">${n.text}</p>
        <span class="notification-time">${n.time}</span>
      </div>
    </a>
  `).join('');
}

function initNotificationActions() {
  const markAllBtn = document.getElementById('mark-all-read-btn');
  if (markAllBtn) {
    markAllBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      NOTIFICATIONS.forEach((n) => { n.unread = false; });
      renderNotifications();
      showToast('All notifications marked as read', 'success');
    });
  }

  const list = document.getElementById('notification-list');
  if (list) {
    list.addEventListener('click', (e) => {
      const card = e.target.closest('.notification-card');
      if (card) {
        const id = Number(card.dataset.id);
        const item = NOTIFICATIONS.find((n) => n.id === id);
        if (item) {
          item.unread = false;
          renderNotifications();
        }
      }
    });
  }
}

// --------------------------------------------------------------------------
// 06. Table Filtering Engine
// --------------------------------------------------------------------------

const APP_TODAY = new Date('2026-08-30');

function initTableFilters(container) {
  const statusSelect = container.querySelector('[data-role="status-filter"]');
  const dateSelect = container.querySelector('[data-role="date-filter"]');
  const searchInput = container.querySelector('[data-role="search-input"]');

  function applyFilters() {
    const items = container.querySelectorAll('tbody tr[data-status]');
    const statusValue = statusSelect ? statusSelect.value : 'all';
    const dateValue = dateSelect ? dateSelect.value : 'all';
    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';

    items.forEach((item) => {
      const matchesStatus = statusValue === 'all' || item.dataset.status === statusValue;

      let matchesDate = true;
      if (dateValue !== 'all' && item.dataset.date) {
        const diffDays = (APP_TODAY - new Date(item.dataset.date)) / (1000 * 60 * 60 * 24);
        matchesDate = diffDays >= 0 && diffDays <= Number(dateValue);
      }

      const matchesSearch = !searchValue || item.textContent.toLowerCase().includes(searchValue);

      item.classList.toggle('hidden', !(matchesStatus && matchesDate && matchesSearch));
    });

    const selectAll = container.querySelector('.table thead .table-checkbox');
    if (selectAll) selectAll.checked = false;
  }

  if (statusSelect) statusSelect.addEventListener('change', applyFilters);
  if (dateSelect) dateSelect.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  applyFilters();
  return applyFilters;
}

// --------------------------------------------------------------------------
// 07. Table Checkboxes (Select All + Row Highlight Sync)
// --------------------------------------------------------------------------

function initSelectAllCheckboxes(container = document) {
  const tables = container.querySelectorAll('.table');
  tables.forEach((table) => {
    const selectAll = table.querySelector('thead .table-checkbox');
    if (!selectAll) return;

    selectAll.addEventListener('change', () => {
      const rowCheckboxes = table.querySelectorAll('tbody tr:not(.hidden) .table-checkbox');
      rowCheckboxes.forEach((cb) => {
        cb.checked = selectAll.checked;
        const row = cb.closest('tr');
        if (row) row.classList.toggle('is-selected', selectAll.checked);
      });
    });

    table.querySelector('tbody')?.addEventListener('change', (e) => {
      if (!e.target.classList.contains('table-checkbox')) return;
      const row = e.target.closest('tr');
      if (row) row.classList.toggle('is-selected', e.target.checked);

      const visibleCheckboxes = Array.from(table.querySelectorAll('tbody tr:not(.hidden) .table-checkbox'));
      const allChecked = visibleCheckboxes.length > 0 && visibleCheckboxes.every((cb) => cb.checked);
      const someChecked = visibleCheckboxes.some((cb) => cb.checked);
      selectAll.checked = allChecked;
      selectAll.indeterminate = !allChecked && someChecked;
    });
  });
}

// --------------------------------------------------------------------------
// 08. CSV Export Engine (Real CSV Download Generation)
// --------------------------------------------------------------------------

function exportTableToCSV(tableOrSelector, filename = 'export.csv') {
  const table = typeof tableOrSelector === 'string' ? document.querySelector(tableOrSelector) : tableOrSelector;
  if (!table) {
    showToast('No table found to export', 'error');
    return;
  }

  const rows = [];
  const headerCells = table.querySelectorAll('thead th');
  const headers = [];
  headerCells.forEach((th) => {
    if (th.querySelector('.table-checkbox') || th.textContent.trim().toLowerCase() === 'actions') return;
    headers.push(`"${th.textContent.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').replace(/"/g, '""').trim()}"`);
  });
  rows.push(headers.join(','));

  const bodyRows = table.querySelectorAll('tbody tr:not(.hidden)');
  bodyRows.forEach((tr) => {
    if (tr.classList.contains('request-list-empty-row')) return;
    const cells = tr.querySelectorAll('td');
    const row = [];
    cells.forEach((td, idx) => {
      const header = headerCells[idx];
      if (header && (header.querySelector('.table-checkbox') || header.textContent.trim().toLowerCase() === 'actions')) return;
      let text = td.innerText || td.textContent || '';
      text = text.replace(/Read More →/g, '').replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
      row.push(`"${text.replace(/"/g, '""')}"`);
    });
    if (row.length) rows.push(row.join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Exported ${bodyRows.length} records to ${filename}`, 'success');
}

// --------------------------------------------------------------------------
// 08b. Global Header Search Bar & Highlighting Engine
// --------------------------------------------------------------------------

const RECENT_SEARCHES_KEY = 'fwc-recent-searches';
const DEFAULT_RECENT_SEARCHES = [
  'Cybersecurity Analyst',
  'AI in Manufacturing',
  'Elena Rostova',
  'SOC2 Compliance',
  'Cloud Infrastructure'
];

function getRecentSearches() {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Could not parse recent searches:', e);
  }
  return [...DEFAULT_RECENT_SEARCHES];
}

function saveRecentSearches(list) {
  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(list));
  } catch (e) {
    console.warn('Could not save recent searches:', e);
  }
}

function addRecentSearch(term) {
  const trimmed = (term || '').trim();
  if (!trimmed) return;
  let list = getRecentSearches().filter((t) => t.toLowerCase() !== trimmed.toLowerCase());
  list.unshift(trimmed);
  if (list.length > 8) list = list.slice(0, 8);
  saveRecentSearches(list);
}

function removeRecentSearch(term) {
  const trimmed = (term || '').trim().toLowerCase();
  if (!trimmed) return;
  const list = getRecentSearches().filter((t) => t.toLowerCase() !== trimmed);
  saveRecentSearches(list);
}

function clearAllRecentSearches() {
  saveRecentSearches([]);
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function highlightMatch(text, query) {
  if (!text) return '';
  if (!query) return escapeHtml(text);
  const trimmed = query.trim();
  if (!trimmed) return escapeHtml(text);

  const rawTerms = trimmed.split(/\s+/).map((t) => t.trim()).filter((t) => t.length > 0);
  if (!rawTerms.length) return escapeHtml(text);

  // Deduplicate and sort terms by length descending
  const uniqueTerms = Array.from(new Set(rawTerms)).sort((a, b) => b.length - a.length);
  const pattern = uniqueTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  const regex = new RegExp(`(${pattern})`, 'gi');

  const safeText = escapeHtml(text);
  return safeText.replace(regex, '<mark class="global-search-highlight">$1</mark>');
}

function getGlobalSearchSvg(iconClass) {
  switch (iconClass) {
    case 'icon-recent':
      return '<svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15"><path d="M136,80v48a8,8,0,0,1-2.34,5.66l-32,32a8,8,0,0,1-11.32-11.32L120,124.69V80a8,8,0,0,1,16,0Zm96,48A104,104,0,1,1,128,24a103.44,103.44,0,0,1,73.54,30.46l9.8-9.8A8,8,0,0,1,225,50.34l-16,32a8,8,0,0,1-10.66,4.32l-32-16a8,8,0,1,1,7.16-14.32L187.67,63A88,88,0,1,0,216,128a8,8,0,0,1,16,0Z"/></svg>';
    case 'icon-job':
      return '<svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v32H40V72ZM40,120H216v80H40Z"/></svg>';
    case 'icon-blog':
      return '<svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Z"/></svg>';
    case 'icon-applicant':
      return '<svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg>';
    case 'icon-enquiry':
      return '<svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM208,192H48a.27.27,0,0,1-.13,0l67.57-67.57L98.63,107.62,40,154.52V64H216V154.52l-58.63-46.9-16.81,16.81L208,192Z"/></svg>';
    default:
      return '<svg viewBox="0 0 256 256" fill="currentColor" width="15" height="15"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm45.66-133.66a8,8,0,0,0-7.32-2L94.34,92.34a8,8,0,0,0-6,6L76.34,170.34a8,8,0,0,0,9.32,9.32l72-12a8,8,0,0,0,6-6l12-72A8,8,0,0,0,173.66,82.34ZM128,136a8,8,0,1,1,8-8A8,8,0,0,1,128,136Z"/></svg>';
  }
}

function getGlobalSearchDataset() {
  const items = [];

  // 1. Navigation / Quick Links
  items.push(
    {
      id: 'nav-1',
      title: 'Dashboard & Telemetry Overview',
      category: 'Quick Navigation',
      type: 'Dashboard',
      meta: 'Real-time telemetry, active visitors online & moderation stats',
      url: 'index.html',
      iconClass: 'icon-nav'
    },
    {
      id: 'nav-2',
      title: 'Job Listings & Requisitions',
      category: 'Quick Navigation',
      type: 'Directory',
      meta: 'Manage live requisitions, applicants & expiry dates',
      url: 'job-listings.html',
      iconClass: 'icon-job'
    },
    {
      id: 'nav-3',
      title: 'Add New Job Posting',
      category: 'Quick Navigation',
      type: 'Create',
      meta: 'Create and submit new position requisition for approval',
      url: 'add-job-listing.html',
      iconClass: 'icon-job'
    },
    {
      id: 'nav-4',
      title: 'Blog Posts & Articles Directory',
      category: 'Quick Navigation',
      type: 'Directory',
      meta: 'Published articles, draft stories & contributor submissions',
      url: 'blog-posts.html',
      iconClass: 'icon-blog'
    },
    {
      id: 'nav-5',
      title: 'Add New Blog Post',
      category: 'Quick Navigation',
      type: 'Create',
      meta: 'Medium-style writing canvas with category dropdown selector',
      url: 'add-blog-post.html',
      iconClass: 'icon-blog'
    },
    {
      id: 'nav-6',
      title: 'Approval Requests Moderation Queue',
      category: 'Quick Navigation',
      type: 'Moderation',
      meta: 'Review and approve pending blog posts and job requisitions',
      url: 'approval-requests.html',
      iconClass: 'icon-nav'
    },
    {
      id: 'nav-7',
      title: 'Candidates & Resume Archive',
      category: 'Quick Navigation',
      type: 'Directory',
      meta: 'Applied candidate profiles, contact info and PDF resumes',
      url: 'job-applicants.html',
      iconClass: 'icon-applicant'
    },
    {
      id: 'nav-8',
      title: 'Client Inquiries & Partnership Requests',
      category: 'Quick Navigation',
      type: 'Directory',
      meta: 'Service inquiries, enterprise RFPs and partner messages',
      url: 'enquiry.html',
      iconClass: 'icon-enquiry'
    },
    {
      id: 'nav-9',
      title: 'Admin User Management & Roles',
      category: 'Quick Navigation',
      type: 'Admin',
      meta: 'Manage administrator accounts, permissions and access',
      url: 'admin-management.html',
      iconClass: 'icon-nav'
    }
  );

  // 2. Job Listings from Storage or Defaults
  const jobs = typeof loadCollection === 'function' ? loadCollection('fwc-job-listings', []) : [];
  if (jobs.length) {
    jobs.forEach((job) => {
      items.push({
        id: `job-${job.id}`,
        title: job.title,
        category: 'Job Requisitions',
        type: job.type || 'Full-time',
        meta: `${job.department || 'Engineering'} · ${job.location || 'Remote'} · ${job.salary || '$120K–$150K'}`,
        url: `job-listings.html`,
        iconClass: 'icon-job'
      });
    });
  } else {
    items.push(
      {
        id: 'job-1',
        title: 'Cybersecurity Analyst & Threat Hunting Specialist',
        category: 'Job Requisitions',
        type: 'Full-time',
        meta: 'Cybersecurity · Remote · $125,000 – $150,000 / yr',
        url: 'job-listings.html',
        iconClass: 'icon-job'
      },
      {
        id: 'job-2',
        title: 'Senior Technology Consultant & Cloud Architect',
        category: 'Job Requisitions',
        type: 'Full-time',
        meta: 'Technology Consulting · Alhambra, CA · $140,000 – $170,000 / yr',
        url: 'job-listings.html',
        iconClass: 'icon-job'
      },
      {
        id: 'job-3',
        title: 'Senior AI Architect & GenAI Team Lead',
        category: 'Job Requisitions',
        type: 'Full-time',
        meta: 'AI & Advanced Tech · Bangalore, India · $160,000 – $195,000 / yr',
        url: 'job-listings.html',
        iconClass: 'icon-job'
      },
      {
        id: 'job-4',
        title: 'Cloud Infrastructure Engineer',
        category: 'Job Requisitions',
        type: 'Full-time',
        meta: 'Cloud Services · Alhambra, CA · $115,000 – $140,000 / yr',
        url: 'job-listings.html',
        iconClass: 'icon-job'
      },
      {
        id: 'job-5',
        title: 'Blockchain Developer & Smart Contract Auditor',
        category: 'Job Requisitions',
        type: 'Contract',
        meta: 'Blockchain · Remote · $90,000 – $110,000 / yr',
        url: 'job-listings.html',
        iconClass: 'icon-job'
      },
      {
        id: 'job-6',
        title: 'Site Reliability & Platform Engineer',
        category: 'Job Requisitions',
        type: 'Full-time',
        meta: 'Cloud Services · Remote · $140,000 – $170,000 / yr',
        url: 'job-listings.html',
        iconClass: 'icon-job'
      }
    );
  }

  // 3. Blog Posts & Articles
  const blogs = typeof loadCollection === 'function' ? loadCollection('fwc-blog-posts', []) : [];
  if (blogs.length) {
    blogs.forEach((blog) => {
      items.push({
        id: `blog-${blog.id}`,
        title: blog.title,
        category: 'Articles & Insights',
        type: blog.category || 'Article',
        meta: `By ${blog.author || 'FWC Editorial'} · ${blog.category || 'AI'}`,
        url: `blog-posts.html`,
        iconClass: 'icon-blog'
      });
    });
  } else {
    items.push(
      {
        id: 'blog-1',
        title: 'The Future of AI in Manufacturing Supply Chains',
        category: 'Articles & Insights',
        type: 'AI',
        meta: 'By Alex Kim · AI · Supply Chain Optimization',
        url: 'blog-posts.html',
        iconClass: 'icon-blog'
      },
      {
        id: 'blog-2',
        title: '5 Ways Predictive Maintenance Cuts Downtime',
        category: 'Articles & Insights',
        type: 'Manufacturing',
        meta: 'By Sam Patel · Manufacturing · IoT telemetry',
        url: 'blog-posts.html',
        iconClass: 'icon-blog'
      },
      {
        id: 'blog-3',
        title: 'Why Digital Twins Are the Next Big Thing',
        category: 'Articles & Insights',
        type: 'AI',
        meta: 'By Jordan Lee · AI · Enterprise Simulation',
        url: 'blog-posts.html',
        iconClass: 'icon-blog'
      },
      {
        id: 'blog-4',
        title: '5 Signs Your Enterprise Is Ready for AI Staffing',
        category: 'Articles & Insights',
        type: 'AI & Tech Staffing',
        meta: 'By Priya Nair · AI & Tech Staffing · Workforce Strategy',
        url: 'blog-posts.html',
        iconClass: 'icon-blog'
      },
      {
        id: 'blog-5',
        title: 'Building Zero-Trust Teams for Engineering',
        category: 'Articles & Insights',
        type: 'Governance & Compliance',
        meta: 'By Marcus Vance · Governance & Compliance · Zero-Trust',
        url: 'blog-posts.html',
        iconClass: 'icon-blog'
      },
      {
        id: 'blog-6',
        title: 'Scaling Distributed Kubernetes for Enterprise Microservices',
        category: 'Articles & Insights',
        type: 'Cloud & Infrastructure',
        meta: 'By David Chen · Cloud & Infrastructure · Kubernetes',
        url: 'blog-posts.html',
        iconClass: 'icon-blog'
      }
    );
  }

  // 4. Candidates & Resumes
  const candidates = typeof loadCollection === 'function' ? loadCollection('fwc-job-candidates', []) : [];
  if (candidates.length) {
    candidates.forEach((cand) => {
      items.push({
        id: `cand-${cand.id}`,
        title: cand.name,
        category: 'Candidates & Applicants',
        type: 'Candidate',
        meta: `${cand.email} · ${(cand.skills || []).slice(0, 3).join(', ')}`,
        url: `candidate-profile.html?id=${cand.id}&jobId=${cand.jobId || 1}`,
        iconClass: 'icon-applicant'
      });
    });
  } else {
    items.push(
      {
        id: 'cand-101',
        title: 'Elena Rostova',
        category: 'Candidates & Applicants',
        type: 'Candidate',
        meta: 'elena.rostova@techdefense.io · SIEM & Splunk, AWS Security Hub, Threat Hunting',
        url: 'candidate-profile.html?id=101&jobId=1',
        iconClass: 'icon-applicant'
      },
      {
        id: 'cand-102',
        title: 'David Chen',
        category: 'Candidates & Applicants',
        type: 'Candidate',
        meta: 'david.chen@cybermesh.org · DevSecOps, Vulnerability Management, Python',
        url: 'job-applicants.html?jobId=1',
        iconClass: 'icon-applicant'
      },
      {
        id: 'cand-301',
        title: 'Dr. Vikram Malhotra',
        category: 'Candidates & Applicants',
        type: 'Candidate',
        meta: 'vikram.malhotra@neuralscale.ai · LLM Orchestration, RAG, PyTorch',
        url: 'job-applicants.html?jobId=3',
        iconClass: 'icon-applicant'
      },
      {
        id: 'cand-302',
        title: 'Ananya Deshmukh',
        category: 'Candidates & Applicants',
        type: 'Candidate',
        meta: 'ananya.deshmukh@genai-systems.io · LangGraph, vLLM, Fine-tuning',
        url: 'job-applicants.html?jobId=3',
        iconClass: 'icon-applicant'
      },
      {
        id: 'cand-401',
        title: 'Liam O\'Connor',
        category: 'Candidates & Applicants',
        type: 'Candidate',
        meta: 'liam.oconnor@cloudinfra.io · Terraform, Kubernetes, AWS Multi-Account',
        url: 'job-applicants.html?jobId=4',
        iconClass: 'icon-applicant'
      }
    );
  }

  // 5. Inquiries & Requests
  const enquiries = typeof loadCollection === 'function' ? loadCollection('fwc-enquiries', []) : [];
  if (enquiries.length) {
    enquiries.forEach((enq) => {
      items.push({
        id: `enq-${enq.id}`,
        title: enq.company ? `${enq.name} (${enq.company})` : enq.name,
        category: 'Client Inquiries',
        type: enq.service || 'Service Request',
        meta: `${enq.service || 'Consulting'} · ${enq.email}`,
        url: 'enquiry.html',
        iconClass: 'icon-enquiry'
      });
    });
  } else {
    items.push(
      {
        id: 'enq-1',
        title: 'Nexus Health Systems — Cloud Security Enterprise RFP',
        category: 'Client Inquiries',
        type: 'Enterprise RFP',
        meta: 'Cybersecurity Consulting · rfp@nexushealth.org',
        url: 'enquiry.html',
        iconClass: 'icon-enquiry'
      },
      {
        id: 'enq-2',
        title: 'Apex Manufacturing Corp — GenAI Supply Chain Optimization',
        category: 'Client Inquiries',
        type: 'Consulting',
        meta: 'AI & Advanced Tech · innovation@apexmanuf.com',
        url: 'enquiry.html',
        iconClass: 'icon-enquiry'
      }
    );
  }

  return items;
}

function renderGlobalSearchResults(query, container) {
  if (!container) return;
  const q = (query || '').trim();

  // If query is empty -> render Recent Searches on the surface
  if (!q) {
    const recents = getRecentSearches();

    if (recents.length === 0) {
      container.innerHTML = `
        <div class="global-search-empty">
          <svg class="global-search-empty-icon" viewBox="0 0 256 256" fill="currentColor" width="32" height="32"><path d="M136,80v48a8,8,0,0,1-2.34,5.66l-32,32a8,8,0,0,1-11.32-11.32L120,124.69V80a8,8,0,0,1,16,0Zm96,48A104,104,0,1,1,128,24a103.44,103.44,0,0,1,73.54,30.46l9.8-9.8A8,8,0,0,1,225,50.34l-16,32a8,8,0,0,1-10.66,4.32l-32-16a8,8,0,1,1,7.16-14.32L187.67,63A88,88,0,1,0,216,128a8,8,0,0,1,16,0Z"/></svg>
          <div class="global-search-empty-title">No recent searches</div>
          <div class="global-search-empty-subtext">Search across jobs, blog posts, candidates, and client inquiries.</div>
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="global-search-section">
        <div class="global-search-section-header">
          <span>Recent Searches</span>
          <button type="button" class="global-search-clear-all-btn" id="global-search-clear-recents">Clear all</button>
        </div>
        <div class="global-search-recents-list">
          ${recents.map((term) => `
            <div class="global-search-item global-search-recent-item" data-recent-term="${escapeHtml(term)}" role="button" tabindex="0">
              <div class="global-search-item-left">
                <div class="global-search-item-icon icon-recent">
                  ${getGlobalSearchSvg('icon-recent')}
                </div>
                <div class="global-search-item-details">
                  <span class="global-search-item-title">${escapeHtml(term)}</span>
                </div>
              </div>
              <div class="global-search-recent-right">
                <span class="global-search-item-badge">Recent</span>
                <button type="button" class="global-search-remove-recent-btn" data-remove-recent="${escapeHtml(term)}" title="Remove from recent searches" aria-label="Remove ${escapeHtml(term)}">
                  <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    return;
  }

  // If query is present -> filter items and highlight matching words
  const dataset = getGlobalSearchDataset();
  const qLower = q.toLowerCase();

  const matches = dataset.filter((item) => {
    return (
      item.title.toLowerCase().includes(qLower) ||
      item.meta.toLowerCase().includes(qLower) ||
      item.type.toLowerCase().includes(qLower) ||
      item.category.toLowerCase().includes(qLower)
    );
  });

  if (!matches.length) {
    container.innerHTML = `
      <div class="global-search-empty">
        <svg class="global-search-empty-icon" viewBox="0 0 256 256" fill="currentColor" width="32" height="32"><path d="M229.66,218.34,187.32,176a92.14,92.14,0,1,0-11.31,11.31l42.34,42.35a8,8,0,0,0,11.31-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/></svg>
        <div class="global-search-empty-title">No matching results</div>
        <div class="global-search-empty-subtext">No records found for "<strong>${escapeHtml(q)}</strong>". Try searching for jobs, candidates, or articles.</div>
      </div>
    `;
    return;
  }

  // Group matches by category
  const grouped = {};
  matches.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  let html = '';
  Object.keys(grouped).forEach((cat) => {
    const list = grouped[cat];
    html += `
      <div class="global-search-section">
        <div class="global-search-section-header">
          <span>${cat} (${list.length})</span>
        </div>
        ${list.map((item) => `
          <a href="${item.url}" class="global-search-item" data-search-title="${escapeHtml(item.title)}">
            <div class="global-search-item-left">
              <div class="global-search-item-icon ${item.iconClass}">
                ${getGlobalSearchSvg(item.iconClass)}
              </div>
              <div class="global-search-item-details">
                <span class="global-search-item-title">${highlightMatch(item.title, q)}</span>
                <span class="global-search-item-meta">${highlightMatch(item.meta, q)}</span>
              </div>
            </div>
            <span class="global-search-item-badge">${escapeHtml(item.type)}</span>
          </a>
        `).join('')}
      </div>
    `;
  });

  container.innerHTML = html;
}

function initGlobalHeaderSearch() {
  const headerActions = document.querySelector('.dashboard-header .header-actions');
  if (!headerActions) return;

  // Check if search anchor is already present in HTML
  let searchAnchor = document.getElementById('global-search-anchor');
  if (!searchAnchor) {
    searchAnchor = document.createElement('div');
    searchAnchor.className = 'popover-anchor global-search-anchor';
    searchAnchor.id = 'global-search-anchor';
    searchAnchor.innerHTML = `
      <div class="global-search-bar" id="global-search-bar">
        <svg class="global-search-icon" viewBox="0 0 256 256" fill="currentColor" width="15" height="15" aria-hidden="true">
          <path d="M229.66,218.34,187.32,176a92.14,92.14,0,1,0-11.31,11.31l42.34,42.35a8,8,0,0,0,11.31-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"/>
        </svg>
        <input 
          type="search" 
          class="global-search-input" 
          id="global-search-input" 
          placeholder="Search platform..." 
          autocomplete="off" 
          spellcheck="false"
          aria-label="Global search across platform"
          aria-expanded="false"
          aria-controls="global-search-popover"
        >
        <div class="global-search-shortcuts">
          <button type="button" class="global-search-clear-btn hidden" id="global-search-clear" aria-label="Clear search">
            <svg viewBox="0 0 256 256" fill="currentColor" width="11" height="11"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg>
          </button>
          <kbd class="global-search-kbd" id="global-search-kbd">⌘K</kbd>
        </div>
      </div>

      <div class="header-popover global-search-popover" id="global-search-popover" aria-hidden="true">
        <div class="global-search-results-wrap" id="global-search-results-wrap"></div>
        <div class="global-search-footer">
          <div class="flex items-center gap-3">
            <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
            <span><kbd>esc</kbd> close</span>
          </div>
          <span class="search-meta-hint">Instant platform search</span>
        </div>
      </div>
    `;

    // Insert at the beginning of headerActions (to the left of notifications icon)
    headerActions.insertBefore(searchAnchor, headerActions.firstChild);
  }

  const searchInput = document.getElementById('global-search-input');
  const searchPopover = document.getElementById('global-search-popover');
  const searchResultsWrap = document.getElementById('global-search-results-wrap');
  const searchClearBtn = document.getElementById('global-search-clear');
  const searchBar = document.getElementById('global-search-bar');

  if (!searchInput || !searchPopover || !searchResultsWrap) return;

  let activeIndex = -1;

  function updateActiveItem(items, newIndex) {
    items.forEach((it) => it.classList.remove('is-active'));
    if (newIndex >= 0 && newIndex < items.length) {
      activeIndex = newIndex;
      const target = items[activeIndex];
      target.classList.add('is-active');
      target.scrollIntoView({ block: 'nearest' });
    } else {
      activeIndex = -1;
    }
  }

  function openSearchPopover() {
    // Close other popovers first
    document.querySelectorAll('.header-popover.is-open').forEach((p) => {
      if (p !== searchPopover) {
        p.classList.remove('is-open');
        p.setAttribute('aria-hidden', 'true');
      }
    });

    searchPopover.classList.add('is-open');
    searchPopover.setAttribute('aria-hidden', 'false');
    searchInput.setAttribute('aria-expanded', 'true');
    searchBar?.classList.add('is-focused');
    activeIndex = -1;
    renderGlobalSearchResults(searchInput.value, searchResultsWrap);
  }

  function closeSearchPopover() {
    searchPopover.classList.remove('is-open');
    searchPopover.setAttribute('aria-hidden', 'true');
    searchInput.setAttribute('aria-expanded', 'false');
    searchBar?.classList.remove('is-focused');
    activeIndex = -1;
  }

  // Open popover on input click / focus
  searchInput.addEventListener('focus', openSearchPopover);
  searchInput.addEventListener('click', (e) => {
    e.stopPropagation();
    openSearchPopover();
  });

  searchBar?.addEventListener('click', (e) => {
    if (e.target !== searchClearBtn && !searchClearBtn?.contains(e.target)) {
      e.stopPropagation();
      searchInput.focus();
      openSearchPopover();
    }
  });

  searchPopover.addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // Live typing search with matching highlights
  searchInput.addEventListener('input', () => {
    const val = searchInput.value;
    if (searchClearBtn) {
      searchClearBtn.classList.toggle('hidden', !val);
    }
    if (!searchPopover.classList.contains('is-open')) {
      openSearchPopover();
    }
    activeIndex = -1;
    renderGlobalSearchResults(val, searchResultsWrap);
  });

  // Handle keyboard navigation inside search input (ArrowUp, ArrowDown, Enter)
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearchPopover();
      searchInput.blur();
      return;
    }

    if (!searchPopover.classList.contains('is-open')) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        openSearchPopover();
        return;
      }
    }

    const items = Array.from(searchResultsWrap.querySelectorAll('.global-search-item, .global-search-chip'));
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = activeIndex < items.length - 1 ? activeIndex + 1 : 0;
      updateActiveItem(items, nextIndex);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = activeIndex > 0 ? activeIndex - 1 : items.length - 1;
      updateActiveItem(items, prevIndex);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeIndex >= 0 && items[activeIndex]) {
        items[activeIndex].click();
      } else if (items.length > 0) {
        items[0].click();
      } else if (searchInput.value.trim()) {
        addRecentSearch(searchInput.value.trim());
        closeSearchPopover();
      }
    }
  });

  // Clear button
  searchClearBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    searchInput.value = '';
    searchClearBtn.classList.add('hidden');
    searchInput.focus();
    activeIndex = -1;
    renderGlobalSearchResults('', searchResultsWrap);
  });

  // Delegate click for recent search items, remove buttons, and search results
  searchResultsWrap.addEventListener('click', (e) => {
    // 1. Remove individual recent search item
    const removeBtn = e.target.closest('[data-remove-recent]');
    if (removeBtn) {
      e.stopPropagation();
      e.preventDefault();
      const term = removeBtn.dataset.removeRecent;
      removeRecentSearch(term);
      activeIndex = -1;
      renderGlobalSearchResults(searchInput.value, searchResultsWrap);
      return;
    }

    // 2. Clear all recents
    const clearRecentsBtn = e.target.closest('#global-search-clear-recents');
    if (clearRecentsBtn) {
      e.stopPropagation();
      e.preventDefault();
      clearAllRecentSearches();
      activeIndex = -1;
      renderGlobalSearchResults('', searchResultsWrap);
      return;
    }

    // 3. Click recent search item on the surface
    const recentItem = e.target.closest('.global-search-recent-item');
    if (recentItem) {
      e.stopPropagation();
      const term = recentItem.dataset.recentTerm;
      searchInput.value = term;
      if (searchClearBtn) searchClearBtn.classList.remove('hidden');
      searchInput.focus();
      activeIndex = -1;
      renderGlobalSearchResults(term, searchResultsWrap);
      return;
    }

    // 4. Click search result item
    const item = e.target.closest('.global-search-item');
    if (item) {
      const searchTitle = item.dataset.searchTitle || searchInput.value;
      if (searchTitle) addRecentSearch(searchTitle);
      closeSearchPopover();
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchAnchor.contains(e.target)) {
      closeSearchPopover();
    }
  });

  // Global shortcuts (⌘K, Ctrl+K, /)
  document.addEventListener('keydown', (e) => {
    // ⌘K or Ctrl+K opens global search
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      searchInput.focus();
      searchInput.select();
      openSearchPopover();
      return;
    }

    if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
      e.preventDefault();
      searchInput.focus();
      openSearchPopover();
      return;
    }
  });
}

// --------------------------------------------------------------------------
// 09. Auto Initialization
// --------------------------------------------------------------------------

function initGlobalApp() {
  try { initGlobalCollections(); } catch (e) { console.warn('initGlobalCollections:', e); }
  try { checkFlashToast(); } catch (e) { console.warn('checkFlashToast:', e); }
  try { initSidebarActiveLink(); } catch (e) { console.warn('initSidebarActiveLink:', e); }
  try { initSidebarCollapse(); } catch (e) { console.warn('initSidebarCollapse:', e); }
  try { updateSidebarCounts(); } catch (e) { console.warn('updateSidebarCounts:', e); }
  try { initGlobalHeaderSearch(); } catch (e) { console.warn('initGlobalHeaderSearch:', e); }
  try { initPopover('user-menu-trigger', 'user-menu-panel'); } catch (e) { console.warn('initPopover user-menu:', e); }
  try { initPopover('notifications-trigger', 'notifications-panel'); } catch (e) { console.warn('initPopover notifications:', e); }
  try { initModalTriggers(); } catch (e) { console.warn('initModalTriggers:', e); }
  try { initDrawerTriggers(); } catch (e) { console.warn('initDrawerTriggers:', e); }
  try { initToggleSwitches(); } catch (e) { console.warn('initToggleSwitches:', e); }
  try { initSelectAllCheckboxes(); } catch (e) { console.warn('initSelectAllCheckboxes:', e); }
  try { renderNotifications(); } catch (e) { console.warn('renderNotifications:', e); }
  try { initNotificationActions(); } catch (e) { console.warn('initNotificationActions:', e); }

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => showToast('You have been logged out.', 'info'));
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGlobalApp);
} else {
  initGlobalApp();
}
