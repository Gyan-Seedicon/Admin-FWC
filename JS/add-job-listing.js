/* ==========================================================================
   Add / Edit Job Listing
   Mock authoring page — no backend. Builds a job listing object matching
   the shape used by job-listings.js and pushes/updates it in the same
   localStorage collection (key: fwc-job-listings) so it shows up back on
   the Job Listings table.
   ========================================================================== */

const REMOVE_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>';

function getParams() {
  return new URLSearchParams(window.location.search);
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

function todayMeta() {
  const today = new Date('2026-08-30');
  const submittedISO = today.toISOString().slice(0, 10);
  const submitted = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  return { submitted, submittedISO };
}

function stripHtml(html) {
  const div = document.createElement('div');
  div.innerHTML = html;
  return (div.textContent || '').replace(/\s+/g, ' ').trim();
}

// The description is a contenteditable field, not a real form control, so
// it's outside validateForm()'s `[required]` scan — check it separately.
function validateDescription() {
  const field = document.getElementById('field-description');
  if (stripHtml(field.innerHTML)) {
    clearFieldError(field);
    return true;
  }
  setFieldError(field, 'Job description is required.');
  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  initRichTextToolbar(document.getElementById('rich-text-toolbar'));

  document.getElementById('field-description').addEventListener('input', () => clearFieldError(document.getElementById('field-description')));

  const params = getParams();
  const editId = params.get('mode') === 'edit' ? Number(params.get('id')) : null;

  let jobListings = loadCollection('fwc-job-listings', []);
  let editingJob = null;

  if (editId != null) {
    editingJob = jobListings.find((job) => job.id === editId);
  }

  if (editingJob) {
    document.getElementById('page-heading').textContent = 'Edit Job Listing';
    document.getElementById('page-title').textContent = 'Edit Job Listing — FWC Dashboard';
    document.querySelector('.page-subheading').textContent = 'Update this listing’s details.';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';

    document.getElementById('field-role').value = editingJob.title || '';
    document.getElementById('field-department').value = editingJob.department || '';
    document.getElementById('field-location').value = editingJob.location || '';
    document.getElementById('field-type').value = editingJob.type || 'Full-time';
    document.getElementById('field-description').innerHTML = editingJob.descriptionHtml || editingJob.excerpt || '';

    if (editingJob.pdfName) {
      document.getElementById('pdf-help-text').textContent = `Current file: ${editingJob.pdfName}`;
    }

    (editingJob.customFields || []).forEach((field) => addCustomFieldRow(field.label, field.value));
  }

  document.getElementById('add-custom-field-btn').addEventListener('click', () => addCustomFieldRow());

  document.getElementById('field-pdf').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    document.getElementById('pdf-help-text').textContent = file
      ? `Selected: ${file.name}`
      : 'Mock upload — the filename is stored and shown in the listing\'s detail drawer.';
  });

  document.getElementById('job-listing-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    const descriptionValid = validateDescription();
    if (!validateForm(form) || !descriptionValid) return;

    const title = document.getElementById('field-role').value.trim();
    const department = document.getElementById('field-department').value.trim();
    const location = document.getElementById('field-location').value.trim();
    const type = document.getElementById('field-type').value;
    const descriptionHtml = document.getElementById('field-description').innerHTML;
    const excerpt = stripHtml(descriptionHtml).slice(0, 300);
    const customFields = collectCustomFields();
    const pdfFile = document.getElementById('field-pdf').files[0];
    const pdfName = pdfFile ? pdfFile.name : (editingJob && editingJob.pdfName) || `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-jd.pdf`;

    if (editingJob) {
      editingJob.title = title;
      editingJob.department = department;
      editingJob.location = location;
      editingJob.type = type;
      editingJob.excerpt = excerpt;
      editingJob.descriptionHtml = descriptionHtml;
      editingJob.pdfName = pdfName;
      editingJob.customFields = customFields;
      saveCollection('fwc-job-listings', jobListings);
      showToast('Job listing updated.', 'success');
    } else {
      const { submitted, submittedISO } = todayMeta();
      const newId = jobListings.length ? Math.max(...jobListings.map((j) => j.id)) + 1 : 1;
      jobListings.push({
        id: newId,
        title,
        department,
        location,
        type,
        submitted,
        submittedISO,
        status: 'pending',
        feedback: null,
        pdfName,
        excerpt,
        descriptionHtml,
        customFields
      });
      saveCollection('fwc-job-listings', jobListings);
      showToast('Job listing submitted for approval.', 'success');
    }

    window.location.href = 'job-listings.html';
  });
});
