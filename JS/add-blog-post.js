/* ==========================================================================
   Add / Edit / Review Blog Post — Medium Style Writing & Review Canvas
   Review mode workflow, approve confirmation modal, reject feedback modal,
   floating (+) inserter, selection bubble toolbar, slash commands,
   and Square-Rounded Category Selection Dropdown.
   ========================================================================== */

const BLOG_KEY = 'fwc-blog-posts';

const blogSeedItems = [
  {
    id: 1,
    title: 'The Future of AI in Manufacturing Supply Chains',
    author: 'Alex Kim',
    category: 'AI & Tech Staffing',
    submitted: 'Aug 25, 2026 · 02:30 PM',
    submittedISO: '2026-08-25T14:30:00',
    status: 'pending',
    actionTakenOn: null,
    feedback: null,
    coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    excerpt: 'As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical.',
    content: `
      <p style="font-size: 1.15em; line-height: 1.7; color: var(--ink-secondary); margin-bottom: 1.5em;">As manufacturers increasingly turn to artificial intelligence to streamline operations, understanding how to integrate AI responsibly into supply chain management has never been more critical.</p>
      <h2>1. The Shift from Reactive to Predictive Supply Networks</h2>
      <p>Traditional manufacturing logistics were built on static forecasting models that struggled with sudden macro volatility. By integrating generative AI, computer vision, and real-time telemetry from connected warehouse floors, enterprise leaders can now predict inventory bottlenecks up to 72 hours before they ripple into downstream assembly lines.</p>
      <blockquote>"Autonomous supply chains do not replace human oversight; they augment supply chain officers with high-fidelity simulations of risk before capital is committed."</blockquote>
      <h2>2. Addressing Data Silos Across Global Tier-1 Suppliers</h2>
      <p>A primary failure point in supply chain AI deployments is fragmented vendor data. Modern data mesh architectures unify disparate ERP systems, providing a single operational dashboard for logistics coordinators and procurement teams.</p>
      <h2>3. Regulatory Compliance & Carbon Footprint Optimization</h2>
      <p>Beyond throughput efficiency, AI algorithms now optimize transport routes for minimal carbon emissions, ensuring tier-1 suppliers meet aggressive ESG reporting standards across North American and European logistics corridors.</p>
    `
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
    content: `
      <p style="font-size: 1.15em; line-height: 1.7; color: var(--ink-secondary); margin-bottom: 1.5em;">Unplanned machinery outages remain one of the costliest line items in industrial operations. Predictive maintenance models powered by edge AI sensors are redefining reliability engineering.</p>
      <h2>1. Continuous Acoustic & Vibration Telemetry</h2>
      <p>High-frequency acoustic sensors detect micro-fractures in industrial turbine bearings weeks before thermal anomalies become visible to conventional monitoring systems.</p>
      <blockquote>"Predictive telemetry converts catastrophic emergency line stops into scheduled off-peak maintenance intervals."</blockquote>
      <h2>2. Automated Spare Parts Procurement</h2>
      <p>When an IoT node detects anomalous vibration thresholds, ERP integration triggers an automated requisition for required replacement components, eliminating critical parts delivery lead times.</p>
    `
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
    content: `
      <p style="font-size: 1.15em; line-height: 1.7; color: var(--ink-secondary); margin-bottom: 1.5em;">Digital twin technology allows manufacturers to simulate, predict, and optimize physical processes before committing real-world resources.</p>
      <h2>1. Real-Time Virtual Representation</h2>
      <p>By creating virtual replicas of physical production assets, engineering pods can test edge-case stress scenarios without endangering floor personnel or interrupting live assembly lines.</p>
      <blockquote>"Digital twins transform physical factories into computable software systems."</blockquote>
      <h2>2. Accelerated R&D and Iteration Loops</h2>
      <p>Product designers can prototype mechanical tolerances in cloud-rendered digital environments, compressing prototype iteration cycles from months to days.</p>
    `
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

let currentPost = null;
let isReviewMode = false;
let coverImageUrl = null;

function getParams() {
  return new URLSearchParams(window.location.search);
}

function stripHtml(html) {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function extractSectionsFromHtml(html) {
  const container = document.createElement('div');
  container.innerHTML = html;
  const sections = [];
  const headings = container.querySelectorAll('h2, h3');
  headings.forEach((h) => {
    let content = '';
    let sibling = h.nextElementSibling;
    while (sibling && !['H2', 'H3'].includes(sibling.tagName)) {
      content += sibling.outerHTML;
      sibling = sibling.nextElementSibling;
    }
    sections.push({
      heading: h.textContent.trim(),
      content: content.trim()
    });
  });
  return sections;
}

function updateWordStats() {
  const title = document.getElementById('story-title-input').value.trim();
  const bodyText = stripHtml(document.getElementById('story-editor-body').innerHTML).trim();
  const allWords = (title + ' ' + bodyText).split(/\s+/).filter(Boolean);
  const wordCount = allWords.length;
  const readMins = Math.max(1, Math.ceil(wordCount / 220));

  const statsEl = document.getElementById('word-count-stat');
  if (statsEl) {
    statsEl.textContent = `${wordCount} words · ${readMins} min read`;
  }
}

// --------------------------------------------------------------------------
// Cover Image Uploader
// --------------------------------------------------------------------------
function setCoverImage(url) {
  coverImageUrl = url;
  const emptyPrompt = document.getElementById('cover-empty-prompt');
  const previewBox = document.getElementById('cover-preview-box');
  const previewImg = document.getElementById('cover-preview-img');

  if (emptyPrompt) emptyPrompt.classList.add('hidden');
  if (previewBox) previewBox.classList.remove('hidden');
  if (previewImg) previewImg.src = url;

  updateWordStats();
}

function removeCoverImage() {
  coverImageUrl = null;
  const emptyPrompt = document.getElementById('cover-empty-prompt');
  const previewBox = document.getElementById('cover-preview-box');
  const previewImg = document.getElementById('cover-preview-img');

  if (previewBox) previewBox.classList.add('hidden');
  if (emptyPrompt) emptyPrompt.classList.remove('hidden');
  if (previewImg) previewImg.src = '';

  updateWordStats();
}

function initCoverUploader() {
  const emptyPrompt = document.getElementById('cover-empty-prompt');
  const fileInput = document.getElementById('cover-file-input');
  const changeBtn = document.getElementById('change-cover-btn');
  const removeBtn = document.getElementById('remove-cover-btn');

  emptyPrompt?.addEventListener('click', () => {
    fileInput?.click();
  });

  changeBtn?.addEventListener('click', () => {
    fileInput?.click();
  });

  removeBtn?.addEventListener('click', () => {
    removeCoverImage();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setCoverImage(evt.target?.result);
    };
    reader.readAsDataURL(file);
  });
}

// --------------------------------------------------------------------------
// Floating (+) Adder Menu
// --------------------------------------------------------------------------
function initFloatingAdder() {
  const trigger = document.getElementById('floating-adder-trigger');
  const menu = document.getElementById('floating-adder-menu');

  trigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    menu?.classList.toggle('is-open');
    trigger?.classList.toggle('is-open');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#floating-adder')) {
      menu?.classList.remove('is-open');
      trigger?.classList.remove('is-open');
    }
  });

  menu?.querySelectorAll('.adder-item-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const type = btn.dataset.insert;
      insertContentElement(type);
      menu?.classList.remove('is-open');
      trigger?.classList.remove('is-open');
    });
  });
}

