/* ==========================================================================
   Dashboard Overview (Home)
   Dynamic stat counts, condensed Approval Requests preview (5 items),
   and Activity Log.
   ========================================================================== */

const BLOG_KEY = 'fwc-blog-posts';
const JOBS_KEY = 'fwc-job-listings';

function loadDynamicStats() {
  const blogs = loadCollection(BLOG_KEY, []);
  const jobs = loadCollection(JOBS_KEY, []);

  const pendingBlogs = blogs.filter((b) => b.status === 'pending').length;
  const pendingJobs = jobs.filter((j) => j.status === 'pending').length;
  const publishedCount = blogs.filter((b) => b.status === 'published').length + jobs.filter((j) => j.status === 'published').length;

  document.getElementById('stat-pending-blogs').textContent = pendingBlogs;
  document.getElementById('stat-pending-jobs').textContent = pendingJobs;
  document.getElementById('stat-total-pending').textContent = pendingBlogs + pendingJobs;
  document.getElementById('stat-total-published').textContent = publishedCount;
}

const activityLog = [
  { actor: 'Alex Kim', action: 'submitted blog post "The Future of AI in Manufacturing Supply Chains" for approval', time: 'Aug 25, 2026 · 02:30 PM' },
  { actor: 'Sam Patel', action: 'submitted blog post "5 Ways Predictive Maintenance Cuts Downtime" for approval', time: 'Aug 24, 2026 · 11:15 AM' },
  { actor: 'Jordan Lee', action: 'submitted job posting "Cybersecurity Analyst"', time: 'Aug 23, 2026 · 09:45 AM' },
  { actor: 'Priya Nair', action: 'published blog post "5 Signs Your Enterprise Is Ready for AI Staffing"', time: 'Aug 18, 2026 · 04:30 PM' },
  { actor: 'Marcus Vance', action: 'updated role description for "Cloud Infrastructure Engineer"', time: 'Aug 10, 2026 · 10:15 AM' }
];

function renderApprovalPreview() {
  const tbody = document.getElementById('approval-preview-body');
  if (!tbody) return;

  const blogs = loadCollection(BLOG_KEY, []);
  const jobs = loadCollection(JOBS_KEY, []);

  const livePending = [
    ...blogs.filter((b) => b.status === 'pending').map((b) => ({ type: 'blog', id: b.id, title: b.title, submitted: b.submitted })),
    ...jobs.filter((j) => j.status === 'pending').map((j) => ({ type: 'job', id: j.id, title: j.title, submitted: j.submitted }))
  ];

  if (!livePending.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--ink-muted); padding: var(--space-6);">
          All caught up! No pending approval requests.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = livePending.slice(0, 5).map((item) => {
    const reviewUrl = item.type === 'blog'
      ? `add-blog-post.html?mode=review&id=${item.id}`
      : `add-job-listing.html?mode=review&id=${item.id}`;

    return `
      <tr style="cursor: pointer;" data-href="${reviewUrl}" title="Click to review request">
        <td style="font-weight: 600; color: var(--ink-primary); max-width: 280px;"><span class="cell-truncate-title" title="${item.title}">${item.title}</span></td>
        <td><span class="status-badge ${item.type === 'blog' ? 'status-draft' : 'status-info'}" style="white-space: nowrap;">${item.type === 'blog' ? 'Blog Post' : 'Job Posting'}</span></td>
        <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${item.submitted}</td>
        <td><span class="status-badge status-pending" style="white-space: nowrap;">Pending Review</span></td>
        <td style="text-align: right; white-space: nowrap;">
          <a href="${reviewUrl}" class="btn btn-sm btn-secondary" style="font-weight: 500;">
            Review & Take Action →
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

function renderActivityLog() {
  const container = document.getElementById('activity-timeline');
  if (!container) return;
  container.innerHTML = activityLog.map((entry) => `
    <div class="activity-item">
      <span class="activity-dot"></span>
      <div class="activity-content">
        <p class="activity-text"><span class="activity-actor">${entry.actor}</span> ${entry.action}</p>
        <p class="activity-time">${entry.time}</p>
      </div>
    </div>
  `).join('');
}

function renderHomeNotifications() {
  const target = document.getElementById('home-notification-list');
  if (!target) return;

  if (NOTIFICATIONS.length === 0) {
    target.innerHTML = '<p class="notification-empty">You\'re all caught up.</p>';
    return;
  }

  target.innerHTML = NOTIFICATIONS.map((n) => `
    <div class="notification-item">
      <p class="notification-item-text">${n.text}</p>
      <p class="notification-item-time">${n.time}</p>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  loadDynamicStats();
  renderApprovalPreview();
  renderActivityLog();
  renderHomeNotifications();

  // Smart row click navigation for pending moderation queue
  document.getElementById('approval-preview-body')?.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-href]');
    if (row && !e.target.closest('a, button')) {
      window.location.href = row.dataset.href;
    }
  });
});
