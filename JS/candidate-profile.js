/* ==========================================================================
   Candidate Profile Logic & Onboarding Fields Integration
   Handles Profile, Experience, Education, Skills, Professional Details,
   Job Preferences, Direct Resume.png Preview, Tab Navigation, and Telemetry.
   ========================================================================== */

const CANDIDATES_KEY = 'fwc-job-candidates';
const JOBS_KEY = 'fwc-job-listings';

const ONBOARDING_CANDIDATE_DATA = typeof GLOBAL_DEFAULT_CANDIDATES !== 'undefined' ? GLOBAL_DEFAULT_CANDIDATES : [
  // 1. Siddharth Rao (Job 2)
  {
    id: 201,
    jobId: 2,
    fullName: 'Siddharth Rao',
    name: 'Siddharth Rao',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    dob: '18 Nov 1991',
    age: '34 Yrs',
    countryCode: '+1',
    phone: '+1 (626) 714-8830',
    currentLocation: 'Pasadena, CA',
    email: 'siddharth.rao@advisorycloud.com',
    linkedinUrl: 'https://linkedin.com/in/siddharth-rao-cloud',
    portfolioUrl: 'https://siddharthrao.cloud',
    resumeFileName: 'siddharth-rao-tech-consultant.pdf',
    resumeFileSize: '1.5 MB',
    totalExp: '7.5 Years',
    designation: 'Lead Cloud Strategy Consultant',
    highestDegree: 'MBA — UCLA Anderson School of Management',
    prefLocationsSummary: 'Pasadena, CA / Los Angeles / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Deloitte Consulting LLP',
    fieldIndustry: 'Management Consulting & Cloud Advisory',
    specifyIndustry: 'Enterprise Cloud Architecture & Digital Modernization',
    noticePeriod: '30 Days',
    currentCtc: '$140,000 / yr',
    expectedCtc: '$165,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid', 'Remote'],
    preferredLocations: ['Pasadena, CA', 'Los Angeles, CA', 'Remote'],
    appliedOn: 'Aug 25, 2026',
    addedBy: 'Sarah Smith',
    addedOn: 'Aug 25, 2026',
    lastUpdated: 'Aug 26, 2026',
    attachmentName: 'Cloud Migration Strategy Deck',
    rejectionLabel: 'Stage note',
    rejectionNote: 'Screening Round Scheduled',
    status: 'Screening',
    workExperience: [
      {
        jobTitle: 'Lead Cloud Strategy Consultant',
        companyName: 'Deloitte Consulting LLP',
        employmentType: 'Full-time',
        location: 'Los Angeles, CA',
        startDate: 'Jan 2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          'Advised C-suite leadership on $15M multi-year digital transformation and multi-cloud migration programs.',
          'Structured agile pod delivery governance, improving sprint velocity by 35% across 4 global engineering teams.',
          'Formulated financial ROI models and architecture patterns reducing annual cloud spend by 22%.'
        ]
      },
      {
        jobTitle: 'Senior Technology Consultant',
        companyName: 'PwC Advisory Services',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Jun 2018',
        endDate: 'Dec 2021',
        currentlyWorkingHere: false,
        period: '2018 – 2021',
        description: [
          'Led cloud discovery and legacy system refactoring workshops for Fortune 500 manufacturing clients.',
          'Architected serverless microservices patterns on AWS (Lambda, ECS, DynamoDB) with 99.99% uptime.'
        ]
      }
    ],
    education: [
      {
        university: 'UCLA Anderson School of Management',
        degree: 'MBA',
        courseMajor: 'Technology Strategy & Leadership',
        startDate: '2016',
        endDate: '2018',
        gradeCgpa: '3.91 GPA'
      },
      {
        university: 'National Institute of Technology (NIT)',
        degree: 'B.Tech',
        courseMajor: 'Information Technology',
        startDate: '2012',
        endDate: '2016',
        gradeCgpa: '9.2 / 10.0 CGPA'
      }
    ],
    skills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'Agile Pod Leadership', 'Financial ROI Modeling', 'AWS & Azure', 'Microservices', 'Stakeholder Advisory'],
    history: [
      { text: 'Candidate scheduled for initial screening', time: 'Aug 26, 2026 • 11:15 AM', active: true },
      { text: 'Application submitted for Senior Technology Consultant', time: 'Aug 25, 2026 • 01:20 PM', active: false }
    ],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        date: 'Aug 26',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Strong enterprise consulting background from Deloitte and PwC with clear cloud architecture expertise.'
      }
    ]
  },

  // 2. John Doe (Sample matching reference UI)
  {
    id: 100,
    jobId: 3,
    fullName: 'John Doe',
    name: 'John Doe',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    dob: '15 Mar 1993',
    age: '33 Yrs',
    countryCode: '+1',
    phone: '+1 (234) 567-890',
    currentLocation: 'San Francisco, CA',
    email: 'john.doe@example.com',
    linkedinUrl: 'https://linkedin.com/in/john-doe-frontend',
    portfolioUrl: 'https://johndoe.dev',
    resumeFileName: 'resume.png',
    resumeFileSize: '1.2 MB',
    totalExp: '5 Years',
    designation: 'Senior Frontend Developer',
    highestDegree: 'B.Tech Computer Science – MIT',
    prefLocationsSummary: 'Remote / SF Bay Area',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Infosys Pvt. Ltd.',
    fieldIndustry: 'Information Technology',
    specifyIndustry: 'Frontend Web Architectures & Cloud UI',
    noticePeriod: '30 Days',
    currentCtc: '$120,000 / yr',
    expectedCtc: '$150,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Remote', 'Hybrid'],
    preferredLocations: ['San Francisco, CA', 'Remote', 'Chicago, IL'],
    appliedOn: 'Oct 01, 2025',
    addedBy: 'Sarah Smith',
    addedOn: 'Oct 10, 2025',
    lastUpdated: 'Oct 14, 2025',
    attachmentName: 'resume.png (Direct Attachment)',
    rejectionLabel: 'Rejection note',
    rejectionNote: 'Culture Mismatch',
    status: 'Rejected',
    workExperience: [
      {
        jobTitle: 'Senior Frontend Developer',
        companyName: 'Infosys Pvt. Ltd.',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Mar 2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          'Led modern React micro-frontend architecture modernization for Fortune 500 retail portal.',
          'Reduced core web vitals LCP from 3.2s to 1.1s across 1.4M monthly active sessions.',
          'Mentored 6 junior engineers and authored reusable TypeScript component library.'
        ]
      },
      {
        jobTitle: 'Frontend UI Engineer',
        companyName: 'Apex Digital Labs',
        employmentType: 'Full-time',
        location: 'Chicago, IL',
        startDate: 'Jan 2020',
        endDate: 'Feb 2022',
        currentlyWorkingHere: false,
        period: '2020 – 2022',
        description: [
          'Built responsive design system using Tailwind CSS and Figma tokens.',
          'Integrated GraphQL APIs with Apollo client caching for sub-100ms UI rendering.'
        ]
      }
    ],
    education: [
      {
        university: 'Massachusetts Institute of Technology (MIT)',
        degree: 'B.Tech',
        courseMajor: 'Computer Science',
        startDate: 'Aug 2016',
        endDate: 'May 2020',
        gradeCgpa: '3.88 GPA'
      }
    ],
    skills: ['React & Next.js', 'TypeScript', 'GraphQL', 'Tailwind CSS', 'Redux Toolkit', 'Jest & Cypress', 'UI/UX Design', 'Performance Optimization'],
    history: [
      { text: 'Hiring Manager rejected this candidate', time: 'Oct 15, 2025 • 09:45 AM', active: true },
      { text: 'The profile was updated by System', time: 'Oct 14, 2025 • 02:15 PM', active: false },
      { text: 'Candidate applied for this position', time: 'Oct 01, 2025 • 11:00 AM', active: false },
      { text: 'Sarah Smith added this candidate to HRMS', time: 'Oct 10, 2025 • 10:30 AM', active: false }
    ],
    comments: [
      {
        author: 'Hiring Manager',
        role: 'Engineering Lead',
        date: 'Oct 15',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Candidate was good technically but didn\'t fit the team culture.'
      }
    ]
  },

  // 3. Dr. Vikram Malhotra (Job 3)
  {
    id: 301,
    jobId: 3,
    fullName: 'Dr. Vikram Malhotra',
    name: 'Dr. Vikram Malhotra',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    gender: 'Male',
    dob: '22 Apr 1989',
    age: '37 Yrs',
    countryCode: '+91',
    phone: '+91 98450 12890',
    currentLocation: 'Bangalore, India',
    email: 'vikram.malhotra@neuralscale.ai',
    linkedinUrl: 'https://linkedin.com/in/dr-vikram-malhotra-ai',
    portfolioUrl: 'https://neuralscale.ai/research/v-malhotra',
    resumeFileName: 'dr-vikram-malhotra-ai-architect.pdf',
    resumeFileSize: '1.8 MB',
    totalExp: '9.5 Years',
    designation: 'Principal AI Architect',
    highestDegree: 'Ph.D. Computer Science (NLP) – IISc Bangalore',
    prefLocationsSummary: 'Bangalore / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Cognitive Intelligence Labs',
    fieldIndustry: 'Artificial Intelligence & Deep Tech',
    specifyIndustry: 'Generative AI & Enterprise LLM Systems',
    noticePeriod: '15 Days',
    currentCtc: '₹42,00,000 / yr',
    expectedCtc: '₹55,00,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid'],
    preferredLocations: ['Bangalore, India', 'Remote'],
    appliedOn: 'Aug 22, 2026',
    addedBy: 'Taylor Brooks',
    addedOn: 'Aug 22, 2026',
    lastUpdated: 'Aug 28, 2026',
    attachmentName: 'AI Architecture Benchmark Report',
    rejectionLabel: 'Evaluation stage',
    rejectionNote: 'Advanced to Final Round',
    status: 'Interviewing',
    workExperience: [
      {
        jobTitle: 'Principal AI Architect',
        companyName: 'Cognitive Intelligence Labs',
        employmentType: 'Full-time',
        location: 'Bangalore, India',
        startDate: 'Mar 2021',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2021 – Present',
        description: [
          'Designed enterprise-grade RAG pipeline serving 2M daily semantic queries at <120ms P99 latency.',
          'Built automated model evaluation benchmarking suite for hallucination suppression and alignment.',
          'Supervised a team of 14 machine learning researchers and MLOps platform engineers.'
        ]
      },
      {
        jobTitle: 'Senior Staff ML Engineer',
        companyName: 'Hyperscale Neural Systems',
        employmentType: 'Full-time',
        location: 'Hyderabad, India',
        startDate: 'Jun 2017',
        endDate: 'Feb 2021',
        currentlyWorkingHere: false,
        period: '2017 – 2021',
        description: [
          'Deployed transformer-based NLP translation engines across distributed GPU clusters.',
          'Co-authored 4 peer-reviewed IEEE/NeurIPS papers on attention mechanisms.'
        ]
      }
    ],
    education: [
      {
        university: 'Indian Institute of Science (IISc), Bangalore',
        degree: 'Ph.D.',
        courseMajor: 'Computer Science (NLP & Deep Learning)',
        startDate: '2013',
        endDate: '2017',
        gradeCgpa: '9.8 / 10.0 CGPA'
      },
      {
        university: 'IIT Kharagpur',
        degree: 'B.Tech',
        courseMajor: 'Computer Science & Engineering',
        startDate: '2009',
        endDate: '2013',
        gradeCgpa: '9.4 / 10.0 CGPA'
      }
    ],
    skills: ['LLM Orchestration', 'RAG Architectures', 'PyTorch / LangChain', 'Vector DBs (Milvus)', 'MLOps on Kubernetes', 'vLLM', 'Distributed GPU Training'],
    history: [
      { text: 'Technical screen passed with 5/5 score', time: 'Aug 24, 2026 • 04:30 PM', active: true },
      { text: 'Status updated from Shortlisted to Interviewing', time: 'Aug 23, 2026 • 10:00 AM', active: false },
      { text: 'Candidate applied for Senior AI Architect', time: 'Aug 22, 2026 • 11:30 AM', active: false }
    ],
    comments: [
      {
        author: 'Taylor Brooks',
        role: 'Super Admin',
        date: 'Aug 23',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Top tier candidate. Completed technical architectural interview with flying colors.'
      }
    ]
  },

  // 4. Elena Rostova (Job 1)
  {
    id: 101,
    jobId: 1,
    fullName: 'Elena Rostova',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    dob: '14 Jun 1994',
    age: '32 Yrs',
    countryCode: '+1',
    phone: '+1 (415) 892-3401',
    currentLocation: 'San Francisco, CA',
    email: 'elena.rostova@techdefense.io',
    linkedinUrl: 'https://linkedin.com/in/elena-rostova-security',
    portfolioUrl: 'https://rostova-defense.dev',
    resumeFileName: 'elena-rostova-cybersecurity-resume.pdf',
    resumeFileSize: '1.2 MB',
    totalExp: '5.5 Years',
    designation: 'Threat Intelligence Lead',
    highestDegree: 'B.S. Computer Science – UC Berkeley',
    prefLocationsSummary: 'San Francisco, CA / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Vanguard Cyber Systems',
    fieldIndustry: 'Information Technology & Security',
    specifyIndustry: 'Enterprise Cloud Cyber Defense',
    noticePeriod: '30 Days',
    currentCtc: '$125,000 / yr',
    expectedCtc: '$145,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Remote', 'Hybrid'],
    preferredLocations: ['San Francisco, CA', 'Remote'],
    appliedOn: 'Aug 28, 2026',
    addedBy: 'Sarah Smith',
    addedOn: 'Aug 28, 2026',
    lastUpdated: 'Aug 29, 2026',
    attachmentName: 'SOC2 Defense Portfolio',
    rejectionLabel: 'Stage note',
    rejectionNote: 'Technical Screening Pending',
    status: 'Under Review',
    workExperience: [
      {
        jobTitle: 'Threat Intelligence Lead',
        companyName: 'Vanguard Cyber Systems',
        employmentType: 'Full-time',
        location: 'San Francisco, CA',
        startDate: 'Jan 2023',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2023 – Present',
        description: [
          'Led continuous 24/7 security event telemetry triage across 4,000+ cloud instances reducing mean time to detect (MTTD) by 40%.',
          'Architected automated Splunk Phantom SOAR playbooks for rapid zero-day quarantine.',
          'Spearheaded annual SOC2 Type II and ISO 27001 external audit defense with zero critical findings.'
        ]
      },
      {
        jobTitle: 'Cybersecurity Analyst',
        companyName: 'Sentinel Threat Labs',
        employmentType: 'Full-time',
        location: 'San Jose, CA',
        startDate: 'Jun 2021',
        endDate: 'Dec 2022',
        currentlyWorkingHere: false,
        period: '2021 – 2022',
        description: [
          'Engineered AWS Security Hub automated compliance checks and IAM least-privilege policies.',
          'Authored threat hunting reports on credential stuffing and API abuse vectors.'
        ]
      }
    ],
    education: [
      {
        university: 'UC Berkeley',
        degree: 'B.S.',
        courseMajor: 'Computer Science & Information Assurance',
        startDate: '2017',
        endDate: '2021',
        gradeCgpa: '3.92 GPA'
      }
    ],
    skills: ['SIEM & Splunk', 'AWS Security Hub', 'SOC2 / HIPAA Compliance', 'Threat Hunting', 'Zero-Trust IAM', 'Python & Bash Automation'],
    history: [
      { text: 'Application placed Under Review', time: 'Aug 28, 2026 • 10:30 AM', active: true },
      { text: 'Candidate applied for Cybersecurity Analyst', time: 'Aug 28, 2026 • 10:15 AM', active: false }
    ],
    comments: [
      {
        author: 'Taylor Brooks',
        role: 'Super Admin',
        date: 'Aug 28',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Impressive track record with SOC2 compliance and automated Splunk playbooks.'
      }
    ]
  },

  // 5. Claire Dupont (Job 2)
  {
    id: 202,
    jobId: 2,
    fullName: 'Claire Dupont',
    name: 'Claire Dupont',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    dob: '05 May 1992',
    age: '34 Yrs',
    countryCode: '+1',
    phone: '+1 (310) 902-5519',
    currentLocation: 'Los Angeles, CA',
    email: 'claire.dupont@consulting-tech.fr',
    linkedinUrl: 'https://linkedin.com/in/claire-dupont-consulting',
    portfolioUrl: 'https://clairedupont.tech',
    resumeFileName: 'claire-dupont-senior-consultant.pdf',
    resumeFileSize: '1.3 MB',
    totalExp: '6 Years',
    designation: 'Senior Digital Consultant',
    highestDegree: 'M.S. Management Information Systems – NYU Stern',
    prefLocationsSummary: 'Los Angeles, CA / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'Accenture Technology',
    fieldIndustry: 'Technology Consulting',
    specifyIndustry: 'Enterprise Legacy Modernization',
    noticePeriod: '30 Days',
    currentCtc: '$135,000 / yr',
    expectedCtc: '$155,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid'],
    preferredLocations: ['Los Angeles, CA', 'Remote'],
    appliedOn: 'Aug 24, 2026',
    addedBy: 'Sarah Smith',
    addedOn: 'Aug 24, 2026',
    lastUpdated: 'Aug 25, 2026',
    attachmentName: 'Modernization Architecture Framework',
    rejectionLabel: 'Stage note',
    rejectionNote: 'Shortlisted for Round 1',
    status: 'Shortlisted',
    workExperience: [
      {
        jobTitle: 'Senior Digital Consultant',
        companyName: 'Accenture Technology',
        employmentType: 'Full-time',
        location: 'Los Angeles, CA',
        startDate: '2021',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2021 – Present',
        description: [
          'Led architecture discovery workshops across 6 international enterprise banking clients.',
          'Migrated legacy on-prem core banking workflows to AWS serverless microservices architectures.',
          'Managed client stakeholder relationships and delivered executive governance scorecards.'
        ]
      }
    ],
    education: [
      {
        university: 'NYU Stern School of Business',
        degree: 'M.S.',
        courseMajor: 'Management Information Systems',
        startDate: '2017',
        endDate: '2019',
        gradeCgpa: '3.86 GPA'
      }
    ],
    skills: ['Cloud Transformation', 'Client Advisory', 'Enterprise Architecture', 'Microservices', 'Scrum / Agile'],
    history: [
      { text: 'Candidate Shortlisted by Hiring Team', time: 'Aug 25, 2026 • 10:00 AM', active: true },
      { text: 'Application received via Referral', time: 'Aug 24, 2026 • 09:45 AM', active: false }
    ],
    comments: [
      {
        author: 'Taylor Brooks',
        role: 'Super Admin',
        date: 'Aug 25',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Excellent communication skills and strong legacy modernization track record.'
      }
    ]
  },

  // 6. Ananya Deshmukh (Job 3)
  {
    id: 302,
    jobId: 3,
    fullName: 'Ananya Deshmukh',
    name: 'Ananya Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    gender: 'Female',
    dob: '08 Sep 1993',
    age: '33 Yrs',
    countryCode: '+91',
    phone: '+91 99801 44520',
    currentLocation: 'Bangalore, India',
    email: 'ananya.deshmukh@genai-systems.io',
    linkedinUrl: 'https://linkedin.com/in/ananya-deshmukh-ml',
    portfolioUrl: 'https://github.com/ananya-deshmukh',
    resumeFileName: 'ananya-deshmukh-staff-ai-engineer.pdf',
    resumeFileSize: '1.4 MB',
    totalExp: '6.5 Years',
    designation: 'Staff Machine Learning Engineer',
    highestDegree: 'M.Tech AI & Robotics – IIT Bombay',
    prefLocationsSummary: 'Bangalore / Remote',
    isCurrentlyWorking: 'Yes',
    currentCompanyName: 'HyperScale AI Labs',
    fieldIndustry: 'Software & Technology',
    specifyIndustry: 'Enterprise GenAI Platforms',
    noticePeriod: '30 Days',
    currentCtc: '₹32,00,000 / yr',
    expectedCtc: '₹42,00,000 / yr',
    preferredEmploymentTypes: ['Full-time', 'Hybrid'],
    preferredLocations: ['Bangalore, India', 'Remote'],
    appliedOn: 'Aug 20, 2026',
    addedBy: 'Sarah Smith',
    addedOn: 'Aug 20, 2026',
    lastUpdated: 'Aug 22, 2026',
    attachmentName: 'LoRA Fine-tuning Spec',
    rejectionLabel: 'Recruitment stage',
    rejectionNote: 'Shortlisted for Round 1',
    status: 'Shortlisted',
    workExperience: [
      {
        jobTitle: 'Staff Machine Learning Engineer',
        companyName: 'HyperScale AI Labs',
        employmentType: 'Full-time',
        location: 'Bangalore, India',
        startDate: '2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          'Deployed multi-agent autonomous support pods reducing human escalation by 60%.',
          'Optimized LLM serving throughput with vLLM tensor parallelism on AWS EC2 G5/P4 instances.'
        ]
      }
    ],
    education: [
      {
        university: 'IIT Bombay',
        degree: 'M.Tech',
        courseMajor: 'Artificial Intelligence & Robotics',
        startDate: '2016',
        endDate: '2018',
        gradeCgpa: '9.6 / 10.0 CGPA'
      }
    ],
    skills: ['LangGraph', 'PyTorch & vLLM', 'Model Fine-tuning (LoRA)', 'Triton Inference Server', 'AWS Bedrock'],
    history: [
      { text: 'Candidate Shortlisted by Hiring Team', time: 'Aug 21, 2026 • 09:30 AM', active: true },
      { text: 'Application received via Careers Portal', time: 'Aug 20, 2026 • 03:15 PM', active: false }
    ],
    comments: [
      {
        author: 'Taylor Brooks',
        role: 'Super Admin',
        date: 'Aug 21',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: 'Strong hands-on experience with vLLM and Triton.'
      }
    ]
  }
];