function insertContentElement(type) {
  const editor = document.getElementById('story-editor-body');
  editor.focus();

  if (type === 'image') {
    const url = prompt('Enter image URL or press OK for sample engineering photo:', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80');
    if (url) {
      document.execCommand('insertHTML', false, `
        <figure style="margin: 1.8em 0;">
          <img src="${url}" alt="Article figure" style="width: 100%; border-radius: 8px; display: block;">
          <figcaption style="font-size: 13px; color: #64748B; text-align: center; margin-top: 6px;" contenteditable="true">Type caption for image (optional)</figcaption>
        </figure>
        <p><br></p>
      `);
    }
  } else if (type === 'stock') {
    const stockPhotos = [
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80'
    ];
    const randomPhoto = stockPhotos[Math.floor(Math.random() * stockPhotos.length)];
    document.execCommand('insertHTML', false, `
      <figure style="margin: 1.8em 0;">
        <img src="${randomPhoto}" alt="Technology & Engineering" style="width: 100%; border-radius: 8px; display: block;">
        <figcaption style="font-size: 13px; color: #64748B; text-align: center; margin-top: 6px;" contenteditable="true">Photo by Unsplash / FWC Enterprise</figcaption>
      </figure>
      <p><br></p>
    `);
  } else if (type === 'divider') {
    document.execCommand('insertHTML', false, '<hr style="border: none; border-top: 1px solid #E2E8F0; margin: 2.2em 0;"><p><br></p>');
  }

  updateWordStats();
}

// --------------------------------------------------------------------------
// Selection Bubble Toolbar
// --------------------------------------------------------------------------
function initSelectionBubble() {
  const bubble = document.getElementById('selection-bubble');
  const editor = document.getElementById('story-editor-body');

  function handleSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !editor.contains(sel.anchorNode)) {
      bubble?.classList.remove('is-visible');
      return;
    }

    const text = sel.toString().trim();
    if (!text) {
      bubble?.classList.remove('is-visible');
      return;
    }

    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    if (bubble) {
      bubble.style.top = `${window.scrollY + rect.top - 48}px`;
      bubble.style.left = `${window.scrollX + rect.left + rect.width / 2}px`;
      bubble.classList.add('is-visible');
    }
  }

  document.addEventListener('selectionchange', handleSelection);
  editor?.addEventListener('keyup', handleSelection);
  editor?.addEventListener('mouseup', handleSelection);

  bubble?.querySelectorAll('.bubble-btn').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      const cmd = btn.dataset.cmd;

      if (cmd === 'formatH2') {
        document.execCommand('formatBlock', false, '<h2>');
      } else if (cmd === 'formatH3') {
        document.execCommand('formatBlock', false, '<h3>');
      } else if (cmd === 'formatQuote') {
        document.execCommand('formatBlock', false, '<blockquote>');
      } else if (cmd === 'createLink') {
        const url = prompt('Enter link URL:');
        if (url) document.execCommand('createLink', false, url);
      } else {
        document.execCommand(cmd, false, null);
      }

      handleSelection();
      updateWordStats();
    });
  });
}

