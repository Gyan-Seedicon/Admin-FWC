/* ==========================================================================
   Enquiry / Service & Partnership Management
   Underlined Tabs: Service Requests & Partnership Requests
   Columns: S.No., Name, Email, Organisation, Region, Industry, Enquiry/Message, Submitted on
   Structured minimal Enquiry/Partnership Details Drawer.
   ========================================================================== */

const ENQUIRY_KEY = 'fwc-enquiries';
const PARTNERSHIP_KEY = 'fwc-partnerships';

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

const partnershipSeedData = [
  {
    id: 101,
    name: 'Elena Rostova',
    email: 'e.rostova@hyperioncloud.io',
    organisation: 'Hyperion Cloud Infrastructure',
    region: 'North America (US)',
    industry: 'Cloud & DevOps Solutions',
    message: 'Proposing a strategic technology co-selling partnership for enterprise hybrid cloud migrations and joint Kubernetes engineering practice.',
    submitted: 'Aug 27, 2026 · 04:15 PM',
    submittedISO: '2026-08-27T16:15:00'
  },
  {
    id: 102,
    name: 'Marcus Vance',
    email: 'm.vance@vancecap.co.uk',
    organisation: 'Vance Capital Ventures',
    region: 'EMEA (UK)',
    industry: 'Venture Capital & Advisory',
    message: 'Seeking preferred engineering partner status for our portfolio of 18 Series A/B AI and SaaS startups in London and Berlin.',
    submitted: 'Aug 25, 2026 · 01:45 PM',
    submittedISO: '2026-08-25T13:45:00'
  },
  {
    id: 103,
    name: 'Dr. Hiroshi Tanaka',
    email: 'tanaka@tokyo-cyberlabs.jp',
    organisation: 'Tokyo Cyber Security Labs',
    region: 'APAC (Japan)',
    industry: 'Cybersecurity & Defense',
    message: 'Interest in establishing an APAC cross-border joint venture for autonomous threat intelligence and regulatory compliance auditing.',
    submitted: 'Aug 22, 2026 · 10:10 AM',
    submittedISO: '2026-08-22T10:10:00'
  },
  {
    id: 104,
    name: 'Claire Dupont',
    email: 'c.dupont@alliance-digital.fr',
    organisation: 'Alliance Digital Systems',
    region: 'EMEA (France)',
    industry: 'System Integration',
    message: 'Exploring an official channel partnership to deliver FWC engineering pods across French and Benelux enterprise accounts.',
    submitted: 'Aug 18, 2026 · 03:20 PM',
    submittedISO: '2026-08-18T15:20:00'
  }
];

let enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);
let partnerships = loadCollection(PARTNERSHIP_KEY, partnershipSeedData);

// Migrate older stored data if keys differ
if (enquiries.length && !enquiries[0].organisation) {
  enquiries = enquirySeedData;
  saveCollection(ENQUIRY_KEY, enquiries);
}
if (partnerships.length && !partnerships[0].organisation) {
  partnerships = partnershipSeedData;
  saveCollection(PARTNERSHIP_KEY, partnerships);
}

let activeTab = 'service'; // 'service' | 'partnership'
let activeItem = null;

const CONTACT_AVATARS = {
  'Amara Chen': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  'Rajesh Nair': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  'Sofia Bergström': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  'David Okafor': 'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80',
  'Mei Lin Tan': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
  'Elena Rostova': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
  'Marcus Vance': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  'Dr. Hiroshi Tanaka': 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  'Claire Dupont': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
};

function getAvatarUrl(name, idx = 0) {
  if (CONTACT_AVATARS[name]) return CONTACT_AVATARS[name];
  const fallback = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1531384441138-2736e62e0919?w=150&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  ];
  return fallback[idx % fallback.length];
}

function updateBadges() {
  const serviceBadge = document.getElementById('service-requests-badge');
  if (serviceBadge) serviceBadge.textContent = enquiries.length;

  const partnershipBadge = document.getElementById('partnership-requests-badge');
  if (partnershipBadge) partnershipBadge.textContent = partnerships.length;
}

function getActiveDataset() {
  return activeTab === 'service' ? enquiries : partnerships;
}

