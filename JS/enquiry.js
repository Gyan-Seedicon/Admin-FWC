/* ==========================================================================
   Enquiry / Services Management
   Columns: Name, Email, Organisation, Region, Industry, Enquiry, Submitted on, Status
   ========================================================================== */

const ENQUIRY_KEY = 'fwc-enquiries';

const enquirySeedData = [
  {
    id: 1,
    name: 'Amara Chen',
    email: 'a.chen@apexfin.com',
    organisation: 'Apex Financial Technologies',
    region: 'North America (US)',
    industry: 'Financial Services & Banking',
    enquiry: 'Seeking a dedicated pod of 4 Senior Cloud Data Engineers for our real-time credit scoring pipeline migration to AWS.',
    submitted: 'Aug 26, 2026 · 02:40 PM',
    submittedISO: '2026-08-26T14:40:00',
    status: 'new'
  },
  {
    id: 2,
    name: 'Rajesh Nair',
    email: 'rajesh.n@trivancore-tech.in',
    organisation: 'Trivancore Industrial Labs',
    region: 'APAC (India)',
    industry: 'Industrial Manufacturing',
    enquiry: 'We require IoT telemetry pipeline development and automated predictive maintenance models for 12 assembly lines.',
    submitted: 'Aug 24, 2026 · 11:20 AM',
    submittedISO: '2026-08-24T11:20:00',
    status: 'in-progress'
  },
  {
    id: 3,
    name: 'Sofia Bergström',
    email: 'sofia.b@nordicpay.se',
    organisation: 'NordicPay Systems AB',
    region: 'EMEA (Sweden)',
    industry: 'Fintech & Payments',
    enquiry: 'Looking for a specialized audit and implementation team for EU PSD2 / DORA compliance and high-throughput transaction clearing.',
    submitted: 'Aug 21, 2026 · 04:15 PM',
    submittedISO: '2026-08-21T16:15:00',
    status: 'new'
  },
  {
    id: 4,
    name: 'David Okafor',
    email: 'd.okafor@zenithhealth.ng',
    organisation: 'Zenith Health Solutions',
    region: 'EMEA (Nigeria)',
    industry: 'Healthcare & Life Sciences',
    enquiry: 'Need HIPAA-compliant microservices architecture for telemedicine platform serving 250k active regional patients.',
    submitted: 'Aug 17, 2026 · 09:30 AM',
    submittedISO: '2026-08-17T09:30:00',
    status: 'in-progress'
  },
  {
    id: 5,
    name: 'Mei Lin Tan',
    email: 'meilin.tan@singalearning.sg',
    organisation: 'SingaLearning Global Pte',
    region: 'APAC (Singapore)',
    industry: 'EdTech & Training',
    enquiry: 'Contract concluded for AI adaptive assessment engine. All deliverables deployed and accepted.',
    submitted: 'Aug 10, 2026 · 01:15 PM',
    submittedISO: '2026-08-10T13:15:00',
    status: 'resolved'
  }
];

let enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);

// Migrate older stored data if keys differ
if (enquiries.length && !enquiries[0].organisation) {
  enquiries = enquirySeedData;
  saveCollection(ENQUIRY_KEY, enquiries);
}

let activeEnquiry = null;

const STATUS_BADGE_CLASS = {
  new: 'status-pending',
  'in-progress': 'status-draft',
  resolved: 'status-approved'
};

const STATUS_LABEL = {
  new: 'New',
  'in-progress': 'In Progress',
  resolved: 'Resolved'
};

function renderStats() {
  const newCount = enquiries.filter((e) => e.status === 'new').length;
  const inProgressCount = enquiries.filter((e) => e.status === 'in-progress').length;
  const resolvedCount = enquiries.filter((e) => e.status === 'resolved').length;

  document.getElementById('stat-total-enquiries').textContent = enquiries.length;
  document.getElementById('stat-new-enquiries').textContent = newCount;
  document.getElementById('stat-progress-enquiries').textContent = inProgressCount;
  document.getElementById('stat-resolved-enquiries').textContent = resolvedCount;
}

