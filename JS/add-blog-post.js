/* ==========================================================================
   Add / Edit / Review Blog Post — Medium Style Writing & Review Canvas
   Review mode workflow, approve confirmation modal, reject feedback modal,
   floating (+) inserter, selection bubble toolbar, and slash commands.
   ========================================================================== */

const BLOG_KEY = 'fwc-blog-posts';

let coverImageUrl = null;
let currentPost = null;
let isReviewMode = false;

function getParams() {
  return new URLSearchParams(window.location.search);
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

function formatNow() {
  const now = new Date();
  const datePart = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} · ${timePart}`;
}

function updateWordStats() {
  const title = document.getElementById('story-title-input').value;
  const bodyText = stripHtml(document.getElementById('story-editor-body').innerHTML);
  const totalWords = `${title} ${bodyText}`.trim().split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(totalWords / 200));

  const statsEl = document.getElementById('meta-stats-text');
  if (statsEl) {
    statsEl.textContent = `${totalWords} words · ${readTime} min read`;
  }
}

// --------------------------------------------------------------------------
// Cover Banner Handler
// --------------------------------------------------------------------------
function setCoverImage(url) {
  coverImageUrl = url;
  const emptyPrompt = document.getElementById('cover-empty-prompt');
  const previewBox = document.getElementById('cover-preview-box');
  const previewImg = document.getElementById('cover-preview-img');

  if (url) {
    previewImg.src = url;
    previewBox.classList.remove('hidden');
    emptyPrompt.classList.add('hidden');
  } else {
    previewImg.src = '';
    previewBox.classList.add('hidden');
    emptyPrompt.classList.remove('hidden');
  }
}

function initCoverUploader() {
  const emptyPrompt = document.getElementById('cover-empty-prompt');
  const fileInput = document.getElementById('cover-file-input');
  const changeBtn = document.getElementById('change-cover-btn');
  const removeBtn = document.getElementById('remove-cover-btn');

  emptyPrompt.addEventListener('click', () => fileInput.click());
  changeBtn.addEventListener('click', () => fileInput.click());
  removeBtn.addEventListener('click', () => setCoverImage(null));

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setCoverImage(event.target.result);
      reader.readAsDataURL(file);
    }
  });
}

// --------------------------------------------------------------------------
// Medium-style Floating Inserter (+) — (Image, Unsplash, Section Break)
// --------------------------------------------------------------------------
function initFloatingAdder() {
  const adder = document.getElementById('floating-adder');
  const trigger = document.getElementById('floating-adder-trigger');
  const menu = document.getElementById('floating-adder-menu');
  const editor = document.getElementById('story-editor-body');

  function updateAdderPosition() {
    if (isReviewMode) {
      adder.style.opacity = '0';
      adder.style.pointerEvents = 'none';
      return;
    }

    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) {
      adder.style.opacity = '0';
      adder.style.pointerEvents = 'none';
      return;
    }

    let node = selection.anchorNode;
    if (node.nodeType === Node.TEXT_NODE) node = node.parentNode;
    const block = node.closest('#story-editor-body > *') || node.closest('#story-editor-body');

    if (block && editor.contains(block)) {
      const isBlank = !block.textContent.trim() || block.innerHTML === '<br>';
      if (isBlank) {
        const blockRect = block.getBoundingClientRect();
        const editorRect = editor.getBoundingClientRect();
        adder.style.top = `${blockRect.top - editorRect.top + 2}px`;
        adder.style.opacity = '1';
        adder.style.pointerEvents = 'auto';
        return;
      }
    }

    adder.style.opacity = '0';
    adder.style.pointerEvents = 'none';
    closeAdderMenu();
  }

  function closeAdderMenu() {
    trigger.classList.remove('is-open');
    menu.classList.remove('is-open');
  }

  function toggleAdderMenu() {
    const isOpen = menu.classList.contains('is-open');
    if (isOpen) {
      closeAdderMenu();
    } else {
      trigger.classList.add('is-open');
      menu.classList.add('is-open');
    }
  }

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleAdderMenu();
  });

  document.addEventListener('click', (e) => {
    if (!adder.contains(e.target)) closeAdderMenu();
  });

  editor.addEventListener('keyup', updateAdderPosition);
  editor.addEventListener('mouseup', updateAdderPosition);
  editor.addEventListener('focus', updateAdderPosition);

  // Inserter actions
  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-insert]');
    if (!btn) return;
    const type = btn.dataset.insert;

    if (type === 'image') {
      const url = prompt('Enter image URL (or press OK for demo image):', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80');
      if (url) {
        document.execCommand('insertHTML', false, `<figure style="margin: 1.8em 0;"><img src="${url}" alt="Article figure" style="width: 100%; border-radius: 8px; display: block;"><figcaption style="font-size: 13px; color: #64748B; text-align: center; margin-top: 6px;" contenteditable="true">Type caption for image (optional)</figcaption></figure><p><br></p>`);
      }
    } else if (type === 'stock') {
      const stockPhotos = [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop&q=80'
      ];
      const randomPhoto = stockPhotos[Math.floor(Math.random() * stockPhotos.length)];
      document.execCommand('insertHTML', false, `<figure style="margin: 1.8em 0;"><img src="${randomPhoto}" alt="Technology & Engineering" style="width: 100%; border-radius: 8px; display: block;"><figcaption style="font-size: 13px; color: #64748B; text-align: center; margin-top: 6px;" contenteditable="true">Photo by Unsplash / FWC Enterprise</figcaption></figure><p><br></p>`);
    } else if (type === 'divider') {
      document.execCommand('insertHTML', false, `<hr><p><br></p>`);
    }

    closeAdderMenu();
    updateAdderPosition();
    updateWordStats();
  });
}

// --------------------------------------------------------------------------
// Sleek Selection Bubble Toolbar
// --------------------------------------------------------------------------
function initSelectionBubble() {
  const bubble = document.getElementById('selection-bubble');
  const editor = document.getElementById('story-editor-body');

  function updateButtonActiveStates() {
    try {
      const isBold = document.queryCommandState('bold');
      const isItalic = document.queryCommandState('italic');
      const isUnderline = document.queryCommandState('underline');
      const isUL = document.queryCommandState('insertUnorderedList');
      const isOL = document.queryCommandState('insertOrderedList');
      const block = document.queryCommandValue('formatBlock').toLowerCase();

      bubble.querySelector('[data-cmd="bold"]')?.classList.toggle('is-active', isBold);
      bubble.querySelector('[data-cmd="italic"]')?.classList.toggle('is-active', isItalic);
      bubble.querySelector('[data-cmd="underline"]')?.classList.toggle('is-active', isUnderline);
      bubble.querySelector('[data-cmd="insertUnorderedList"]')?.classList.toggle('is-active', isUL);
      bubble.querySelector('[data-cmd="insertOrderedList"]')?.classList.toggle('is-active', isOL);
      bubble.querySelector('[data-cmd="formatH2"]')?.classList.toggle('is-active', block === 'h2');
      bubble.querySelector('[data-cmd="formatH3"]')?.classList.toggle('is-active', block === 'h3');
      bubble.querySelector('[data-cmd="formatQuote"]')?.classList.toggle('is-active', block === 'blockquote');
    } catch (e) {}
  }

  function checkSelection() {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.rangeCount) {
      bubble.classList.remove('is-visible');
      return;
    }

    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    if (!editor.contains(container)) {
      bubble.classList.remove('is-visible');
      return;
    }

    const text = selection.toString().trim();
    if (!text) {
      bubble.classList.remove('is-visible');
      return;
    }

    const rect = range.getBoundingClientRect();
    const topPos = window.scrollY + rect.top - 48;
    const leftPos = window.scrollX + rect.left + (rect.width / 2) - (bubble.offsetWidth / 2);

    bubble.style.top = `${Math.max(64, topPos)}px`;
    bubble.style.left = `${Math.max(16, leftPos)}px`;
    bubble.classList.add('is-visible');
    updateButtonActiveStates();
  }

  document.addEventListener('selectionchange', () => {
    setTimeout(checkSelection, 10);
  });

  bubble.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cmd]');
    if (!btn) return;
    const cmd = btn.dataset.cmd;

    if (cmd === 'createLink') {
      const url = prompt('Enter link URL:', 'https://');
      if (url) document.execCommand('createLink', false, url);
    } else if (cmd === 'formatH2') {
      const block = document.queryCommandValue('formatBlock').toLowerCase();
      document.execCommand('formatBlock', false, block === 'h2' ? '<p>' : '<h2>');
    } else if (cmd === 'formatH3') {
      const block = document.queryCommandValue('formatBlock').toLowerCase();
      document.execCommand('formatBlock', false, block === 'h3' ? '<p>' : '<h3>');
    } else if (cmd === 'formatQuote') {
      const block = document.queryCommandValue('formatBlock').toLowerCase();
      document.execCommand('formatBlock', false, block === 'blockquote' ? '<p>' : '<blockquote>');
    } else {
      document.execCommand(cmd, false, null);
    }

    updateButtonActiveStates();
    checkSelection();
    updateWordStats();
  });
}

// --------------------------------------------------------------------------
// Slash Commands Popup
// --------------------------------------------------------------------------
function initSlashCommands() {
  const popup = document.getElementById('slash-popup');
  const editor = document.getElementById('story-editor-body');

  editor.addEventListener('input', () => {
    if (isReviewMode) return;
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) {
      popup.classList.remove('is-open');
      return;
    }

    const text = selection.anchorNode.textContent || '';
    if (text.startsWith('/')) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      popup.style.top = `${window.scrollY + rect.bottom + 6}px`;
      popup.style.left = `${window.scrollX + rect.left}px`;
      popup.classList.add('is-open');
    } else {
      popup.classList.remove('is-open');
    }
  });

  popup.addEventListener('click', (e) => {
    const item = e.target.closest('[data-slash]');
    if (!item) return;
    const type = item.dataset.slash;

    // Clear slash command text
    document.execCommand('selectAll', false, null);
    document.execCommand('delete', false, null);

    if (type === 'h2') document.execCommand('formatBlock', false, '<h2>');
    else if (type === 'h3') document.execCommand('formatBlock', false, '<h3>');
    else if (type === 'quote') document.execCommand('formatBlock', false, '<blockquote>');
    else if (type === 'bullet') document.execCommand('insertUnorderedList', false, null);
    else if (type === 'divider') document.execCommand('insertHTML', false, '<hr><p><br></p>');

    popup.classList.remove('is-open');
    updateWordStats();
  });
}

// --------------------------------------------------------------------------
// Title Auto-Grow & Formatting
// --------------------------------------------------------------------------
function initTitleAutogrow() {
  const titleInput = document.getElementById('story-title-input');
  function adjust() {
    titleInput.style.height = 'auto';
    titleInput.style.height = `${titleInput.scrollHeight}px`;
    updateWordStats();
  }
  titleInput.addEventListener('input', adjust);
  titleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const editor = document.getElementById('story-editor-body');
      editor.focus();
    }
  });
}

// --------------------------------------------------------------------------
// --------------------------------------------------------------------------
// Save and Submit Handlers (Draft / Creator Flow)
// --------------------------------------------------------------------------
function extractSectionsFromHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  const sections = [];

  let currentHeading = 'Introduction';
  let currentContent = [];

  Array.from(div.children).forEach((child) => {
    if (child.tagName === 'H2' || child.tagName === 'H3') {
      if (currentContent.length) {
        sections.push({ heading: currentHeading, content: currentContent.join('') });
        currentContent = [];
      }
      currentHeading = child.textContent.trim() || 'Section';
    } else {
      currentContent.push(child.outerHTML);
    }
  });

  if (currentContent.length || !sections.length) {
    sections.push({ heading: currentHeading, content: currentContent.join('') || html });
  }

  return sections;
}

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

  const category = currentPost?.category || 'AI & Tech Staffing';
  const author = currentPost?.author || 'Taylor Brooks';
  const excerpt = textContent.slice(0, 240);
  const sections = extractSectionsFromHtml(htmlContent);

  let blogPosts = loadCollection(BLOG_KEY, []);
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
    showToast('Story updated successfully.', 'success');
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
    showToast(status === 'published' ? 'Story published!' : 'Story submitted for approval.', 'success');
  }

  setTimeout(() => {
    window.location.href = 'blog-posts.html';
  }, 400);
  return true;
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

  document.getElementById('review-meta-text').textContent = `Submitted by ${post.author} on ${post.submitted}`;

  // Populate Editor Fields
  document.getElementById('story-title-input').value = post.title || '';
  document.getElementById('meta-category').value = post.category || 'AI';
  document.getElementById('meta-author').value = post.author || '';
  document.getElementById('meta-excerpt').value = post.excerpt || '';

  if (post.coverImage) setCoverImage(post.coverImage);
  if (post.content) {
    document.getElementById('story-editor-body').innerHTML = post.content;
  } else if (post.sections && post.sections.length) {
    document.getElementById('story-editor-body').innerHTML = post.sections.map((s) => `<h2>${s.heading}</h2><p>${s.content}</p>`).join('');
  }

  updateWordStats();

  // Approve Trigger
  document.getElementById('review-approve-btn').addEventListener('click', () => {
    document.getElementById('approve-story-title').textContent = post.title;
    document.getElementById('approve-story-author').textContent = post.author;
    openModal('approve-confirm-modal');
  });

  // Confirm Approve
  document.getElementById('confirm-approve-btn').addEventListener('click', () => {
    let blogPosts = loadCollection(BLOG_KEY, []);
    const match = blogPosts.find((p) => p.id === post.id);
    if (match) {
      match.status = 'published';
      match.actionTakenOn = formatNow();
      match.feedback = null;
      saveCollection(BLOG_KEY, blogPosts);
    }
    closeModal('approve-confirm-modal');
    showToast(`Approved "${post.title}" — published live!`, 'success');
    setTimeout(() => {
      window.location.href = 'approval-requests.html';
    }, 450);
  });

  // Reject Trigger
  document.getElementById('review-reject-btn').addEventListener('click', () => {
    document.getElementById('reject-story-title').textContent = post.title;
    document.getElementById('rejection-reason-input').value = '';
    document.getElementById('rejection-error-text').style.display = 'none';
    openModal('reject-feedback-modal');
  });

  // Confirm Reject
  document.getElementById('confirm-reject-btn').addEventListener('click', () => {
    const reasonInput = document.getElementById('rejection-reason-input');
    const reason = reasonInput.value.trim();
    if (!reason) {
      document.getElementById('rejection-error-text').style.display = 'block';
      reasonInput.focus();
      return;
    }

    let blogPosts = loadCollection(BLOG_KEY, []);
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
  });
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

  if (targetId != null) {
    const blogPosts = loadCollection(BLOG_KEY, []);
    currentPost = blogPosts.find((p) => p.id === targetId);

    if (currentPost) {
      if (mode === 'review') {
        setupReviewMode(currentPost);
      } else if (mode === 'edit') {
        document.getElementById('page-title').textContent = `Edit — ${currentPost.title}`;
        const currBreadcrumb = document.getElementById('breadcrumb-current');
        if (currBreadcrumb) currBreadcrumb.textContent = 'Edit Blog Post';
        const pageHeading = document.getElementById('page-heading');
        if (pageHeading) pageHeading.textContent = 'Edit Blog Post';

        document.getElementById('story-title-input').value = currentPost.title || '';

        if (currentPost.coverImage) setCoverImage(currentPost.coverImage);
        if (currentPost.content) editor.innerHTML = currentPost.content;
        else if (currentPost.sections && currentPost.sections.length) {
          editor.innerHTML = currentPost.sections.map((s) => `<h2>${s.heading}</h2><p>${s.content}</p>`).join('');
        }

        updateWordStats();
      }
    }
  }

  // Set default starting paragraph if empty
  if (!editor.innerHTML.trim()) {
    editor.innerHTML = '<p><br></p>';
  }

  document.getElementById('save-draft-btn')?.addEventListener('click', () => {
    saveStory('draft');
  });

  document.getElementById('submit-approval-btn')?.addEventListener('click', () => {
    saveStory('pending');
  });
});