function renderTable(items) {
  const tbody = document.getElementById('enquiries-table-body');
  if (!tbody) return;

  const colHeader = document.getElementById('enquiry-col-message');
  if (colHeader) {
    colHeader.textContent = activeTab === 'service' ? 'Enquiry' : 'Message';
  }

  if (!items.length) {
    const emptyLabel = activeTab === 'service' ? 'service requests' : 'partnership requests';
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="8" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No ${emptyLabel} found matching your search.
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
    const itemType = activeTab === 'service' ? 'enquiry' : 'partnership request';

    return `
      <tr data-id="${item.id}" style="cursor: pointer;" title="Click to view full ${itemType} details">
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
  const currentList = getActiveDataset();
  const item = currentList.find((e) => e.id === id);
  if (!item) return;
  activeItem = item;

  const isService = activeTab === 'service';
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

  const drawerTitle = document.getElementById('drawer-title');
  if (drawerTitle) {
    drawerTitle.textContent = isService ? 'Service Request Details' : 'Partnership Request Details';
  }

  const scopeTitle = document.getElementById('drawer-scope-title');
  if (scopeTitle) {
    scopeTitle.textContent = isService ? 'Project Scope & Enquiry' : 'Partnership Scope & Message';
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
    const subject = isService ? `FWC Follow-up: ${org}` : `FWC Partnership Inquiry: ${org}`;
    emailBtn.href = `mailto:${item.email}?subject=${encodeURIComponent(subject)}`;
  }

  document.getElementById('drawer-org').textContent = org;
  document.getElementById('drawer-region').textContent = reg;
  document.getElementById('drawer-industry').textContent = ind;
  document.getElementById('drawer-message').textContent = message;

  openDrawer('enquiry-drawer');
}

function applyActiveFilters() {
  const searchInput = document.getElementById('enquiry-search');
  const dateFilter = document.getElementById('enquiry-date-filter');
  const q = (searchInput?.value || '').toLowerCase().trim();
  const dateVal = dateFilter?.value || 'all';

  const currentList = getActiveDataset();

  const filtered = currentList.filter((item) => {
    const org = (item.organisation || item.companyType || '').toLowerCase();
    const reg = (item.region || item.country || '').toLowerCase();
    const ind = (item.industry || '').toLowerCase();
    const text = (item.enquiry || item.message || '').toLowerCase();

    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      org.includes(q) ||
      reg.includes(q) ||
      ind.includes(q) ||
      text.includes(q);

    if (!matchSearch) return false;

    if (dateVal !== 'all' && item.submittedISO) {
      const itemDate = new Date(item.submittedISO);
      const now = new Date();
      const diffDays = (now - itemDate) / (1000 * 60 * 60 * 24);
      if (diffDays > Number(dateVal)) return false;
    }

    return true;
  });

  renderTable(filtered);
}

function switchTab(tab) {
  if (tab !== 'service' && tab !== 'partnership') return;
  activeTab = tab;

  const serviceTabBtn = document.getElementById('tab-service-requests');
  const partnershipTabBtn = document.getElementById('tab-partnership-requests');

  if (activeTab === 'service') {
    serviceTabBtn?.classList.add('active');
    serviceTabBtn?.setAttribute('aria-selected', 'true');
    partnershipTabBtn?.classList.remove('active');
    partnershipTabBtn?.setAttribute('aria-selected', 'false');
  } else {
    partnershipTabBtn?.classList.add('active');
    partnershipTabBtn?.setAttribute('aria-selected', 'true');
    serviceTabBtn?.classList.remove('active');
    serviceTabBtn?.setAttribute('aria-selected', 'false');
  }

  applyActiveFilters();
}

function refreshAll() {
  enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);
  partnerships = loadCollection(PARTNERSHIP_KEY, partnershipSeedData);
  updateBadges();
  applyActiveFilters();
}

document.addEventListener('DOMContentLoaded', () => {
  refreshAll();

  // Tab Switching Listeners
  document.getElementById('tab-service-requests')?.addEventListener('click', () => {
    switchTab('service');
  });

  document.getElementById('tab-partnership-requests')?.addEventListener('click', () => {
    switchTab('partnership');
  });

  // Search & Date Filters
  const searchInput = document.getElementById('enquiry-search');
  const dateFilter = document.getElementById('enquiry-date-filter');

  searchInput?.addEventListener('input', applyActiveFilters);
  dateFilter?.addEventListener('change', applyActiveFilters);

  // CSV Export
  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    const filename = activeTab === 'service' ? 'fwc-service-requests.csv' : 'fwc-partnership-requests.csv';
    exportTableToCSV('enquiries-table', filename);
  });

  // Row Click for Details Drawer
  document.getElementById('enquiries-table-body')?.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-id]');
    if (!row) return;
    const id = Number(row.dataset.id);
    openEnquiryDrawer(id);
  });
});
