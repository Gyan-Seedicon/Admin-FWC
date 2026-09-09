/* ==========================================================================
   Enquiry / Service, Partnership & AI Agent Request Management
   Underlined Tabs: Service Requests, Partnership Requests & Agent Request Service
   Columns:
     - Service / Partnership: S.No., Name, Email, Organisation, Region, Industry, Enquiry/Message, Submitted on
     - Agent Request Service: S.No., Name, Organisation, Email, Industry, Type of AI agent, Message, Submitted on
   Structured minimal Enquiry/Partnership/Agent Details Drawer.
   ========================================================================== */

const ENQUIRY_KEY = 'fwc-enquiries';
const PARTNERSHIP_KEY = 'fwc-partnerships';
const AGENT_REQUEST_KEY = 'fwc-agent-requests';

const enquirySeedData = typeof GLOBAL_DEFAULT_ENQUIRIES !== 'undefined' ? GLOBAL_DEFAULT_ENQUIRIES : [
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

const partnershipSeedData = typeof GLOBAL_DEFAULT_PARTNERSHIPS !== 'undefined' ? GLOBAL_DEFAULT_PARTNERSHIPS : [
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

const agentRequestSeedData = typeof GLOBAL_DEFAULT_AGENT_REQUESTS !== 'undefined' ? GLOBAL_DEFAULT_AGENT_REQUESTS : [
  {
    id: 201,
    name: 'Vikram Malhotra',
    email: 'v.malhotra@synthetix.ai',
    organisation: 'Synthetix AI Labs',
    industry: 'Financial Services & Banking',
    agentType: 'Autonomous Risk & Underwriting Agent',
    message: 'We require an autonomous AI agent capable of ingesting financial statements, bank feeds, and credit bureau data to generate automated risk scores and preliminary underwriting memos for SME loan requests.',
    submitted: 'Aug 28, 2026 · 11:30 AM',
    submittedISO: '2026-08-28T11:30:00'
  },
  {
    id: 202,
    name: 'Rachel Adams',
    email: 'rachel.adams@biogenix.com',
    organisation: 'BioGenix Therapeutics',
    industry: 'Healthcare & Life Sciences',
    agentType: 'Clinical Trial Protocol & Triage Agent',
    message: 'Seeking a HIPAA/GDPR-compliant multi-modal AI agent to assist researchers with screening clinical trial candidate profiles, matching genetic biomarkers, and summarising trial inclusion criteria.',
    submitted: 'Aug 26, 2026 · 03:15 PM',
    submittedISO: '2026-08-26T15:15:00'
  },
  {
    id: 203,
    name: 'Karthik Subramanian',
    email: 'karthik.s@kredencelogix.in',
    organisation: 'Kredence Logistics Corp',
    industry: 'Supply Chain & Logistics',
    agentType: 'Supply Chain Dispatch & Route Optimization Agent',
    message: 'Need an agentic workflow that continuously monitors port congestion, weather APIs, and fleet telemetry to autonomously re-route cross-dock container freight and notify dispatch managers.',
    submitted: 'Aug 24, 2026 · 09:45 AM',
    submittedISO: '2026-08-24T09:45:00'
  },
  {
    id: 204,
    name: 'Elena Vasquez',
    email: 'elena.v@novaretail.com',
    organisation: 'NovaRetail Omnichannel',
    industry: 'E-Commerce & Retail',
    agentType: 'Multilingual Customer Support & Sales Agent',
    message: 'Looking to deploy a 24/7 conversational commerce agent on WhatsApp and Web that handles product recommendations, return logistics, and inventory queries in English, Spanish, and French.',
    submitted: 'Aug 20, 2026 · 05:20 PM',
    submittedISO: '2026-08-20T17:20:00'
  },
  {
    id: 205,
    name: 'Tariq Mansoor',
    email: 'tariq@aerologix.ae',
    organisation: 'AeroDynamics Defense Systems',
    industry: 'Aerospace & Defense',
    agentType: 'Automated Code Review & Security Compliance Agent',
    message: 'Seeking an air-gapped on-premises LLM agent to perform static AST code analysis, SBOM verification, and ISO 27001 / DO-178C avionics software safety compliance checks.',
    submitted: 'Aug 15, 2026 · 01:10 PM',
    submittedISO: '2026-08-15T13:10:00'
  }
];

let enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);
let partnerships = loadCollection(PARTNERSHIP_KEY, partnershipSeedData);
let agentRequests = loadCollection(AGENT_REQUEST_KEY, agentRequestSeedData);

// Migrate older stored data if keys differ
if (enquiries.length && !enquiries[0].organisation) {
  enquiries = enquirySeedData;
  saveCollection(ENQUIRY_KEY, enquiries);
}
if (partnerships.length && !partnerships[0].organisation) {
  partnerships = partnershipSeedData;
  saveCollection(PARTNERSHIP_KEY, partnerships);
}
if (agentRequests.length && !agentRequests[0].agentType) {
  agentRequests = agentRequestSeedData;
  saveCollection(AGENT_REQUEST_KEY, agentRequests);
}

let activeTab = 'service'; // 'service' | 'partnership' | 'agent'
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
  'Claire Dupont': 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
  'Vikram Malhotra': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
  'Rachel Adams': 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
  'Karthik Subramanian': 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  'Elena Vasquez': 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80',
  'Tariq Mansoor': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
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

  const agentBadge = document.getElementById('agent-requests-badge');
  if (agentBadge) agentBadge.textContent = agentRequests.length;
}