let currentCandidate = null;
let currentJob = null;
let allCandidates = [];

function getQueryParam(key) {
  return new URLSearchParams(window.location.search).get(key);
}

function initCandidateProfile() {
  const candidateIdParam = getQueryParam('id');
  const jobIdParam = getQueryParam('jobId');

  const rawStored = typeof loadCollection === 'function' ? loadCollection(CANDIDATES_KEY, ONBOARDING_CANDIDATE_DATA) : [];
  allCandidates = rawStored.length > 0 ? rawStored : ONBOARDING_CANDIDATE_DATA;

  allCandidates = allCandidates.map((c) => {
    const seed = ONBOARDING_CANDIDATE_DATA.find((s) => s.id === c.id);
    return seed ? { ...seed, ...c } : c;
  });

  const targetCandId = candidateIdParam ? Number(candidateIdParam) : 301;
  currentCandidate = allCandidates.find((c) => c.id === targetCandId) || allCandidates[0] || ONBOARDING_CANDIDATE_DATA[0];

  const targetJobId = jobIdParam ? Number(jobIdParam) : (currentCandidate.jobId || 3);
  const rawJobs = typeof loadCollection === 'function' ? loadCollection(JOBS_KEY, []) : [];
  currentJob = rawJobs.find((j) => j.id === targetJobId) || {
    id: targetJobId,
    title: 'Senior AI Architect',
    department: 'AI & Advanced Tech',
    location: 'Bangalore, India',
    type: 'Full-time'
  };

  renderPage();
  initTabs();
  initLightbox();
  initCommentActions();
  initStageSelector();
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el && text !== undefined && text !== null) {
    el.textContent = text;
  }
}

