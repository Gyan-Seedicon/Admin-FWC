/* ==========================================================================
   Blog Posts — Management & Actions
   ========================================================================== */

const BLOG_KEY = 'fwc-blog-posts';

const blogPostsSeed = [
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
    excerpt: 'As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical.',
    sections: [
      { heading: 'Why supply chains are the next AI frontier', content: 'As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical.' },
      { heading: 'Where the risk actually lives', content: 'The risk is not the model itself, but the handoff. Most disruptions happen where an automated recommendation is accepted without human validation.' }
    ]
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
    excerpt: 'Unplanned downtime costs manufacturers millions each year. Predictive maintenance strategies powered by IoT sensors and machine learning are changing the equation.',
    sections: [
      { heading: 'The true cost of unplanned downtime', content: 'Unplanned downtime costs manufacturers millions each year. Predictive maintenance strategies powered by IoT sensors and machine learning are changing the equation.' }
    ]
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
    excerpt: 'Digital twin technology allows manufacturers to simulate, predict, and optimize physical processes before committing real-world resources.',
    sections: [
      { heading: 'Simulating before spending', content: 'Digital twin technology allows manufacturers to simulate, predict, and optimize physical processes before committing real-world resources.' }
    ]
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
    excerpt: 'AI-augmented staffing models are moving from pilot programs to core hiring strategy. Here are the signals that suggest your organization is ready.',
    sections: [
      { heading: 'From pilot to core strategy', content: 'AI-augmented staffing models are moving from pilot programs to core hiring strategy.' }
    ]
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
    excerpt: 'A practical framework for extending zero-trust principles beyond infrastructure and into how distributed engineering teams are staffed.',
    sections: [
      { heading: 'Zero trust is a staffing problem too', content: 'A practical framework for extending zero-trust principles beyond infrastructure.' }
    ]
  }
];

let blogPosts = loadCollection(BLOG_KEY, blogPostsSeed);

const AVATAR_COLORS = ['avatar-color-1', 'avatar-color-2', 'avatar-color-3', 'avatar-color-4', 'avatar-color-5'];

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

function initials(name) {
  return (name || '').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function renderStats() {
  const publishedCount = blogPosts.filter((b) => b.status === 'published').length;
  const pendingCount = blogPosts.filter((b) => b.status === 'pending').length;
  const draftCount = blogPosts.filter((b) => b.status === 'draft').length;

  document.getElementById('stat-total-blogs').textContent = blogPosts.length;
  document.getElementById('stat-published-blogs').textContent = publishedCount;
  document.getElementById('stat-pending-blogs').textContent = pendingCount;
  document.getElementById('stat-draft-blogs').textContent = draftCount;
}

function renderActionCell(post) {
  if (post.status === 'pending') {
    return `
      <a href="add-blog-post.html?mode=review&id=${post.id}" class="btn btn-sm btn-primary" style="font-weight: 600; white-space: nowrap;">
        Review & Take Action →
      </a>
    `;
  }

  if (post.status === 'rejected') {
    return `
      <div class="flex items-center justify-end gap-1">
        <button class="btn btn-sm btn-secondary" data-action="view-feedback" data-id="${post.id}" style="color: var(--danger); border-color: #FECACA; background: #FEF2F2; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap;">
          <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M216,48H40A16,16,0,0,0,24,64V224a8,8,0,0,0,13.66,5.66L72,195.31V208a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM216,208H88V192a8,8,0,0,0-8-8H40V64H216V208Z"/></svg>
          Rejection Notes
        </button>
        <a href="add-blog-post.html?mode=edit&id=${post.id}" class="btn btn-sm btn-secondary">Edit</a>
      </div>
    `;
  }

  return `
    <a href="add-blog-post.html?mode=edit&id=${post.id}" class="btn btn-sm btn-secondary" style="white-space: nowrap;">
      Edit Story →
    </a>
  `;
}

function renderTable(items) {
  const tbody = document.getElementById('blog-posts-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="8" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No blog posts found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((post, idx) => `
    <tr data-status="${post.status}" data-id="${post.id}">
      <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
      <td class="table-id">POST-${100 + post.id}</td>
      <td style="font-weight: 600; color: var(--ink-primary); max-width: 280px;"><span class="cell-truncate-title" title="${post.title}">${post.title}</span></td>
      <td>
        <div class="table-avatar-cell" style="white-space: nowrap;">
          <span class="table-avatar ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}">${initials(post.author)}</span>
          <span>${post.author}</span>
        </div>
      </td>
      <td><span class="status-badge status-draft" style="white-space: nowrap;">${post.category}</span></td>
      <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${post.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[post.status]}" style="white-space: nowrap;">${STATUS_LABEL[post.status]}</span></td>
      <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${post.actionTakenOn || '—'}</td>
      <td class="table-actions" style="text-align: right;">${renderActionCell(post)}</td>
    </tr>
  `).join('');
}

function handleViewFeedback(id) {
  const post = blogPosts.find((p) => p.id === id);
  if (!post) return;

  document.getElementById('blog-feedback-title').textContent = `Story: "${post.title}"`;
  document.getElementById('blog-feedback-text').textContent = post.feedback || 'No specific feedback provided.';
  document.getElementById('blog-feedback-date').textContent = post.actionTakenOn ? `Action recorded on ${post.actionTakenOn}` : '';

  openModal('blog-feedback-modal');
}

function refreshAll() {
  blogPosts = loadCollection(BLOG_KEY, blogPostsSeed);
  renderTable(blogPosts);
  renderStats();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();

  // Search and Filter
  const searchInput = document.getElementById('blog-search');
  const statusFilter = document.getElementById('blog-status-filter');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const st = statusFilter?.value || 'all';

    const filtered = blogPosts.filter((post) => {
      const matchSearch = !q || post.title.toLowerCase().includes(q) || post.author.toLowerCase().includes(q) || post.category.toLowerCase().includes(q);
      const matchStatus = st === 'all' || post.status === st;
      return matchSearch && matchStatus;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    exportTableToCSV('blogs-table', 'fwc-blog-posts.csv');
  });

  document.getElementById('blog-posts-table-body')?.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="view-feedback"]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    handleViewFeedback(id);
  });
});
