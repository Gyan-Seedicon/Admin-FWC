/* ==========================================================================
   Dashboard (Home)
   Stat counts, a condensed read-only Approval Requests preview, and the
   Admin Activity Log. Approve/Reject actions live only on the dedicated
   Approval Requests page — see approval-requests.js for why.
   ========================================================================== */

// Pending items mirror approval-requests.js's blogRequests/jobRequests —
// kept as a small local copy since each page has its own mock data (no
// shared backend/localStorage between static pages).
const pendingPreviewItems = [
  { type: 'blog', title: 'The Future of AI in Manufacturing Supply Chains', submitted: 'Aug 25, 2026' },
  { type: 'job', title: 'Cybersecurity Analyst', submitted: 'Aug 26, 2026' },
  { type: 'blog', title: '5 Ways Predictive Maintenance Cuts Downtime', submitted: 'Aug 24, 2026' },
  { type: 'job', title: 'Technology Consultant', submitted: 'Aug 23, 2026' },
  { type: 'blog', title: 'Why Digital Twins Are the Next Big Thing', submitted: 'Aug 22, 2026' }
];

// Counts mirror the mock data seeded on Blog Posts / Job Listings / Enquiry.
const STATS = {
  pendingApprovals: pendingPreviewItems.length,
  publishedBlogs: 2,
  openJobs: 2,
  newEnquiries: 3
};

const activityLog = [
  { actor: 'Alex Kim', action: 'submitted blog post "The Future of AI in Manufacturing Supply Chains" for approval', time: 'Aug 25, 2026 · 2:14 PM' },
  { actor: 'Sam Patel', action: 'submitted blog post "5 Ways Predictive Maintenance Cuts Downtime" for approval', time: 'Aug 24, 2026 · 11:02 AM' },
  { actor: 'Jordan Lee', action: 'submitted job posting "Cybersecurity Analyst"', time: 'Aug 23, 2026 · 9:45 AM' },
  { actor: 'Priya Nair', action: 'published blog post "Building Zero-Trust Teams for Distributed Engineering"', time: 'Aug 20, 2026 · 4:30 PM' }
];

function renderStats() {
  document.getElementById('stat-pending-approvals').textContent = STATS.pendingApprovals;
  document.getElementById('stat-published-blogs').textContent = STATS.publishedBlogs;
  document.getElementById('stat-open-jobs').textContent = STATS.openJobs;
  document.getElementById('stat-new-enquiries').textContent = STATS.newEnquiries;
}

function renderApprovalPreview() {
  const tbody = document.getElementById('approval-preview-body');
  tbody.innerHTML = pendingPreviewItems.slice(0, 4).map((item) => `
    <tr>
      <td>${item.title}</td>
      <td><span class="status-badge status-draft">${item.type === 'blog' ? 'Blog Post' : 'Job Posting'}</span></td>
      <td>${item.submitted}</td>
      <td><span class="status-badge status-pending">Pending</span></td>
    </tr>
  `).join('');
}

function renderActivityLog() {
  const container = document.getElementById('activity-timeline');
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

// The header popover already renders #notification-list via global.js's
// renderNotifications(); this page also shows the same list inline in a
// card, so mirror it into #home-notification-list.
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
  renderStats();
  renderApprovalPreview();
  renderActivityLog();
  renderHomeNotifications();
});
