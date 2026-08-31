/* ==========================================================================
   Blog Posts
   Full content list across every status. Pending rows get Approve/Reject
   directly here (also available from the Approval Requests page — same
   underlying data, either place can act on it). Once approved a post is
   published immediately, so there's no separate manual Publish step.
   Persisted to localStorage (key: fwc-blog-posts) so Add/Edit/Delete and
   status changes survive navigating to/from the Add Blog Post page.
   ========================================================================== */

const BLOG_POSTS_KEY = 'fwc-blog-posts';

const blogPostsSeed = [
  {
    id: 1,
    title: 'The Future of AI in Manufacturing Supply Chains',
    author: 'Alex Kim',
    category: 'AI',
    submitted: 'Aug 25, 2026',
    submittedISO: '2026-08-25',
    status: 'pending',
    feedback: null,
    excerpt: 'As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical.',
    images: ['ai-supply-chain-hero.jpg', 'ai-supply-chain-dashboard.jpg'],
    sections: [
      { heading: 'Why supply chains are the next AI frontier', content: 'As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical. Forecasting, routing, and inventory decisions that once took a planning team a full week can now run continuously in the background, flagging exceptions before they become costly.' },
      { heading: 'Where the risk actually lives', content: 'The risk is not the model itself, but the handoff. Most disruptions traced back to AI-driven supply chains happen where an automated recommendation is accepted without a human check late in the process. Building in a lightweight review step, rather than removing people entirely, is what separates a resilient rollout from a fragile one.' },
      { heading: 'A practical rollout sequence', content: 'Start with a single high-volume lane, run the model in shadow mode alongside existing planners for one full quarter, then compare outcomes before expanding scope. This sequencing gives leadership a concrete before/after comparison instead of a leap of faith.' }
    ]
  },
  {
    id: 2,
    title: '5 Ways Predictive Maintenance Cuts Downtime',
    author: 'Sam Patel',
    category: 'Manufacturing',
    submitted: 'Aug 24, 2026',
    submittedISO: '2026-08-24',
    status: 'pending',
    feedback: null,
    excerpt: 'Unplanned downtime costs manufacturers millions each year. Predictive maintenance strategies powered by IoT sensors and machine learning are changing the equation.',
    images: ['predictive-maintenance-hero.jpg'],
    sections: [
      { heading: 'The true cost of unplanned downtime', content: 'Unplanned downtime costs manufacturers millions each year. Predictive maintenance strategies powered by IoT sensors and machine learning are changing the equation, letting teams intervene days before a failure rather than hours after one.' },
      { heading: 'Five levers that move the needle', content: 'Vibration analysis, thermal imaging, oil analysis, acoustic monitoring, and load-cycle tracking each catch a different failure mode. Plants that combine at least three of these five typically see the sharpest reduction in surprise breakdowns, since no single sensor type catches everything.' }
    ]
  },
  {
    id: 3,
    title: 'Why Digital Twins Are the Next Big Thing',
    author: 'Jordan Lee',
    category: 'AI',
    submitted: 'Aug 22, 2026',
    submittedISO: '2026-08-22',
    status: 'pending',
    feedback: null,
    excerpt: 'Digital twin technology allows manufacturers to simulate, predict, and optimize physical processes before committing real-world resources.',
    images: ['digital-twin-hero.jpg'],
    sections: [
      { heading: 'Simulating before spending', content: 'Digital twin technology allows manufacturers to simulate, predict, and optimize physical processes before committing real-world resources, cutting both cost and risk out of major process changes.' },
      { heading: 'Getting the fidelity level right', content: 'The most common mistake is over-investing in twin fidelity before the underlying process is stable. A twin that models the top three variables affecting yield beats an exhaustive twin nobody trusts because it takes too long to update.' }
    ]
  },
  {
    id: 4,
    title: '5 Signs Your Enterprise Is Ready for AI-Augmented Staffing',
    author: 'Priya Nair',
    category: 'AI & Tech Staffing',
    submitted: 'Aug 18, 2026',
    submittedISO: '2026-08-18',
    status: 'published',
    feedback: null,
    excerpt: 'AI-augmented staffing models are moving from pilot programs to core hiring strategy. Here are the signals that suggest your organization is ready to make the shift.',
    images: ['ai-staffing-hero.jpg', 'ai-staffing-readiness-chart.jpg'],
    sections: [
      { heading: 'From pilot to core strategy', content: 'AI-augmented staffing models are moving from pilot programs to core hiring strategy. Here are the signals that suggest your organization is ready to make the shift, rather than treating it as an experiment on the side.' },
      { heading: 'The five readiness signals', content: 'Consistent req volume, a documented vetting rubric, hiring-manager buy-in, clean historical placement data, and a fallback human review step are the five signals we look for before recommending an AI-augmented model to a client.' }
    ]
  },
  {
    id: 5,
    title: 'Building Zero-Trust Teams for Distributed Engineering',
    author: 'Morgan Ellis',
    category: 'Governance & Compliance',
    submitted: 'Aug 12, 2026',
    submittedISO: '2026-08-12',
    status: 'published',
    feedback: null,
    excerpt: 'A practical framework for extending zero-trust principles beyond infrastructure and into how distributed engineering teams are staffed, vetted, and managed.',
    images: ['zero-trust-teams-hero.jpg'],
    sections: [
      { heading: 'Zero trust is a staffing problem too', content: 'A practical framework for extending zero-trust principles beyond infrastructure and into how distributed engineering teams are staffed, vetted, and managed.' },
      { heading: 'Three controls worth adopting first', content: 'Scoped access by default, time-boxed elevated permissions, and a documented offboarding checklist close the majority of the gaps we see in distributed teams, well before more advanced controls are worth the overhead.' }
    ]
  },
  {
    id: 6,
    title: 'What Engineering Velocity Metrics Actually Tell You',
    author: 'Priya Nair',
    category: 'Engineering ROI',
    submitted: 'Aug 5, 2026',
    submittedISO: '2026-08-05',
    status: 'draft',
    feedback: null,
    excerpt: 'Sprint velocity is often misread as a productivity score. Here is what the metric is actually useful for, and where it misleads engineering leaders.',
    images: ['engineering-velocity-hero.jpg'],
    sections: [
      { heading: 'A metric, not a scoreboard', content: 'Sprint velocity is often misread as a productivity score. Here is what the metric is actually useful for, and where it misleads engineering leaders who compare it across teams.' }
    ]
  },
  {
    id: 7,
    title: 'Q3 Hiring Trends in Enterprise Tech',
    author: 'Sam Patel',
    category: 'Talent Strategy',
    submitted: 'Aug 15, 2026',
    submittedISO: '2026-08-15',
    status: 'rejected',
    feedback: 'Needs updated Q3 data and a stronger call to action before this can go live.',
    excerpt: 'A look at how enterprise technology hiring shifted through Q3, and what it signals for staffing strategy heading into next year.',
    images: ['q3-hiring-trends-hero.jpg'],
    sections: [
      { heading: 'What moved in Q3', content: 'A look at how enterprise technology hiring shifted through Q3, and what it signals for staffing strategy heading into next year.' }
    ]
  },
  {
    id: 8,
    title: 'How to Scope a Technology Consulting Engagement',
    author: 'Morgan Ellis',
    category: 'Technology Consulting',
    submitted: 'Aug 28, 2026',
    submittedISO: '2026-08-28',
    status: 'pending',
    feedback: null,
    excerpt: 'A clear scope is the single biggest predictor of whether a consulting engagement finishes on time. Here is how we structure one before a single hour is billed.',
    images: ['scoping-engagement-hero.jpg'],
    sections: [
      { heading: 'Scope before staffing', content: 'A clear scope is the single biggest predictor of whether a consulting engagement finishes on time. Here is how we structure one before a single hour is billed.' },
      { heading: 'The three questions that matter most', content: 'What does done look like, who signs off on it, and what happens if the answer changes mid-engagement — getting alignment on these three questions up front avoids the majority of scope disputes we see later.' }
    ]
  },
  {
    id: 9,
    title: 'RPO vs. Staff Augmentation: Choosing the Right Model',
    author: 'Priya Nair',
    category: 'Talent Strategy',
    submitted: 'Aug 29, 2026',
    submittedISO: '2026-08-29',
    status: 'pending',
    feedback: null,
    excerpt: 'Both models solve a hiring capacity problem, but they solve different ones. Here is how to tell which one your organization actually needs.',
    images: ['rpo-vs-staff-aug-hero.jpg'],
    sections: [
      { heading: 'Two models, two different problems', content: 'Both models solve a hiring capacity problem, but they solve different ones. Here is how to tell which one your organization actually needs before signing a contract built for the wrong shape of problem.' },
      { heading: 'A quick way to decide', content: 'If the need is a recurring, high-volume hiring function, RPO usually wins. If the need is a handful of specialized roles for a fixed project window, staff augmentation is the better fit.' }
    ]
  },
  {
    id: 10,
    title: 'Cybersecurity Basics Every Growing Enterprise Should Have in Place',
    author: 'Alex Kim',
    category: 'Cybersecurity',
    submitted: 'Aug 3, 2026',
    submittedISO: '2026-08-03',
    status: 'published',
    feedback: null,
    excerpt: 'Before investing in advanced tooling, most growing enterprises still have gaps in the basics. Here is the short list we check first.',
    images: ['cybersecurity-basics-hero.jpg'],
    sections: [
      { heading: 'Start with the basics, not the tooling', content: 'Before investing in advanced tooling, most growing enterprises still have gaps in the basics. Here is the short list we check first with every new client.' },
      { heading: 'The five checks we run first', content: 'MFA on every privileged account, a tested backup restore process, an up-to-date asset inventory, a written incident response plan, and quarterly access reviews — in that order, since each one compounds the value of the next.' }
    ]
  }
];

