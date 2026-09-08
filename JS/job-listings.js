/* ==========================================================================
   Job Listings Directory & Management
   Minimal 3-dots kebab action context menu, smart row-click to open View JD modal.
   ========================================================================== */

const JOBS_KEY = 'fwc-job-listings';

const jobListingsSeed = typeof GLOBAL_DEFAULT_JOBS !== 'undefined' ? GLOBAL_DEFAULT_JOBS : [
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
  jobListingsSeed.forEach((seed) => {
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

let jobListings = ensureJobSeeds(loadCollection(JOBS_KEY, jobListingsSeed));

const STATUS_BADGE_CLASS = {
  published: 'status-approved',
  pending: 'status-pending',
  draft: 'status-draft',
  rejected: 'status-rejected'
};

const STATUS_LABEL = {
  published: 'Published',
  pending: 'Pending Review',
  draft: 'Draft',
  rejected: 'Rejected'
};

function renderStats() {
  const publishedCount = jobListings.filter((j) => j.status === 'published').length;
  const draftCount = jobListings.filter((j) => j.status === 'draft').length;
  const totalDirectory = publishedCount + draftCount;
  const totalCandidates = jobListings.reduce((sum, j) => sum + (Number(j.applicantsCount) || 12), 0);

  const totalEl = document.getElementById('stat-total-jobs');
  if (totalEl) totalEl.textContent = totalDirectory;

  const pubEl = document.getElementById('stat-published-jobs');
  if (pubEl) pubEl.textContent = publishedCount;

  const draftEl = document.getElementById('stat-draft-jobs');
  if (draftEl) draftEl.textContent = draftCount;

  const candEl = document.getElementById('stat-total-candidates');
  if (candEl) candEl.textContent = totalCandidates;
}

function renderActionCell(job) {
  const previewUrl = `add-job-listing.html?mode=preview&id=${job.id}`;
  const editUrl = `add-job-listing.html?mode=edit&id=${job.id}`;

  return `
    <div class="table-kebab-wrap">
      <button class="table-kebab-btn" type="button" data-action="toggle-kebab" aria-label="More actions" title="More actions">
        <svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,96a24,24,0,1,0,24,24A24,24,0,0,0,128,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,128ZM48,96a24,24,0,1,0,24,24A24,24,0,0,0,48,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,48,128ZM208,96a24,24,0,1,0,24,24A24,24,0,0,0,208,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,208,128Z"/></svg>
      </button>

      <div class="table-context-menu">
        <a href="${previewUrl}" class="table-context-menu-item">
          <svg viewBox="0 0 256 256" width="14" height="14" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Z"/></svg>
          View JD
        </a>
        <a href="${editUrl}" class="table-context-menu-item">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          Edit requisition
        </a>
      </div>
    </div>
  `;
}

function renderTable(items) {
  const tbody = document.getElementById('job-listings-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="14" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No published or draft job requisitions found.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((job, idx) => {
    const jdUrl = `add-job-listing.html?mode=preview&id=${job.id}`;
    return `
    <tr data-status="${job.status}" data-id="${job.id}" style="cursor: pointer;" title="Click to view candidates applied for ${job.title}">
      <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
      <td class="table-id">JOB-${100 + job.id}</td>
      <td style="font-weight: 600; color: var(--ink-primary); max-width: 240px;">
        <span class="cell-truncate-title" title="${job.title}">${job.title}</span>
      </td>
      <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${job.submitted}</td>
      <td style="color: var(--ink-secondary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${formatExpiryDate(job.expiryDate)}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[job.status]}" style="white-space: nowrap;">${STATUS_LABEL[job.status]}</span></td>
      <td style="text-align: center; white-space: nowrap;">
        <a href="job-applicants.html?jobId=${job.id}" class="applicant-pill-badge" title="View candidates applied for ${job.title}">
          <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.92-14.85,60,60,0,1,1,28.76,113.82,95.84,95.84,0,0,1,73.64,41.2A8,8,0,0,1,250.14,206.7Z"/></svg>
          <span>${job.applicantsCount || 12} candidates</span>
        </a>
      </td>
      <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${job.actionTakenOn || '—'}</td>
      <td style="white-space: nowrap;">
        ${job.pocName ? `
          <div class="poc-cell-wrap">
            <span class="poc-name" title="${job.pocName}">${job.pocName}</span>
            ${job.pocEmail ? `
              <button type="button" class="poc-email-copy-btn" data-copy-email="${job.pocEmail}" data-poc-name="${job.pocName}" title="Copy email: ${job.pocEmail}" aria-label="Copy ${job.pocName}'s email address">
                <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13">
                  <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/>
                </svg>
              </button>
            ` : ''}
          </div>
        ` : '<span style="color: var(--ink-muted);">—</span>'}
      </td>
      <td style="text-align: center; white-space: nowrap;">
        <a href="${jdUrl}" class="btn btn-sm btn-secondary" style="font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; text-decoration: none;">
          <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13" style="color: var(--brand-blue);"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Z"/></svg>
          View JD
        </a>
      </td>
      <td style="white-space: nowrap;">${job.location || 'Remote'}</td>
      <td><span style="font-size: var(--text-2xs); color: var(--ink-secondary); font-weight: 500; white-space: nowrap;">${job.type}</span></td>
      <td><span class="status-badge status-draft" style="white-space: nowrap;">${job.experience || '3–5 Years'}</span></td>
      <td class="table-actions" style="text-align: right;">${renderActionCell(job)}</td>
    </tr>
    `;
  }).join('');
}

function handleViewFeedback(id) {
  const job = jobListings.find((j) => j.id === id);
  if (!job) return;

  document.getElementById('job-feedback-title').textContent = `Requisition: "${job.title}"`;
  document.getElementById('job-feedback-text').textContent = job.feedback || 'No specific feedback provided.';
  document.getElementById('job-feedback-date').textContent = job.actionTakenOn ? `Action recorded on ${job.actionTakenOn}` : '';

  openModal('job-feedback-modal');
}

function closeAllContextMenus() {
  document.querySelectorAll('.table-context-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
  });
  document.querySelectorAll('.table-kebab-btn.is-active').forEach((btn) => {
    btn.classList.remove('is-active');
  });
}

function refreshAll() {
  jobListings = ensureJobSeeds(ensureJobExpiries(loadCollection(JOBS_KEY, jobListingsSeed)));
  // Only show published and draft jobs in the job listings directory
  const liveJobs = jobListings.filter((j) => j.status === 'published' || j.status === 'draft');
  renderTable(liveJobs);
  renderStats();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();

  // Search & Filter
  const searchInput = document.getElementById('job-search');
  const statusFilter = document.getElementById('job-status-filter');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const st = statusFilter?.value || 'all';

    // Only filter among published and draft jobs
    const liveJobs = jobListings.filter((j) => j.status === 'published' || j.status === 'draft');

    const filtered = liveJobs.filter((job) => {
      const matchSearch = !q ||
        job.title.toLowerCase().includes(q) ||
        (job.department && job.department.toLowerCase().includes(q)) ||
        (job.location && job.location.toLowerCase().includes(q)) ||
        (job.experience && job.experience.toLowerCase().includes(q)) ||
        (job.pocName && job.pocName.toLowerCase().includes(q)) ||
        (job.pocEmail && job.pocEmail.toLowerCase().includes(q));
      const matchStatus = st === 'all' || job.status === st;
      return matchSearch && matchStatus;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    exportTableToCSV('jobs-table', 'fwc-job-listings.csv');
  });

  // Table row click & kebab context menu
  document.addEventListener('click', (e) => {
    // 0. Copy POC Email Button
    const copyBtn = e.target.closest('.poc-email-copy-btn');
    if (copyBtn) {
      e.stopPropagation();
      e.preventDefault();
      const email = copyBtn.dataset.copyEmail;
      const name = copyBtn.dataset.pocName || 'POC';
      if (email) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(email).then(() => {
            showToast(`Copied ${name}'s email (${email}) to clipboard!`, 'success');
          }).catch(() => {
            fallbackCopyText(email, name);
          });
        } else {
          fallbackCopyText(email, name);
        }
        copyBtn.classList.add('is-copied');
        copyBtn.innerHTML = `<svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"/></svg>`;
        setTimeout(() => {
          copyBtn.classList.remove('is-copied');
          copyBtn.innerHTML = `<svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/></svg>`;
        }, 1800);
      }
      return;
    }

    function fallbackCopyText(text, name) {
      const temp = document.createElement('textarea');
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
      showToast(`Copied ${name}'s email (${text}) to clipboard!`, 'success');
    }

    // 1. Kebab button toggle
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

    // 2. View JD Button -> View Job Description Preview
    const jdBtn = e.target.closest('[data-action="view-jd"]');
    if (jdBtn) {
      closeAllContextMenus();
      const id = Number(jdBtn.dataset.id);
      window.location.href = `add-job-listing.html?mode=preview&id=${id}`;
      return;
    }

    // 3. View feedback
    const feedbackBtn = e.target.closest('[data-action="view-feedback"]');
    if (feedbackBtn) {
      closeAllContextMenus();
      const id = Number(feedbackBtn.dataset.id);
      handleViewFeedback(id);
      return;
    }

    // 4. Row click navigation -> Redirect to Applicants UI
    const row = e.target.closest('#job-listings-table-body tr[data-id]');
    if (row && !e.target.closest('a, button, .table-kebab-wrap, .table-context-menu')) {
      const id = Number(row.dataset.id);
      window.location.href = `job-applicants.html?jobId=${id}`;
      return;
    }

    // Outside click closes menus
    closeAllContextMenus();
  });

  // Escape key closes menus
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllContextMenus();
    }
  });
});