// --------------------------------------------------------------------------
// Slash Commands Popup Menu
// --------------------------------------------------------------------------
function initSlashCommands() {
  const popup = document.getElementById('slash-popup');
  const editor = document.getElementById('story-editor-body');

  editor?.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      setTimeout(() => {
        const sel = window.getSelection();
        if (!sel || !sel.rangeCount) return;
        const rect = sel.getRangeAt(0).getBoundingClientRect();
        if (popup) {
          popup.style.top = `${window.scrollY + rect.bottom + 6}px`;
          popup.style.left = `${window.scrollX + rect.left}px`;
          popup.classList.add('is-open');
        }
      }, 10);
    } else if (['Escape', 'ArrowUp', 'ArrowDown', 'Enter'].includes(e.key) && popup?.classList.contains('is-open')) {
      if (e.key === 'Escape') {
        popup?.classList.remove('is-open');
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#slash-popup')) {
      popup?.classList.remove('is-open');
    }
  });

  popup?.querySelectorAll('.slash-cmd-item').forEach((item) => {
    item.addEventListener('click', () => {
      const type = item.dataset.slash;
      popup?.classList.remove('is-open');
      editor.focus();

      // Remove the typed slash
      document.execCommand('delete', false, null);

      if (type === 'h2') {
        document.execCommand('formatBlock', false, '<h2>');
      } else if (type === 'h3') {
        document.execCommand('formatBlock', false, '<h3>');
      } else if (type === 'bullet') {
        document.execCommand('insertUnorderedList', false, null);
      } else if (type === 'quote') {
        document.execCommand('formatBlock', false, '<blockquote>');
      } else if (type === 'divider') {
        insertContentElement('divider');
      }

      updateWordStats();
    });
  });
}

