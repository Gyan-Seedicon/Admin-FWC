/* ==========================================================================
   Admin Management — Access Control
   ========================================================================== */

const ADMIN_KEY = 'fwc-admins';

const adminSeedData = [
  {
    id: 1,
    name: 'Alex Kim',
    email: 'alex.kim@fwc.com',
    department: 'Content & Marketing',
    directAccess: true,
    dateAdded: 'Jan 15, 2026'
  },
  {
    id: 2,
    name: 'Sam Patel',
    email: 'sam.patel@fwc.com',
    department: 'Engineering',
    directAccess: false,
    dateAdded: 'Feb 02, 2026'
  },
  {
    id: 3,
    name: 'Jordan Lee',
    email: 'jordan.lee@fwc.com',
    department: 'People Ops',
    directAccess: true,
    dateAdded: 'Feb 18, 2026'
  },
  {
    id: 4,
    name: 'Priya Nair',
    email: 'priya.nair@fwc.com',
    department: 'Technology Consulting',
    directAccess: true,
    dateAdded: 'Mar 01, 2026'
  },
  {
    id: 5,
    name: 'Marcus Vance',
    email: 'marcus.vance@fwc.com',
    department: 'Cybersecurity',
    directAccess: false,
    dateAdded: 'Apr 10, 2026'
  }
];

let admins = loadCollection(ADMIN_KEY, adminSeedData);
let pendingToggle = null;

const AVATAR_COLORS = ['avatar-color-1', 'avatar-color-2', 'avatar-color-3', 'avatar-color-4', 'avatar-color-5'];

function initials(name) {
  return (name || '').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function renderStats() {
  const grantedCount = admins.filter((a) => a.directAccess).length;
  const deniedCount = admins.filter((a) => !a.directAccess).length;
  const depts = new Set(admins.map((a) => a.department)).size;

  document.getElementById('stat-total-admins').textContent = admins.length;
  document.getElementById('stat-granted-admins').textContent = grantedCount;
  document.getElementById('stat-denied-admins').textContent = deniedCount;
  document.getElementById('stat-departments').textContent = depts;
}

function renderTable(items) {
  const tbody = document.getElementById('admins-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="7" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No administrators found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((admin, idx) => `
    <tr data-status="${admin.directAccess ? 'granted' : 'denied'}" data-id="${admin.id}">
      <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
      <td class="table-id">ADM-${100 + admin.id}</td>
      <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">
        <div class="table-avatar-cell" style="white-space: nowrap;">
          <span class="table-avatar ${AVATAR_COLORS[idx % AVATAR_COLORS.length]}">${initials(admin.name)}</span>
          <span>${admin.name}</span>
        </div>
      </td>
      <td style="white-space: nowrap;"><a href="mailto:${admin.email}" class="table-link">${admin.email}</a></td>
      <td style="white-space: nowrap;"><span class="status-badge status-draft">${admin.department}</span></td>
      <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${admin.dateAdded}</td>
      <td style="text-align: right; white-space: nowrap;">
        <button
          class="toggle-switch ${admin.directAccess ? 'is-active' : ''}"
          role="switch"
          aria-checked="${admin.directAccess ? 'true' : 'false'}"
          data-admin-id="${admin.id}"
          type="button"
          aria-label="Direct publish access for ${admin.name}"
        ></button>
      </td>
    </tr>
  `).join('');
}

function refreshAll() {
  admins = loadCollection(ADMIN_KEY, adminSeedData);
  renderTable(admins);
  renderStats();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();

  // Search and Filter
  const searchInput = document.getElementById('admin-search');
  const statusFilter = document.getElementById('admin-status-filter');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const st = statusFilter?.value || 'all';

    const filtered = admins.filter((admin) => {
      const matchSearch = !q ||
        admin.name.toLowerCase().includes(q) ||
        admin.email.toLowerCase().includes(q) ||
        admin.department.toLowerCase().includes(q);

      const matchStatus = st === 'all' ||
        (st === 'granted' && admin.directAccess) ||
        (st === 'denied' && !admin.directAccess);

      return matchSearch && matchStatus;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    exportTableToCSV('admins-table', 'fwc-admins.csv');
  });

  // Toggle switch handling with confirmation modal
  document.getElementById('admins-table-body')?.addEventListener('click', (e) => {
    const toggle = e.target.closest('.toggle-switch');
    if (!toggle) return;

    const id = Number(toggle.dataset.adminId);
    const admin = admins.find((a) => a.id === id);
    if (!admin) return;

    pendingToggle = admin;
    const nextState = !admin.directAccess;
    const msg = nextState
      ? `Grant <strong>${admin.name}</strong> direct publishing rights? Their posts and jobs will go live immediately without moderation.`
      : `Revoke direct publishing rights for <strong>${admin.name}</strong>? Their content submissions will require super admin review.`;

    document.getElementById('toggle-confirm-text').innerHTML = msg;
    openModal('toggle-confirm-modal');
  });

  document.getElementById('toggle-confirm-btn')?.addEventListener('click', () => {
    if (!pendingToggle) return;
    pendingToggle.directAccess = !pendingToggle.directAccess;
    saveCollection(ADMIN_KEY, admins);
    refreshAll();
    closeModal('toggle-confirm-modal');
    showToast(`Updated publish access for ${pendingToggle.name}.`, 'success');
    pendingToggle = null;
  });

  document.getElementById('toggle-cancel-btn')?.addEventListener('click', () => {
    closeModal('toggle-confirm-modal');
    pendingToggle = null;
  });

  // Add Admin form
  const addForm = document.getElementById('add-admin-form');
  initLiveFieldValidation(addForm);

  document.getElementById('add-admin-submit-btn')?.addEventListener('click', () => {
    if (!validateForm(addForm)) return;

    const name = document.getElementById('admin-name').value.trim();
    const email = document.getElementById('admin-email').value.trim();
    const department = document.getElementById('admin-department').value;

    const newId = admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newAdmin = {
      id: newId,
      name,
      email,
      department,
      directAccess: false,
      dateAdded: today
    };

    admins.push(newAdmin);
    saveCollection(ADMIN_KEY, admins);
    refreshAll();
    closeModal('add-admin-modal');
    addForm.reset();
    showToast(`Added new administrator ${name}.`, 'success');
  });
});
