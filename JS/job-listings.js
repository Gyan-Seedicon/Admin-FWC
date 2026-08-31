/* ==========================================================================
   Job Listings
   Full posting list across every status. Pending rows get Approve/Reject
   directly here (also available from the Approval Requests page — same
   underlying data, either place can act on it). Once approved a posting is
   published immediately, so there's no separate manual Publish step.

   The detail drawer's header shows the job role, and a mock
   "job-description.pdf" attachment swaps the drawer body to a PDF preview
   pane (with a back arrow) when clicked.

   Persisted to localStorage (key: fwc-job-listings) so Add/Edit/Delete and
   status changes survive navigating to/from the Add Job Listing page.

   Mock titles/departments/locations are synthesized from FWC's real,
   confirmed service lines and office locations (no actual postings exist
   on the live site to draw from).
   ========================================================================== */

const JOB_LISTINGS_KEY = 'fwc-job-listings';

const jobListingsSeed = [
  {
    id: 1,
    title: 'Cybersecurity Analyst',
    department: 'Cybersecurity',
    location: 'Remote',
    type: 'Full-time',
    submitted: 'Aug 26, 2026',
    submittedISO: '2026-08-26',
    status: 'pending',
    feedback: null,
    pdfName: 'cybersecurity-analyst-jd.pdf',
    excerpt: 'We are looking for a Cybersecurity Analyst to help safeguard client infrastructure and support SOC2/HIPAA-aligned delivery across our distributed engineering teams.'
  },
  {
    id: 2,
    title: 'Technology Consultant',
    department: 'Technology Consulting',
    location: 'Alhambra, CA',
    type: 'Full-time',
    submitted: 'Aug 23, 2026',
    submittedISO: '2026-08-23',
    status: 'pending',
    feedback: null,
    pdfName: 'technology-consultant-jd.pdf',
    excerpt: 'Join our consulting practice to advise enterprise clients on technology modernization strategy, from initial assessment through implementation roadmap.'
  },
  {
    id: 3,
    title: 'Senior AI Architect',
    department: 'AI and Advanced Technologies',
    location: 'Bangalore, India',
    type: 'Full-time',
    submitted: 'Aug 10, 2026',
    submittedISO: '2026-08-10',
    status: 'published',
    feedback: null,
    pdfName: 'senior-ai-architect-jd.pdf',
    excerpt: 'Lead the design of AI-augmented delivery pods for enterprise manufacturing and fintech clients, setting technical direction across a growing architecture team.'
  },
  {
    id: 4,
    title: 'Cloud Infrastructure Engineer',
    department: 'Cloud & Infrastructure Services',
    location: 'Alhambra, CA',
    type: 'Full-time',
    submitted: 'Aug 8, 2026',
    submittedISO: '2026-08-08',
    status: 'published',
    feedback: null,
    pdfName: 'cloud-infrastructure-engineer-jd.pdf',
    excerpt: 'Design and operate scalable cloud infrastructure for enterprise clients, with a focus on reliability, cost efficiency, and secure-by-default deployments.'
  },
  {
    id: 5,
    title: 'Blockchain Developer',
    department: 'Blockchain',
    location: 'Bangalore, India',
    type: 'Contract',
    submitted: 'Aug 2, 2026',
    submittedISO: '2026-08-02',
    status: 'draft',
    feedback: null,
    pdfName: 'blockchain-developer-jd.pdf',
    excerpt: 'Build and audit smart-contract based solutions for enterprise clients exploring blockchain-backed supply chain traceability.'
  },
  {
    id: 6,
    title: 'IT Support Specialist',
    department: 'IT Managed Services',
    location: 'Remote',
    type: 'Full-time',
    submitted: 'Jul 28, 2026',
    submittedISO: '2026-07-28',
    status: 'rejected',
    feedback: 'Salary range missing — please add before resubmitting.',
    pdfName: 'it-support-specialist-jd.pdf',
    excerpt: 'Provide tier-1/tier-2 support for enterprise managed-services clients, escalating infrastructure issues to the appropriate specialist team.'
  }
];

let jobListings = loadCollection(JOB_LISTINGS_KEY, jobListingsSeed);
let pendingRejectId = null;
let reapplyFilters = () => {};

const STATUS_BADGE_CLASS = {
  pending: 'status-pending',
  published: 'status-published',
  draft: 'status-draft',
  rejected: 'status-rejected'
};

const STATUS_LABEL = {
  pending: 'Pending',
  published: 'Published',
  draft: 'Draft',
  rejected: 'Rejected'
};

const VIEW_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>';
const KEBAB_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M128,80a16,16,0,1,1,16-16A16,16,0,0,1,128,80Zm0,32a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,64a16,16,0,1,0,16,16A16,16,0,0,0,128,176Z"></path></svg>';

function kebabMenu(id) {
  return `
    <div class="kebab-wrap">
      <button class="icon-btn" data-kebab-trigger aria-label="More actions" type="button">${KEBAB_ICON}</button>
      <div class="kebab-menu hidden">
        <button class="kebab-menu-item" data-action="edit" data-id="${id}">Edit</button>
        <button class="kebab-menu-item is-danger" data-action="delete" data-id="${id}">Delete</button>
      </div>
    </div>
  `;
}

