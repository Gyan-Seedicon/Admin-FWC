/* ==========================================================================
   Enquiry
   Mock submissions matching the live Redesigned-FWC/contact.html form's
   field set (Name, Email, Phone, Country, Company Type, Message) — that's
   the only "Request Services" form actually wired up on the public site
   today, so mock data mirrors its real fields and dropdown values.

   Rendered as a table with S.No./checkbox/avatar/Enquiry-ID presentation
   (matching the reference dashboard's list styling) plus a right-side
   drawer for full detail, including the submitted message. Persisted to
   localStorage (key: fwc-enquiries) so status changes survive a reload.
   ========================================================================== */

const ENQUIRIES_KEY = 'fwc-enquiries';

const enquiriesSeed = [
  {
    id: 1,
    name: 'Amara Chen',
    email: 'amara.chen@example.com',
    phone: '+1 (415) 555-0142',
    country: 'United States',
    companyType: 'BFSI',
    submitted: 'Aug 27, 2026',
    submittedISO: '2026-08-27',
    status: 'new',
    message: 'We need support scaling our cloud infrastructure ahead of a Q4 product launch — looking for a partner who can move quickly on a short-term engagement.'
  },
  {
    id: 2,
    name: 'Rajesh Nair',
    email: 'rajesh.nair@example.com',
    phone: '+91 98765 43210',
    country: 'India',
    companyType: 'Fintech',
    submitted: 'Aug 25, 2026',
    submittedISO: '2026-08-25',
    status: 'in-progress',
    message: 'Looking for a technology consulting engagement to modernize our core banking APIs. Would like to schedule an initial scoping call.'
  },
  {
    id: 3,
    name: 'Sofia Bergström',
    email: 'sofia.b@example.com',
    phone: '+46 70 123 4567',
    country: 'Sweden',
    companyType: 'Manufacturing',
    submitted: 'Aug 24, 2026',
    submittedISO: '2026-08-24',
    status: 'new',
    message: 'Interested in RPO services to scale our engineering hiring in Q1 — expecting to bring on 15-20 engineers over two quarters.'
  },
  {
    id: 4,
    name: 'David Okafor',
    email: 'd.okafor@example.com',
    phone: '+44 20 7946 0958',
    country: 'United Kingdom',
    companyType: 'Healthcare',
    submitted: 'Aug 20, 2026',
    submittedISO: '2026-08-20',
    status: 'resolved',
    message: 'Need a cybersecurity audit ahead of our SOC2 renewal. Timeline is flexible but would like to start within the next month.'
  },
  {
    id: 5,
    name: 'Mei Lin Tan',
    email: 'meilin.tan@example.com',
    phone: '+65 8123 4567',
    country: 'Singapore',
    companyType: 'EdTech',
    submitted: 'Aug 19, 2026',
    submittedISO: '2026-08-19',
    status: 'new',
    message: 'Exploring AI-augmented staffing for a new product team. Would like more detail on how the vetting process works before committing.'
  }
];

let enquiries = loadCollection(ENQUIRIES_KEY, enquiriesSeed);
let reapplyFilters = () => {};

const AVATAR_COLORS = ['avatar-color-1', 'avatar-color-2', 'avatar-color-3', 'avatar-color-4', 'avatar-color-5'];

const STATUS_BADGE_CLASS = {
  new: 'status-pending',
  'in-progress': 'status-info',
  resolved: 'status-approved'
};

const STATUS_LABEL = {
  new: 'New',
  'in-progress': 'In Progress',
  resolved: 'Resolved'
};

const VIEW_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M247.31,124.76c-.35-.79-8.82-19.58-27.65-38.41C194.57,61.26,162.88,48,128,48S61.43,61.26,36.34,86.35C17.51,105.18,9,124,8.69,124.76a8,8,0,0,0,0,6.5c.35.79,8.82,19.57,27.65,38.4C61.43,194.74,93.12,208,128,208s66.57-13.26,91.66-38.34c18.83-18.83,27.3-37.61,27.65-38.4A8,8,0,0,0,247.31,124.76ZM128,192c-30.78,0-57.67-11.19-79.93-33.25A133.47,133.47,0,0,1,25,128,133.33,133.33,0,0,1,48.07,97.25C70.33,75.19,97.22,64,128,64s57.67,11.19,79.93,33.25A133.46,133.46,0,0,1,231.05,128C223.84,141.46,192.43,192,128,192Zm0-112a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Z"></path></svg>';
const KEBAB_ICON = '<svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16" aria-hidden="true"><path d="M128,80a16,16,0,1,1,16-16A16,16,0,0,1,128,80Zm0,32a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,64a16,16,0,1,0,16,16A16,16,0,0,0,128,176Z"></path></svg>';

