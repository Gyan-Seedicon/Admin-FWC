/* ==========================================================================
   Job Applicants Directory & Management
   View candidates by job requisition with contact info and PDF resumes.
   ========================================================================== */

const JOBS_KEY = 'fwc-job-listings';
const CANDIDATES_KEY = 'fwc-job-candidates';

const defaultCandidateSeeds = [
  // Candidates for Job 1 (Cybersecurity Analyst & Threat Hunting Specialist)
  {
    id: 101,
    jobId: 1,
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'elena.rostova@techdefense.io',
    phone: '+1 (415) 892-3401',
    location: 'San Francisco, CA',
    appliedOn: 'Aug 28, 2026 · 10:15 AM',
    appliedISO: '2026-08-28T10:15:00',
    status: 'Under Review',
    resumeFileName: 'elena-rostova-cybersecurity-resume.pdf',
    resumeFileSize: '1.2 MB',
    summary: 'Senior Cybersecurity Engineer with 5+ years of experience in enterprise SIEM threat hunting, Splunk query optimization, SOC2 compliance governance, and automated incident triage across AWS multi-cloud environments.',
    skills: ['SIEM & Splunk (Expert)', 'AWS Security Hub', 'SOC2 / HIPAA Audit Readiness', 'Threat Hunting', 'Zero-Trust IAM', 'Python & Bash Automation'],
    experience: [
      {
        role: 'Threat Intelligence Lead',
        company: 'Vanguard Cyber Systems',
        period: '2023 – Present',
        bullets: [
          'Led continuous 24/7 security event telemetry triage across 4,000+ cloud instances reducing mean time to detect (MTTD) by 40%.',
          'Architected automated Splunk Phantom SOAR playbooks for rapid zero-day quarantine.',
          'Spearheaded annual SOC2 Type II and ISO 27001 external audit defense with zero critical findings.'
        ]
      },
      {
        role: 'SOC Security Analyst',
        company: 'Apex Cloud Defense',
        period: '2021 – 2023',
        bullets: [
          'Monitored AWS GuardDuty and Security Hub alerts; triaged over 200 suspicious telemetry vectors monthly.',
          'Conducted threat simulation drills and authoring post-incident forensic root cause analyses.'
        ]
      }
    ],
    education: 'B.S. in Computer Science & Information Assurance — UC Berkeley (2021)'
  },
  {
    id: 102,
    jobId: 1,
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'david.chen@cybermesh.org',
    phone: '+1 (213) 449-7712',
    location: 'Los Angeles, CA',
    appliedOn: 'Aug 27, 2026 · 02:40 PM',
    appliedISO: '2026-08-27T14:40:00',
    status: 'Shortlisted',
    resumeFileName: 'david-chen-security-analyst.pdf',
    resumeFileSize: '980 KB',
    summary: 'Cybersecurity Analyst specializing in vulnerability management, automated SAST/DAST pipeline integration, and DevSecOps compliance automation.',
    skills: ['AWS Security', 'Splunk', 'Tenable / Nessus', 'SOC2 Compliance', 'Docker Security', 'Terraform'],
    experience: [
      {
        role: 'Cybersecurity Analyst',
        company: 'Nexus Tech Partners',
        period: '2022 – Present',
        bullets: [
          'Integrated Snyk and Trivy automated scanning into GitHub Actions CI/CD pipelines.',
          'Remediated 300+ container vulnerabilities across production Kubernetes clusters.'
        ]
      }
    ],
    education: 'B.S. in Cybersecurity — USC Viterbi (2022)'
  },
  {
    id: 103,
    jobId: 1,
    name: 'Marcus Holloway',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'm.holloway@defenselogic.com',
    phone: '+1 (312) 581-9034',
    location: 'Chicago, IL',
    appliedOn: 'Aug 26, 2026 · 11:20 AM',
    appliedISO: '2026-08-26T11:20:00',
    status: 'Screening',
    resumeFileName: 'marcus-holloway-lead-analyst.pdf',
    resumeFileSize: '1.4 MB',
    summary: '6+ years in zero-trust architecture, cloud telemetry analysis, and enterprise identity security.',
    skills: ['Zero-Trust', 'Splunk Enterprise', 'Okta / Azure AD IAM', 'Incident Response', 'HIPAA Compliance'],
    experience: [
      {
        role: 'Senior Information Security Analyst',
        company: 'Horizon Health Systems',
        period: '2021 – Present',
        bullets: [
          'Oversaw HIPAA-aligned security posture for medical telemetry systems.',
          'Configured zero-trust conditional access policies for 12,000 corporate devices.'
        ]
      }
    ],
    education: 'M.S. in Information Systems — Northwestern University'
  },
  {
    id: 104,
    jobId: 1,
    name: 'Aisha Al-Mansoor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'aisha.mansoor@infosec-hub.net',
    phone: '+1 (646) 320-1995',
    location: 'New York, NY',
    appliedOn: 'Aug 25, 2026 · 04:10 PM',
    appliedISO: '2026-08-25T16:10:00',
    status: 'Interviewing',
    resumeFileName: 'aisha-mansoor-threat-hunter.pdf',
    resumeFileSize: '1.1 MB',
    summary: 'Threat Hunter and Penetration Tester with OSCP and CISSP certifications.',
    skills: ['Threat Hunting', 'Penetration Testing (OSCP)', 'SIEM Splunk', 'Zero-Trust', 'Python'],
    experience: [
      {
        role: 'Offensive Security Specialist',
        company: 'Starlight Security Labs',
        period: '2022 – Present',
        bullets: [
          'Conducted red-team simulations and cloud infrastructure penetration tests.',
          'Authored comprehensive audit remediation guides for executive engineering stakeholders.'
        ]
      }
    ],
    education: 'B.S. in Computer Engineering — Columbia University'
  },

  // Candidates for Job 2 (Senior Technology Consultant)
  {
    id: 201,
    jobId: 2,
    name: 'Siddharth Rao',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'siddharth.rao@advisorycloud.com',
    phone: '+1 (626) 714-8830',
    location: 'Pasadena, CA',
    appliedOn: 'Aug 25, 2026 · 01:20 PM',
    appliedISO: '2026-08-25T13:20:00',
    status: 'Screening',
    resumeFileName: 'siddharth-rao-tech-consultant.pdf',
    resumeFileSize: '1.5 MB',
    summary: '7+ years leading enterprise cloud migrations, modernizing legacy monolithic architectures, and structuring digital transformation roadmaps for Fortune 500 manufacturing clients.',
    skills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'Agile Pod Leadership', 'Financial ROI Modeling', 'AWS & Azure'],
    experience: [
      {
        role: 'Lead Cloud Strategy Consultant',
        company: 'Deloitte Consulting LLP',
        period: '2022 – Present',
        bullets: [
          'Advised C-suite leadership on $15M multi-year digital transformation program.',
          'Structured agile pod delivery governance improving sprint velocity by 35%.'
        ]
      }
    ],
    education: 'MBA — UCLA Anderson School of Management | B.Tech in IT — NIT'
  },
  {
    id: 202,
    jobId: 2,
    name: 'Claire Dupont',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'claire.dupont@consulting-tech.fr',
    phone: '+1 (310) 902-5519',
    location: 'Los Angeles, CA',
    appliedOn: 'Aug 24, 2026 · 09:45 AM',
    appliedISO: '2026-08-24T09:45:00',
    status: 'Shortlisted',
    resumeFileName: 'claire-dupont-senior-consultant.pdf',
    resumeFileSize: '1.3 MB',
    summary: 'Technology Consultant with deep specialization in legacy system modernization, microservices migration, and client stakeholder management.',
    skills: ['Cloud Transformation', 'Client Advisory', 'Enterprise Architecture', 'Microservices', 'Scrum / Agile'],
    experience: [
      {
        role: 'Senior Digital Consultant',
        company: 'Accenture Technology',
        period: '2021 – Present',
        bullets: [
          'Led architecture discovery workshops across 6 international enterprise clients.',
          'Migrated legacy on-prem core banking workflows to AWS serverless architectures.'
        ]
      }
    ],
    education: 'M.S. in Management Information Systems — NYU Stern'
  },

  // Candidates for Job 3 (Senior AI Architect & GenAI Team Lead)
  {
    id: 301,
    jobId: 3,
    name: 'Dr. Vikram Malhotra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'vikram.malhotra@neuralscale.ai',
    phone: '+91 98450 12890',
    location: 'Bangalore, India',
    appliedOn: 'Aug 22, 2026 · 11:30 AM',
    appliedISO: '2026-08-22T11:30:00',
    status: 'Interviewing',
    resumeFileName: 'dr-vikram-malhotra-ai-architect.pdf',
    resumeFileSize: '1.8 MB',
    summary: 'Ph.D. in Machine Learning with 9+ years architecting enterprise RAG systems, LLM orchestration frameworks, and vector index clusters on Kubernetes.',
    skills: ['LLM Orchestration', 'RAG Architectures', 'PyTorch / LangChain', 'Vector DBs (Milvus/pgvector)', 'MLOps on Kubernetes'],
    experience: [
      {
        role: 'Principal AI Architect',
        company: 'Cognitive Intelligence Labs',
        period: '2021 – Present',
        bullets: [
          'Designed enterprise-grade RAG pipeline serving 2M daily semantic queries at <120ms P99 latency.',
          'Built automated model evaluation benchmarking suite for hallucination suppression and alignment.'
        ]
      }
    ],
    education: 'Ph.D. in Computer Science (NLP & Deep Learning) — IISc Bangalore'
  },
  {
    id: 302,
    jobId: 3,
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'ananya.deshmukh@genai-systems.io',
    phone: '+91 99801 44520',
    location: 'Bangalore, India',
    appliedOn: 'Aug 20, 2026 · 03:15 PM',
    appliedISO: '2026-08-20T15:15:00',
    status: 'Shortlisted',
    resumeFileName: 'ananya-deshmukh-staff-ai-engineer.pdf',
    resumeFileSize: '1.4 MB',
    summary: 'Staff AI Engineer with expertise in model fine-tuning, latency optimization on NVIDIA H100 clusters, and agentic workflows.',
    skills: ['LangGraph / AutoGen', 'PyTorch & vLLM', 'Model Fine-tuning (LoRA)', 'Triton Inference Server', 'AWS Bedrock'],
    experience: [
      {
        role: 'Staff Machine Learning Engineer',
        company: 'HyperScale AI Labs',
        period: '2022 – Present',
        bullets: [
          'Deployed multi-agent autonomous support pods reducing human escalation by 60%.',
          'Optimized LLM serving throughput with vLLM tensor parallelism on AWS EC2 G5/P4 instances.'
        ]
      }
    ],
    education: 'M.Tech in Artificial Intelligence — IIT Bombay'
  },
  {
    id: 303,
    jobId: 3,
    name: 'Robert Vance',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'robert.vance@ai-foundry.com',
    phone: '+1 (415) 329-8810',
    location: 'San Francisco, CA',
    appliedOn: 'Aug 19, 2026 · 09:20 AM',
    appliedISO: '2026-08-19T09:20:00',
    status: 'Under Review',
    resumeFileName: 'robert-vance-ai-lead.pdf',
    resumeFileSize: '1.6 MB',
    summary: 'AI Systems Architect with 8+ years building high-throughput inference engines and deep learning deployment frameworks.',
    skills: ['PyTorch', 'Distributed Training', 'Kubernetes', 'Triton', 'RAG Pipelines'],
    experience: [
      {
        role: 'Lead ML Engineer',
        company: 'Apex Vision AI',
        period: '2021 – Present',
        bullets: [
          'Orchestrated multi-GPU training clusters reducing training iterations from days to hours.',
          'Maintained 99.99% uptime across production model serving pods.'
        ]
      }
    ],
    education: 'M.S. in Computer Science — Stanford University'
  },
  {
    id: 304,
    jobId: 3,
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'maya.lin@intelligence-cloud.net',
    phone: '+1 (206) 771-4093',
    location: 'Seattle, WA',
    appliedOn: 'Aug 18, 2026 · 04:30 PM',
    appliedISO: '2026-08-18T16:30:00',
    status: 'Hired',
    resumeFileName: 'maya-lin-ai-architect.pdf',
    resumeFileSize: '1.3 MB',
    summary: 'Senior Machine Learning Architect with specialized background in NLP and responsible AI guardrails.',
    skills: ['GenAI Governance', 'LangChain', 'Python', 'Azure OpenAI', 'Semantic Kernel'],
    experience: [
      {
        role: 'Senior NLP Architect',
        company: 'CloudMatrix Global',
        period: '2022 – Present',
        bullets: [
          'Constructed hallucination detection and prompt injection firewalls for enterprise clients.'
        ]
      }
    ],
    education: 'B.S. in Artificial Intelligence — University of Washington'
  },

  // Candidates for Job 4 (Cloud Infrastructure Engineer)
  {
    id: 401,
    jobId: 4,
    name: 'Liam O’Connor',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'liam.oconnor@cloudinfra.io',
    phone: '+1 (626) 819-4402',
    location: 'Alhambra, CA',
    appliedOn: 'Aug 18, 2026 · 02:00 PM',
    appliedISO: '2026-08-18T14:00:00',
    status: 'Screening',
    resumeFileName: 'liam-oconnor-cloud-infra.pdf',
    resumeFileSize: '1.2 MB',
    summary: 'DevOps & Cloud Engineer with 4+ years authoring reusable Terraform modules, managing Kubernetes clusters on AWS EKS, and building Datadog observability dashboards.',
    skills: ['Terraform & Terragrunt', 'Kubernetes / EKS', 'AWS Multi-Account', 'Prometheus & Grafana', 'GitHub Actions CI/CD'],
    experience: [
      {
        role: 'Cloud Infrastructure Engineer',
        company: 'Skyward Systems',
        period: '2022 – Present',
        bullets: [
          'Migrated 40+ microservices to multi-tenant EKS clusters with Karpenter auto-scaling.',
          'Reduced monthly cloud infrastructure costs by 22% through automated spot instance orchestration.'
        ]
      }
    ],
    education: 'B.S. in Computer Science — Cal Poly Pomona'
  },
  {
    id: 402,
    jobId: 4,
    name: 'Sofia Ramirez',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'sofia.ramirez@devops-scale.com',
    phone: '+1 (626) 304-9981',
    location: 'Pasadena, CA',
    appliedOn: 'Aug 16, 2026 · 11:15 AM',
    appliedISO: '2026-08-16T11:15:00',
    status: 'Rejected',
    resumeFileName: 'sofia-ramirez-devops.pdf',
    resumeFileSize: '1.1 MB',
    summary: 'Infrastructure Automation Engineer focused on zero-downtime CI/CD and multi-cloud Kubernetes deployment.',
    skills: ['Terraform', 'AWS ECS / EKS', 'Datadog', 'ArgoCD', 'Python'],
    experience: [
      {
        role: 'DevOps Engineer',
        company: 'Nexus Platforms',
        period: '2021 – Present',
        bullets: [
          'Implemented GitOps deployment automation using ArgoCD and Helm charts.'
        ]
      }
    ],
    education: 'B.S. in Software Engineering — UC Riverside'
  },

  // Candidates for Job 5 (Blockchain Developer)
  {
    id: 501,
    jobId: 5,
    name: 'Mateo Morales',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'mateo.morales@web3foundry.dev',
    phone: '+1 (512) 670-3321',
    location: 'Austin, TX',
    appliedOn: 'Aug 14, 2026 · 10:45 AM',
    appliedISO: '2026-08-14T10:45:00',
    status: 'Interviewing',
    resumeFileName: 'mateo-morales-solidity-developer.pdf',
    resumeFileSize: '1.0 MB',
    summary: 'Smart Contract Engineer with extensive experience in Solidity, Foundry test suites, and gas optimization for EVM Layer 2 protocols.',
    skills: ['Solidity', 'Foundry & Hardhat', 'EVM Chains', 'Smart Contract Auditing', 'OpenZeppelin Contracts'],
    experience: [
      {
        role: 'Smart Contract Developer',
        company: 'EtherFlow Protocol',
        period: '2023 – Present',
        bullets: [
          'Authored decentralized asset escrow contracts handling over $4M in testnet transactions.',
          'Passed third-party security audits with zero high-severity findings.'
        ]
      }
    ],
    education: 'B.S. in Software Engineering — UT Austin'
  }
];

