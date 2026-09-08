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
    id: 201,
    jobId: 2,
    fullName: 'Siddharth Rao',
    name: 'Siddharth Rao',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    dob: '18 Nov 1991',
    age: '34 Yrs',
    countryCode: '+1',
    phone: '+1 (626) 714-8830',
    currentLocation: 'Pasadena, CA',
    email: 'siddharth.rao@advisorycloud.com',
    linkedinUrl: 'https://linkedin.com/in/siddharth-rao-cloud',
    portfolioUrl: 'https://siddharthrao.dev',
    resumeFileName: 'siddharth-rao-tech-consultant.pdf',
    resumeFileSize: '1.5 MB',
    totalExp: '7.5 Years',
    designation: 'Lead Cloud Strategy Consultant',
    highestDegree: 'M.S. Industrial Systems – UCLA',
    prefLocationsSummary: 'Pasadena / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Deloitte Consulting LLP',
    fieldIndustry: 'Enterprise Technology & Advisory',
    noticePeriod: '30 Days',
    currentCtc: '$140,000 / yr',
    expectedCtc: '$165,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Remote'],
    preferredLocations: ['Pasadena, CA', 'Remote / Hybrid'],
    appliedOn: 'Aug 25, 2026',
    status: 'Screening',
    workExperience: [
      {
        jobTitle: 'Lead Cloud Strategy Consultant',
        companyName: 'Deloitte Consulting LLP',
        employmentType: 'Full-time',
        location: 'Los Angeles, CA',
        startDate: 'Mar 2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          'Advised C-suite leadership on a $15M multi-year digital transformation and legacy migration roadmap for Fortune 500 manufacturing clients.',
          'Structured agile pod delivery governance improving sprint velocity by 35% across 4 cross-functional engineering teams.',
          'Conducted comprehensive TCO and cloud ROI financial models reducing infrastructure expenditures by 22%.'
        ]
      },
      {
        jobTitle: 'Senior Systems Integration Engineer',
        companyName: 'Accenture Technology Solutions',
        employmentType: 'Full-time',
        location: 'San Jose, CA',
        startDate: 'Jan 2019',
        endDate: 'Feb 2022',
        currentlyWorkingHere: false,
        period: '2019 – 2022',
        description: [
          'Designed hybrid cloud migration strategies integrating monolithic SAP ERP platforms with AWS serverless microservices.',
          'Authored reusable infrastructure-as-code deployment blueprints using Terraform and Docker.'
        ]
      }
    ],
    education: [
      {
        university: 'University of California, Los Angeles (UCLA)',
        degree: 'M.S.',
        courseMajor: 'Industrial Systems Engineering',
        startDate: 'Aug 2016',
        endDate: 'May 2018',
        gradeCgpa: '3.92 GPA'
      },
      {
        university: 'University of California, Berkeley',
        degree: 'B.S.',
        courseMajor: 'Computer Science',
        startDate: 'Aug 2012',
        endDate: 'May 2016',
        gradeCgpa: '3.85 GPA'
      }
    ],
    skills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'AWS Solutions Architect', 'Agile Pod Leadership', 'Financial ROI Modeling', 'Terraform', 'Kubernetes'],
    history: [
      { text: 'Technical screening round scheduled with Hiring Manager', time: 'Aug 26, 2026 • 11:30 AM', active: true },
      { text: 'Candidate profile shortlisted by Lead Recruiter', time: 'Aug 25, 2026 • 03:45 PM', active: false },
      { text: 'Application received via FWC Career Portal', time: 'Aug 25, 2026 • 01:20 PM', active: false }
    ],
    comments: [
      {
        author: 'Lead Recruiter',
        role: 'Talent Acquisition',
        date: 'Aug 25',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Strong enterprise consulting background with Fortune 500 migration case studies. Recommended for Screening round.'
      }
    ]
  },
  {
    id: 100,
    jobId: 2,
    fullName: 'John Doe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    dob: '15 Mar 1993',
    age: '33 Yrs',
    countryCode: '+1',
    phone: '+1 (234) 567-890',
    currentLocation: 'San Francisco, CA',
    email: 'john.doe@example.com',
    linkedinUrl: 'https://linkedin.com/in/johndoe-developer',
    portfolioUrl: 'https://johndoe.dev',
    resumeFileName: 'john-doe-senior-developer.pdf',
    resumeFileSize: '1.4 MB',
    totalExp: '5.2 Years',
    designation: 'Senior Frontend Developer',
    highestDegree: 'B.Tech Computer Science – MIT',
    prefLocationsSummary: 'Remote / SF Bay Area',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Infosys Pvt. Ltd.',
    fieldIndustry: 'Information Technology',
    noticePeriod: '30 Days',
    currentCtc: '$120,000 / yr',
    expectedCtc: '$150,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Remote'],
    preferredLocations: ['San Francisco, CA', 'Remote'],
    appliedOn: 'Oct 01, 2025',
    status: 'Rejected',
    workExperience: [
      {
        jobTitle: 'Senior Frontend Developer',
        companyName: 'Infosys Pvt. Ltd.',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Mar 2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          'Led modern React micro-frontend architecture modernization for Fortune 500 retail portal.',
          'Reduced core web vitals LCP from 3.2s to 1.1s across 1.4M monthly active sessions.',
          'Mentored 6 junior engineers and authored reusable TypeScript component library.'
        ]
      },
      {
        jobTitle: 'Frontend UI Engineer',
        companyName: 'Apex Digital Labs',
        employmentType: 'Full-time',
        location: 'Chicago, IL',
        startDate: 'Jan 2020',
        endDate: 'Feb 2022',
        currentlyWorkingHere: false,
        period: '2020 – 2022',
        description: [
          'Built responsive design system using Tailwind CSS and Figma tokens.',
          'Integrated GraphQL APIs with Apollo client caching for sub-100ms UI rendering.'
        ]
      }
    ],
    education: [
      {
        university: 'Massachusetts Institute of Technology (MIT)',
        degree: 'B.Tech',
        courseMajor: 'Computer Science',
        startDate: 'Aug 2016',
        endDate: 'May 2020',
        gradeCgpa: '3.88 GPA'
      }
    ],
    skills: ['React & Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Redux Toolkit', 'Jest & Cypress', 'UI/UX Design', 'Performance Optimization'],
    history: [
      { text: 'Hiring Manager rejected this candidate', time: 'Oct 15, 2025 • 09:45 AM', active: true },
      { text: 'The profile was updated by System', time: 'Oct 14, 2025 • 02:15 PM', active: false },
      { text: 'Candidate applied for this position', time: 'Oct 01, 2025 • 11:00 AM', active: false }
    ],
    comments: [
      {
        author: 'Hiring Manager',
        role: 'Engineering Lead',
        date: 'Oct 15',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Candidate was good technically but didn\'t fit the team culture.'
      }
    ]
  },
  {
    id: 301,
    jobId: 3,
    fullName: 'Dr. Vikram Malhotra',
    name: 'Dr. Vikram Malhotra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    dob: '22 Apr 1989',
    age: '37 Yrs',
    countryCode: '+91',
    phone: '+91 98450 12890',
    currentLocation: 'Bangalore, India',
    email: 'vikram.malhotra@neuralscale.ai',
    linkedinUrl: 'https://linkedin.com/in/dr-vikram-malhotra-ai',
    portfolioUrl: 'https://neuralscale.ai/research/v-malhotra',
    resumeFileName: 'dr-vikram-malhotra-ai-architect.pdf',
    resumeFileSize: '1.8 MB',
    totalExp: '9.5 Years',
    designation: 'Principal AI Architect',
    highestDegree: 'Ph.D. Computer Science (NLP) – IISc Bangalore',
    prefLocationsSummary: 'Bangalore / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Cognitive Intelligence Labs',
    fieldIndustry: 'Artificial Intelligence & Deep Tech',
    noticePeriod: '15 Days',
    currentCtc: '₹42,00,000 / yr',
    expectedCtc: '₹55,00,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid'],
    preferredLocations: ['Bangalore, India', 'Remote'],
    appliedOn: 'Aug 22, 2026',
    status: 'Interviewing',
    workExperience: [
      {
        jobTitle: 'Principal AI & LLM Systems Architect',
        companyName: 'Cognitive Intelligence Labs',
        employmentType: 'Full-time',
        location: 'Bangalore, India',
        startDate: 'Jun 2021',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2021 – Present',
        description: [
          'Architected high-throughput RAG pipelines and domain-adapted LLM serving clusters using vLLM and TensorRT-LLM.',
          'Reduced model inference latency by 55% while serving 12M daily enterprise token requests.',
          'Authored 4 patents in multi-agent orchestration and automated synthetic data generation.'
        ]
      },
      {
        jobTitle: 'Lead Machine Learning Research Scientist',
        companyName: 'Samsung AI Research',
        employmentType: 'Full-time',
        location: 'Bangalore, India',
        startDate: 'Jul 2017',
        endDate: 'May 2021',
        currentlyWorkingHere: false,
        period: '2017 – 2021',
        description: [
          'Led core NLP research group developing on-device translation and intent extraction models.',
          'Published 6 peer-reviewed papers at ACL, EMNLP, and NeurIPS conferences.'
        ]
      }
    ],
    education: [
      {
        university: 'Indian Institute of Science (IISc), Bangalore',
        degree: 'Ph.D.',
        courseMajor: 'Computer Science (Natural Language Processing)',
        startDate: 'Aug 2013',
        endDate: 'May 2017',
        gradeCgpa: '4.00 GPA'
      },
      {
        university: 'Indian Institute of Technology (IIT), Madras',
        degree: 'B.Tech',
        courseMajor: 'Computer Science & Engineering',
        startDate: 'Aug 2009',
        endDate: 'May 2013',
        gradeCgpa: '9.4 / 10 CGPA'
      }
    ],
    skills: ['Large Language Models (LLM)', 'RAG Frameworks', 'PyTorch', 'vLLM & TensorRT', 'LangChain / LlamaIndex', 'Vector Databases (Pinecone / Milvus)', 'Kubernetes MLOps'],
    history: [
      { text: 'Final Round Partner Interview scheduled', time: 'Aug 28, 2026 • 02:00 PM', active: true },
      { text: 'Candidate passed Technical Architecture Assessment (Score: 98%)', time: 'Aug 26, 2026 • 05:30 PM', active: false },
      { text: 'Application submitted for Senior AI Architect', time: 'Aug 22, 2026 • 09:15 AM', active: false }
    ],
    comments: [
      {
        author: 'Chief Technology Officer',
        role: 'Executive Review',
        date: 'Aug 28',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Exceptional deep tech and LLM systems background. Prime candidate for our AI Delivery Practice leadership.'
      }
    ]
  },
  {
    id: 101,
    jobId: 1,
    fullName: 'Elena Rostova',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    dob: '12 Sep 1994',
    age: '32 Yrs',
    countryCode: '+1',
    phone: '+1 (415) 892-3401',
    currentLocation: 'San Francisco, CA',
    email: 'elena.rostova@techdefense.io',
    linkedinUrl: 'https://linkedin.com/in/elena-rostova-sec',
    portfolioUrl: 'https://elenarostova.security',
    resumeFileName: 'elena-rostova-cybersecurity-resume.pdf',
    resumeFileSize: '1.2 MB',
    totalExp: '5.8 Years',
    designation: 'Threat Intelligence Lead',
    highestDegree: 'B.S. Computer Science – UC Berkeley',
    prefLocationsSummary: 'San Francisco, CA / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Vanguard Cyber Systems',
    fieldIndustry: 'Information Security & Cloud Defense',
    noticePeriod: '15 Days',
    currentCtc: '$130,000 / yr',
    expectedCtc: '$150,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid'],
    preferredLocations: ['San Francisco, CA', 'Remote'],
    appliedOn: 'Aug 28, 2026',
    status: 'Under Review',
    workExperience: [
      {
        jobTitle: 'Threat Intelligence Lead',
        companyName: 'Vanguard Cyber Systems',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Mar 2023',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2023 – Present',
        description: [
          'Led continuous 24/7 security event telemetry triage across 4,000+ cloud instances reducing MTTD by 40%.',
          'Architected automated Splunk Phantom SOAR playbooks for rapid zero-day isolation and quarantine.',
          'Spearheaded annual SOC2 Type II and ISO 27001 external audit defense with zero critical findings.'
        ]
      },
      {
        jobTitle: 'SOC Security Analyst',
        companyName: 'Apex Cloud Defense',
        employmentType: 'Full-time',
        location: 'San Jose, CA',
        startDate: 'Feb 2021',
        endDate: 'Feb 2023',
        currentlyWorkingHere: false,
        period: '2021 – 2023',
        description: [
          'Monitored AWS GuardDuty and Security Hub alerts; triaged over 200 suspicious telemetry vectors monthly.',
          'Conducted threat simulation drills and authoring post-incident forensic root cause analyses.'
        ]
      }
    ],
    education: [
      {
        university: 'University of California, Berkeley (UC Berkeley)',
        degree: 'B.S.',
        courseMajor: 'Computer Science & Information Assurance',
        startDate: 'Aug 2017',
        endDate: 'May 2021',
        gradeCgpa: '3.84 GPA'
      }
    ],
    skills: ['SIEM & Splunk (Expert)', 'AWS Security Hub', 'SOC2 / HIPAA Audit Readiness', 'Threat Hunting', 'Zero-Trust IAM', 'Python & Bash Automation'],
    history: [
      { text: 'Profile assigned to Cybersecurity Lead for initial review', time: 'Aug 29, 2026 • 10:30 AM', active: true },
      { text: 'Application submitted via FWC website', time: 'Aug 28, 2026 • 10:15 AM', active: false }
    ],
    comments: [
      {
        author: 'Lead Recruiter',
        role: 'Talent Acquisition',
        date: 'Aug 28',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Strong hands-on Splunk and SOC2 audit track record. Fits the Cybersecurity Analyst requisition well.'
      }
    ]
  },
  {
    id: 202,
    jobId: 2,
    fullName: 'Claire Dupont',
    name: 'Claire Dupont',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    dob: '05 Jun 1992',
    age: '34 Yrs',
    countryCode: '+1',
    phone: '+1 (415) 390-2184',
    currentLocation: 'San Francisco, CA',
    email: 'claire.dupont@modernscale.com',
    linkedinUrl: 'https://linkedin.com/in/claire-dupont-arch',
    portfolioUrl: 'https://clairedupont.tech',
    resumeFileName: 'claire-dupont-solutions-architect.pdf',
    resumeFileSize: '1.6 MB',
    totalExp: '8.0 Years',
    designation: 'Principal Solutions Architect',
    highestDegree: 'M.S. Software Engineering – Stanford',
    prefLocationsSummary: 'San Francisco / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'CloudScale Technologies',
    fieldIndustry: 'Enterprise Software & Cloud Platforms',
    noticePeriod: '30 Days',
    currentCtc: '$155,000 / yr',
    expectedCtc: '$175,000 / yr',
    preferredEmploymentTypes: ['Full-time'],
    preferredLocations: ['San Francisco, CA', 'Remote'],
    appliedOn: 'Aug 24, 2026',
    status: 'Shortlisted',
    workExperience: [
      {
        jobTitle: 'Principal Solutions Architect',
        companyName: 'CloudScale Technologies',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Apr 2021',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2021 – Present',
        description: [
          'Authored modernization architecture blueprints for 8 enterprise manufacturing clients converting legacy monolithic apps to Kubernetes microservices.',
          'Led architecture review boards ensuring compliance with SOC2 Type II, ISO 27001, and HIPAA.'
        ]
      },
      {
        jobTitle: 'Senior Cloud Consultant',
        companyName: 'PwC Technology Advisory',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Aug 2018',
        endDate: 'Mar 2021',
        currentlyWorkingHere: false,
        period: '2018 – 2021',
        description: [
          'Led multi-cloud AWS and Azure migration strategies for Fortune 500 manufacturing supply chain clients.',
          'Automated CI/CD delivery pipelines saving client engineering teams 40+ hours per release cycle.'
        ]
      }
    ],
    education: [
      {
        university: 'Stanford University',
        degree: 'M.S.',
        courseMajor: 'Software Engineering',
        startDate: 'Sep 2016',
        endDate: 'Jun 2018',
        gradeCgpa: '3.90 GPA'
      },
      {
        university: 'UC Berkeley',
        degree: 'B.S.',
        courseMajor: 'Computer Science',
        startDate: 'Sep 2012',
        endDate: 'Jun 2016',
        gradeCgpa: '3.82 GPA'
      }
    ],
    skills: ['Enterprise Architecture', 'Cloud Modernization', 'Kubernetes / EKS', 'AWS Solutions Architect Professional', 'Terraform', 'Agile Pod Leadership'],
    history: [
      { text: 'Candidate shortlisted for Round 1 Interview', time: 'Aug 25, 2026 • 04:30 PM', active: true },
      { text: 'Application submitted via Referral link', time: 'Aug 24, 2026 • 09:45 AM', active: false }
    ],
    comments: [
      {
        author: 'Recruiting Lead',
        role: 'Talent Acquisition',
        date: 'Aug 25',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Top tier architecture candidate with Stanford Master’s and excellent client delivery record. Shortlisted.'
      }
    ]
  },
  {
    id: 302,
    jobId: 3,
    fullName: 'Ananya Deshmukh',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    dob: '14 Feb 1993',
    age: '33 Yrs',
    countryCode: '+91',
    phone: '+91 97110 44521',
    currentLocation: 'Bangalore, India',
    email: 'ananya.deshmukh@genai-labs.co',
    linkedinUrl: 'https://linkedin.com/in/ananya-deshmukh-ml',
    portfolioUrl: 'https://ananyadeshmukh.ai',
    resumeFileName: 'ananya-deshmukh-ai-engineer.pdf',
    resumeFileSize: '1.4 MB',
    totalExp: '6.5 Years',
    designation: 'Lead Generative AI Research Engineer',
    highestDegree: 'M.Tech AI & Data Science – IIT Bombay',
    prefLocationsSummary: 'Bangalore / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'DeepTensor Analytics',
    fieldIndustry: 'Artificial Intelligence & Large Language Models',
    noticePeriod: '30 Days',
    currentCtc: '₹34,00,000 / yr',
    expectedCtc: '₹45,00,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid'],
    preferredLocations: ['Bangalore, India', 'Remote'],
    appliedOn: 'Aug 20, 2026',
    status: 'Shortlisted',
    workExperience: [
      {
        jobTitle: 'Lead Generative AI Research Engineer',
        companyName: 'DeepTensor Analytics',
        employmentType: 'Full-time',
        location: 'Bangalore, India',
        startDate: 'Jan 2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          'Built custom LoRA and QLoRA fine-tuning pipelines for Llama-3 and Mistral open-source models.',
          'Deployed scalable LangChain and Pinecone vector search for automated technical contract analysis.',
          'Reduced model hallucinations by 42% through strict automated guardrails and RLHF alignment.'
        ]
      },
      {
        jobTitle: 'Senior Machine Learning Engineer',
        companyName: 'Infosys Center of Excellence',
        employmentType: 'Full-time',
        location: 'Bangalore, India',
        startDate: 'Aug 2019',
        endDate: 'Dec 2021',
        currentlyWorkingHere: false,
        period: '2019 – 2021',
        description: [
          'Designed deep learning computer vision and OCR models for automated manufacturing defect triage.',
          'Created automated end-to-end MLOps pipelines on AWS SageMaker and Kubeflow.'
        ]
      }
    ],
    education: [
      {
        university: 'Indian Institute of Technology (IIT), Bombay',
        degree: 'M.Tech',
        courseMajor: 'Artificial Intelligence & Machine Learning',
        startDate: 'Jul 2017',
        endDate: 'May 2019',
        gradeCgpa: '9.6 / 10 CGPA'
      },
      {
        university: 'National Institute of Technology (NIT), Surathkal',
        degree: 'B.Tech',
        courseMajor: 'Computer Engineering',
        startDate: 'Jul 2013',
        endDate: 'May 2017',
        gradeCgpa: '9.1 / 10 CGPA'
      }
    ],
    skills: ['PyTorch', 'Large Language Models (LLMs)', 'LoRA / QLoRA', 'LangChain & LlamaIndex', 'Pinecone', 'SageMaker', 'MLOps'],
    history: [
      { text: 'Candidate shortlisted for Round 1 Interview', time: 'Aug 22, 2026 • 03:15 PM', active: true },
      { text: 'Application submitted for Senior AI Architect', time: 'Aug 20, 2026 • 11:00 AM', active: false }
    ],
    comments: [
      {
        author: 'Hiring Lead',
        role: 'AI Practice Director',
        date: 'Aug 22',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        text: 'Strong open-source LLM fine-tuning experience with published benchmark projects. Shortlisted.'
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

    const pendingBlogs = blogs.filter(b => b && (b.status === 'pending' || b.status === 'pending review' || b.status === 'pending_review')).length;
    const pendingJobs = jobs.filter(j => j && (j.status === 'pending' || j.status === 'pending review' || j.status === 'pending_review')).length;
    const totalPending = pendingBlogs + pendingJobs;

    const liveBlogs = blogs.filter(b => b && (b.status === 'published' || b.status === 'draft')).length;
    const liveJobs = jobs.filter(j => j && (j.status === 'published' || j.status === 'draft')).length;
    const totalEnquiries = enquiries.length;

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
        label.textContent = `Enquiry (${totalEnquiries > 0 ? totalEnquiries : 5})`;
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
