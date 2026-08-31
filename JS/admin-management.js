/* ==========================================================================
   Admin Management
   Admin Controls table with Granted/Denied access toggles + Add Admin.
   Persisted to localStorage (key: fwc-admins) so added admins and access
   changes survive a page reload, matching every other list page in the
   dashboard.
   ========================================================================== */

const ADMINS_KEY = 'fwc-admins';

const adminsSeed = [
  { id: 1, name: 'Alex Kim', email: 'alex.kim@fwc.com', department: 'Content & Marketing', dateAdded: 'Jul 2, 2026', granted: false },
  { id: 2, name: 'Sam Patel', email: 'sam.patel@fwc.com', department: 'Engineering', dateAdded: 'Jun 15, 2026', granted: true },
  { id: 3, name: 'Jordan Lee', email: 'jordan.lee@fwc.com', department: 'People Ops', dateAdded: 'Aug 1, 2026', granted: false },
  { id: 4, name: 'Priya Nair', email: 'priya.nair@fwc.com', department: 'Content & Marketing', dateAdded: 'May 20, 2026', granted: true }
];

let admins = loadCollection(ADMINS_KEY, adminsSeed);
let pendingToggle = null; // { adminId, input }
let reapplyFilters = () => {};

const AVATAR_COLORS = ['avatar-color-1', 'avatar-color-2', 'avatar-color-3', 'avatar-color-4', 'avatar-color-5'];

function initials(name) {
  return name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function persist() {
  saveCollection(ADMINS_KEY, admins);
}

function renderStats() {
  const grantedCount = admins.filter((a) => a.granted).length;
  document.getElementById('stat-total-admins').textContent = admins.length;
  document.getElementById('stat-granted-admins').textContent = grantedCount;
  document.getElementById('stat-denied-admins').textContent = admins.length - grantedCount;
  document.getElementById('stat-departments').textContent = new Set(admins.map((a) => a.department)).size;
}

function renderAdminsTable() {
  const tbody = document.getElementById('admins-table-body');
  tbody.innerHTML = admins.map((admin, index) => `
    <tr data-status="${admin.granted ? 'granted' : 'denied'}">
      <td><input class="table-checkbox" type="checkbox" aria-label="Select ${admin.name}"></td>
      <td>${index + 1}</td>
      <td>
        <div class="table-avatar-cell">
          <span class="table-avatar ${AVATAR_COLORS[index % AVATAR_COLORS.length]}">${initials(admin.name)}</span>
          <span>${admin.name}</span>
        </div>
      </td>
      <td>${admin.email}</td>
      <td>${admin.department}</td>
      <td>${admin.dateAdded}</td>
      <td>
        <label class="toggle-switch">
          <input type="checkbox" data-admin-id="${admin.id}" ${admin.granted ? 'checked' : ''}>
          <span class="toggle-track"><span class="toggle-thumb"></span></span>
          <span class="toggle-label">${admin.granted ? 'Granted' : 'Denied'}</span>
        </label>
      </td>
    </tr>
  `).join('');

  initToggleSwitches(tbody);
  renderStats();
  document.getElementById('page-heading').textContent = `Admin Management (${admins.length})`;
  reapplyFilters();
}

function findAdmin(id) {
  return admins.find((admin) => admin.id === id);
}

document.addEventListener('DOMContentLoaded', () => {
  renderAdminsTable();
  reapplyFilters = initTableFilters(document.querySelector('.dashboard-main'));

  document.getElementById('export-csv-btn').addEventListener('click', () => {
    showToast('CSV export coming soon', 'info');
  });

  document.getElementById('admins-table-body').addEventListener('fwc:toggle-change', (e) => {
    const input = e.target;
    const adminId = Number(input.dataset.adminId);
    const admin = findAdmin(adminId);
    if (!admin) return;

    pendingToggle = { adminId, input };
    document.getElementById('toggle-confirm-text').textContent =
      `Change access for ${admin.name}? They will ${input.checked ? 'be able to publish without approval' : 'need approval before publishing'}.`;
    openModal('toggle-confirm-modal');
  });

  document.getElementById('toggle-cancel-btn').addEventListener('click', () => {
    if (pendingToggle) {
      pendingToggle.input.checked = !pendingToggle.input.checked;
      pendingToggle.input.closest('.toggle-switch').querySelector('.toggle-label').textContent =
        pendingToggle.input.checked ? 'Granted' : 'Denied';
    }
    pendingToggle = null;
    closeModal('toggle-confirm-modal');
  });

  document.getElementById('toggle-confirm-btn').addEventListener('click', () => {
    if (!pendingToggle) return;
    const admin = findAdmin(pendingToggle.adminId);
    admin.granted = pendingToggle.input.checked;
    persist();
    renderAdminsTable();

    closeModal('toggle-confirm-modal');
    showToast(`Access updated for ${admin.name}`, 'success');
    pendingToggle = null;
  });

  const addAdminForm = document.getElementById('add-admin-form');
  initLiveFieldValidation(addAdminForm);

  document.getElementById('add-admin-submit-btn').addEventListener('click', () => {
    if (!validateForm(addAdminForm)) return;

    const newAdmin = {
      id: admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1,
      name: document.getElementById('admin-name').value.trim(),
      email: document.getElementById('admin-email').value.trim(),
      department: document.getElementById('admin-department').value,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      granted: false
    };
    admins.push(newAdmin);
    persist();
    renderAdminsTable();

    addAdminForm.reset();
    closeModal('add-admin-modal');
    showToast('Admin added successfully', 'success');
  });
});