let blogPosts = loadCollection(BLOG_POSTS_KEY, blogPostsSeed);
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

function actionButtons(post) {
  const viewBtn = `<button class="icon-btn" data-action="view" data-id="${post.id}" aria-label="View" type="button">${VIEW_ICON}</button>`;
  const statusActions = post.status === 'pending'
    ? `
      <button class="btn btn-sm btn-success" data-action="approve" data-id="${post.id}">Approve</button>
      <button class="btn btn-sm btn-danger" data-action="reject" data-id="${post.id}">Reject</button>
    `
    : '';

  return `
    <div class="table-actions-group">${statusActions}</div>
    <div class="table-actions-group">${viewBtn}${kebabMenu(post.id)}</div>
  `;
}

function renderTable() {
  const tbody = document.getElementById('blog-posts-table-body');
  tbody.innerHTML = blogPosts.map((post) => `
    <tr data-status="${post.status}" data-date="${post.submittedISO}">
      <td>${post.title}</td>
      <td>${post.author}</td>
      <td>${post.category}</td>
      <td>${post.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[post.status]}">${STATUS_LABEL[post.status]}</span></td>
      <td class="table-actions">${actionButtons(post)}</td>
    </tr>
  `).join('');
  reapplyFilters();
}

function findPost(id) {
  return blogPosts.find((post) => post.id === id);
}