function getActiveDataset() {
  if (activeTab === 'service') return enquiries;
  if (activeTab === 'partnership') return partnerships;
  if (activeTab === 'agent') return agentRequests;
  return enquiries;
}

function renderTableHeader() {
  const thead = document.querySelector('#enquiries-table thead');
  if (!thead) return;

  if (activeTab === 'agent') {
    thead.innerHTML = `
      <tr id="enquiries-table-head-row">
        <th style="width: 50px;">S.No.</th>
        <th>Name <span class="sort-icon"><svg viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,181.66l-56,56a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L144,212.69V40a8,8,0,0,1,16,0V212.69l42.34-42.35a8,8,0,0,1,11.32,11.32ZM101.66,74.34,68,40.69V212a8,8,0,0,1-16,0V40.69L18.34,74.34A8,8,0,0,1,7,63,8,8,0,0,1,7,52.34l40-40a8,8,0,0,1,11.32,0l40,40A8,8,0,0,1,101.66,74.34Z"/></svg></span></th>
        <th>Organisation</th>
        <th>Email</th>
        <th>Industry</th>
        <th>Type of AI agent</th>
        <th id="enquiry-col-message">Message</th>
        <th>Submitted on</th>
      </tr>
    `;
  } else {
    const msgColTitle = activeTab === 'service' ? 'Enquiry' : 'Message';
    thead.innerHTML = `
      <tr id="enquiries-table-head-row">
        <th style="width: 50px;">S.No.</th>
        <th>Name <span class="sort-icon"><svg viewBox="0 0 256 256" fill="currentColor"><path d="M213.66,181.66l-56,56a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L144,212.69V40a8,8,0,0,1,16,0V212.69l42.34-42.35a8,8,0,0,1,11.32,11.32ZM101.66,74.34,68,40.69V212a8,8,0,0,1-16,0V40.69L18.34,74.34A8,8,0,0,1,7,63,8,8,0,0,1,7,52.34l40-40a8,8,0,0,1,11.32,0l40,40A8,8,0,0,1,101.66,74.34Z"/></svg></span></th>
        <th>Email</th>
        <th>Organisation</th>
        <th>Region</th>
        <th>Industry</th>
        <th id="enquiry-col-message">${msgColTitle}</th>
        <th>Submitted on</th>
      </tr>
    `;
  }
}