const APPLICANT_STATUSES = [
  { value: 'Under Review', label: 'Under Review', class: 'status-under-review', desc: 'Application just came in, not yet screened.' },
  { value: 'Shortlisted', label: 'Shortlisted', class: 'status-shortlisted', desc: 'Passed the initial screen, worth contacting.' },
  { value: 'Screening', label: 'Screening', class: 'status-screening', desc: 'Covers reached out, responded, and phone/intro screen stage in one bucket.' },
  { value: 'Interviewing', label: 'Interviewing', class: 'status-interviewing', desc: 'Candidate is actively participating in interview rounds.' },
  { value: 'Hired', label: 'Hired', class: 'status-hired', desc: 'Candidate selected, offer accepted, and joined the organization.' },
  { value: 'Rejected', label: 'Rejected', class: 'status-rejected', desc: 'Application archived / rejected at this stage.' }
];

function getStatusMeta(statusName) {
  return APPLICANT_STATUSES.find((s) => s.value === statusName) || APPLICANT_STATUSES[0];
}

function getStatusClass(statusName) {
  const meta = getStatusMeta(statusName);
  return meta ? meta.class : 'status-under-review';
}

function ensureCandidateStatuses(candidates) {
  let modified = false;
  const defaultStatusMap = {
    101: 'Under Review',
    102: 'Shortlisted',
    103: 'Screening',
    104: 'Interviewing',
    201: 'Screening',
    202: 'Shortlisted',
    301: 'Interviewing',
    302: 'Shortlisted',
    303: 'Under Review',
    304: 'Hired',
    401: 'Screening',
    402: 'Rejected',
    501: 'Interviewing'
  };

  candidates.forEach((c) => {
    if (!c.status || !APPLICANT_STATUSES.some((s) => s.value === c.status)) {
      c.status = defaultStatusMap[c.id] || 'Under Review';
      modified = true;
    }
  });

  if (modified) {
    saveCollection(CANDIDATES_KEY, candidates);
  }
  return candidates;
}