function persist() {
  saveCollection(BLOG_POSTS_KEY, blogPosts);
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

const IMAGE_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" aria-hidden="true"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,16V158.75l-26.07-26.06a16,16,0,0,0-22.63,0l-20,20-44-44a16,16,0,0,0-22.62,0L40,169.37V56ZM40,192V192l64-64,74.34,74.34a8,8,0,0,0,.35.35L179.31,208H40Zm176,0h-8L146.68,130.68l20-20L216,159.03V192ZM160,100a12,12,0,1,1,12,12A12,12,0,0,1,160,100Z"></path></svg>';

// Renders the "how this looks on the site" block as a mock long-form
// article: a hero image, then each section's heading/content, with a
// supporting image inserted after the first section to break up the text —
// same shape a real article page would take. Falls back to a single block
// built from content/excerpt for older posts that predate the sections field.
function renderSitePreview(post) {
  const sections = (post.sections && post.sections.length)
    ? post.sections
    : [{ heading: '', content: post.content || post.excerpt || '' }];
  const images = post.images || [];

  const imagePlaceholder = (filename) => `
    <div class="site-preview-image">
      ${IMAGE_ICON}
      <span>${escapeHtml(filename || 'Image placeholder')}</span>
    </div>
  `;

  const sectionsHtml = sections.map((section, index) => {
    const heading = section.heading
      ? `<div class="site-preview-section-heading">${escapeHtml(section.heading)}</div>`
      : '';
    // Section content is authored as rich-text HTML in the Add Blog Post
    // editor (or, for older posts predating that editor, plain text with
    // no markup to escape) — either way it's safe to insert as-is.
    const supportingImage = index === 0 && sections.length > 1
      ? imagePlaceholder(images[1])
      : '';
    return `${heading}${section.content || ''}${supportingImage}`;
  }).join('');

  return `
    <div class="site-preview-title">${escapeHtml(post.title)}</div>
    <div class="site-preview-meta">By ${escapeHtml(post.author)} · ${escapeHtml(post.category)}</div>
    ${imagePlaceholder(images[0])}
    <div class="site-preview-body">${sectionsHtml}</div>
  `;
}

function handleView(id) {
  const post = findPost(id);
  if (!post) return;

  document.getElementById('drawer-title').textContent = post.title;
  document.getElementById('drawer-created-by').innerHTML = `Created by <strong>${escapeHtml(post.author)}</strong>`;
  document.getElementById('drawer-status-badge').textContent = STATUS_LABEL[post.status];
  document.getElementById('drawer-status-badge').className = `status-badge ${STATUS_BADGE_CLASS[post.status]}`;
  document.getElementById('drawer-meta').textContent = `${post.category} · Submitted ${post.submitted}`;
  document.getElementById('drawer-excerpt').textContent = post.excerpt;

  const feedbackBlock = document.getElementById('drawer-feedback');
  if (post.status === 'rejected' && post.feedback) {
    feedbackBlock.style.display = 'block';
    document.getElementById('drawer-feedback-text').textContent = post.feedback;
  } else {
    feedbackBlock.style.display = 'none';
  }

  document.getElementById('drawer-preview-body').innerHTML = renderSitePreview(post);

  openDrawer('view-drawer');
}

function handleDelete(id) {
  const post = findPost(id);
  if (!post) return;
  if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;

  blogPosts = blogPosts.filter((p) => p.id !== id);
  persist();
  renderTable();
  showToast('Blog post deleted.', 'info');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable();
  reapplyFilters = initTableFilters(document.querySelector('.list-page-layout'));
  initKebabMenus(document.querySelector('.dashboard-main'));

  document.querySelector('.dashboard-main').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const post = findPost(id);
    if (!post) return;

    if (btn.dataset.action === 'view') {
      handleView(id);
    } else if (btn.dataset.action === 'approve') {
      post.status = 'published';
      persist();
      renderTable();
      showToast('Blog post approved and published!', 'success');
    } else if (btn.dataset.action === 'reject') {
      pendingRejectId = id;
      document.getElementById('reject-modal-title').textContent = post.title;
      document.getElementById('reject-feedback').value = '';
      document.getElementById('reject-feedback-group').classList.remove('has-error');
      openModal('reject-modal');
    } else if (btn.dataset.action === 'edit') {
      window.location.href = `add-blog-post.html?mode=edit&id=${id}`;
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

    const post = findPost(pendingRejectId);
    post.status = 'rejected';
    post.feedback = feedback;
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
