/* ==========================================================================
   FWC Super Admin Dashboard — Global Utilities
   Shared across all dashboard pages: modal handling, drawer handling,
   toast notifications, form validation, filter engine, CSV export,
   and the sidebar/header shell behavior.
   ========================================================================== */

// --------------------------------------------------------------------------
// 01. Modal / Dialog
// --------------------------------------------------------------------------

function openModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) {
    console.warn(`openModal: no element found with id "${modalId}"`);
    return;
  }

  overlay._fwcPrevFocus = document.activeElement;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusTarget = overlay.querySelector('[autofocus]') || overlay.querySelector('button, input, select, textarea, a[href]');
  if (focusTarget) focusTarget.focus();

  const onKeydown = (e) => {
    if (e.key === 'Escape') closeModal(modalId);
  };
  overlay._fwcKeydownHandler = onKeydown;
  document.addEventListener('keydown', onKeydown);

  const onOverlayClick = (e) => {
    if (e.target === overlay) closeModal(modalId);
  };
  overlay._fwcOverlayClickHandler = onOverlayClick;
  overlay.addEventListener('click', onOverlayClick);
}

function closeModal(modalId) {
  const overlay = document.getElementById(modalId);
  if (!overlay) {
    console.warn(`closeModal: no element found with id "${modalId}"`);
    return;
  }

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (overlay._fwcKeydownHandler) {
    document.removeEventListener('keydown', overlay._fwcKeydownHandler);
    overlay._fwcKeydownHandler = null;
  }
  if (overlay._fwcOverlayClickHandler) {
    overlay.removeEventListener('click', overlay._fwcOverlayClickHandler);
    overlay._fwcOverlayClickHandler = null;
  }
  if (overlay._fwcPrevFocus) {
    overlay._fwcPrevFocus.focus();
    overlay._fwcPrevFocus = null;
  }
}

function initModalTriggers(root = document) {
  root.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.openModal));
  });
  root.querySelectorAll('[data-close-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => closeModal(trigger.dataset.closeModal));
  });
}

// --------------------------------------------------------------------------
// 01a. Drawer (Right-side slide sheet)
// --------------------------------------------------------------------------

function openDrawer(drawerId) {
  const overlay = document.getElementById(drawerId);
  if (!overlay) {
    console.warn(`openDrawer: no element found with id "${drawerId}"`);
    return;
  }

  overlay._fwcPrevFocus = document.activeElement;
  overlay.classList.add('is-open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const focusTarget = overlay.querySelector('[autofocus]') || overlay.querySelector('button, input, select, textarea, a[href]');
  if (focusTarget) focusTarget.focus();

  const onKeydown = (e) => {
    if (e.key === 'Escape') closeDrawer(drawerId);
  };
  overlay._fwcKeydownHandler = onKeydown;
  document.addEventListener('keydown', onKeydown);

  const onOverlayClick = (e) => {
    if (e.target === overlay) closeDrawer(drawerId);
  };
  overlay._fwcOverlayClickHandler = onOverlayClick;
  overlay.addEventListener('click', onOverlayClick);
}

function closeDrawer(drawerId) {
  const overlay = document.getElementById(drawerId);
  if (!overlay) {
    console.warn(`closeDrawer: no element found with id "${drawerId}"`);
    return;
  }

  overlay.classList.remove('is-open');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';

  if (overlay._fwcKeydownHandler) {
    document.removeEventListener('keydown', overlay._fwcKeydownHandler);
    overlay._fwcKeydownHandler = null;
  }
  if (overlay._fwcOverlayClickHandler) {
    overlay.removeEventListener('click', overlay._fwcOverlayClickHandler);
    overlay._fwcOverlayClickHandler = null;
  }
  if (overlay._fwcPrevFocus) {
    overlay._fwcPrevFocus.focus();
    overlay._fwcPrevFocus = null;
  }
}

function initDrawerTriggers(root = document) {
  root.querySelectorAll('[data-close-drawer]').forEach((trigger) => {
    trigger.addEventListener('click', () => closeDrawer(trigger.dataset.closeDrawer));
  });
}

// --------------------------------------------------------------------------
// 01b. Kebab Row Action Menu
// --------------------------------------------------------------------------

function closeAllKebabMenus(container = document) {
  container.querySelectorAll('.kebab-menu').forEach((menu) => menu.classList.add('hidden'));
}

function initKebabMenus(container = document) {
  container.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-kebab-trigger]');
    if (trigger) {
      const menu = trigger.nextElementSibling;
      const wasOpen = menu && !menu.classList.contains('hidden');
      closeAllKebabMenus(container);
      if (menu && !wasOpen) menu.classList.remove('hidden');
      return;
    }
    if (!e.target.closest('.kebab-menu')) closeAllKebabMenus(container);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllKebabMenus(container);
  });
}