function renderTable(items) {
  const tbody = document.getElementById('enquiries-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="8" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No enquiries found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((item, idx) => {
    const submittedTime = item.submitted || 'Aug 26, 2026 · 02:40 PM';
    const message = item.enquiry || item.message || '';
    const org = item.organisation || item.companyType || 'Enterprise Client';
    const reg = item.region || item.country || 'Global';
    const ind = item.industry || item.companyType || 'Technology';

    return `
      <tr data-status="${item.status}" data-id="${item.id}" style="cursor: pointer;" title="Click to view full enquiry details">
        <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
        <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">${item.name}</td>
        <td style="white-space: nowrap;"><a href="mailto:${item.email}" class="table-link" onclick="event.stopPropagation()">${item.email}</a></td>
        <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">${org}</td>
        <td style="color: var(--ink-secondary); font-size: var(--text-2xs); white-space: nowrap;">${reg}</td>
        <td style="white-space: nowrap;"><span class="status-badge status-draft">${ind}</span></td>
        <td style="max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink-secondary);" title="${message}">${message}</td>
        <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${submittedTime}</td>
      </tr>
    `;
  }).join('');
}

function openEnquiryDrawer(id) {
  const item = enquiries.find((e) => e.id === id);
  if (!item) return;
  activeEnquiry = item;

  const submittedTime = item.submitted || 'Aug 26, 2026 · 02:40 PM';
  const message = item.enquiry || item.message || '';
  const org = item.organisation || item.companyType || 'Enterprise Client';
  const reg = item.region || item.country || 'Global';
  const ind = item.industry || item.companyType || 'Technology';

  document.getElementById('drawer-name').textContent = item.name;
  document.getElementById('drawer-status').textContent = STATUS_LABEL[item.status];
  document.getElementById('drawer-status').className = `status-badge ${STATUS_BADGE_CLASS[item.status]}`;
  document.getElementById('drawer-date').textContent = `Submitted on ${submittedTime}`;
  document.getElementById('drawer-email').textContent = item.email;
  document.getElementById('drawer-org').textContent = org;
  document.getElementById('drawer-region').textContent = reg;
  document.getElementById('drawer-industry').textContent = ind;
  document.getElementById('drawer-message').textContent = message;
  document.getElementById('drawer-status-select').value = item.status;

  openDrawer('enquiry-drawer');
}

function refreshAll() {
  enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);
  renderTable(enquiries);
  renderStats();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();

  // Search & Filter
  const searchInput = document.getElementById('enquiry-search');
  const statusFilter = document.getElementById('enquiry-status-filter');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const st = statusFilter?.value || 'all';

    const filtered = enquiries.filter((item) => {
      const org = (item.organisation || item.companyType || '').toLowerCase();
      const reg = (item.region || item.country || '').toLowerCase();
      const ind = (item.industry || '').toLowerCase();
      const enq = (item.enquiry || item.message || '').toLowerCase();

      const matchSearch = !q ||
        item.name.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        org.includes(q) ||
        reg.includes(q) ||
        ind.includes(q) ||
        enq.includes(q);

      const matchStatus = st === 'all' || item.status === st;
      return matchSearch && matchStatus;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);

  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    exportTableToCSV('enquiries-table', 'fwc-enquiries.csv');
  });

  document.getElementById('enquiries-table-body')?.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-id]');
    if (!row) return;
    const id = Number(row.dataset.id);
    openEnquiryDrawer(id);
  });

  document.getElementById('drawer-save-btn')?.addEventListener('click', () => {
    if (!activeEnquiry) return;
    const newStatus = document.getElementById('drawer-status-select').value;
    activeEnquiry.status = newStatus;
    saveCollection(ENQUIRY_KEY, enquiries);
    refreshAll();
    closeDrawer('enquiry-drawer');
    showToast(`Updated enquiry status for ${activeEnquiry.name} to "${STATUS_LABEL[newStatus]}".`, 'success');
  });
});
