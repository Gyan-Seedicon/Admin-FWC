/* ==========================================================================
   Admin Management — Access Control & Role Governance
   ========================================================================== */

const ADMIN_KEY = 'fwc-admins';

const adminSeedData = [
  {
    id: 1,
    name: 'Taylor Brooks',
    email: 'taylor.brooks@fwc.com',
    role: 'Super admin',
    dateAdded: 'Jan 15, 2026'
  },
  {
    id: 2,
    name: 'Alex Kim',
    email: 'alex.kim@fwc.com',
    role: 'Content admin',
    dateAdded: 'Feb 02, 2026'
  },
  {
    id: 3,
    name: 'Priya Nair',
    email: 'priya.nair@fwc.com',
    role: 'Content admin',
    dateAdded: 'Feb 18, 2026'
  },
  {
    id: 4,
    name: 'Sam Patel',
    email: 'sam.patel@fwc.com',
    role: 'Analyst',
    dateAdded: 'Mar 01, 2026'
  },
  {
    id: 5,
    name: 'Marcus Vance',
    email: 'marcus.vance@fwc.com',
    role: 'Analyst',
    dateAdded: 'Apr 10, 2026'
  }
];

let admins = [];
let pendingRevoke = null;

const ADMIN_AVATARS = {
  'Taylor Brooks': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Alex Kim': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Elena Rostova': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'David Chen': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Sarah Jenkins': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'Priya Nair': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'Sam Patel': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Marcus Vance': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
};

function getAvatarUrl(name, idx = 0) {
  if (ADMIN_AVATARS[name]) return ADMIN_AVATARS[name];
  const fallback = [
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
  ];
  return fallback[idx % fallback.length];
}

function getRoleBadge(role) {
  const r = (role || '').trim();
  if (r === 'Super admin') {
    return '<span class="badge-role badge-role-super">Super admin</span>';
  }
  if (r === 'Content admin') {
    return '<span class="badge-role badge-role-content">Content admin</span>';
  }
  if (r === 'Analyst') {
    return '<span class="badge-role badge-role-analyst">Analyst</span>';
  }
  return `<span class="badge-role badge-role-content">${escapeHtml(r || 'Content admin')}</span>`;
}

function renderStats() {
  const superCount = admins.filter((a) => a.role === 'Super admin').length;
  const contentCount = admins.filter((a) => a.role === 'Content admin').length;
  const analystCount = admins.filter((a) => a.role === 'Analyst').length;

  const totalEl = document.getElementById('stat-total-admins');
  const superEl = document.getElementById('stat-super-admins');
  const contentEl = document.getElementById('stat-content-admins');
  const analystEl = document.getElementById('stat-analysts');

  if (totalEl) totalEl.textContent = admins.length;
  if (superEl) superEl.textContent = superCount;
  if (contentEl) contentEl.textContent = contentCount;
  if (analystEl) analystEl.textContent = analystCount;
}

function closeAllTableContextMenus() {
  document.querySelectorAll('.table-context-menu.is-open').forEach((menu) => {
    menu.classList.remove('is-open');
  });
  document.querySelectorAll('.table-kebab-btn.is-active').forEach((btn) => {
    btn.classList.remove('is-active');
  });
}