// --------------------------------------------------------------------------
// Title Auto-Grow
// --------------------------------------------------------------------------
function initTitleAutogrow() {
  const titleInput = document.getElementById('story-title-input');
  function adjustHeight() {
    if (!titleInput) return;
    titleInput.style.height = 'auto';
    titleInput.style.height = `${titleInput.scrollHeight}px`;
  }
  titleInput?.addEventListener('input', () => {
    adjustHeight();
    updateWordStats();
  });
  adjustHeight();
}

// --------------------------------------------------------------------------
// Autofill Sample Demo Story
// --------------------------------------------------------------------------
function autofillSampleStory() {
  const sample = {
    title: 'Architecting Scalable AI Pods for Real-Time Manufacturing Intelligence',
    category: 'AI & Tech Staffing',
    cover: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
    content: `
      <p style="font-size: 1.15em; line-height: 1.7; color: var(--ink-secondary); margin-bottom: 1.5em;">As industrial manufacturing accelerates toward autonomous production, understanding how to integrate dedicated engineering pods with real-time AI telemetry has become the primary differentiator for tier-1 supply networks.</p>
      <h2>1. The Shift from Reactive Maintenance to Predictive Networks</h2>
      <p>Traditional manufacturing logistics were built on static forecasting models that struggled with sudden macro volatility. By integrating generative AI, computer vision, and real-time telemetry from connected warehouse floors, enterprise leaders can now predict inventory bottlenecks up to 72 hours before they ripple into downstream assembly lines.</p>
      <blockquote>"Autonomous supply chains do not replace human oversight; they augment supply chain officers with high-fidelity simulations of risk before capital is committed."</blockquote>
      <h2>2. Eliminating Vendor Data Mesh Fragmentation</h2>
      <p>A primary failure point in supply chain AI deployments is fragmented vendor data. Modern data mesh architectures unify disparate ERP systems, providing a single operational dashboard for logistics coordinators and procurement teams.</p>
      <h2>3. Regulatory Compliance & Carbon Footprint Optimization</h2>
      <p>Beyond throughput efficiency, AI algorithms now optimize transport routes for minimal carbon emissions, ensuring tier-1 suppliers meet aggressive ESG reporting standards across North American and European logistics corridors.</p>
    `
  };

  document.getElementById('story-title-input').value = sample.title;
  setCoverImage(sample.cover);
  document.getElementById('story-editor-body').innerHTML = sample.content;
  const catSelect = document.getElementById('story-category-select');
  if (catSelect) catSelect.value = sample.category;
  updateWordStats();
  showToast('Autofilled sample article with AI & Tech Staffing category!', 'success');
}

// --------------------------------------------------------------------------
// Save Draft & Submit Workflow
// --------------------------------------------------------------------------
function saveStory(status = 'pending') {
  const title = document.getElementById('story-title-input').value.trim();
  const htmlContent = document.getElementById('story-editor-body').innerHTML;
  const textContent = stripHtml(htmlContent);

  if (!title) {
    showToast('Please add a title for your story.', 'error');
    document.getElementById('story-title-input').focus();
    return false;
  }

  if (!textContent) {
    showToast('Please write some content for your story.', 'error');
    document.getElementById('story-editor-body').focus();
    return false;
  }

  const category = document.getElementById('story-category-select')?.value || currentPost?.category || 'AI & Tech Staffing';
  const author = currentPost?.author || 'Taylor Brooks';
  const excerpt = textContent.slice(0, 240);
  const sections = extractSectionsFromHtml(htmlContent);

  let blogPosts = loadCollection(BLOG_KEY, blogSeedItems);
  const nowFormatted = formatNow();
  const today = new Date();
  const submittedISO = today.toISOString().slice(0, 10);

  if (currentPost) {
    currentPost.title = title;
    currentPost.category = category;
    currentPost.author = author;
    currentPost.excerpt = excerpt;
    currentPost.content = htmlContent;
    currentPost.sections = sections;
    currentPost.coverImage = coverImageUrl;
    if (status) currentPost.status = status;
    saveCollection(BLOG_KEY, blogPosts);
    showToast(status === 'published' ? 'Story published live!' : (status === 'draft' ? 'Draft saved successfully.' : 'Story submitted for approval! Status is now Pending Review.'), 'success');
  } else {
    const newId = blogPosts.length ? Math.max(...blogPosts.map((p) => p.id)) + 1 : 1;
    const newPost = {
      id: newId,
      title,
      author,
      category,
      submitted: nowFormatted,
      submittedISO,
      status,
      actionTakenOn: null,
      feedback: null,
      coverImage: coverImageUrl,
      excerpt,
      content: htmlContent,
      sections
    };
    blogPosts.push(newPost);
    saveCollection(BLOG_KEY, blogPosts);
    showToast(status === 'published' ? 'Story published live!' : (status === 'draft' ? 'Draft saved successfully.' : 'Story submitted for approval! Status is now Pending Review.'), 'success');
  }

  setTimeout(() => {
    window.location.href = 'blog-posts.html';
  }, 450);
  return true;
}