// --------------------------------------------------------------------------
// 01c. Mock Persistence Layer (localStorage)
// --------------------------------------------------------------------------

function loadCollection(key, seedData) {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.warn(`loadCollection: could not parse stored "${key}", reseeding.`);
    }
  }
  const seeded = (seedData || []).map((item) => ({ ...item }));
  localStorage.setItem(key, JSON.stringify(seeded));
  return seeded;
}

function saveCollection(key, items) {
  localStorage.setItem(key, JSON.stringify(items));
}

// --------------------------------------------------------------------------
// 02. Toast Notifications
// --------------------------------------------------------------------------

const TOAST_ICONS = {
  success: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/></svg>',
  error: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"/></svg>',
  info: '<svg viewBox="0 0 256 256" fill="currentColor"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm16-40a8,8,0,0,1-8,8,16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40A8,8,0,0,1,144,176ZM112,84a12,12,0,1,1,12,12A12,12,0,0,1,112,84Z"/></svg>'
};

function getToastContainer() {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }
  return container;
}

function showToast(message, type = 'info', duration = 3500) {
  const container = getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</span>
    <span class="toast-message"></span>
    <button type="button" class="toast-close" aria-label="Dismiss notification"><svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg></button>
  `;
  toast.querySelector('.toast-message').textContent = message;

  const dismiss = () => {
    toast.classList.remove('is-visible');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  };

  toast.querySelector('.toast-close').addEventListener('click', dismiss);
  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('is-visible'));
  setTimeout(dismiss, duration);

  return toast;
}

// --------------------------------------------------------------------------
// 03. Form Validation
// --------------------------------------------------------------------------

function setFieldError(field, message) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.add('has-error');
  const errorEl = group.querySelector('.form-error-text');
  if (errorEl && message) errorEl.textContent = message;
}

function clearFieldError(field) {
  const group = field.closest('.form-group');
  if (!group) return;
  group.classList.remove('has-error');
}

function validateForm(formEl) {
  const fields = formEl.querySelectorAll('[required]');
  let isValid = true;

  fields.forEach((field) => {
    clearFieldError(field);

    const value = field.value ? field.value.trim() : (field.innerText ? field.innerText.trim() : '');
    if (!value) {
      setFieldError(field, field.dataset.errorMessage || 'This field is required.');
      isValid = false;
      return;
    }
    if (field.checkValidity && !field.checkValidity()) {
      setFieldError(field, field.dataset.errorMessage || field.validationMessage);
      isValid = false;
    }
  });

  return isValid;
}

function initLiveFieldValidation(formEl) {
  formEl.querySelectorAll('.form-input, .form-select, .form-textarea').forEach((field) => {
    field.addEventListener('input', () => clearFieldError(field));
    field.addEventListener('change', () => clearFieldError(field));
  });
}

// --------------------------------------------------------------------------
// 04. Tabs (Segmented Pill)
// --------------------------------------------------------------------------

function initTabs(container) {
  const tabButtons = container.querySelectorAll('.tab-btn');
  const panels = container.querySelectorAll('.tabs-panel');

  tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.tab;

      tabButtons.forEach((b) => {
        b.classList.toggle('active', b === btn);
        b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
      });
      panels.forEach((panel) => {
        panel.classList.toggle('hidden', panel.id !== targetId);
      });
    });
  });
}

// --------------------------------------------------------------------------
// 05. Dashboard Shell — Sidebar & Header Popovers
// --------------------------------------------------------------------------

function initSidebarActiveLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar-nav-link').forEach((link) => {
    const linkPage = (link.getAttribute('href') || '').split('/').pop();
    const isActive = linkPage === currentPage || (currentPage === '' && linkPage === 'index.html');
    link.classList.toggle('active', isActive);
  });
}

function initSidebarCollapse() {
  const shell = document.querySelector('.dashboard-shell');
  const toggleBtn = document.querySelector('.sidebar-collapse-btn');
  if (!shell || !toggleBtn) return;

  toggleBtn.addEventListener('click', () => {
    const collapsed = shell.classList.toggle('sidebar-collapsed');
    toggleBtn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
    toggleBtn.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  });
}

function initPopover(triggerId, panelId) {
  const trigger = document.getElementById(triggerId);
  const panel = document.getElementById(panelId);
  if (!trigger || !panel) return;

  const closeMenu = () => {
    panel.classList.remove('is-open');
    panel.setAttribute('aria-hidden', 'true');
    trigger.setAttribute('aria-expanded', 'false');
  };
  const openMenu = () => {
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    trigger.setAttribute('aria-expanded', 'true');
  };

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    panel.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== trigger) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}

function initToggleSwitches(root = document) {
  root.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
      input.dispatchEvent(new CustomEvent('fwc:toggle-change', {
        bubbles: true,
        detail: { checked: input.checked, id: input.dataset.adminId }
      }));
    });
  });
}

// --------------------------------------------------------------------------
// 05a. Rich Text Editor Floating Formatting Bar
// --------------------------------------------------------------------------

function initRichTextToolbar(toolbarEl) {
  if (!toolbarEl) return;
  let activeEditable = null;

  document.addEventListener('focusin', (e) => {
    if (e.target.classList && e.target.classList.contains('rich-text-editable')) {
      activeEditable = e.target;
      toolbarEl.classList.add('is-visible');
    } else if (!toolbarEl.contains(e.target)) {
      toolbarEl.classList.remove('is-visible');
      activeEditable = null;
    }
  });

  toolbarEl.querySelectorAll('[data-cmd]').forEach((btn) => {
    btn.addEventListener('mousedown', (e) => {
      e.preventDefault();
      if (!activeEditable) return;
      const cmd = btn.dataset.cmd;
      let value;
      if (cmd === 'createLink') {
        value = window.prompt('Enter link URL:');
        if (!value) return;
      }
      document.execCommand(cmd, false, value);
      activeEditable.focus();
    });
  });
}

// --------------------------------------------------------------------------
// 05b. Notifications Data & Render
// --------------------------------------------------------------------------

const NOTIFICATIONS = [
  { text: 'New enquiry received from Amara Chen (BFSI)', time: '2 hours ago' },
  { text: 'Sam Patel submitted blog post for approval', time: '5 hours ago' },
  { text: 'Jordan Lee submitted job posting for approval', time: '1 day ago' },
  { text: 'Rajesh Nair’s enquiry marked In Progress', time: '1 day ago' }
];

function renderNotifications() {
  const list = document.getElementById('notification-list');
  const dot = document.getElementById('notification-dot');
  if (!list) return;

  if (NOTIFICATIONS.length === 0) {
    list.innerHTML = '<p class="notification-empty">You\'re all caught up.</p>';
    if (dot) dot.classList.add('hidden');
    return;
  }

  list.innerHTML = NOTIFICATIONS.map((n) => `
    <div class="notification-item">
      <p class="notification-item-text">${n.text}</p>
      <p class="notification-item-time">${n.time}</p>
    </div>
  `).join('');
  if (dot) dot.classList.remove('hidden');
}

// --------------------------------------------------------------------------
// 06. Table Filtering Engine
// --------------------------------------------------------------------------

const APP_TODAY = new Date('2026-08-30');

function initTableFilters(container) {
  const statusSelect = container.querySelector('[data-role="status-filter"]');
  const dateSelect = container.querySelector('[data-role="date-filter"]');
  const searchInput = container.querySelector('[data-role="search-input"]');

  function applyFilters() {
    const items = container.querySelectorAll('tbody tr[data-status]');
    const statusValue = statusSelect ? statusSelect.value : 'all';
    const dateValue = dateSelect ? dateSelect.value : 'all';
    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : '';

    items.forEach((item) => {
      const matchesStatus = statusValue === 'all' || item.dataset.status === statusValue;

      let matchesDate = true;
      if (dateValue !== 'all' && item.dataset.date) {
        const diffDays = (APP_TODAY - new Date(item.dataset.date)) / (1000 * 60 * 60 * 24);
        matchesDate = diffDays >= 0 && diffDays <= Number(dateValue);
      }

      const matchesSearch = !searchValue || item.textContent.toLowerCase().includes(searchValue);

      item.classList.toggle('hidden', !(matchesStatus && matchesDate && matchesSearch));
    });

    const selectAll = container.querySelector('.table thead .table-checkbox');
    if (selectAll) selectAll.checked = false;
  }

  if (statusSelect) statusSelect.addEventListener('change', applyFilters);
  if (dateSelect) dateSelect.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  applyFilters();
  return applyFilters;
}

// --------------------------------------------------------------------------
// 07. Table Checkboxes (Select All + Row Highlight Sync)
// --------------------------------------------------------------------------

function initSelectAllCheckboxes(container = document) {
  const tables = container.querySelectorAll('.table');
  tables.forEach((table) => {
    const selectAll = table.querySelector('thead .table-checkbox');
    if (!selectAll) return;

    selectAll.addEventListener('change', () => {
      const rowCheckboxes = table.querySelectorAll('tbody tr:not(.hidden) .table-checkbox');
      rowCheckboxes.forEach((cb) => {
        cb.checked = selectAll.checked;
        const row = cb.closest('tr');
        if (row) row.classList.toggle('is-selected', selectAll.checked);
      });
    });

    table.querySelector('tbody')?.addEventListener('change', (e) => {
      if (!e.target.classList.contains('table-checkbox')) return;
      const row = e.target.closest('tr');
      if (row) row.classList.toggle('is-selected', e.target.checked);

      const visibleCheckboxes = Array.from(table.querySelectorAll('tbody tr:not(.hidden) .table-checkbox'));
      const allChecked = visibleCheckboxes.length > 0 && visibleCheckboxes.every((cb) => cb.checked);
      const someChecked = visibleCheckboxes.some((cb) => cb.checked);
      selectAll.checked = allChecked;
      selectAll.indeterminate = !allChecked && someChecked;
    });
  });
}

// --------------------------------------------------------------------------
// 08. CSV Export Engine (Real CSV Download Generation)
// --------------------------------------------------------------------------

function exportTableToCSV(tableOrSelector, filename = 'export.csv') {
  const table = typeof tableOrSelector === 'string' ? document.querySelector(tableOrSelector) : tableOrSelector;
  if (!table) {
    showToast('No table found to export', 'error');
    return;
  }

  const rows = [];
  const headerCells = table.querySelectorAll('thead th');
  const headers = [];
  headerCells.forEach((th) => {
    if (th.querySelector('.table-checkbox') || th.textContent.trim().toLowerCase() === 'actions') return;
    headers.push(`"${th.textContent.replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').replace(/"/g, '""').trim()}"`);
  });
  rows.push(headers.join(','));

  const bodyRows = table.querySelectorAll('tbody tr:not(.hidden)');
  bodyRows.forEach((tr) => {
    if (tr.classList.contains('request-list-empty-row')) return;
    const cells = tr.querySelectorAll('td');
    const row = [];
    cells.forEach((td, idx) => {
      const header = headerCells[idx];
      if (header && (header.querySelector('.table-checkbox') || header.textContent.trim().toLowerCase() === 'actions')) return;
      let text = td.innerText || td.textContent || '';
      text = text.replace(/Read More →/g, '').replace(/[\n\r]+/g, ' ').replace(/\s+/g, ' ').trim();
      row.push(`"${text.replace(/"/g, '""')}"`);
    });
    if (row.length) rows.push(row.join(','));
  });

  const csvContent = 'data:text/csv;charset=utf-8,' + encodeURIComponent(rows.join('\n'));
  const link = document.createElement('a');
  link.setAttribute('href', csvContent);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast(`Exported ${bodyRows.length} records to ${filename}`, 'success');
}