let allCandidates = ensureCandidateStatuses(loadCollection(CANDIDATES_KEY, defaultCandidateSeeds));
let currentJob = null;
let currentJobCandidates = [];

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function formatExpiryDate(dateStr) {
  if (!dateStr) return 'Sep 30, 2026';
  if (/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}/.test(dateStr)) return dateStr;
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}, ${d.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
}

function initJobContext() {
  const jobIdParam = getQueryParam('jobId');
  const targetId = jobIdParam ? Number(jobIdParam) : 3;

  const jobListings = loadCollection(JOBS_KEY, []);
  currentJob = jobListings.find((j) => j.id === targetId) || {
    id: targetId,
    title: 'Senior AI Architect',
    department: 'AI & Advanced Tech',
    location: 'Bangalore, India',
    type: 'Full-time',
    experience: 'Staff / Lead (8+ Yrs)',
    salary: '$160,000 – $195,000 / yr',
    expiryDate: '2026-09-30',
    submitted: 'Aug 10, 2026 · 09:00 AM',
    status: 'published',
    pdfName: 'senior-ai-architect-jd.pdf',
    pdfSize: '2.1 MB',
    overview: 'Lead the design of AI-augmented delivery pods for enterprise manufacturing and fintech clients, setting technical direction across a growing generative AI architecture team.',
    responsibilities: [
      'Design scalable LLM pipelines, Retrieval-Augmented Generation (RAG) frameworks, and vector index architectures.',
      'Establish enterprise model governance, evaluation metrics, and responsible AI safety guardrails.',
      'Mentor senior machine learning engineers and present architecture strategies to Fortune 500 stakeholders.'
    ],
    skills: ['LLM Orchestration', 'RAG Architectures', 'PyTorch / LangChain', 'Vector Databases', 'MLOps on Kubernetes']
  };

  // Update Breadcrumb & Header
  document.getElementById('breadcrumb-requisition-name').textContent = `${currentJob.title} — Applicants`;
  document.getElementById('context-job-title').textContent = currentJob.title;
  document.getElementById('context-job-id').textContent = `JOB-${100 + currentJob.id}`;
  document.getElementById('context-job-dept').textContent = currentJob.department || 'Engineering';
  document.getElementById('context-job-loc').textContent = currentJob.location || 'Remote';
  document.getElementById('context-job-type').textContent = currentJob.type || 'Full-time';
  
  const statusEl = document.getElementById('context-job-status');
  if (statusEl) {
    const isPub = currentJob.status === 'published';
    const isRej = currentJob.status === 'rejected';
    const isDraft = currentJob.status === 'draft';
    statusEl.className = `status-badge ${isPub ? 'status-approved' : (isRej ? 'status-rejected' : 'status-pending')}`;
    statusEl.textContent = isPub ? 'Published' : (isRej ? 'Rejected' : (isDraft ? 'Draft' : 'Pending review'));
  }

  // Filter candidates for this job
  currentJobCandidates = allCandidates.filter((c) => c.jobId === currentJob.id);

  // If no candidates found for this specific job ID, provide representative sample candidates
  if (!currentJobCandidates.length) {
    currentJobCandidates = allCandidates.slice(0, 3).map((c, i) => ({
      ...c,
      id: 900 + i,
      jobId: currentJob.id
    }));
  }

  // Update Candidates Tab Count Badge
  const tabCandidatesCountEl = document.getElementById('tab-candidates-count');
  if (tabCandidatesCountEl) {
    tabCandidatesCountEl.textContent = currentJobCandidates.length;
  }

  // Populate Job Description View Panel
  const jdTitleEl = document.getElementById('jd-preview-title');
  if (jdTitleEl) jdTitleEl.textContent = currentJob.title;

  const jdDeptEl = document.getElementById('jd-preview-dept');
  if (jdDeptEl) jdDeptEl.textContent = currentJob.department || 'Engineering';

  const jdLocEl = document.getElementById('jd-preview-location');
  if (jdLocEl) jdLocEl.textContent = currentJob.location || 'Remote';

  const jdTypeEl = document.getElementById('jd-preview-type');
  if (jdTypeEl) jdTypeEl.textContent = currentJob.type || 'Full-time';

  const jdExpEl = document.getElementById('jd-preview-exp');
  if (jdExpEl) jdExpEl.textContent = currentJob.experience || 'Mid-Level (3–5 Yrs)';

  const jdStatusPill = document.getElementById('jd-preview-status-pill');
  if (jdStatusPill) {
    const isPub = currentJob.status === 'published';
    const isRej = currentJob.status === 'rejected';
    const isDraft = currentJob.status === 'draft';
    const badgeClass = isPub ? 'status-approved' : (isRej ? 'status-rejected' : 'status-pending');
    const badgeLabel = isPub ? 'Published' : (isRej ? 'Rejected' : (isDraft ? 'Draft' : 'Pending review'));
    jdStatusPill.innerHTML = `<span class="status-badge ${badgeClass}">${badgeLabel}</span>`;
  }

  const jdEditLink = document.getElementById('jd-preview-edit-link');
  if (jdEditLink) {
    jdEditLink.href = `add-job-listing.html?id=${currentJob.id}`;
  }

  const jdSalaryEl = document.getElementById('jd-preview-salary');
  if (jdSalaryEl) jdSalaryEl.textContent = currentJob.salary || 'Competitive / DOE';

  const jdExpiryEl = document.getElementById('jd-preview-expiry');
  if (jdExpiryEl) jdExpiryEl.textContent = formatExpiryDate(currentJob.expiryDate);

  const jdIdEl = document.getElementById('jd-preview-id');
  if (jdIdEl) jdIdEl.textContent = `JOB-${100 + currentJob.id}`;

  const jdPostedEl = document.getElementById('jd-preview-posted');
  if (jdPostedEl) jdPostedEl.textContent = currentJob.submitted || 'Aug 10, 2026 · 09:00 AM';

  const jdOverviewEl = document.getElementById('jd-preview-overview');
  if (jdOverviewEl) {
    jdOverviewEl.textContent = currentJob.overview || 'Join our engineering team to design, architect, and deploy mission-critical software solutions.';
  }

  const jdRespEl = document.getElementById('jd-preview-responsibilities');
  if (jdRespEl) {
    let items = [];
    if (Array.isArray(currentJob.responsibilities)) {
      items = currentJob.responsibilities;
    } else if (typeof currentJob.responsibilities === 'string') {
      items = currentJob.responsibilities.split('\n').map((s) => s.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);
    }
    if (!items.length) {
      items = [
        'Lead architectural strategy and technical implementation across cross-functional engineering pods.',
        'Collaborate with product and executive teams to define milestone roadmaps and delivery metrics.',
        'Champion code quality, automated test coverage, and documentation standards.'
      ];
    }
    jdRespEl.innerHTML = items.map((item) => `<li>${item.replace(/^[•\-]\s*/, '')}</li>`).join('');
  }

  const jdSkillsEl = document.getElementById('jd-preview-skills');
  if (jdSkillsEl) {
    let skillsList = [];
    if (Array.isArray(currentJob.skills)) {
      skillsList = currentJob.skills;
    } else if (typeof currentJob.skills === 'string') {
      skillsList = currentJob.skills.split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (!skillsList.length) {
      skillsList = ['Technical Architecture', 'Cross-Functional Leadership', 'Cloud Infrastructure', 'Agile Delivery'];
    }
    jdSkillsEl.innerHTML = skillsList.map((skill) => `<span class="preview-skill-pill">${skill}</span>`).join('');
  }

  const jdPdfNameEl = document.getElementById('jd-preview-pdf-name');
  if (jdPdfNameEl) {
    jdPdfNameEl.textContent = currentJob.pdfName || `${currentJob.title.toLowerCase().replace(/\s+/g, '-')}-spec.pdf`;
  }
  const jdPdfSizeEl = document.getElementById('jd-preview-pdf-size');
  if (jdPdfSizeEl) {
    jdPdfSizeEl.textContent = currentJob.pdfSize || '1.4 MB';
  }
}

function initApplicantTabs() {
  const tabs = document.querySelectorAll('.applicant-tab-btn');
  const panels = document.querySelectorAll('.tabs-panel');

  function switchTab(targetPanelId) {
    tabs.forEach((tab) => {
      const isTarget = tab.dataset.tab === targetPanelId;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      if (panel.id === targetPanelId) {
        panel.classList.remove('hidden');
      } else {
        panel.classList.add('hidden');
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const targetPanelId = tab.dataset.tab;
      if (targetPanelId) {
        switchTab(targetPanelId);
      }
    });
  });

  const tabParam = getQueryParam('tab');
  if (tabParam === 'jd' || tabParam === 'description' || tabParam === 'job-description') {
    switchTab('panel-job-description');
  }
}

function renderStats(items) {
  const total = items.length;
  const recent = items.slice(0, Math.min(items.length, 3)).length;

  const totalEl = document.getElementById('stat-total-applicants');
  if (totalEl) totalEl.textContent = total;

  const resumesEl = document.getElementById('stat-resumes-count');
  if (resumesEl) resumesEl.textContent = total;

  const recentEl = document.getElementById('stat-recent-count');
  if (recentEl) recentEl.textContent = recent;

  const verEl = document.getElementById('stat-verified-count');
  if (verEl) verEl.textContent = total;
}

function renderTable(items) {
  const tbody = document.getElementById('applicants-table-body');
  if (!tbody) return;

  if (!items.length) {
    tbody.innerHTML = `
      <tr class="request-list-empty-row">
        <td colspan="7" style="text-align: center; padding: var(--space-8); color: var(--ink-muted);">
          No candidate applications found matching your search.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = items.map((candidate, idx) => {
    const avatarHtml = candidate.avatar
      ? `<img src="${candidate.avatar}" alt="${candidate.name}" class="candidate-avatar">`
      : `<div class="candidate-avatar-fallback">${candidate.name.split(' ').map((n) => n[0]).join('')}</div>`;

    const statusVal = candidate.status || 'Under Review';
    const statusClass = getStatusClass(statusVal);
    const profileUrl = `candidate-profile.html?id=${candidate.id}&jobId=${currentJob ? currentJob.id : 3}`;

    return `
      <tr>
        <td style="color: var(--ink-muted); font-size: var(--text-2xs);">${idx + 1}</td>
        <td>
          <a href="${profileUrl}" class="candidate-cell-link" style="display: inline-flex; text-decoration: none;" title="View candidate profile details">
            <div class="candidate-cell">
              ${avatarHtml}
              <span class="candidate-name candidate-name-clickable">${candidate.name}</span>
            </div>
          </a>
        </td>
        <td>
          <a href="mailto:${candidate.email}" class="contact-link" title="Email ${candidate.name}">
            <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/></svg>
            <span>${candidate.email}</span>
          </a>
        </td>
        <td>
          <a href="tel:${candidate.phone}" class="contact-link" title="Call ${candidate.name}">
            <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M222.37,158.46l-47.11-21.11a16,16,0,0,0-15.17,1.4L136.4,154.2a111.41,111.41,0,0,1-34.6-34.6l15.45-23.69a16,16,0,0,0,1.4-15.17L97.54,33.63A16,16,0,0,0,83,24H40A16,16,0,0,0,24,40,192.21,192.21,0,0,0,216,232a16,16,0,0,0,16-16V173A16,16,0,0,0,222.37,158.46ZM216,216A176.2,176.2,0,0,1,40,40H83l21.11,47.11L86.82,107a8,8,0,0,0-.7,8.23A127.38,127.38,0,0,0,140.77,169.88a8,8,0,0,0,8.23-.7l19.89-17.29L216,173Z"/></svg>
            <span>${candidate.phone}</span>
          </a>
        </td>
        <td style="color: var(--ink-secondary); font-size: var(--text-2xs); white-space: nowrap;">${candidate.appliedOn}</td>
        <td>
          <div class="applicant-status-select-wrap">
            <select class="applicant-status-select ${statusClass}" data-candidate-id="${candidate.id}" data-current-status="${statusVal}" aria-label="Recruitment status for ${candidate.name}">
              ${APPLICANT_STATUSES.map((s) => `
                <option value="${s.value}" ${s.value === statusVal ? 'selected' : ''}>${s.label}</option>
              `).join('')}
            </select>
          </div>
        </td>
        <td style="text-align: center; white-space: nowrap;">
          <div style="display: inline-flex; align-items: center; gap: 6px;">
            <a href="${profileUrl}" class="btn-resume-view" title="Open full candidate profile for ${candidate.name}">
              <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM74.08,197.5a64,64,0,0,1,107.84,0,87.83,87.83,0,0,1-107.84,0ZM96,120a32,32,0,1,1,32,32A32,32,0,0,1,96,120Zm97.76,66.41a79.66,79.66,0,0,0-36.06-28.75,48,48,0,1,0-59.4,0,79.66,79.66,0,0,0-36.06,28.75,88,88,0,1,1,131.52,0Z"/></svg>
              <span>View profile</span>
            </a>
            <a href="../../assets/resume.png" target="_blank" rel="noopener noreferrer" class="btn-resume-view" style="background: #F8FAFC; color: var(--ink-secondary); border-color: var(--border-card);" title="Open resume for ${candidate.name} in new tab">
              <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"/></svg>
              <span>Resume</span>
            </a>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

let pendingStatusChange = null;

function initStatusChangeHandlers(applyFiltersFn) {
  const table = document.getElementById('applicants-table');
  const modal = document.getElementById('status-confirm-modal');
  const closeBtn = document.getElementById('status-modal-close-btn');
  const cancelBtn = document.getElementById('confirm-status-cancel-btn');
  const submitBtn = document.getElementById('confirm-status-submit-btn');

  table?.addEventListener('change', (e) => {
    const select = e.target.closest('.applicant-status-select');
    if (!select) return;

    const candidateId = Number(select.dataset.candidateId);
    const oldStatus = select.dataset.currentStatus || 'Under Review';
    const newStatus = select.value;

    if (oldStatus === newStatus) return;

    const candidate = allCandidates.find((c) => c.id === candidateId) || currentJobCandidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    pendingStatusChange = {
      candidateId,
      candidateName: candidate.name,
      oldStatus,
      newStatus,
      selectElement: select
    };

    // Populate confirmation modal details
    document.getElementById('confirm-candidate-name').textContent = candidate.name;

    const oldMeta = getStatusMeta(oldStatus);
    const newMeta = getStatusMeta(newStatus);

    const oldBadgeClass = oldMeta.class.replace('status-', 'status-pill-');
    const newBadgeClass = newMeta.class.replace('status-', 'status-pill-');

    document.getElementById('confirm-old-status-badge').innerHTML = `
      <span class="status-modal-badge ${oldBadgeClass}">${oldStatus}</span>
    `;
    document.getElementById('confirm-new-status-badge').innerHTML = `
      <span class="status-modal-badge ${newBadgeClass}">${newStatus}</span>
    `;

    openModal('status-confirm-modal');
  });

  function cancelStatusChange() {
    if (pendingStatusChange && pendingStatusChange.selectElement) {
      pendingStatusChange.selectElement.value = pendingStatusChange.oldStatus;
    }
    pendingStatusChange = null;
    closeModal('status-confirm-modal');
  }

  function confirmStatusChange() {
    if (!pendingStatusChange) return;

    const { candidateId, candidateName, oldStatus, newStatus, selectElement } = pendingStatusChange;

    // Update in memory & storage
    const match = allCandidates.find((c) => c.id === candidateId);
    if (match) {
      match.status = newStatus;
      saveCollection(CANDIDATES_KEY, allCandidates);
    }
    const currentMatch = currentJobCandidates.find((c) => c.id === candidateId);
    if (currentMatch) {
      currentMatch.status = newStatus;
    }

    if (selectElement) {
      selectElement.dataset.currentStatus = newStatus;
      APPLICANT_STATUSES.forEach((s) => selectElement.classList.remove(s.class));
      selectElement.classList.add(getStatusClass(newStatus));
    }

    closeModal('status-confirm-modal');
    showToast(`Recruitment status for "${candidateName}" updated to "${newStatus}"!`, 'success');
    pendingStatusChange = null;

    if (typeof applyFiltersFn === 'function') {
      applyFiltersFn();
    }
  }

  closeBtn?.addEventListener('click', cancelStatusChange);
  cancelBtn?.addEventListener('click', cancelStatusChange);
  submitBtn?.addEventListener('click', confirmStatusChange);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      cancelStatusChange();
    }
  });
}