function triggerDeleteFlow() {
  const title = currentPost ? currentPost.title : (document.getElementById('story-title-input').value.trim() || 'Untitled Story');
  document.getElementById('delete-story-title').textContent = title;
  openModal('delete-confirm-modal');
}

// --------------------------------------------------------------------------
// Review Flow (Super Admin Decision)
// --------------------------------------------------------------------------
function setupReviewMode(post) {
  isReviewMode = true;
  document.getElementById('page-title').textContent = `Review: ${post.title} — FWC Super Admin`;

  const parentBreadcrumb = document.getElementById('breadcrumb-parent');
  if (parentBreadcrumb) {
    parentBreadcrumb.href = 'approval-requests.html';
    parentBreadcrumb.textContent = 'Approval Requests';
  }
  const currBreadcrumb = document.getElementById('breadcrumb-current');
  if (currBreadcrumb) {
    currBreadcrumb.textContent = 'Review Story';
  }
  document.getElementById('page-heading').textContent = 'Review Blog Post';

  // Toggle active nav link
  document.getElementById('nav-link-blogs')?.classList.remove('active');
  document.getElementById('nav-link-approvals')?.classList.add('active');

  // Toggle Navbar
  document.getElementById('normal-status-bar')?.classList.add('hidden');
  document.getElementById('normal-nav-actions')?.classList.add('hidden');
  document.getElementById('review-status-bar')?.classList.remove('hidden');
  document.getElementById('review-nav-actions')?.classList.remove('hidden');

  document.getElementById('review-meta-text').textContent = `Submitted by ${post.author || 'Author'} on ${post.submitted}`;

  const catSelect = document.getElementById('story-category-select');
  if (catSelect && post.category) {
    catSelect.value = post.category;
  }

  // Populate Editor Fields (Keep editable so super admin can review and fix typos)
  document.getElementById('story-title-input').value = post.title || 'Untitled Story';
  document.getElementById('story-title-input').removeAttribute('readonly');
  document.getElementById('story-editor-body').setAttribute('contenteditable', 'true');

  if (post.coverImage) {
    setCoverImage(post.coverImage);
  } else {
    setCoverImage('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80');
  }

  if (post.content && post.content.length > 80) {
    document.getElementById('story-editor-body').innerHTML = post.content;
  } else if (post.sections && post.sections.length) {
    document.getElementById('story-editor-body').innerHTML = post.sections.map((s) => `<h2>${s.heading}</h2><p>${s.content}</p>`).join('');
  } else {
    const excerpt = post.excerpt || 'Exploring the intersection of modern technology and enterprise operational excellence.';
    document.getElementById('story-editor-body').innerHTML = `
      <p style="font-size: 1.15em; line-height: 1.7; color: var(--ink-secondary); margin-bottom: 1.5em;">${excerpt}</p>
      <h2>1. The Shift from Reactive to Autonomous Operations</h2>
      <p>Modern enterprise ecosystems require scalable architectures that adapt to real-time market shifts without introducing downtime or operational fragility. Deploying dedicated AI pods and automated telemetry enables engineers to proactively mitigate production bottlenecks before downstream impacts occur.</p>
      <blockquote>"True digital resilience is built by empowering engineering teams with automated governance, transparent workflows, and continuous telemetry."</blockquote>
      <h2>2. Implementation Architecture & Data Integrity</h2>
      <p>By establishing rigorous quality gates, automated benchmarking, and transparent cross-functional collaboration, distributed engineering teams consistently achieve high-velocity outcomes while avoiding legacy technical debt.</p>
      <h2>3. Leadership Recommendations & Next Steps</h2>
      <p>Organizations should prioritize scalable delivery frameworks, cross-team transparency, and continuous feedback loops to ensure lasting business agility and measurable performance gains.</p>
    `;
  }

  updateWordStats();
}