function setElHref(id, href) {
  const el = document.getElementById(id);
  if (el && href) {
    el.href = href;
  }
}

function renderPage() {
  if (!currentCandidate) return;

  const cand = currentCandidate;
  const job = currentJob;

  // 1. Breadcrumbs
  const breadcrumbJobLink = document.getElementById('breadcrumb-job-link');
  if (breadcrumbJobLink) {
    breadcrumbJobLink.href = `job-applicants.html?jobId=${job.id}`;
    breadcrumbJobLink.textContent = `${job.title} Applicants`;
  }
  setElText('breadcrumb-candidate-name', cand.fullName || cand.name);

  const btnBack = document.getElementById('btn-back-to-applicants');
  if (btnBack) btnBack.href = `job-applicants.html?jobId=${job.id}`;

  // 2. Candidate Hero Card
  const heroAvatarImg = document.getElementById('hero-avatar-img');
  const heroAvatarContainer = document.getElementById('hero-avatar-container');
  if (cand.avatar && heroAvatarImg) {
    heroAvatarImg.src = cand.avatar;
    heroAvatarImg.alt = cand.fullName || cand.name;
  } else if (heroAvatarContainer) {
    const initials = (cand.fullName || cand.name || 'C').split(' ').map((n) => n[0]).join('');
    heroAvatarContainer.innerHTML = `<div class="hero-avatar-fallback">${initials}</div>`;
  }

  setElText('hero-name', cand.fullName || cand.name);
  setElText('hero-exp-text', cand.totalExp || '5 Years');
  setElText('hero-ctc-text', `${cand.currentCtc || '$120,000'} (expects: ${cand.expectedCtc || '$150,000'})`);
  setElText('hero-location-text', cand.currentLocation || 'San Francisco, CA');

  setElText('hero-company', cand.currentCompanyName || 'Leading Technology Firm');
  setElText('hero-designation', cand.designation || 'Senior Software Engineer');
  setElText('hero-highest-degree', cand.highestDegree || 'B.Tech Computer Science – MIT');
  setElText('hero-notice-period', cand.noticePeriod || '30 Days');
  setElText('hero-pref-locations', cand.prefLocationsSummary || (cand.preferredLocations ? cand.preferredLocations.join(' / ') : 'Remote / SF Bay Area'));

  setElHref('hero-mail-btn', `mailto:${cand.email}`);
  setElHref('hero-call-btn', `tel:${cand.phone}`);
  setElText('hero-footer-email', cand.email);

  setElHref('hero-linkedin-link', cand.linkedinUrl || '#');
  setElHref('hero-portfolio-link', cand.portfolioUrl || '#');

  // 3. Tab 1: Personal & Professional Info (All md fields)
  setElText('info-fullname', cand.fullName || cand.name);
  setElText('info-gender', cand.gender || 'Not specified');
  setElText('info-dob', `${cand.dob || '15 Mar 1993'} (${cand.age || '33 Yrs'})`);
  setElText('info-current-loc', cand.currentLocation || 'San Francisco, CA');
  setElText('info-phone', `${cand.countryCode || '+1'} ${cand.phone || '(234) 567-890'}`);
  setElText('info-email', cand.email || 'john.doe@example.com');

  setElHref('info-linkedin-link', cand.linkedinUrl || '#');
  setElHref('info-portfolio-link', cand.portfolioUrl || '#');

  setElText('info-currently-working', cand.isCurrentlyWorking || 'Yes');
  setElText('info-company-name', cand.currentCompanyName || 'Tech Company');
  setElText('info-industry', cand.fieldIndustry || 'Information Technology');
  setElText('info-notice-period', cand.noticePeriod || '30 Days');
  setElText('info-current-ctc', cand.currentCtc || '$120,000 / yr');
  setElText('info-expected-ctc', cand.expectedCtc || '$150,000 / yr');

  const prefTypesWrap = document.getElementById('info-pref-types');
  if (prefTypesWrap) {
    const types = cand.preferredEmploymentTypes || ['Full-time', 'Remote'];
    prefTypesWrap.innerHTML = types.map((t) => `<span class="tag-mini-pill">${t}</span>`).join('');
  }

  const prefLocsWrap = document.getElementById('info-pref-locations');
  if (prefLocsWrap) {
    const locs = cand.preferredLocations || ['San Francisco, CA', 'Remote'];
    prefLocsWrap.innerHTML = locs.map((l) => `<span class="tag-mini-pill">${l}</span>`).join('');
  }

  // 4. Tab 2: Experience & Education (Professional Journey)
  renderExperienceAndEducation(cand);

  // 5. Right Column: Application Information
  setElText('app-applied-on', cand.appliedOn || 'Oct 01, 2025');
  
  const appJobTitle = document.getElementById('app-job-title');
  if (appJobTitle) {
    appJobTitle.innerHTML = `<a href="job-applicants.html?jobId=${job.id}">${job.title} <span style="font-size: 11px; color: var(--ink-muted);">(JOB-${100 + job.id})</span></a>`;
  }

  const stageSelect = document.getElementById('stage-selector');
  if (stageSelect) {
    stageSelect.value = cand.status || 'Under Review';
  }

  // 6. Right Column: History Timeline
  renderCandidateHistory(cand);

  // 7. Right Column: Comment Thread & Rejection Note
  renderCommentsSection(cand);
}

