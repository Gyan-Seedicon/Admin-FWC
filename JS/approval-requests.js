/* ==========================================================================
   Approval Requests
   Reads from the same localStorage-backed collections as blog-posts.js
   (fwc-blog-posts) and job-listings.js (fwc-job-listings), so approving or
   rejecting an item here is reflected on the Blog Posts / Job Listings
   pages too, and vice versa — this page is a second entry point onto the
   same underlying data, not a separate queue.
   ========================================================================== */

let blogItems = loadCollection('fwc-blog-posts', []);
let jobItems = loadCollection('fwc-job-listings', []);
let pendingAction = null; // { type: 'blog' | 'job', id }

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

function actionButtons(type, item) {
  const viewBtn = `<button class="btn btn-sm btn-secondary" data-action="view" data-type="${type}" data-id="${item.id}">View</button>`;
  if (item.status !== 'pending') return viewBtn;

  return `
    ${viewBtn}
    <button class="btn btn-sm btn-success" data-action="approve" data-type="${type}" data-id="${item.id}">Approve</button>
    <button class="btn btn-sm btn-danger" data-action="reject" data-type="${type}" data-id="${item.id}">Reject</button>
  `;
}

function renderBlogsTable() {
  const tbody = document.getElementById('blogs-table-body');
  tbody.innerHTML = blogItems.map((blog) => `
    <tr>
      <td>${blog.title}</td>
      <td>${blog.author}</td>
      <td>${blog.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[blog.status]}">${STATUS_LABEL[blog.status]}</span></td>
      <td class="table-actions">${actionButtons('blog', blog)}</td>
    </tr>
  `).join('');
}

function renderJobsTable() {
  const tbody = document.getElementById('jobs-table-body');
  tbody.innerHTML = jobItems.map((job) => `
    <tr>
      <td>${job.title}</td>
      <td>${job.department}</td>
      <td>${job.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[job.status]}">${STATUS_LABEL[job.status]}</span></td>
      <td class="table-actions">${actionButtons('job', job)}</td>
    </tr>
  `).join('');
}

function updateRequestsBadge() {
  const activePanel = document.querySelector('.tabs-panel:not(.hidden)');
  const list = activePanel && activePanel.id === 'panel-jobs' ? jobItems : blogItems;
  const pendingCount = list.filter((item) => item.status === 'pending').length;
  document.getElementById('requests-count-badge').textContent = `${pendingCount} pending`;
}

function findItem(type, id) {
  const list = type === 'blog' ? blogItems : jobItems;
  return list.find((item) => item.id === id);
}

function persist(type) {
  if (type === 'blog') saveCollection('fwc-blog-posts', blogItems);
  else saveCollection('fwc-job-listings', jobItems);
}

function handleView(type, id) {
  const item = findItem(type, id);
  if (!item) return;

  document.getElementById('view-modal-title').textContent = item.title;
  document.getElementById('view-modal-type-badge').textContent = type === 'blog' ? 'Blog Post' : 'Job Posting';
  document.getElementById('view-modal-type-badge').className = `status-badge ${type === 'blog' ? 'status-draft' : 'status-pending'}`;

  const meta = type === 'blog'
    ? `${item.author} · ${item.category} · Submitted ${item.submitted}`
    : `${item.department} · ${item.location} · Submitted ${item.submitted}`;
  document.getElementById('view-modal-meta').textContent = meta;

  document.getElementById('view-modal-image').classList.toggle('hidden', type !== 'blog');
  document.getElementById('view-modal-excerpt').textContent = (item.excerpt || '').slice(0, 300);

  const feedbackBlock = document.getElementById('view-modal-feedback');
  if (item.status === 'rejected' && item.feedback) {
    feedbackBlock.style.display = 'block';
    document.getElementById('view-modal-feedback-text').textContent = item.feedback;
  } else {
    feedbackBlock.style.display = 'none';
  }

  openModal('view-modal');
}

function handleApproveRequest(type, id) {
  const item = findItem(type, id);
  if (!item) return;
  pendingAction = { type, id };
  document.getElementById('approve-modal-title').textContent = item.title;
  openModal('approve-modal');
}

function handleRejectRequest(type, id) {
  const item = findItem(type, id);
  if (!item) return;
  pendingAction = { type, id };
  document.getElementById('reject-modal-title').textContent = item.title;
  document.getElementById('reject-feedback').value = '';
  document.getElementById('reject-feedback-group').classList.remove('has-error');
  openModal('reject-modal');
}

document.addEventListener('DOMContentLoaded', () => {
  renderBlogsTable();
  renderJobsTable();
  updateRequestsBadge();

  const approvalCard = document.getElementById('approval-requests-card');
  initTabs(approvalCard);
  approvalCard.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', updateRequestsBadge);
  });

  document.querySelector('.dashboard-main').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const { action, type, id } = btn.dataset;
    const numericId = Number(id);

    if (action === 'view') handleView(type, numericId);
    if (action === 'approve') handleApproveRequest(type, numericId);
    if (action === 'reject') handleRejectRequest(type, numericId);
  });

  document.getElementById('approve-confirm-btn').addEventListener('click', () => {
    if (!pendingAction) return;
    const { type, id } = pendingAction;
    const item = findItem(type, id);
    item.status = 'published';
    persist(type);

    type === 'blog' ? renderBlogsTable() : renderJobsTable();
    updateRequestsBadge();
    closeModal('approve-modal');
    showToast(`${type === 'blog' ? 'Blog post' : 'Job posting'} approved and published!`, 'success');
    pendingAction = null;
  });

  document.getElementById('reject-confirm-btn').addEventListener('click', () => {
    if (!pendingAction) return;
    const feedback = document.getElementById('reject-feedback').value.trim();
    const feedbackGroup = document.getElementById('reject-feedback-group');

    if (!feedback) {
      feedbackGroup.classList.add('has-error');
      return;
    }

    const { type, id } = pendingAction;
    const item = findItem(type, id);
    item.status = 'rejected';
    item.feedback = feedback;
    persist(type);

    type === 'blog' ? renderBlogsTable() : renderJobsTable();
    updateRequestsBadge();
    closeModal('reject-modal');
    showToast('Feedback sent to admin', 'info');
    pendingAction = null;
  });

  document.getElementById('reject-feedback').addEventListener('input', () => {
    document.getElementById('reject-feedback-group').classList.remove('has-error');
  });
});