function handleApproveStory() {
  const post = currentPost || (loadCollection(BLOG_KEY, blogSeedItems)[0]);
  if (!post) return;

  const title = document.getElementById('story-title-input').value.trim() || post.title;
  const htmlContent = document.getElementById('story-editor-body').innerHTML;
  const textContent = stripHtml(htmlContent);
  const category = document.getElementById('story-category-select')?.value || post.category || 'AI & Tech Staffing';

  let blogPosts = loadCollection(BLOG_KEY, blogSeedItems);
  const match = blogPosts.find((p) => p.id === post.id);
  if (match) {
    match.title = title;
    match.content = htmlContent;
    match.excerpt = textContent.slice(0, 240);
    match.sections = extractSectionsFromHtml(htmlContent);
    if (coverImageUrl) match.coverImage = coverImageUrl;
    match.category = category;
    match.status = 'published';
    match.actionTakenOn = formatNow();
    match.feedback = null;
    saveCollection(BLOG_KEY, blogPosts);
  }

  closeModal('approve-confirm-modal');
  showToast('Article approved and published live to the website!', 'success');
  setTimeout(() => {
    window.location.href = isReviewMode ? 'approval-requests.html' : 'blog-posts.html';
  }, 450);
}

function handleRejectStory() {
  const post = currentPost || (loadCollection(BLOG_KEY, blogSeedItems)[0]);
  if (!post) return;

  const reasonInput = document.getElementById('rejection-reason-input');
  const reason = reasonInput.value.trim();
  if (!reason) {
    document.getElementById('rejection-error-text').style.display = 'block';
    reasonInput.focus();
    return;
  }

  let blogPosts = loadCollection(BLOG_KEY, blogSeedItems);
  const match = blogPosts.find((p) => p.id === post.id);
  if (match) {
    match.status = 'rejected';
    match.actionTakenOn = formatNow();
    match.feedback = reason;
    saveCollection(BLOG_KEY, blogPosts);
  }
  closeModal('reject-feedback-modal');
  showToast(`Rejected "${post.title}" and sent feedback notes.`, 'error');
  setTimeout(() => {
    window.location.href = 'approval-requests.html';
  }, 450);
}