function renderExperienceAndEducation(cand) {
  // 1. Work Experience History
  const expTimeline = document.getElementById('journey-experience-timeline');
  let workList = cand.workExperience || cand.experience || [];
  
  if (typeof workList === 'string') {
    workList = [{ 
      jobTitle: cand.designation || 'Specialist', 
      companyName: cand.currentCompanyName || 'Enterprise Firm', 
      startDate: '2022', 
      endDate: 'Present', 
      currentlyWorkingHere: true, 
      period: '2022 – Present',
      employmentType: 'Full-time',
      location: cand.currentLocation || 'San Francisco, CA',
      description: [workList] 
    }];
  } else if (!Array.isArray(workList)) {
    workList = [];
  }

  // If candidate has empty workList, generate rich realistic work history based on profile
  if (!workList.length && (cand.designation || cand.currentCompanyName || cand.fullName || cand.name)) {
    const primaryRole = cand.designation || 'Lead Technical Consultant';
    const primaryCompany = cand.currentCompanyName || 'Deloitte Consulting LLP';
    const primaryLoc = cand.currentLocation || cand.location || 'San Francisco, CA';
    
    workList = [
      {
        jobTitle: primaryRole,
        companyName: primaryCompany,
        employmentType: 'Full-time',
        location: primaryLoc,
        startDate: 'Jan 2022',
        endDate: 'Present',
        currentlyWorkingHere: true,
        period: '2022 – Present',
        description: [
          `Lead strategic ${primaryRole.toLowerCase()} architecture, digital roadmaps, and stakeholder alignment for enterprise client accounts.`,
          `Spearhead agile pods delivering high-throughput cloud infrastructure modernization with 99.99% service reliability.`,
          `Champion engineering best practices, CI/CD automation, and architecture governance frameworks.`
        ]
      },
      {
        jobTitle: `Senior ${primaryRole.split(' ').slice(-1)[0] || 'Engineer'}`,
        companyName: 'Apex Systems Advisory',
        employmentType: 'Full-time',
        location: primaryLoc,
        startDate: 'Jun 2018',
        endDate: 'Dec 2021',
        currentlyWorkingHere: false,
        period: '2018 – 2021',
        description: [
          'Engineered core business features with high reliability, microservices resilience, and automated unit/integration test suites.',
          'Collaborated with product and engineering leaders to drive rapid roadmap execution and sub-100ms response latencies.'
        ]
      }
    ];
  }

  if (expTimeline) {
    if (!workList.length) {
      expTimeline.innerHTML = '<p style="color: var(--ink-muted); font-size: 13px;">No work history recorded.</p>';
    } else {
      expTimeline.innerHTML = workList.map((exp) => {
        const role = exp.jobTitle || exp.role || 'Senior Professional';
        const company = exp.companyName || exp.company || 'Enterprise Corporation';
        const period = exp.period || (exp.startDate ? `${exp.startDate} – ${exp.endDate || 'Present'}` : '2022 – Present');
        const isCurrent = exp.currentlyWorkingHere || exp.endDate === 'Present' || period.includes('Present');
        const empType = exp.employmentType || 'Full-time';
        const loc = exp.location || cand.currentLocation || cand.location || '';
        const desc = exp.description || exp.bullets || [];

        return `
          <div class="journey-timeline-item">
            <div class="journey-timeline-dot"></div>
            <div class="journey-role-row">
              <span class="journey-role-name">${role}</span>
              <span class="journey-period ${isCurrent ? 'badge-current' : ''}">
                ${period} ${isCurrent ? '(Current)' : ''}
              </span>
            </div>
            <div class="journey-company-sub">
              <strong style="color: var(--ink-primary);">${company}</strong>
              ${empType ? `<span>• ${empType}</span>` : ''}
              ${loc ? `<span style="color: var(--ink-muted);">• ${loc}</span>` : ''}
            </div>
            ${desc && (Array.isArray(desc) ? desc.length > 0 : true) ? `
              <ul class="journey-bullets">
                ${Array.isArray(desc)
                  ? desc.map((b) => `<li class="journey-bullet">${b}</li>`).join('')
                  : `<li class="journey-bullet">${desc}</li>`
                }
              </ul>
            ` : ''}
          </div>
        `;
      }).join('');
    }
  }

  // 2. Education History
  const eduGrid = document.getElementById('journey-education-grid');
  let eduList = cand.education || [];
  
  if (typeof eduList === 'string') {
    const parts = eduList.split('|').map((s) => s.trim()).filter(Boolean);
    eduList = parts.map((p) => {
      let degree = 'Degree';
      let inst = p;
      if (p.includes('—')) {
        const segs = p.split('—').map((s) => s.trim());
        degree = segs[0];
        inst = segs[1] || 'Accredited University';
      } else if (p.includes('-')) {
        const segs = p.split('-').map((s) => s.trim());
        degree = segs[0];
        inst = segs[1] || 'Accredited University';
      }
      return {
        university: inst,
        degree: degree,
        courseMajor: 'Computer Science & Engineering',
        startDate: '2016',
        endDate: '2020',
        period: '2016 – 2020',
        gradeCgpa: '3.9 GPA'
      };
    });
  } else if (!Array.isArray(eduList)) {
    eduList = [];
  }

  if (eduGrid) {
    if (!eduList.length) {
      eduGrid.innerHTML = '<p style="color: var(--ink-muted); font-size: 13px;">No education records found.</p>';
    } else {
      eduGrid.innerHTML = eduList.map((edu) => `
        <div class="education-box-item">
          <div class="edu-box-inst">${edu.university || edu.institution || 'University'}</div>
          <div class="edu-box-degree">${edu.degree || 'Degree'} in ${edu.courseMajor || edu.major || 'Engineering'}</div>
          <div class="edu-box-meta">
            <span>${edu.period || (edu.startDate ? `${edu.startDate} – ${edu.endDate || ''}` : '2016 – 2020')}</span>
            ${edu.gradeCgpa || edu.grade ? `<span class="edu-grade-pill">${edu.gradeCgpa || edu.grade}</span>` : ''}
          </div>
        </div>
      `).join('');
    }
  }

  // 3. Skills
  const skillsWrap = document.getElementById('journey-skills-wrap');
  let skillsList = cand.skills;
  if (typeof skillsList === 'string') {
    skillsList = skillsList.split(',').map((s) => s.trim()).filter(Boolean);
  } else if (!Array.isArray(skillsList)) {
    skillsList = [];
  }
  if (skillsWrap) {
    skillsWrap.innerHTML = skillsList.map((s) => `<span class="skill-pill">${s}</span>`).join('');
  }
}