function renderTable(items) {
  const tbody = document.getElementById('admins-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="7" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No administrators found matching your filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((admin, idx) => `
    <tr data-role="${escapeHtml(admin.role)}" data-id="${admin.id}">
      <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
      <td class="table-id">ADM-${100 + admin.id}</td>
      <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">
        <div class="table-avatar-cell" style="white-space: nowrap;">
          <img class="table-avatar-img" src="${getAvatarUrl(admin.name, idx)}" alt="${escapeHtml(admin.name)}" width="28" height="28" style="border-radius: 50%; object-fit: cover;">
          <span>${escapeHtml(admin.name)}</span>
        </div>
      </td>
      <td style="white-space: nowrap;"><a href="mailto:${escapeHtml(admin.email)}" class="table-link">${escapeHtml(admin.email)}</a></td>
      <td style="white-space: nowrap;">${getRoleBadge(admin.role)}</td>
      <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${escapeHtml(admin.dateAdded)}</td>
      <td style="text-align: right; white-space: nowrap;">
        <div class="table-kebab-wrap">
          <button class="table-kebab-btn" data-kebab-trigger type="button" aria-label="Actions for ${escapeHtml(admin.name)}">
            <svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16">
              <path d="M128,96a24,24,0,1,0,24,24A24,24,0,0,0,128,96Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,128Zm0-80a24,24,0,1,0-24-24A24,24,0,0,0,128,48Zm0-32a8,8,0,1,1,8-8A8,8,0,0,1,128,16Zm0,160a24,24,0,1,0,24,24A24,24,0,0,0,128,208Zm0,32a8,8,0,1,1,8-8A8,8,0,0,1,128,240Z"/>
            </svg>
          </button>
          <div class="table-context-menu">
            <button type="button" class="table-context-menu-item text-danger" data-action="revoke-access" data-admin-id="${admin.id}">
              <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z"/></svg>
              Revoke Access
            </button>
          </div>
        </div>
      </td>
    </tr>
  `).join('');
}

function refreshAll() {
  admins = loadCollection(ADMIN_KEY, adminSeedData);
  // Migrate any old seed data that had department instead of role
  admins = admins.map((adm) => {
    if (!adm.role) {
      if (adm.name === 'Taylor Brooks') adm.role = 'Super admin';
      else if (adm.name === 'Sam Patel' || adm.name === 'Marcus Vance') adm.role = 'Analyst';
      else adm.role = 'Content admin';
    }
    return adm;
  });
  saveCollection(ADMIN_KEY, admins);

  renderTable(admins);
  renderStats();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();

  // Search and Role Filter
  const searchInput = document.getElementById('admin-search');
  const roleFilter = document.getElementById('admin-role-filter');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const rf = roleFilter?.value || 'all';

    const filtered = admins.filter((admin) => {
      const matchSearch = !q ||
        (admin.name && admin.name.toLowerCase().includes(q)) ||
        (admin.email && admin.email.toLowerCase().includes(q)) ||
        (admin.role && admin.role.toLowerCase().includes(q));

      const matchRole = rf === 'all' || admin.role === rf;

      return matchSearch && matchRole;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  roleFilter?.addEventListener('change', applyFilters);

  // Export CSV
  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    exportTableToCSV('admins-table', 'fwc-admins.csv');
  });

  // Open Add Admin Modal trigger
  document.getElementById('open-add-admin-btn')?.addEventListener('click', () => {
    openModal('add-admin-modal');
  });

  // Table Kebab Menu Toggles & Revoke Access Click Delegations
  const tableWrap = document.querySelector('.table-wrapper');
  tableWrap?.addEventListener('click', (e) => {
    // 1. Kebab trigger button
    const kebabBtn = e.target.closest('[data-kebab-trigger]');
    if (kebabBtn) {
      e.stopPropagation();
      const menu = kebabBtn.nextElementSibling;
      const isOpen = menu && menu.classList.contains('is-open');
      closeAllTableContextMenus();
      if (menu && !isOpen) {
        menu.classList.add('is-open');
        kebabBtn.classList.add('is-active');
      }
      return;
    }

    // 2. Revoke Access Action
    const revokeBtn = e.target.closest('[data-action="revoke-access"]');
    if (revokeBtn) {
      e.stopPropagation();
      closeAllTableContextMenus();

      const id = Number(revokeBtn.dataset.adminId);
      const admin = admins.find((a) => a.id === id);
      if (!admin) return;

      pendingRevoke = admin;
      const confirmText = document.getElementById('revoke-confirm-text');
      if (confirmText) {
        confirmText.innerHTML = `Do you really want to revoke access for <strong>${escapeHtml(admin.name)}</strong> (${escapeHtml(admin.email)})? This action will permanently delete their account and permissions from the platform.`;
      }

      openModal('revoke-confirm-modal');
    }
  });

  // Close context menu on document click or escape
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.table-kebab-wrap')) {
      closeAllTableContextMenus();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllTableContextMenus();
    }
  });

  // Revoke confirmation handler
  document.getElementById('revoke-confirm-btn')?.addEventListener('click', () => {
    if (!pendingRevoke) return;

    const removedName = pendingRevoke.name;
    admins = admins.filter((a) => a.id !== pendingRevoke.id);
    saveCollection(ADMIN_KEY, admins);
    refreshAll();
    closeModal('revoke-confirm-modal');

    showToast(`Access removed successfully for ${removedName}.`, 'success');
    pendingRevoke = null;
  });

  document.getElementById('revoke-cancel-btn')?.addEventListener('click', () => {
    closeModal('revoke-confirm-modal');
    pendingRevoke = null;
  });

  // Add Admin form submission & modal dismiss handlers
  const addForm = document.getElementById('add-admin-form');
  if (addForm) {
    initLiveFieldValidation(addForm);
  }

  function resetAndCloseAddAdminModal() {
    closeModal('add-admin-modal');
    if (addForm) {
      addForm.reset();
      addForm.querySelectorAll('.form-group').forEach((g) => g.classList.remove('has-error'));
      const defaultRadio = document.getElementById('role-content-admin');
      if (defaultRadio) defaultRadio.checked = true;
    }
  }

  document.getElementById('add-admin-cancel-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetAndCloseAddAdminModal();
  });

  document.getElementById('add-admin-close-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetAndCloseAddAdminModal();
  });

  document.getElementById('add-admin-submit-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (!validateForm(addForm)) return;

    const nameInput = document.getElementById('admin-name');
    const emailInput = document.getElementById('admin-email');
    const name = (nameInput?.value || '').trim();
    const email = (emailInput?.value || '').trim();

    const selectedRoleInput = document.querySelector('input[name="admin-role"]:checked');
    const role = selectedRoleInput ? selectedRoleInput.value : 'Content admin';

    if (!name || !email) return;

    const newId = admins.length ? Math.max(...admins.map((a) => a.id)) + 1 : 1;
    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    const newAdmin = {
      id: newId,
      name,
      email,
      role,
      dateAdded: today
    };

    admins.unshift(newAdmin);
    saveCollection(ADMIN_KEY, admins);
    refreshAll();
    closeModal('add-admin-modal');

    addForm.reset();
    // Reset radio selection to Content admin default
    const defaultRadio = document.getElementById('role-content-admin');
    if (defaultRadio) defaultRadio.checked = true;

    showToast(`Admin ${name} added successfully.`, 'success');
  });
});