// --------------------------------------------------------------------------
// Initialization
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  initCoverUploader();
  initFloatingAdder();
  initSelectionBubble();
  initSlashCommands();
  initTitleAutogrow();

  const editor = document.getElementById('story-editor-body');
  editor.addEventListener('input', updateWordStats);

  const params = getParams();
  const mode = params.get('mode');
  const targetId = params.get('id') ? Number(params.get('id')) : null;

  const blogPosts = loadCollection(BLOG_KEY, blogSeedItems);

  if (targetId != null) {
    currentPost = blogPosts.find((p) => p.id === targetId);
  }

  if (mode === 'review' || (currentPost && currentPost.status === 'pending')) {
    if (!currentPost) {
      currentPost = blogPosts.find((p) => p.status === 'pending') || blogPosts[0] || blogSeedItems[0];
    }
    setupReviewMode(currentPost);
  } else if (mode === 'edit' || currentPost) {
    if (!currentPost) {
      currentPost = blogPosts[0] || blogSeedItems[0];
    }
    document.getElementById('page-title').textContent = `Edit — ${currentPost.title}`;
    const currBreadcrumb = document.getElementById('breadcrumb-current');
    if (currBreadcrumb) currBreadcrumb.textContent = 'Edit blog post';
    const pageHeading = document.getElementById('page-heading');
    if (pageHeading) pageHeading.textContent = 'Edit blog post';

    document.getElementById('story-title-input').value = currentPost.title || '';

    // Reveal delete button in creator mode when editing existing post
    document.getElementById('delete-story-btn')?.classList.remove('hidden');

    const catSelect = document.getElementById('story-category-select');
    if (catSelect && currentPost.category) {
      catSelect.value = currentPost.category;
    }

    if (currentPost.coverImage) setCoverImage(currentPost.coverImage);
    if (currentPost.content) editor.innerHTML = currentPost.content;
    else if (currentPost.sections && currentPost.sections.length) {
      editor.innerHTML = currentPost.sections.map((s) => `<h2>${s.heading}</h2><p>${s.content}</p>`).join('');
    }

    updateWordStats();
  }

  // Set default starting paragraph if empty
  if (!editor.innerHTML.trim()) {
    editor.innerHTML = '<p><br></p>';
  }

  // Autofill button click handler
  document.getElementById('autofill-demo-btn')?.addEventListener('click', autofillSampleStory);

  // Save Draft
  document.getElementById('save-draft-btn')?.addEventListener('click', () => {
    saveStory('draft');
  });

  // Submit for Approval (triggers confirmation modal)
  document.getElementById('submit-approval-btn')?.addEventListener('click', () => {
    const title = document.getElementById('story-title-input').value.trim();
    const htmlContent = document.getElementById('story-editor-body').innerHTML;
    const textContent = stripHtml(htmlContent);

    if (!title) {
      showToast('Please add a title for your story before submitting.', 'error');
      document.getElementById('story-title-input').focus();
      return;
    }

    if (!textContent) {
      showToast('Please write some content for your story before submitting.', 'error');
      document.getElementById('story-editor-body').focus();
      return;
    }

    document.getElementById('submit-confirm-title').textContent = title;
    openModal('submit-confirm-modal');
  });

  // Confirm Submit in Modal
  document.getElementById('confirm-submit-btn')?.addEventListener('click', () => {
    closeModal('submit-confirm-modal');
    saveStory('pending');
  });

  // Review Mode: Approve Button Trigger
  document.getElementById('review-approve-btn')?.addEventListener('click', () => {
    const post = currentPost || (loadCollection(BLOG_KEY, blogSeedItems)[0]);
    const title = document.getElementById('story-title-input').value.trim() || (post ? post.title : 'Story');
    document.getElementById('approve-story-title').textContent = title;
    openModal('approve-confirm-modal');
  });

  // Review Mode: Confirm Approve
  document.getElementById('confirm-approve-btn')?.addEventListener('click', handleApproveStory);

  // Review Mode: Reject Button Trigger
  document.getElementById('review-reject-btn')?.addEventListener('click', () => {
    const post = currentPost || (loadCollection(BLOG_KEY, blogSeedItems)[0]);
    const title = document.getElementById('story-title-input').value.trim() || (post ? post.title : 'Story');
    document.getElementById('reject-story-title').textContent = title;
    document.getElementById('rejection-reason-input').value = '';
    document.getElementById('rejection-error-text').style.display = 'none';
    openModal('reject-feedback-modal');
  });

  // Review Mode: Confirm Reject
  document.getElementById('confirm-reject-btn')?.addEventListener('click', handleRejectStory);

  // Delete Handlers
  document.getElementById('delete-story-btn')?.addEventListener('click', triggerDeleteFlow);
  document.getElementById('review-delete-btn')?.addEventListener('click', triggerDeleteFlow);

  // Confirm Delete in Modal
  document.getElementById('confirm-delete-btn')?.addEventListener('click', () => {
    if (currentPost && currentPost.id) {
      let blogPosts = loadCollection(BLOG_KEY, blogSeedItems);
      blogPosts = blogPosts.filter((p) => p.id !== currentPost.id);
      saveCollection(BLOG_KEY, blogPosts);
    }
    closeModal('delete-confirm-modal');
    showToast('Story has been permanently deleted.', 'error');
    setTimeout(() => {
      window.location.href = isReviewMode ? 'approval-requests.html' : 'blog-posts.html';
    }, 450);
  });
});