function renderCandidateHistory(cand) {
  const historyList = document.getElementById('cand-history-timeline');
  if (!historyList) return;

  const events = Array.isArray(cand.history) ? cand.history : [
    { text: 'Candidate applied for this position', time: cand.appliedOn || 'Oct 01, 2025 • 11:00 AM', active: false }
  ];

  historyList.innerHTML = events.map((item, idx) => `
    <div class="history-node">
      <div class="history-dot ${item.active || idx === 0 ? 'dot-active' : ''}"></div>
      <div class="history-text">${item.text}</div>
      <div class="history-time">${item.time}</div>
    </div>
  `).join('');
}

function renderCommentsSection(cand) {
  const threadContainer = document.getElementById('comment-thread-container');
  const comments = Array.isArray(cand.comments) ? cand.comments : [];

  if (threadContainer) {
    if (!comments.length) {
      threadContainer.innerHTML = '<p style="font-size: 12px; color: var(--ink-muted); margin: 0;">No comments added yet.</p>';
    } else {
      threadContainer.innerHTML = comments.map((c) => `
        <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
          <div class="comment-author-row">
            <img src="${c.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${c.author}" class="comment-author-avatar">
            <div class="comment-author-meta">
              <span class="comment-author-name">${c.author}</span>
              <span class="comment-author-date">${c.date}</span>
            </div>
          </div>
          <div class="comment-speech-bubble">
            ${c.text}
          </div>
        </div>
      `).join('');
    }
  }

  const rejectionBox = document.getElementById('rejection-note-box');
  if (rejectionBox) {
    setElText('rejection-label-text', cand.rejectionLabel || 'Rejection note');
    setElText('rejection-value-text', cand.rejectionNote || 'Culture Mismatch');
  }
}