function actionButtons(job) {
  const viewBtn = `<button class="icon-btn" data-action="view" data-id="${job.id}" aria-label="View" type="button">${VIEW_ICON}</button>`;
  const statusActions = job.status === 'pending'
    ? `
      <button class="btn btn-sm btn-success" data-action="approve" data-id="${job.id}">Approve</button>
      <button class="btn btn-sm btn-danger" data-action="reject" data-id="${job.id}">Reject</button>
    `
    : '';

  return `
    <div class="table-actions-group">${statusActions}</div>
    <div class="table-actions-group">${viewBtn}${kebabMenu(job.id)}</div>
  `;
}

function renderTable() {
  const tbody = document.getElementById('job-listings-table-body');
  tbody.innerHTML = jobListings.map((job) => `
    <tr data-status="${job.status}" data-date="${job.submittedISO}">
      <td>${job.title}</td>
      <td>${job.department}</td>
      <td>${job.location}</td>
      <td>${job.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[job.status]}">${STATUS_LABEL[job.status]}</span></td>
      <td class="table-actions">${actionButtons(job)}</td>
    </tr>
  `).join('');
  reapplyFilters();
}

function findJob(id) {
  return jobListings.find((job) => job.id === id);
}

function persist() {
  saveCollection(JOB_LISTINGS_KEY, jobListings);
}

function showDetailsPane() {
  document.getElementById('drawer-body-details').classList.remove('hidden');
  document.getElementById('drawer-body-pdf').classList.add('hidden');
  document.getElementById('drawer-back-btn').classList.add('hidden');
}

function showPdfPane() {
  document.getElementById('drawer-body-details').classList.add('hidden');
  document.getElementById('drawer-body-pdf').classList.remove('hidden');
  document.getElementById('drawer-back-btn').classList.remove('hidden');
}

function handleView(id) {
  const job = findJob(id);
  if (!job) return;

  document.getElementById('drawer-title').textContent = job.title;
  document.getElementById('drawer-status-badge').textContent = STATUS_LABEL[job.status];
  document.getElementById('drawer-status-badge').className = `status-badge ${STATUS_BADGE_CLASS[job.status]}`;
  document.getElementById('drawer-meta').textContent = `${job.department} · ${job.location} · ${job.type} · Submitted ${job.submitted}`;
  document.getElementById('drawer-excerpt').textContent = job.excerpt;

  const pdfName = job.pdfName || 'job-description.pdf';
  document.getElementById('drawer-pdf-name').textContent = pdfName;
  document.getElementById('pdf-preview-name').textContent = pdfName;

  const feedbackBlock = document.getElementById('drawer-feedback');
  if (job.status === 'rejected' && job.feedback) {
    feedbackBlock.style.display = 'block';
    document.getElementById('drawer-feedback-text').textContent = job.feedback;
  } else {
    feedbackBlock.style.display = 'none';
  }

  document.getElementById('drawer-preview-title').textContent = job.title;
  document.getElementById('drawer-preview-meta').textContent = `${job.department} · ${job.location} · ${job.type}`;
  document.getElementById('drawer-preview-body').textContent = job.excerpt;

  showDetailsPane();
  openDrawer('view-drawer');
}

function handleDelete(id) {
  const job = findJob(id);
  if (!job) return;
  if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return;

  jobListings = jobListings.filter((j) => j.id !== id);
  persist();
  renderTable();
  showToast('Job listing deleted.', 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  reapplyFilters = initTableFilters(document.querySelector('.list-page-layout'));
  initKebabMenus(document.querySelector('.dashboard-main'));

  document.getElementById('drawer-pdf-trigger').addEventListener('click', showPdfPane);
  document.getElementById('drawer-back-btn').addEventListener('click', showDetailsPane);

  document.querySelector('.dashboard-main').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const job = findJob(id);
    if (!job) return;

    if (btn.dataset.action === 'view') {
      handleView(id);
    } else if (btn.dataset.action === 'approve') {
      job.status = 'published';
      persist();
      renderTable();
      showToast('Job listing approved and published!', 'success');
    } else if (btn.dataset.action === 'reject') {
      pendingRejectId = id;
      document.getElementById('reject-modal-title').textContent = job.title;
      document.getElementById('reject-feedback').value = '';
      document.getElementById('reject-feedback-group').classList.remove('has-error');
      openModal('reject-modal');
    } else if (btn.dataset.action === 'edit') {
      window.location.href = `add-job-listing.html?mode=edit&id=${id}`;
    } else if (btn.dataset.action === 'delete') {
      handleDelete(id);
    }
  });

  document.getElementById('reject-confirm-btn').addEventListener('click', () => {
    if (pendingRejectId == null) return;
    const feedback = document.getElementById('reject-feedback').value.trim();
    const feedbackGroup = document.getElementById('reject-feedback-group');

    if (!feedback) {
      feedbackGroup.classList.add('has-error');
      return;
    }

    const job = findJob(pendingRejectId);
    job.status = 'rejected';
    job.feedback = feedback;
    persist();
    renderTable();
    closeModal('reject-modal');
    showToast('Feedback sent to admin', 'info');
    pendingRejectId = null;
  });

  document.getElementById('reject-feedback').addEventListener('input', () => {
    document.getElementById('reject-feedback-group').classList.remove('has-error');
  });
});
