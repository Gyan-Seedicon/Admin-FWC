/* ==========================================================================
   Blog Posts Directory & Management
   Minimal 3-dots kebab action context menu & smart row-click navigation.
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

const AUTHOR_AVATARS = {
  'Alex Kim': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Sam Patel': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Jordan Lee': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Priya Nair': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'Marcus Vance': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
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

function renderStats() {
  const publishedCount = blogPosts.filter((b) => b.status === 'published').length;
  const draftCount = blogPosts.filter((b) => b.status === 'draft').length;
  const authorsCount = new Set(blogPosts.filter((b) => b.status === 'published').map((b) => b.author)).size;
  const totalDirectory = publishedCount + draftCount;

  const totalEl = document.getElementById('stat-total-blogs');
  if (totalEl) totalEl.textContent = totalDirectory;

  const pubEl = document.getElementById('stat-published-blogs');
  if (pubEl) pubEl.textContent = publishedCount;

  const draftEl = document.getElementById('stat-draft-blogs');
  if (draftEl) draftEl.textContent = draftCount;

  const authorsEl = document.getElementById('stat-authors-count');
  if (authorsEl) authorsEl.textContent = authorsCount;
}

function renderActionCell(post) {
  const isPublished = post.status === 'published' || post.status === 'draft';
  const editUrl = `add-blog-post.html?mode=edit&id=${post.id}`;

  return `
    <div class="table-kebab-wrap">
      <button class="table-kebab-btn" type="button" data-action="toggle-kebab" aria-label="More actions" title="More actions">
        <svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,96a24,24,0,1,0,24,24A24,24,0,0,0,128,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,128ZM48,96a24,24,0,1,0,24,24A24,24,0,0,0,48,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,48,128ZM208,96a24,24,0,1,0,24,24A24,24,0,0,0,208,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,208,128Z"/></svg>
      </button>

      <div class="table-context-menu">
        <a href="${editUrl}" class="table-context-menu-item">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
          Edit story
        </a>
      </div>
    </div>
  `;
}

function renderTable(items) {
  const tbody = document.getElementById('blog-posts-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="9" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No published or draft blog posts found.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((post, idx) => `
    <tr data-status="${post.status}" data-id="${post.id}" style="cursor: pointer;" title="Click to open post">
      <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
      <td class="table-id">POST-${100 + post.id}</td>
      <td style="font-weight: 600; color: var(--ink-primary); max-width: 280px;"><span class="cell-truncate-title" title="${post.title}">${post.title}</span></td>
      <td>
        <div class="table-avatar-cell" style="white-space: nowrap;">
          <img class="table-avatar-img" src="${getAvatarUrl(post.author, idx)}" alt="${post.author}" width="26" height="26">
          <span style="font-weight: 500; color: var(--ink-primary);">${post.author}</span>
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

function closeAllContextMenus() {
  document.querySelectorAll('.table-context-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
  });
  document.querySelectorAll('.table-kebab-btn.is-active').forEach((btn) => {
    btn.classList.remove('is-active');
  });
}

function refreshAll() {
  blogPosts = loadCollection(BLOG_KEY, blogPostsSeed);
  // Only show published and draft posts in the blog directory
  const livePosts = blogPosts.filter((p) => p.status === 'published' || p.status === 'draft');
  renderTable(livePosts);
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

    // Only filter among published and draft posts
    const livePosts = blogPosts.filter((p) => p.status === 'published' || p.status === 'draft');

    const filtered = livePosts.filter((post) => {
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

    // 2. View feedback
    const feedbackBtn = e.target.closest('[data-action="view-feedback"]');
    if (feedbackBtn) {
      closeAllContextMenus();
      const id = Number(feedbackBtn.dataset.id);
      handleViewFeedback(id);
      return;
    }

    // 3. Row click navigation (smart navigation to view/edit/review)
    const row = e.target.closest('#blog-posts-table-body tr[data-id]');
    if (row && !e.target.closest('a, button, .table-kebab-wrap, .table-context-menu')) {
      const id = Number(row.dataset.id);
      const post = blogPosts.find((p) => p.id === id);
      if (post) {
        if (post.status === 'pending') {
          window.location.href = `add-blog-post.html?mode=review&id=${id}`;
        } else {
          window.location.href = `add-blog-post.html?mode=edit&id=${id}`;
        }
      }
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