// --------------------------------------------------------------------------
// Interactive Tab Switching System (Global + Direct + Delegated)
// --------------------------------------------------------------------------
function switchProfileTab(targetId, btnElement) {
  if (!targetId) return;

  const tabButtons = document.querySelectorAll('.profile-tab-item');
  const panes = document.querySelectorAll('.profile-tab-pane');

  // 1. Update tab button states
  tabButtons.forEach((btn) => {
    const isTarget = (
      btn === btnElement ||
      btn.getAttribute('data-target') === targetId ||
      btn.dataset.target === targetId ||
      btn.id === targetId ||
      btn.id === `tab-btn-${targetId.replace('tab-pane-', '')}`
    );
    if (isTarget) {
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    }
  });

  // 2. Update tab panes visibility
  panes.forEach((pane) => {
    if (pane.id === targetId) {
      pane.classList.remove('hidden');
      pane.style.display = 'block';
    } else {
      pane.classList.add('hidden');
      pane.style.display = 'none';
    }
  });
}
window.switchProfileTab = switchProfileTab;
window.switchTab = switchProfileTab;
const switchTab = switchProfileTab;

function initTabs() {
  // Direct Button Listeners
  document.querySelectorAll('.profile-tab-item').forEach((btn) => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target') || this.dataset.target;
      if (targetId) switchProfileTab(targetId, this);
    });
  });

  // Global Event Delegation Fallback
  document.addEventListener('click', function (e) {
    const tabBtn = e.target.closest('.profile-tab-item');
    if (tabBtn) {
      const targetId = tabBtn.getAttribute('data-target') || tabBtn.dataset.target;
      if (targetId) {
        switchProfileTab(targetId, tabBtn);
      }
    }
  });
}