function renderTable(items) {
  const tbody = document.getElementById('enquiries-table-body');
  if (!tbody) return;

  renderTableHeader();

  if (!items.length) {
    let emptyLabel = 'service requests';
    if (activeTab === 'partnership') emptyLabel = 'partnership requests';
    if (activeTab === 'agent') emptyLabel = 'agent request services';

    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="8" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No ${emptyLabel} found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  if (activeTab === 'agent') {
    tbody.innerHTML = items.map((item, idx) => {
      const submittedTime = item.submitted || 'Aug 28, 2026 · 11:30 AM';
      const message = item.message || item.enquiry || '';
      const org = item.organisation || 'Enterprise Client';
      const ind = item.industry || 'Technology';
      const agentType = item.agentType || 'Autonomous AI Agent';

      return `
        <tr data-id="${item.id}" style="cursor: pointer;" title="Click to view full agent request service details">
          <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
          <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">${item.name}</td>
          <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">${org}</td>
          <td style="white-space: nowrap;"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent('FWC AI Agent Request: ' + agentType)}" target="_blank" rel="noopener noreferrer" class="table-link" onclick="event.stopPropagation()">${item.email}</a></td>
          <td style="white-space: nowrap;"><span class="status-badge status-draft">${ind}</span></td>
          <td style="white-space: nowrap;"><span class="status-badge status-agent">${agentType}</span></td>
          <td style="max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink-secondary);" title="${message}">${message}</td>
          <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${submittedTime}</td>
        </tr>
      `;
    }).join('');
  } else {
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
          <td style="white-space: nowrap;"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent('FWC Follow-up: ' + org)}" target="_blank" rel="noopener noreferrer" class="table-link" onclick="event.stopPropagation()">${item.email}</a></td>
          <td style="font-weight: 600; color: var(--ink-primary); white-space: nowrap;">${org}</td>
          <td style="color: var(--ink-secondary); font-size: var(--text-2xs); white-space: nowrap;">${reg}</td>
          <td style="white-space: nowrap;"><span class="status-badge status-draft">${ind}</span></td>
          <td style="max-width: 280px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--ink-secondary);" title="${message}">${message}</td>
          <td style="color: var(--ink-primary); font-size: var(--text-2xs); font-weight: 500; white-space: nowrap;">${submittedTime}</td>
        </tr>
      `;
    }).join('');
  }
}

function openEnquiryDrawer(id) {
  const currentList = getActiveDataset();
  const item = currentList.find((e) => e.id === id);
  if (!item) return;
  activeItem = item;

  const isService = activeTab === 'service';
  const isAgent = activeTab === 'agent';
  const submittedTime = item.submitted || 'Aug 26, 2026 · 02:40 PM';
  const message = item.enquiry || item.message || '';
  const org = item.organisation || item.companyType || 'Enterprise Client';
  const reg = item.region || item.country || 'Global';
  const ind = item.industry || item.companyType || 'Technology';
  const agentType = item.agentType || 'Autonomous AI Agent';

  const avatarImg = document.getElementById('drawer-avatar-img');
  if (avatarImg) {
    avatarImg.src = getAvatarUrl(item.name);
    avatarImg.alt = item.name;
  }

  const drawerTitle = document.getElementById('drawer-title');
  if (drawerTitle) {
    if (isAgent) {
      drawerTitle.textContent = 'Agent Request Service Details';
    } else if (isService) {
      drawerTitle.textContent = 'Service Request Details';
    } else {
      drawerTitle.textContent = 'Partnership Request Details';
    }
  }

  const scopeTitle = document.getElementById('drawer-scope-title');
  if (scopeTitle) {
    if (isAgent) {
      scopeTitle.textContent = 'Agent Scope & Message';
    } else if (isService) {
      scopeTitle.textContent = 'Project Scope & Enquiry';
    } else {
      scopeTitle.textContent = 'Partnership Scope & Message';
    }
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
    let subject = `FWC Follow-up: ${org}`;
    if (isAgent) {
      subject = `FWC AI Agent Request: ${agentType} — ${org}`;
    } else if (!isService) {
      subject = `FWC Partnership Inquiry: ${org}`;
    }
    emailBtn.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(item.email)}&su=${encodeURIComponent(subject)}`;
    emailBtn.target = '_blank';
    emailBtn.rel = 'noopener noreferrer';
  }

  document.getElementById('drawer-org').textContent = org;
  
  const regionContainer = document.getElementById('drawer-region-container');
  const agentTypeContainer = document.getElementById('drawer-agent-type-container');

  if (isAgent) {
    if (regionContainer) regionContainer.style.display = 'none';
    if (agentTypeContainer) {
      agentTypeContainer.style.display = 'flex';
      const agentBadge = document.getElementById('drawer-agent-type');
      if (agentBadge) agentBadge.textContent = agentType;
    }
  } else {
    if (regionContainer) {
      regionContainer.style.display = 'flex';
      document.getElementById('drawer-region').textContent = reg;
    }
    if (agentTypeContainer) agentTypeContainer.style.display = 'none';
  }

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
    const agentType = (item.agentType || '').toLowerCase();
    const text = (item.enquiry || item.message || '').toLowerCase();

    const matchSearch = !q ||
      item.name.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      org.includes(q) ||
      reg.includes(q) ||
      ind.includes(q) ||
      agentType.includes(q) ||
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
  if (tab !== 'service' && tab !== 'partnership' && tab !== 'agent') return;
  activeTab = tab;

  const serviceTabBtn = document.getElementById('tab-service-requests');
  const partnershipTabBtn = document.getElementById('tab-partnership-requests');
  const agentTabBtn = document.getElementById('tab-agent-requests');

  [serviceTabBtn, partnershipTabBtn, agentTabBtn].forEach((btn) => {
    btn?.classList.remove('active');
    btn?.setAttribute('aria-selected', 'false');
  });

  if (activeTab === 'service') {
    serviceTabBtn?.classList.add('active');
    serviceTabBtn?.setAttribute('aria-selected', 'true');
  } else if (activeTab === 'partnership') {
    partnershipTabBtn?.classList.add('active');
    partnershipTabBtn?.setAttribute('aria-selected', 'true');
  } else if (activeTab === 'agent') {
    agentTabBtn?.classList.add('active');
    agentTabBtn?.setAttribute('aria-selected', 'true');
  }

  applyActiveFilters();
}

function refreshAll() {
  enquiries = loadCollection(ENQUIRY_KEY, enquirySeedData);
  partnerships = loadCollection(PARTNERSHIP_KEY, partnershipSeedData);
  agentRequests = loadCollection(AGENT_REQUEST_KEY, agentRequestSeedData);
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

  document.getElementById('tab-agent-requests')?.addEventListener('click', () => {
    switchTab('agent');
  });

  // Search & Date Filters
  const searchInput = document.getElementById('enquiry-search');
  const dateFilter = document.getElementById('enquiry-date-filter');

  searchInput?.addEventListener('input', applyActiveFilters);
  dateFilter?.addEventListener('change', applyActiveFilters);

  // CSV Export
  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    let filename = 'fwc-service-requests.csv';
    if (activeTab === 'partnership') filename = 'fwc-partnership-requests.csv';
    if (activeTab === 'agent') filename = 'fwc-agent-requests.csv';
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

