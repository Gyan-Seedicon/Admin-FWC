/* ==========================================================================
   Approval Requests Hub
   Moderation workflow for Blog Posts and Job Requisitions,
   Minimal 3-dots kebab action context menu, View JD center modal, and smart KPI metrics.
   ========================================================================== */

const BLOG_KEY = 'fwc-blog-posts';
const JOBS_KEY = 'fwc-job-listings';

const blogSeedItems = typeof GLOBAL_DEFAULT_BLOGS !== 'undefined' ? GLOBAL_DEFAULT_BLOGS : [
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
  }
];

const jobSeedItems = typeof GLOBAL_DEFAULT_JOBS !== 'undefined' ? GLOBAL_DEFAULT_JOBS : [
  {
    id: 1,
    title: 'Cybersecurity Analyst',
    department: 'Cybersecurity',
    location: 'Remote',
    type: 'Full-time',
    experience: '3–5 Years',
    salary: '$120,000 – $145,000 / yr',
    expiryDate: '2026-10-31',
    pocName: 'Sarah Jenkins',
    pocEmail: 's.jenkins@fwc.com',
    submitted: 'Aug 26, 2026 · 10:30 AM',
    submittedISO: '2026-08-26T10:30:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    pdfName: 'cybersecurity-analyst-jd.pdf',
    pdfSize: '1.4 MB',
    overview: 'We are looking for a Cybersecurity Analyst to help safeguard client infrastructure and support SOC2/HIPAA-aligned delivery across our distributed engineering teams.',
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
    experience: '5–8 Years',
    salary: '$135,000 – $165,000 / yr',
    expiryDate: '2026-11-15',
    pocName: 'Michael Chen',
    pocEmail: 'm.chen@fwc.com',
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
    experience: '3–5 Years',
    salary: '$115,000 – $140,000 / yr',
    expiryDate: '2026-10-15',
    pocName: 'Elena Rostova',
    pocEmail: 'e.rostova@fwc.com',
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
    experience: '1–2 Years',
    salary: '$90,000 – $110,000 / yr',
    expiryDate: '2026-08-31',
    pocName: 'David Vance',
    pocEmail: 'd.vance@fwc.com',
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
    experience: '5–8 Years',
    salary: '$140,000 – $170,000 / yr',
    expiryDate: '2026-11-30',
    pocName: 'Alex Rivera',
    pocEmail: 'a.rivera@fwc.com',
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
  }
];

