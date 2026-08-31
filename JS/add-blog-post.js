/* ==========================================================================
   Add / Edit Blog Post
   Mock authoring page — no backend. Builds a blog post object matching the
   shape used by blog-posts.js and pushes/updates it in the same
   localStorage collection (key: fwc-blog-posts) so it shows up back on the
   Blog Posts table.

   Content is authored as a set of "sections" — like tabs in a doc — shown
   as a left-hand rail. The blog Title field stays constant above the rail
   regardless of which section is active; only the section's own content
   (a rich-text-editable field) changes. Each section's name doubles as its
   `heading` in the saved data, matching the shape blog-posts.js already
   renders as a subheading in the site preview.
   ========================================================================== */

const REMOVE_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>';

function getParams() {
  return new URLSearchParams(window.location.search);
}

let sections = [];
let activeSectionIndex = 0;

function railListEl() {
  return document.getElementById('sections-rail-list');
}

function contentEditableEl() {
  return document.getElementById('doc-content-editable');
}

// Flushes the currently-visible editor's HTML back into the active
// section before switching tabs, collecting, or otherwise reading state.
function syncActiveContent() {
  if (sections[activeSectionIndex]) {
    sections[activeSectionIndex].content = contentEditableEl().innerHTML;
  }
}

function renderRail() {
  const list = railListEl();
  list.innerHTML = '';

  sections.forEach((section, index) => {
    const tab = document.createElement('div');
    tab.className = 'blog-section-tab' + (index === activeSectionIndex ? ' active' : '');

    const nameInput = document.createElement('input');
    nameInput.className = 'blog-section-tab-name';
    nameInput.type = 'text';
    nameInput.placeholder = `Section ${index + 1}`;
    nameInput.value = section.heading || '';
    nameInput.addEventListener('input', () => { section.heading = nameInput.value; });

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'blog-section-tab-remove';
    removeBtn.setAttribute('aria-label', 'Remove section');
    removeBtn.innerHTML = REMOVE_ICON;
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      removeSection(index);
    });

    tab.appendChild(nameInput);
    tab.appendChild(removeBtn);
    tab.addEventListener('click', () => {
      if (index !== activeSectionIndex) setActiveSection(index);
    });
    list.appendChild(tab);
  });
}

function setActiveSection(index) {
  syncActiveContent();
  activeSectionIndex = index;
  contentEditableEl().innerHTML = sections[index] ? sections[index].content : '';
  renderRail();
}

function addSection(heading = '', content = '') {
  syncActiveContent();
  sections.push({ heading, content });
  activeSectionIndex = sections.length - 1;
  contentEditableEl().innerHTML = content;
  renderRail();
}

function removeSection(index) {
  if (sections.length <= 1) {
    showToast('A post needs at least one section.', 'error');
    return;
  }
  sections.splice(index, 1);
  if (activeSectionIndex >= sections.length) activeSectionIndex = sections.length - 1;
  contentEditableEl().innerHTML = sections[activeSectionIndex].content;
  renderRail();
}

function collectSections() {
  syncActiveContent();
  return sections
    .map((section) => ({ heading: section.heading.trim(), content: section.content.trim() }))
    .filter((section) => section.heading || (section.content && section.content !== '<br>'));
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

function addCustomFieldRow(label = '', value = '') {
  const list = document.getElementById('custom-fields-list');
  const row = document.createElement('div');
  row.className = 'custom-field-row';
  row.innerHTML = `
    <input class="form-input" type="text" placeholder="Field name" value="${label}">
    <input class="form-input" type="text" placeholder="Value" value="${value}">
    <button class="remove-row-btn" type="button" aria-label="Remove field">${REMOVE_ICON}</button>
  `;
  row.querySelector('.remove-row-btn').addEventListener('click', () => row.remove());
  list.appendChild(row);
}

function collectCustomFields() {
  return Array.from(document.querySelectorAll('#custom-fields-list .custom-field-row'))
    .map((row) => {
      const inputs = row.querySelectorAll('.form-input');
      return { label: inputs[0].value.trim(), value: inputs[1].value.trim() };
    })
    .filter((field) => field.label);
}

function collectImageNames() {
  const input = document.getElementById('field-images');
  return Array.from(input.files || []).map((file) => file.name);
}

function todayMeta() {
  const today = new Date('2026-08-30');
  const submittedISO = today.toISOString().slice(0, 10);
  const submitted = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return { submitted, submittedISO };
}

document.addEventListener('DOMContentLoaded', () => {
  initRichTextToolbar(document.getElementById('rich-text-toolbar'));

  const params = getParams();
  const editId = params.get('mode') === 'edit' ? Number(params.get('id')) : null;

  let blogPosts = loadCollection('fwc-blog-posts', []);
  let editingPost = null;

  if (editId != null) {
    editingPost = blogPosts.find((post) => post.id === editId);
  }

  if (editingPost) {
    document.getElementById('page-heading').textContent = 'Edit Blog Post';
    document.getElementById('page-title').textContent = 'Edit Blog Post — FWC Dashboard';
    document.querySelector('.page-subheading').textContent = 'Update this post’s details.';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';

    document.getElementById('field-title').value = editingPost.title || '';
    document.getElementById('field-category').value = editingPost.category || 'AI';

    if (editingPost.sections && editingPost.sections.length) {
      editingPost.sections.forEach((section) => addSection(section.heading, section.content));
    } else {
      addSection('', editingPost.content || editingPost.excerpt || '');
    }
    (editingPost.customFields || []).forEach((field) => addCustomFieldRow(field.label, field.value));
  } else {
    addSection('');
  }

  document.getElementById('add-section-btn').addEventListener('click', () => addSection());
  document.getElementById('add-custom-field-btn').addEventListener('click', () => addCustomFieldRow());

  document.getElementById('field-images').addEventListener('change', (e) => {
    const names = Array.from(e.target.files || []).map((f) => f.name);
    document.getElementById('images-help-text').textContent = names.length
      ? `Selected: ${names.join(', ')}`
      : 'Mock upload — filenames are stored, not the actual files.';
  });

  document.getElementById('blog-post-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (!validateForm(form)) return;

    const collectedSections = collectSections();
    if (!collectedSections.length) {
      showToast('Add at least one section with content.', 'error');
      return;
    }

    const title = document.getElementById('field-title').value.trim();
    const category = document.getElementById('field-category').value;
    const author = (editingPost && editingPost.author) || 'Taylor Brooks';
    const content = collectedSections.map((s) => s.content).join('');
    const excerpt = stripHtml(content).slice(0, 220);
    const customFields = collectCustomFields();
    const images = collectImageNames();

    if (editingPost) {
      editingPost.title = title;
      editingPost.category = category;
      editingPost.content = content;
      editingPost.excerpt = excerpt;
      editingPost.sections = collectedSections;
      editingPost.customFields = customFields;
      if (images.length) editingPost.images = images;
      saveCollection('fwc-blog-posts', blogPosts);
      showToast('Blog post updated.', 'success');
    } else {
      const { submitted, submittedISO } = todayMeta();
      const newId = blogPosts.length ? Math.max(...blogPosts.map((p) => p.id)) + 1 : 1;
      blogPosts.push({
        id: newId,
        title,
        author,
        category,
        submitted,
        submittedISO,
        status: 'pending',
        feedback: null,
        excerpt,
        content,
        sections: collectedSections,
        customFields,
        images
      });
      saveCollection('fwc-blog-posts', blogPosts);
      showToast('Blog post submitted for approval.', 'success');
    }

    window.location.href = 'blog-posts.html';
  });
});