function exportApplicantsCSV(items) {
  if (!items.length) {
    showToast('No applicants to export.', 'error');
    return;
  }

  const headers = ['S.No.', 'Candidate Name', 'Email ID', 'Phone No.', 'Applied On', 'Status', 'Resume File'];
  const rows = items.map((c, idx) => [
    idx + 1,
    `"${c.name}"`,
    `"${c.email}"`,
    `"${c.phone}"`,
    `"${c.appliedOn}"`,
    `"${c.status || 'Under Review'}"`,
    `"${c.resumeFileName || 'resume.pdf'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `applicants-${currentJob ? currentJob.title.toLowerCase().replace(/\s+/g, '-') : 'job'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Applicants list exported to CSV!', 'success');
}

document.addEventListener('DOMContentLoaded', () => {
  initJobContext();
  initApplicantTabs();
  renderStats(currentJobCandidates);
  renderTable(currentJobCandidates);

  const searchInput = document.getElementById('applicant-search');
  const statusFilter = document.getElementById('applicant-status-filter');
  const dateFilter = document.getElementById('applicant-date-filter');

  function getFilteredCandidates() {
    const q = (searchInput?.value || '').toLowerCase().trim();
    const statusVal = statusFilter?.value || 'all';
    const days = dateFilter?.value || 'all';

    return currentJobCandidates.filter((c) => {
      const matchSearch = !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.toLowerCase().includes(q);

      const matchStatus = statusVal === 'all' || c.status === statusVal;

      let matchDate = true;
      if (days !== 'all' && c.appliedISO) {
        const itemDate = new Date(c.appliedISO);
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - Number(days));
        matchDate = itemDate >= cutoff;
      }

      return matchSearch && matchStatus && matchDate;
    });
  }

  function applyFilters() {
    const filtered = getFilteredCandidates();
    renderStats(filtered);
    renderTable(filtered);
  }

  initStatusChangeHandlers(applyFilters);

  searchInput?.addEventListener('input', applyFilters);
  statusFilter?.addEventListener('change', applyFilters);
  dateFilter?.addEventListener('change', applyFilters);

  // Export CSV
  document.getElementById('export-applicants-csv-btn')?.addEventListener('click', () => {
    const filtered = getFilteredCandidates();
    exportApplicantsCSV(filtered);
  });
});