// --------------------------------------------------------------------------
// Fullscreen Resume Lightbox
// --------------------------------------------------------------------------
function initLightbox() {
  const fullscreenBtn = document.getElementById('resume-fullscreen-btn');
  const resumeImg = document.getElementById('resume-img-preview');
  const lightbox = document.getElementById('resume-lightbox-modal');
  const closeBtn = document.getElementById('resume-lightbox-close');

  function openLightbox() {
    if (lightbox) {
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
    }
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
    }
  }

  fullscreenBtn?.addEventListener('click', openLightbox);
  resumeImg?.addEventListener('click', openLightbox);
  closeBtn?.addEventListener('click', closeLightbox);

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// --------------------------------------------------------------------------
// Recruiter Comments & Notes
// --------------------------------------------------------------------------
function initCommentActions() {
  const openModalBtn = document.getElementById('btn-open-comment-modal');
  const modalCloseBtn = document.getElementById('comment-modal-close-btn');
  const cancelBtn = document.getElementById('modal-comment-cancel-btn');
  const submitBtn = document.getElementById('modal-comment-submit-btn');
  const commentInput = document.getElementById('modal-comment-input');

  openModalBtn?.addEventListener('click', () => {
    if (commentInput) commentInput.value = '';
    openModal('add-comment-modal');
  });

  function closeCommentModal() {
    closeModal('add-comment-modal');
  }

  modalCloseBtn?.addEventListener('click', closeCommentModal);
  cancelBtn?.addEventListener('click', closeCommentModal);

  submitBtn?.addEventListener('click', () => {
    const text = (commentInput?.value || '').trim();
    if (!text) {
      showToast('Please enter a comment note.', 'error');
      return;
    }

    const newComment = {
      author: 'Taylor Brooks',
      role: 'Super Admin',
      date: 'Today',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text
    };

    if (!currentCandidate.comments) currentCandidate.comments = [];
    currentCandidate.comments.push(newComment);

    if (!currentCandidate.history) currentCandidate.history = [];
    currentCandidate.history.unshift({
      text: `Taylor Brooks added a comment`,
      time: `Today • ${formatNow().split('·')[1]?.trim() || '07:00 PM'}`,
      active: true
    });

    const match = allCandidates.find((c) => c.id === currentCandidate.id);
    if (match) {
      match.comments = currentCandidate.comments;
      match.history = currentCandidate.history;
    }
    saveCollection(CANDIDATES_KEY, allCandidates);

    renderCommentsSection(currentCandidate);
    renderCandidateHistory(currentCandidate);
    closeCommentModal();
    showToast('Recruiter comment added successfully!', 'success');
  });
}

// --------------------------------------------------------------------------
// Application Stage Selector
// --------------------------------------------------------------------------
function initStageSelector() {
  const stageSelect = document.getElementById('stage-selector');
  stageSelect?.addEventListener('change', () => {
    const newStatus = stageSelect.value;
    currentCandidate.status = newStatus;

    if (!currentCandidate.history) currentCandidate.history = [];
    currentCandidate.history.unshift({
      text: `Recruitment stage updated to "${newStatus}" by Taylor Brooks`,
      time: `Today • ${formatNow().split('·')[1]?.trim() || '07:00 PM'}`,
      active: true
    });

    const match = allCandidates.find((c) => c.id === currentCandidate.id);
    if (match) {
      match.status = newStatus;
      match.history = currentCandidate.history;
    }
    saveCollection(CANDIDATES_KEY, allCandidates);

    renderCandidateHistory(currentCandidate);
    showToast(`Recruitment status updated to "${newStatus}"!`, 'success');
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCandidateProfile);
} else {
  initCandidateProfile();
}