// --------------------------------------------------------------------------
// 08a. Dynamic Sidebar Nav Counts
// --------------------------------------------------------------------------

function updateSidebarCounts() {
  try {
    const blogPosts = typeof loadCollection === 'function' ? loadCollection('fwc-blog-posts', []) : [];
    const jobListings = typeof loadCollection === 'function' ? loadCollection('fwc-job-listings', []) : [];
    const enquiries = typeof loadCollection === 'function' ? loadCollection('fwc-enquiries', []) : [];
    const candidates = typeof loadCollection === 'function' ? loadCollection('fwc-job-candidates', []) : [];

    const pendingBlogs = blogPosts.length ? blogPosts.filter((b) => b.status === 'pending').length : 3;
    const pendingJobs = jobListings.length ? jobListings.filter((j) => j.status === 'pending').length : 2;
    const approvalCount = pendingBlogs + pendingJobs;

    const blogsTotal = blogPosts.length ? blogPosts.length : 4;
    const jobsTotal = jobListings.length ? jobListings.length : 5;
    const enquiriesTotal = enquiries.length ? enquiries.length : 5;
    const candidatesTotal = candidates.length ? candidates.length : 84;

    document.querySelectorAll('.sidebar-nav-scroll .sidebar-nav-link').forEach((link) => {
      const href = (link.getAttribute('href') || '').split('?')[0];
      const labelEl = link.querySelector('.sidebar-nav-label');
      if (!labelEl) return;

      if (href.includes('approval-requests.html')) {
        labelEl.textContent = `Approval requests (${approvalCount})`;
      } else if (href.includes('blog-posts.html')) {
        labelEl.textContent = `Blog posts (${blogsTotal})`;
      } else if (href.includes('job-listings.html')) {
        labelEl.textContent = `Job listings (${jobsTotal})`;
      } else if (href.includes('job-applicants.html')) {
        labelEl.textContent = `Candidates & resumes (${candidatesTotal})`;
      } else if (href.includes('enquiry.html')) {
        labelEl.textContent = `Enquiry (${enquiriesTotal})`;
      } else if (href.includes('index.html') || href === '/' || href === '') {
        labelEl.textContent = `Dashboard`;
      }
    });
  } catch (err) {
    console.warn('updateSidebarCounts warning:', err);
  }
}

// --------------------------------------------------------------------------
// 09. Auto Initialization
// --------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initSidebarActiveLink();
  initSidebarCollapse();
  updateSidebarCounts();
  initPopover('user-menu-trigger', 'user-menu-panel');
  initPopover('notifications-trigger', 'notifications-panel');
  initModalTriggers();
  initDrawerTriggers();
  initToggleSwitches();
  initSelectAllCheckboxes();
  renderNotifications();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => showToast('You have been logged out.', 'info'));
  }
});
