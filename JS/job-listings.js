/* ==========================================================================
   Job Listings Directory & Management
   Minimal 3-dots kebab action context menu, smart row-click to open View JD modal.
   ========================================================================== */

const JOBS_KEY = 'fwc-job-listings';

const jobListingsSeed = [
  {
    id: 1,
    title: 'Cybersecurity Analyst',
    department: 'Cybersecurity',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Mid-Level (3–5 Yrs)',
    salary: '$120,000 – $145,000 / yr',
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
  }
];

let jobListings = loadCollection(JOBS_KEY, jobListingsSeed);

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
  const pendingCount = jobListings.filter((j) => j.status === 'pending').length;
  const draftCount = jobListings.filter((j) => j.status === 'draft').length;

  document.getElementById('stat-total-jobs').textContent = jobListings.length;
  document.getElementById('stat-published-jobs').textContent = publishedCount;
  document.getElementById('stat-pending-jobs').textContent = pendingCount;
  document.getElementById('stat-draft-jobs').textContent = draftCount;
}

function renderActionCell(job) {
  const isPending = job.status === 'pending';
  const isRejected = job.status === 'rejected';
  const isPublished = job.status === 'published' || job.status === 'draft';

  const reviewUrl = `add-job-listing.html?mode=review&id=${job.id}`;
  const editUrl = `add-job-listing.html?mode=edit&id=${job.id}`;

  return `
    <div class="table-kebab-wrap">
      <button class="table-kebab-btn" type="button" data-action="toggle-kebab" aria-label="More actions" title="More actions">
        <svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,96a24,24,0,1,0,24,24A24,24,0,0,0,128,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,128ZM48,96a24,24,0,1,0,24,24A24,24,0,0,0,48,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,48,128ZM208,96a24,24,0,1,0,24,24A24,24,0,0,0,208,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,208,128Z"/></svg>
      </button>

      <div class="table-context-menu">
        <button type="button" class="table-context-menu-item" data-action="view-jd" data-id="${job.id}">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          View Full JD
        </button>

        ${isPending ? `
          <a href="${reviewUrl}" class="table-context-menu-item item-primary">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
            Review & Moderate
          </a>
        ` : ''}

        ${isPublished ? `
          <a href="${editUrl}" class="table-context-menu-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            Edit Requisition
          </a>
        ` : ''}

        ${isRejected ? `
          <button type="button" class="table-context-menu-item" data-action="view-feedback" data-id="${job.id}">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--danger);"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Rejection Notes
          </button>
          <a href="${editUrl}" class="table-context-menu-item">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            Edit & Resubmit
          </a>
        ` : ''}
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
        <td colspan="11" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No job listings found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((job, idx) => `
    <tr data-status="${job.status}" data-id="${job.id}" style="cursor: pointer;" title="Click to view job description">
      <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
      <td class="table-id">JOB-${100 + job.id}</td>
      <td style="font-weight: 600; color: var(--ink-primary); max-width: 240px;">
        <span class="cell-truncate-title" title="${job.title}">${job.title}</span>
      </td>
      <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${job.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[job.status]}" style="white-space: nowrap;">${STATUS_LABEL[job.status]}</span></td>
      <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${job.actionTakenOn || '—'}</td>
      <td style="text-align: center; white-space: nowrap;">
        <button class="btn btn-sm btn-secondary" data-action="view-jd" data-id="${job.id}" style="font-weight: 600; display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px;">
          <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13" style="color: var(--brand-blue);"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Z"/></svg>
          View JD
        </button>
      </td>
      <td style="white-space: nowrap;">${job.location || 'Remote'}</td>
      <td><span style="font-size: var(--text-2xs); color: var(--ink-secondary); font-weight: 500; white-space: nowrap;">${job.type}</span></td>
      <td><span class="status-badge status-draft" style="white-space: nowrap;">${job.experience || '3–5 Years'}</span></td>
      <td class="table-actions" style="text-align: right;">${renderActionCell(job)}</td>
    </tr>
  `).join('');
}

function openViewJdModal(id) {
  const job = jobListings.find((j) => j.id === id);
  if (!job) return;

  document.getElementById('jd-modal-role-title').textContent = `${job.title} — Job Description`;
  document.getElementById('jd-chip-id').textContent = `JOB-${100 + job.id}`;
  document.getElementById('jd-chip-dept').textContent = job.department || 'Engineering';
  document.getElementById('jd-chip-loc').textContent = job.location || 'Remote';
  document.getElementById('jd-chip-type').textContent = job.type;
  document.getElementById('jd-chip-exp').textContent = job.experience || '3–5 Years';
  document.getElementById('jd-chip-salary').textContent = job.salary || 'Competitive';

  const badgeEl = document.getElementById('jd-modal-status-badge');
  badgeEl.className = `status-badge ${STATUS_BADGE_CLASS[job.status]}`;
  badgeEl.textContent = STATUS_LABEL[job.status];

  // Overview
  document.getElementById('jd-modal-overview').textContent = job.overview || job.excerpt || 'No specific overview provided.';

  // Responsibilities
  const respContainer = document.getElementById('jd-modal-responsibilities');
  if (Array.isArray(job.responsibilities) && job.responsibilities.length) {
    respContainer.innerHTML = job.responsibilities.map((r) => `<li>${r}</li>`).join('');
  } else {
    respContainer.innerHTML = `<li>${job.excerpt || 'Standard role responsibilities apply.'}</li>`;
  }

  // Skills
  const skillsContainer = document.getElementById('jd-modal-skills');
  const skills = Array.isArray(job.skills) && job.skills.length ? job.skills : ['Problem Solving', 'Team Leadership', 'Domain Expertise'];
  skillsContainer.innerHTML = skills.map((s) => `<span class="job-skill-tag">${s}</span>`).join('');

  // PDF
  const pdfName = job.pdfName || 'job-specification.pdf';
  const pdfSize = job.pdfSize || '1.4 MB';
  document.getElementById('jd-modal-pdf-text').textContent = `${pdfName} (${pdfSize})`;

  // Action Button
  const actionBtn = document.getElementById('jd-modal-action-btn');
  if (job.status === 'pending') {
    actionBtn.textContent = 'Review & Take Action →';
    actionBtn.href = `add-job-listing.html?mode=review&id=${job.id}`;
    actionBtn.className = 'btn btn-primary';
    actionBtn.style.display = 'inline-flex';
  } else {
    actionBtn.textContent = 'Edit Requisition →';
    actionBtn.href = `add-job-listing.html?mode=edit&id=${job.id}`;
    actionBtn.className = 'btn btn-secondary';
    actionBtn.style.display = 'inline-flex';
  }

  openModal('view-jd-modal');
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
  jobListings = loadCollection(JOBS_KEY, jobListingsSeed);
  renderTable(jobListings);
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

    const filtered = jobListings.filter((job) => {
      const matchSearch = !q ||
        job.title.toLowerCase().includes(q) ||
        (job.department && job.department.toLowerCase().includes(q)) ||
        (job.location && job.location.toLowerCase().includes(q)) ||
        (job.experience && job.experience.toLowerCase().includes(q));
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

    // 2. View JD Button
    const jdBtn = e.target.closest('[data-action="view-jd"]');
    if (jdBtn) {
      closeAllContextMenus();
      const id = Number(jdBtn.dataset.id);
      openViewJdModal(id);
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

    // 4. Row click navigation -> Open View JD modal
    const row = e.target.closest('#job-listings-table-body tr[data-id]');
    if (row && !e.target.closest('a, button, .table-kebab-wrap, .table-context-menu')) {
      const id = Number(row.dataset.id);
      openViewJdModal(id);
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