const AUTHOR_AVATARS = {
  'Alex Kim': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Sam Patel': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Jordan Lee': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Priya Nair': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'Marcus Vance': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'David Chen': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

function ensureBlogSeeds(blogs) {
  let modified = false;
  blogSeedItems.forEach((seed) => {
    const existing = blogs.find((b) => b.id === seed.id);
    if (!existing) {
      blogs.push({ ...seed });
      modified = true;
    } else {
      Object.keys(seed).forEach((k) => {
        if (existing[k] === undefined || existing[k] === null || existing[k] === '') {
          existing[k] = seed[k];
          modified = true;
        }
      });
    }
  });

  if (modified) {
    saveCollection(BLOG_KEY, blogs);
  }
  return blogs;
}

function formatExpiryDate(dateStr) {
  if (!dateStr) return '—';
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

function ensureJobSeeds(jobs) {
  let modified = false;
  jobSeedItems.forEach((seed) => {
    const existing = jobs.find((j) => j.id === seed.id);
    if (!existing) {
      jobs.push({ ...seed });
      modified = true;
    } else {
      Object.keys(seed).forEach((k) => {
        if (existing[k] === undefined || existing[k] === null || existing[k] === '') {
          existing[k] = seed[k];
          modified = true;
        }
      });
    }
  });

  if (modified) {
    saveCollection(JOBS_KEY, jobs);
  }
  return jobs;
}

let blogItems = ensureBlogSeeds(loadCollection(BLOG_KEY, blogSeedItems));
let jobItems = ensureJobSeeds(loadCollection(JOBS_KEY, jobSeedItems));
let activePendingItem = null; // for quick approve / reject dialogs

const AVATAR_COLORS = ['avatar-color-1', 'avatar-color-2', 'avatar-color-3', 'avatar-color-4', 'avatar-color-5'];

const STATUS_BADGE_CLASS = {
  published: 'status-approved',
  pending: 'status-pending',
  draft: 'status-draft',
  rejected: 'status-rejected'
};

const STATUS_LABEL = {
  published: 'Approved & Published',
  pending: 'Pending Review',
  draft: 'Draft',
  rejected: 'Rejected'
};

function getAvatarUrl(name, idx = 0) {
  if (AUTHOR_AVATARS[name]) return AUTHOR_AVATARS[name];
  const fallback = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  ];
  return fallback[idx % fallback.length];
}

function initials(name) {
  return (name || '').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function formatNow() {
  const now = new Date();
  const datePart = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} · ${timePart}`;
}
window.formatNow = formatNow;

function renderStats() {
  const pendingBlogs = blogItems.filter((b) => b.status === 'pending').length;
  const pendingJobs = jobItems.filter((j) => j.status === 'pending').length;
  const totalPending = pendingBlogs + pendingJobs;
  const totalRejected = blogItems.filter((b) => b.status === 'rejected').length + jobItems.filter((j) => j.status === 'rejected').length;

  const pbEl = document.getElementById('stat-pending-blogs');
  if (pbEl) pbEl.textContent = pendingBlogs;

  const pjEl = document.getElementById('stat-pending-jobs');
  if (pjEl) pjEl.textContent = pendingJobs;

  const totalPendingEl = document.getElementById('stat-total-pending');
  if (totalPendingEl) totalPendingEl.textContent = totalPending;

  const rejectedEl = document.getElementById('stat-total-rejected');
  if (rejectedEl) rejectedEl.textContent = totalRejected;
}

function renderActionCell(type, item) {
  const isPending = item.status === 'pending';
  const isRejected = item.status === 'rejected';

  const reviewUrl = type === 'blog' 
    ? `add-blog-post.html?mode=review&id=${item.id}`
    : `add-job-listing.html?mode=preview&id=${item.id}`;

  return `
    <div class="table-kebab-wrap">
      <button class="table-kebab-btn" type="button" data-action="toggle-kebab" aria-label="More actions" title="More actions">
        <svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,96a24,24,0,1,0,24,24A24,24,0,0,0,128,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,128ZM48,96a24,24,0,1,0,24,24A24,24,0,0,0,48,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,48,128ZM208,96a24,24,0,1,0,24,24A24,24,0,0,0,208,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,208,128Z"/></svg>
      </button>

      <div class="table-context-menu">
        ${isPending ? `
          <a href="${reviewUrl}" class="table-context-menu-item item-primary">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Review & take action
          </a>
          <div class="table-context-menu-divider"></div>
          <button type="button" class="table-context-menu-item" data-action="quick-approve" data-type="${type}" data-id="${item.id}" style="color: var(--success);">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--success);"><polyline points="20 6 9 17 4 12"/></svg>
            Quick approve
          </button>
          <button type="button" class="table-context-menu-item item-danger" data-action="quick-reject" data-type="${type}" data-id="${item.id}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            Reject request
          </button>
        ` : ''}

        ${isRejected ? `
          <button type="button" class="table-context-menu-item" data-action="view-feedback" data-type="${type}" data-id="${item.id}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--danger);"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Rejection notes
          </button>
          <a href="${reviewUrl}" class="table-context-menu-item item-primary">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Review & take action
          </a>
          <button type="button" class="table-context-menu-item" data-action="quick-approve" data-type="${type}" data-id="${item.id}" style="color: var(--success);">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--success);"><polyline points="20 6 9 17 4 12"/></svg>
            Approve & publish live
          </button>
        ` : ''}
      </div>
    </div>
  `;
}

function renderBlogsTable() {
  const tbody = document.getElementById('blogs-table-body');
  if (!tbody) return;

  // Render only pending review and rejected submissions in moderation queue (approved/published items are not shown here)
  const moderationBlogs = blogItems
    .filter((b) => b.status === 'pending' || b.status === 'rejected')
    .sort((a, b) => {
      const order = { pending: 1, rejected: 2 };
      return (order[a.status] || 99) - (order[b.status] || 99);
    });

  if (!moderationBlogs.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="9" style="text-align: center; color: var(--ink-muted); padding: var(--space-8);">
          No pending review or rejected blog posts in moderation queue.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = moderationBlogs.map((blog, idx) => {
    let statusBadgeHtml = `<span class="status-badge ${STATUS_BADGE_CLASS[blog.status] || 'status-pending'}" style="white-space: nowrap;">${STATUS_LABEL[blog.status] || blog.status}</span>`;
    if (blog.status === 'rejected') {
      statusBadgeHtml = `
        <span class="status-badge status-rejected" data-action="view-feedback" data-type="blog" data-id="${blog.id}" title="Click to view rejection notes" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
          Rejected
          <svg viewBox="0 0 256 256" fill="currentColor" width="11" height="11"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/></svg>
        </span>
      `;
    }

    return `
      <tr data-status="${blog.status}" data-id="${blog.id}" style="cursor: pointer;" title="Click to review story">
        <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
        <td class="table-id">POST-${100 + blog.id}</td>
        <td style="font-weight: 600; color: var(--ink-primary); max-width: 280px;"><span class="cell-truncate-title" title="${blog.title}">${blog.title}</span></td>
        <td>
          <div class="table-avatar-cell" style="white-space: nowrap;">
            <img class="table-avatar-img" src="${getAvatarUrl(blog.author, idx)}" alt="${blog.author}" width="26" height="26">
            <span style="font-weight: 500; color: var(--ink-primary);">${blog.author}</span>
          </div>
        </td>
        <td><span class="status-badge status-draft" style="white-space: nowrap;">${blog.category}</span></td>
        <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${blog.submitted}</td>
        <td>${statusBadgeHtml}</td>
        <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${blog.actionTakenOn || '—'}</td>
        <td class="table-actions" style="text-align: right;">${renderActionCell('blog', blog)}</td>
      </tr>
    `;
  }).join('');
}

function renderJobsTable() {
  const tbody = document.getElementById('jobs-table-body');
  if (!tbody) return;

  // Render only pending review and rejected submissions in moderation queue (approved/published items are not shown here)
  const moderationJobs = jobItems
    .filter((j) => j.status === 'pending' || j.status === 'rejected')
    .sort((a, b) => {
      const order = { pending: 1, rejected: 2 };
      return (order[a.status] || 99) - (order[b.status] || 99);
    });

  if (!moderationJobs.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="12" style="text-align: center; color: var(--ink-muted); padding: var(--space-8);">
          No pending review or rejected job requisitions in moderation queue.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = moderationJobs.map((job, idx) => {
    const reviewUrl = `add-job-listing.html?mode=preview&id=${job.id}`;

    let statusBadgeHtml = `<span class="status-badge ${STATUS_BADGE_CLASS[job.status] || 'status-pending'}" style="white-space: nowrap;">${STATUS_LABEL[job.status] || job.status}</span>`;
    if (job.status === 'rejected') {
      statusBadgeHtml = `
        <span class="status-badge status-rejected" data-action="view-feedback" data-type="job" data-id="${job.id}" title="Click to view rejection notes" style="cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
          Rejected
          <svg viewBox="0 0 256 256" fill="currentColor" width="11" height="11"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/></svg>
        </span>
      `;
    }

    let jdButtonHtml = `
      <a href="${reviewUrl}" class="btn btn-sm btn-secondary" style="font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px;">
        <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13" style="color: var(--brand-blue);"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Z"/></svg>
        Review & take action
      </a>
    `;

    if (job.status === 'rejected') {
      jdButtonHtml = `
        <button type="button" class="btn btn-sm btn-secondary" data-action="view-feedback" data-type="job" data-id="${job.id}" style="font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; color: var(--danger); border-color: #FECACA;">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          Rejection notes
        </button>
      `;
    }

    return `
      <tr data-status="${job.status}" data-id="${job.id}" style="cursor: pointer;" title="Click to review job requisition">
        <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
        <td class="table-id">JOB-${100 + job.id}</td>
        <td style="font-weight: 600; color: var(--ink-primary); max-width: 240px;">
          <span class="cell-truncate-title" title="${job.title}">${job.title}</span>
        </td>
        <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${job.submitted}</td>
        <td style="color: var(--ink-secondary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${formatExpiryDate(job.expiryDate)}</td>
        <td>${statusBadgeHtml}</td>
        <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${job.actionTakenOn || '—'}</td>
        <td style="text-align: center; white-space: nowrap;">
          ${jdButtonHtml}
        </td>
        <td style="white-space: nowrap;">${job.location || 'Remote'}</td>
        <td><span style="font-size: var(--text-2xs); color: var(--ink-secondary); font-weight: 500; white-space: nowrap;">${job.type}</span></td>
        <td><span class="status-badge status-draft" style="white-space: nowrap;">${job.experience || '3–5 Years'}</span></td>
        <td class="table-actions" style="text-align: right;">${renderActionCell('job', job)}</td>
      </tr>
    `;
  }).join('');
}

function updateRequestsBadge() {
  const badge = document.getElementById('requests-count-badge');
  if (!badge) return;
  const activePanel = document.querySelector('.tabs-panel:not(.hidden)');
  const list = activePanel && activePanel.id === 'panel-jobs' ? jobItems : blogItems;
  const pendingCount = list.filter((item) => item.status === 'pending').length;
  badge.textContent = `${pendingCount} pending`;
}

function findItem(type, id) {
  const list = type === 'blog' ? blogItems : jobItems;
  return list.find((item) => item.id === id);
}

function handleViewFeedback(type, id) {
  const item = findItem(type, id);
  if (!item) return;

  document.getElementById('feedback-target-title').textContent = `${type === 'blog' ? 'Story' : 'Job'}: "${item.title}"`;
  document.getElementById('feedback-viewer-text').textContent = item.feedback || 'No specific feedback provided.';
  document.getElementById('feedback-viewer-date').textContent = item.actionTakenOn ? `Action recorded on ${item.actionTakenOn}` : '';

  openModal('feedback-viewer-modal');
}

function handleQuickApprove(type, id) {
  const item = findItem(type, id);
  if (!item) return;
  activePendingItem = { type, id, item };

  document.getElementById('quick-approve-item-title').textContent = item.title;
  openModal('quick-approve-modal');
}

function handleQuickReject(type, id) {
  const item = findItem(type, id);
  if (!item) return;
  activePendingItem = { type, id, item };

  document.getElementById('quick-reject-item-title').textContent = item.title;
  document.getElementById('quick-reject-reason').value = '';
  document.getElementById('quick-reject-error').style.display = 'none';
  openModal('quick-reject-modal');
}

function closeAllContextMenus() {
  document.querySelectorAll('.table-context-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
  });
  document.querySelectorAll('.table-kebab-btn.is-active').forEach((btn) => {
    btn.classList.remove('is-active');
  });
}

function initTabs() {
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      document.querySelectorAll('.tabs-panel').forEach((p) => p.classList.add('hidden'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const targetPanel = document.getElementById(btn.dataset.tab);
      if (targetPanel) targetPanel.classList.remove('hidden');

      closeAllContextMenus();
      updateRequestsBadge();
    });
  });
}

function refreshAll() {
  blogItems = ensureBlogSeeds(loadCollection(BLOG_KEY, blogSeedItems));
  jobItems = ensureJobSeeds(ensureJobExpiries(loadCollection(JOBS_KEY, jobSeedItems)));
  renderBlogsTable();
  renderJobsTable();
  renderStats();
  updateRequestsBadge();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();
  initTabs();

  // Document click listener for context menus and actions
  document.addEventListener('click', (e) => {
    // 1. Toggle 3-dots kebab menu
    const kebabBtn = e.target.closest('[data-action="toggle-kebab"]');
    if (kebabBtn) {
      e.stopPropagation();
      const wrap = kebabBtn.closest('.table-kebab-wrap');
      const menu = wrap?.querySelector('.table-context-menu');
      const isOpen = menu?.classList.contains('is-open');

      closeAllContextMenus();

      if (!isOpen && menu) {
        menu.classList.add('is-open');
        kebabBtn.classList.add('is-active');
      }
      return;
    }

    // 2. View Feedback Notes
    const feedbackBtn = e.target.closest('[data-action="view-feedback"]');
    if (feedbackBtn) {
      closeAllContextMenus();
      const type = feedbackBtn.dataset.type;
      const id = Number(feedbackBtn.dataset.id);
      handleViewFeedback(type, id);
      return;
    }

    // 3. Quick Approve
    const approveBtn = e.target.closest('[data-action="quick-approve"]');
    if (approveBtn) {
      closeAllContextMenus();
      const type = approveBtn.dataset.type;
      const id = Number(approveBtn.dataset.id);
      handleQuickApprove(type, id);
      return;
    }

    // 4. Quick Reject
    const rejectBtn = e.target.closest('[data-action="quick-reject"]');
    if (rejectBtn) {
      closeAllContextMenus();
      const type = rejectBtn.dataset.type;
      const id = Number(rejectBtn.dataset.id);
      handleQuickReject(type, id);
      return;
    }

    // 5. Row click navigation (smart navigation to review mode on row click)
    const blogRow = e.target.closest('#blogs-table-body tr[data-id]');
    if (blogRow && !e.target.closest('a, button, .table-kebab-wrap, .table-context-menu')) {
      const id = Number(blogRow.dataset.id);
      const blog = blogItems.find((b) => b.id === id);
      if (blog) {
        window.location.href = `add-blog-post.html?mode=review&id=${id}`;
      }
      return;
    }

    const jobRow = e.target.closest('#jobs-table-body tr[data-id]');
    if (jobRow && !e.target.closest('a, button, .table-kebab-wrap, .table-context-menu')) {
      const id = Number(jobRow.dataset.id);
      const job = jobItems.find((j) => j.id === id);
      if (job) {
        window.location.href = `add-job-listing.html?mode=preview&id=${id}`;
      }
      return;
    }

    // Clicking anywhere else closes open context menus
    closeAllContextMenus();
  });

  // ESC key closes context menus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllContextMenus();
    }
  });

  function confirmQuickApprove() {
    if (!activePendingItem) return;
    const { type, id } = activePendingItem;
    const key = type === 'blog' ? BLOG_KEY : JOBS_KEY;
    let list = loadCollection(key, type === 'blog' ? blogSeedItems : jobSeedItems);
    let item = list.find((it) => Number(it.id) === Number(id) || String(it.id) === String(id));
    if (!item && activePendingItem.item) {
      item = activePendingItem.item;
    }
    if (item) {
      item.status = 'published';
      item.actionTakenOn = formatNow();
      item.feedback = null;
      saveCollection(key, list);
    }
    closeModal('quick-approve-modal');
    refreshAll();
    const title = item ? item.title : 'Item';
    const typeLabel = type === 'blog' ? 'Blog post' : 'Job requisition';
    showToast(`${typeLabel} "${title}" approved and published live!`, 'success');
  }

  function confirmQuickReject() {
    if (!activePendingItem) return;
    const reasonInput = document.getElementById('quick-reject-reason');
    const reason = reasonInput ? reasonInput.value.trim() : '';
    if (!reason) {
      const err = document.getElementById('quick-reject-error');
      if (err) err.style.display = 'block';
      reasonInput?.focus();
      return;
    }

    const { type, id } = activePendingItem;
    const key = type === 'blog' ? BLOG_KEY : JOBS_KEY;
    let list = loadCollection(key, type === 'blog' ? blogSeedItems : jobSeedItems);
    let item = list.find((it) => Number(it.id) === Number(id) || String(it.id) === String(id));
    if (!item && activePendingItem.item) {
      item = activePendingItem.item;
    }
    if (item) {
      item.status = 'rejected';
      item.actionTakenOn = formatNow();
      item.feedback = reason;
      saveCollection(key, list);
    }
    closeModal('quick-reject-modal');
    refreshAll();
    const title = item ? item.title : 'Item';
    const typeLabel = type === 'blog' ? 'Blog post' : 'Job requisition';
    showToast(`${typeLabel} "${title}" has been rejected.`, 'error');
  }

  // Expose to window for inline onclick attributes
  window.confirmQuickApprove = confirmQuickApprove;
  window.confirmQuickReject = confirmQuickReject;

  // Direct element listeners
  document.getElementById('confirm-quick-approve-btn')?.addEventListener('click', confirmQuickApprove);
  document.getElementById('confirm-quick-reject-btn')?.addEventListener('click', confirmQuickReject);

  // Document-level delegation fallback
  document.addEventListener('click', (e) => {
    if (e.target.closest('#confirm-quick-approve-btn')) {
      e.preventDefault();
      confirmQuickApprove();
      return;
    }
    if (e.target.closest('#confirm-quick-reject-btn')) {
      e.preventDefault();
      confirmQuickReject();
      return;
    }
  });
});