function initials(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function enquiryId(id) {
  return `ENQ-${1000 + id}`;
}

function kebabMenu(request) {
  const items = [];
  if (request.status === 'new') {
    items.push(`<button class="kebab-menu-item" data-action="in-progress" data-id="${request.id}">Mark In Progress</button>`);
  }
  if (request.status === 'in-progress') {
    items.push(`<button class="kebab-menu-item" data-action="resolved" data-id="${request.id}">Mark Resolved</button>`);
  }
  if (items.length === 0) return '';

  return `
    <div class="kebab-wrap">
      <button class="icon-btn" data-kebab-trigger aria-label="More actions" type="button">${KEBAB_ICON}</button>
      <div class="kebab-menu hidden">${items.join('')}</div>
    </div>
  `;
}

function actionButtons(request) {
  const viewBtn = `<button class="icon-btn" data-action="view" data-id="${request.id}" aria-label="View" type="button">${VIEW_ICON}</button>`;
  return `<div class="table-actions-group">${viewBtn}${kebabMenu(request)}</div>`;
}

function truncate(text, length) {
  if (!text || text.length <= length) return text || '';
  return `${text.slice(0, length).trim()}…`;
}

function renderTable() {
  const tbody = document.getElementById('enquiries-table-body');
  tbody.innerHTML = enquiries.map((r, index) => `
    <tr data-status="${r.status}" data-date="${r.submittedISO}">
      <td><input class="table-checkbox" type="checkbox" aria-label="Select ${r.name}"></td>
      <td>${index + 1}</td>
      <td class="table-id">${enquiryId(r.id)}</td>
      <td>
        <div class="table-avatar-cell">
          <span class="table-avatar ${AVATAR_COLORS[index % AVATAR_COLORS.length]}">${initials(r.name)}</span>
          <span>${r.name}</span>
        </div>
      </td>
      <td>${r.email}</td>
      <td>${r.phone}</td>
      <td>${r.companyType}</td>
      <td>${r.country}</td>
      <td>${truncate(r.message, 60)} <button class="read-more-link" data-action="view" data-id="${r.id}" type="button">Read More →</button></td>
      <td>${r.submitted}</td>
      <td><span class="status-badge ${STATUS_BADGE_CLASS[r.status]}">${STATUS_LABEL[r.status]}</span></td>
      <td class="table-actions">${actionButtons(r)}</td>
    </tr>
  `).join('');
  document.getElementById('page-heading').textContent = `Enquiry (${enquiries.length})`;
  reapplyFilters();
  updateEmptyState();
}

function updateEmptyState() {
  const tbody = document.getElementById('enquiries-table-body');
  const visibleCount = Array.from(tbody.children).filter((row) => !row.classList.contains('hidden')).length;

  let emptyRow = tbody.querySelector('.request-list-empty-row');
  if (visibleCount === 0) {
    if (!emptyRow) {
      emptyRow = document.createElement('tr');
      emptyRow.className = 'request-list-empty-row';
      emptyRow.innerHTML = '<td colspan="12" style="text-align: center; color: var(--ink-muted);">No enquiries match these filters.</td>';
      tbody.appendChild(emptyRow);
    }
  } else if (emptyRow) {
    emptyRow.remove();
  }
}

function findRequest(id) {
  return enquiries.find((r) => r.id === id);
}

function persist() {
  saveCollection(ENQUIRIES_KEY, enquiries);
}

function handleView(id) {
  const request = findRequest(id);
  if (!request) return;

  document.getElementById('drawer-title').textContent = `${enquiryId(request.id)} — ${request.name}`;
  document.getElementById('drawer-status-badge').textContent = STATUS_LABEL[request.status];
  document.getElementById('drawer-status-badge').className = `status-badge ${STATUS_BADGE_CLASS[request.status]}`;
  document.getElementById('drawer-meta').textContent = `Submitted ${request.submitted}`;
  document.getElementById('drawer-email').textContent = request.email;
  document.getElementById('drawer-phone').textContent = request.phone;
  document.getElementById('drawer-country').textContent = request.country;
  document.getElementById('drawer-company-type').textContent = request.companyType;
  document.getElementById('drawer-message').textContent = request.message;

  openDrawer('view-drawer');
}

document.addEventListener('DOMContentLoaded', () => {
  renderTable();

  const mainContent = document.querySelector('.dashboard-main');
  reapplyFilters = initTableFilters(mainContent);
  initKebabMenus(mainContent);
  document.getElementById('export-csv-btn').addEventListener('click', () => {
    showToast('CSV export coming soon', 'info');
  });
  document.getElementById('request-status-filter').addEventListener('change', updateEmptyState);
  document.getElementById('request-date-filter').addEventListener('change', updateEmptyState);
  document.getElementById('request-search').addEventListener('input', updateEmptyState);

  mainContent.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;
    const id = Number(btn.dataset.id);
    const request = findRequest(id);
    if (!request) return;

    if (btn.dataset.action === 'view') {
      handleView(id);
    } else if (btn.dataset.action === 'in-progress') {
      request.status = 'in-progress';
      persist();
      renderTable();
      showToast(`Marked ${request.name}'s enquiry as In Progress`, 'info');
    } else if (btn.dataset.action === 'resolved') {
      request.status = 'resolved';
      persist();
      renderTable();
      showToast(`Marked ${request.name}'s enquiry as Resolved`, 'success');
    }
  });
});
