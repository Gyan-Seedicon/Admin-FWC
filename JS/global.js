/* ==========================================================================
   FWC Dashboard — Global Utilities
   Shared across every dashboard page: modal handling, toast notifications,
   form validation, and the sidebar/header shell behavior. Loaded before
   any page-specific script via a classic <script> tag (no bundler/modules,
   matching Redesigned-FWC/js/main.js conventions).
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

// Wires up any element with data-close-modal="<modalId>" (e.g. a Cancel button)
// and any element with data-open-modal="<modalId>" (e.g. a [View] button).
function initModalTriggers(root = document) {
  root.querySelectorAll('[data-open-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.openModal));
  });
  root.querySelectorAll('[data-close-modal]').forEach((trigger) => {
    trigger.addEventListener('click', () => closeModal(trigger.dataset.closeModal));
  });
}

// --------------------------------------------------------------------------
// 01a. Drawer (right-side sheet) — same open/close contract as the modal
// above (focus handling, Escape, overlay-click), but slides in from the
// right instead of appearing centered. Used for "View full details".
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
// 01b. Kebab row menu — a per-row three-dot action menu, using event
// delegation since rows are re-rendered from mock data (unlike the header's
// initPopover, which binds to a single fixed trigger/panel pair).
// Row markup: <div class="kebab-wrap"><button class="icon-btn" data-kebab-trigger>⋮</button>
// <div class="kebab-menu hidden"> ...items... </div></div>
// --------------------------------------------------------------------------

function closeAllKebabMenus(container) {
  container.querySelectorAll('.kebab-menu').forEach((menu) => menu.classList.add('hidden'));
}

function initKebabMenus(container) {
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
// 01c. Mock persistence — this dashboard has no backend, so Add/Edit/Delete
// need somewhere to live across page navigations (the Add page is a real
// page, not a modal). Each list page seeds its hardcoded mock array into
// localStorage once, then reads/writes through here for every mutation.
// --------------------------------------------------------------------------

function loadCollection(key, seedData) {
  const raw = localStorage.getItem(key);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch (e) {
      console.warn(`loadCollection: could not parse stored "${key}", reseeding.`);
    }
  }
  const seeded = seedData.map((item) => ({ ...item }));
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

function showToast(message, type = 'info', duration = 4000) {
  const container = getToastContainer();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.setAttribute('role', 'status');
  toast.innerHTML = `
    <span class="toast-icon">${TOAST_ICONS[type] || TOAST_ICONS.info}</span>
    <span class="toast-message"></span>
    <button type="button" class="toast-close" aria-label="Dismiss notification"><svg viewBox="0 0 256 256" fill="currentColor" width="16" height="16"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"/></svg></button>
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

// Validates every [required] field in formEl, marking invalid ones via the
// .form-group/.has-error/.form-error-text convention. Returns true if valid.
function validateForm(formEl) {
  const fields = formEl.querySelectorAll('[required]');
  let isValid = true;

  fields.forEach((field) => {
    clearFieldError(field);

    const value = field.value.trim();
    if (!value) {
      setFieldError(field, field.dataset.errorMessage || 'This field is required.');
      isValid = false;
      return;
    }
    if (!field.checkValidity()) {
      setFieldError(field, field.dataset.errorMessage || field.validationMessage);
      isValid = false;
    }
  });

  return isValid;
}

// Clears a field's error state as soon as the user edits it.
function initLiveFieldValidation(formEl) {
  formEl.querySelectorAll('.form-input, .form-select, .form-textarea').forEach((field) => {
    field.addEventListener('input', () => clearFieldError(field));
    field.addEventListener('change', () => clearFieldError(field));
  });
}

// --------------------------------------------------------------------------
// 04. Tabs (segmented pill)
// --------------------------------------------------------------------------

// Wires up a .tabs-nav / .tabs-panel pair sharing a common `container`.
// Tab buttons need data-tab="<panelId>"; panels need a matching id.
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
// 05. Dashboard Shell — Sidebar & Header
// --------------------------------------------------------------------------

function initSidebarActiveLink() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.sidebar-nav-link').forEach((link) => {
    const linkPage = (link.getAttribute('href') || '').split('/').pop();
    link.classList.toggle('active', Boolean(linkPage) && linkPage === currentPage);
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

// Wires up a header dropdown (notifications bell, profile menu, etc.) —
// clicking `triggerId` toggles `panelId` open/closed, with click-outside and
// Escape both closing it. Both bell and profile popovers use this.
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

// Fires a "fwc:toggle-change" custom event on change so page-specific JS
// can intercept (e.g. open a confirmation modal, revert on cancel).
function initToggleSwitches(root = document) {
  root.querySelectorAll('.toggle-switch input[type="checkbox"]').forEach((input) => {
    input.addEventListener('change', () => {
      input.dispatchEvent(new CustomEvent('fwc:toggle-change', {
        bubbles: true,
        detail: { checked: input.checked, id: input.id }
      }));
    });
  });
}

// --------------------------------------------------------------------------
// 05a. Rich text editor toolbar — a small floating formatting bar shared by
// any `.rich-text-editable` (contenteditable) field on the page. Wires
// document.execCommand on mousedown rather than click so the field's text
// selection isn't lost before the browser applies focus to the button.
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
        value = window.prompt('Link URL');
        if (!value) return;
      }
      document.execCommand(cmd, false, value);
      activeEditable.focus();
    });
  });
}

// --------------------------------------------------------------------------
// 05b. Notifications (header popover — identical on every page)
// --------------------------------------------------------------------------

const NOTIFICATIONS = [
  { text: 'New enquiry from Amara Chen (BFSI)', time: '2 hours ago' },
  { text: 'Sam Patel submitted a blog post for approval', time: '5 hours ago' },
  { text: 'Jordan Lee submitted a job posting for approval', time: '1 day ago' },
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

// The app's mock "today" — used for relative date filtering so it stays
// consistent with the mock data's Aug 2026 dates regardless of the
// viewer's real system clock.
const APP_TODAY = new Date('2026-08-30');

// Wires a .filter-bar's Status <select> and Date <select> (plus an optional
// search input) to show/hide [data-status][data-date] items (table <tr>s or
// .request-card divs) within `container`. Status select needs
// data-role="status-filter" with option values matching each item's
// data-status ("all" shows everything); Date select needs
// data-role="date-filter" with option values "all" or a number of days
// (items within the last N days of APP_TODAY match); an input with
// data-role="search-input" narrows further by matching an item's text
// content. Items are re-queried on every run (not cached at init) since
// list pages replace their rows wholesale on every mutation (approve,
// reject, delete, status change) — a cached NodeList would silently stop
// matching anything after the first re-render.
// Returns the applyFilters function so callers can re-run it after
// re-rendering their list, keeping the current filter selection honored.
function initTableFilters(container) {
  const statusSelect = container.querySelector('[data-role="status-filter"]');
  const dateSelect = container.querySelector('[data-role="date-filter"]');
  const searchInput = container.querySelector('[data-role="search-input"]');

  function applyFilters() {
    const items = container.querySelectorAll('[data-status]');
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
  }

  if (statusSelect) statusSelect.addEventListener('change', applyFilters);
  if (dateSelect) dateSelect.addEventListener('change', applyFilters);
  if (searchInput) searchInput.addEventListener('input', applyFilters);

  applyFilters();
  return applyFilters;
}

// --------------------------------------------------------------------------
// 06. Auto-init
// --------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  initSidebarActiveLink();
  initSidebarCollapse();
  initPopover('user-menu-trigger', 'user-menu-panel');
  initPopover('notifications-trigger', 'notifications-panel');
  initModalTriggers();
  initDrawerTriggers();
  initToggleSwitches();
  renderNotifications();

  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => showToast('You have been logged out.', 'info'));
  }
});
