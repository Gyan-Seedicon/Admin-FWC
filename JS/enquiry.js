/* ==========================================================================
   Enquiry / Services Management
   Columns: Name, Email, Organisation, Region, Industry, Enquiry, Submitted on
   Structured minimal Enquiry Details Drawer (no status controls).
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
    submittedISO: '2026-08-26T14:40:00'
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
    submittedISO: '2026-08-24T11:20:00'
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
    submittedISO: '2026-08-21T16:15:00'
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
    submittedISO: '2026-08-17T09:30:00'
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
    submittedISO: '2026-08-10T13:15:00'
  }
];

let enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);

// Migrate older stored data if keys differ
if (enquiries.length && !enquiries[0].organisation) {
  enquiries = enquirySeedData;
  saveCollection(ENQUIRY_KEY, enquiries);
}

let activeEnquiry = null;

function initials(name) {
  return (name || '').split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase();
}

function renderStats() {
  const total = enquiries.length;
  const usCount = enquiries.filter((e) => (e.region || '').includes('North America')).length;
  const apacCount = enquiries.filter((e) => (e.region || '').includes('APAC')).length;
  const emeaCount = enquiries.filter((e) => (e.region || '').includes('EMEA')).length;

  const totalEl = document.getElementById('stat-total-enquiries');
  if (totalEl) totalEl.textContent = total;

  const newEl = document.getElementById('stat-new-enquiries');
  if (newEl) newEl.textContent = usCount;

  const progressEl = document.getElementById('stat-progress-enquiries');
  if (progressEl) progressEl.textContent = apacCount;

  const resolvedEl = document.getElementById('stat-resolved-enquiries');
  if (resolvedEl) resolvedEl.textContent = emeaCount;
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
      <tr data-id="${item.id}" style="cursor: pointer;" title="Click to view full enquiry details">
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

const ENQUIRY_AVATARS = {
  'Amara Chen': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Rajesh Nair': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Sofia Bergström': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'David Okafor': 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80',
  'Mei Lin Tan': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
};

function getAvatarUrl(name, idx = 0) {
  if (ENQUIRY_AVATARS[name]) return ENQUIRY_AVATARS[name];
  const fallback = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  ];
  return fallback[idx % fallback.length];
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

  const avatarImg = document.getElementById('drawer-avatar-img');
  if (avatarImg) {
    avatarImg.src = getAvatarUrl(item.name);
    avatarImg.alt = item.name;
  }

  document.getElementById('drawer-name').textContent = item.name;
  document.getElementById('drawer-date').textContent = `Submitted on ${submittedTime}`;
  
  const emailLink = document.getElementById('drawer-email');
  if (emailLink) {
    emailLink.textContent = item.email;
    emailLink.href = `mailto:${item.email}`;
  }

  const emailBtn = document.getElementById('drawer-email-btn');
  if (emailBtn) {
    emailBtn.href = `mailto:${item.email}?subject=${encodeURIComponent('FWC Follow-up: ' + org)}`;
  }

  document.getElementById('drawer-org').textContent = org;
  document.getElementById('drawer-region').textContent = reg;
  document.getElementById('drawer-industry').textContent = ind;
  document.getElementById('drawer-message').textContent = message;

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
  const dateFilter = document.getElementById('enquiry-date-filter');

  function applyFilters() {
    const q = (searchInput?.value || '').toLowerCase().trim();

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

      return matchSearch;
    });

    renderTable(filtered);
  }

  searchInput?.addEventListener('input', applyFilters);
  dateFilter?.addEventListener('change', applyFilters);

  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    exportTableToCSV('enquiries-table', 'fwc-enquiries.csv');
  });

  document.getElementById('enquiries-table-body')?.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-id]');
    if (!row) return;
    const id = Number(row.dataset.id);
    openEnquiryDrawer(id);
  });
});
