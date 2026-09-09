/* ==========================================================================
   Job Applicants Directory & Management
   Facet Filter Sidebar (Left) + Refined Naukri-Style Candidate Cards (Right)
   Full Sentence Case, INR LPA CTC, Comma-Separated Key Skills, Drawers & Light Bulk Bar
   ========================================================================== */

const JOBS_KEY = 'fwc-job-listings';
const CANDIDATES_KEY = 'fwc-job-candidates';

// Comprehensive candidate dataset with full dossier fields matching candidate-profile.html and INR LPA
const defaultCandidateSeeds = typeof GLOBAL_DEFAULT_CANDIDATES !== 'undefined' ? GLOBAL_DEFAULT_CANDIDATES : [
  // Candidates for Job 3 (Senior AI Architect & GenAI Team Lead)
  {
    id: 301,
    jobId: 3,
    fullName: 'Dr. Vikram Malhotra',
    name: 'Dr. Vikram Malhotra',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'vikram.malhotra@neuralscale.ai',
    phone: '+91 98450 12890',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 22, 2026',
    appliedISO: '2026-08-22T11:30:00',
    status: 'Interviewing',
    totalExp: '9.5 Yrs',
    workExpYears: 9.5,
    currentCtc: '24 LPA',
    currentCtcNum: 24,
    expectedCtc: '28 LPA',
    expectedCtcNum: 28,
    noticePeriod: '30 Days',
    employmentType: 'Full-time',
    designation: 'Principal AI Architect',
    currentCompanyName: 'Cognitive Intelligence Labs',
    previousDesignation: 'Lead Machine Learning Engineer',
    previousCompanyName: 'Wipro AI Research',
    highestDegree: 'Ph.D. in Computer Science — IISc Bangalore',
    rating: 4.9,
    resumeFileName: 'dr-vikram-malhotra-ai-architect.pdf',
    resumeFileSize: '1.8 MB',
    summary: 'Ph.D. in Machine Learning with 9+ years architecting enterprise RAG systems, LLM orchestration frameworks, and vector index clusters on Kubernetes.',
    skills: ['LLM Orchestration', 'RAG Architectures', 'PyTorch', 'LangChain', 'Vector DBs (Milvus)', 'MLOps on Kubernetes', 'AWS Bedrock'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 23, 2026 · 10:15 AM',
        text: 'Exceptional background in enterprise GenAI architectures and distributed vector indexing. Cleared technical screening with top marks.'
      },
      {
        author: 'Taylor Brooks',
        role: 'Super Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 24, 2026 · 02:40 PM',
        text: 'Scheduled for round 2 architecture discussion with the engineering leadership.'
      }
    ],
    history: [
      { text: 'Candidate moved to Interviewing stage', time: 'Aug 24, 2026 · 02:40 PM', active: true },
      { text: 'Shortlisted for technical evaluation round', time: 'Aug 23, 2026 · 10:15 AM', active: false },
      { text: 'Application submitted for Senior AI Architect', time: 'Aug 22, 2026 · 11:30 AM', active: false }
    ]
  },
  {
    id: 302,
    jobId: 3,
    fullName: 'Ananya Deshmukh',
    name: 'Ananya Deshmukh',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'ananya.deshmukh@genai-systems.io',
    phone: '+91 99801 44520',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 20, 2026',
    appliedISO: '2026-08-20T15:15:00',
    status: 'Shortlisted',
    totalExp: '6.5 Yrs',
    workExpYears: 6.5,
    currentCtc: '18 LPA',
    currentCtcNum: 18,
    expectedCtc: '22 LPA',
    expectedCtcNum: 22,
    noticePeriod: 'Immediate',
    employmentType: 'Full-time',
    designation: 'Staff Machine Learning Engineer',
    currentCompanyName: 'HyperScale AI Labs',
    previousDesignation: 'Senior AI Engineer',
    previousCompanyName: 'TCS Innovation Hub',
    highestDegree: 'M.Tech in Artificial Intelligence — IIT Bombay',
    rating: 4.8,
    resumeFileName: 'ananya-deshmukh-staff-ai-engineer.pdf',
    resumeFileSize: '1.4 MB',
    summary: 'Staff AI Engineer with expertise in model fine-tuning (LoRA), latency optimization on NVIDIA H100 clusters, and agentic workflows with LangGraph.',
    skills: ['LangGraph', 'PyTorch & vLLM', 'Model Fine-tuning (LoRA)', 'Triton Inference Server', 'AWS Bedrock', 'Python', 'FastAPI'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 21, 2026 · 11:00 AM',
        text: 'Available immediately. Demonstrates deep proficiency in multi-agent orchestration.'
      }
    ],
    history: [
      { text: 'Candidate shortlisted for technical interview', time: 'Aug 21, 2026 · 11:00 AM', active: true },
      { text: 'Application submitted for Senior AI Architect', time: 'Aug 20, 2026 · 03:15 PM', active: false }
    ]
  },
  {
    id: 303,
    jobId: 3,
    fullName: 'Robert Vance',
    name: 'Robert Vance',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'robert.vance@ai-foundry.com',
    phone: '+91 98112 33490',
    currentLocation: 'Hyderabad, India',
    location: 'Hyderabad, India',
    appliedOn: 'Aug 19, 2026',
    appliedISO: '2026-08-19T09:20:00',
    status: 'Under Review',
    totalExp: '8.0 Yrs',
    workExpYears: 8.0,
    currentCtc: '21 LPA',
    currentCtcNum: 21,
    expectedCtc: '25 LPA',
    expectedCtcNum: 25,
    noticePeriod: '60 Days',
    employmentType: 'Remote',
    designation: 'Lead ML Infrastructure Engineer',
    currentCompanyName: 'Apex Vision AI',
    previousDesignation: 'Senior Deep Learning Engineer',
    previousCompanyName: 'NVIDIA Partner Lab',
    highestDegree: 'M.S. in Computer Science — Stanford University',
    rating: 4.6,
    resumeFileName: 'robert-vance-ai-lead.pdf',
    resumeFileSize: '1.6 MB',
    summary: 'AI Systems Architect with 8+ years building high-throughput inference engines and deep learning deployment frameworks.',
    skills: ['PyTorch', 'Distributed Training', 'Kubernetes', 'Triton Inference', 'RAG Pipelines', 'C++', 'CUDA'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 20, 2026 · 09:30 AM',
        text: 'Resume under initial evaluation by engineering hiring manager.'
      }
    ],
    history: [
      { text: 'Application received and placed Under Review', time: 'Aug 19, 2026 · 09:20 AM', active: true }
    ]
  },
  {
    id: 304,
    jobId: 3,
    fullName: 'Maya Lin',
    name: 'Maya Lin',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'maya.lin@intelligence-cloud.net',
    phone: '+91 97120 44810',
    currentLocation: 'Pune, India',
    location: 'Pune, India',
    appliedOn: 'Aug 18, 2026',
    appliedISO: '2026-08-18T16:30:00',
    status: 'Hired',
    totalExp: '5.5 Yrs',
    workExpYears: 5.5,
    currentCtc: '16 LPA',
    currentCtcNum: 16,
    expectedCtc: '19 LPA',
    expectedCtcNum: 19,
    noticePeriod: '30 Days',
    employmentType: 'Hybrid',
    designation: 'Senior NLP Architect',
    currentCompanyName: 'CloudMatrix Global',
    previousDesignation: 'NLP Research Engineer',
    previousCompanyName: 'Amazon Web Services',
    highestDegree: 'B.S. in Artificial Intelligence — University of Washington',
    rating: 4.9,
    resumeFileName: 'maya-lin-ai-architect.pdf',
    resumeFileSize: '1.3 MB',
    summary: 'Senior Machine Learning Architect with specialized background in NLP, prompt engineering safety firewalls, and responsible AI guardrails.',
    skills: ['GenAI Governance', 'LangChain', 'Python', 'Azure OpenAI', 'Semantic Kernel', 'Docker', 'Kubernetes'],
    comments: [
      {
        author: 'Taylor Brooks',
        role: 'Super Admin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 25, 2026 · 04:00 PM',
        text: 'Candidate offer accepted. Joining date scheduled for next month.'
      },
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 22, 2026 · 03:15 PM',
        text: 'Candidate performed exceptionally in culture and team fit rounds.'
      }
    ],
    history: [
      { text: 'Candidate marked as Hired', time: 'Aug 25, 2026 · 04:00 PM', active: true },
      { text: 'Final executive offer extended and accepted', time: 'Aug 24, 2026 · 02:00 PM', active: false },
      { text: 'Completed final technical and cultural interview', time: 'Aug 22, 2026 · 03:15 PM', active: false },
      { text: 'Application submitted for Senior AI Architect', time: 'Aug 18, 2026 · 04:30 PM', active: false }
    ]
  },
  {
    id: 100,
    jobId: 3,
    fullName: 'John Doe',
    name: 'John Doe',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'john.doe@example.com',
    phone: '+91 91234 56789',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 17, 2026',
    appliedISO: '2026-08-17T14:10:00',
    status: 'Screening',
    totalExp: '5.0 Yrs',
    workExpYears: 5.0,
    currentCtc: '14 LPA',
    currentCtcNum: 14,
    expectedCtc: '17 LPA',
    expectedCtcNum: 17,
    noticePeriod: '30 Days',
    employmentType: 'Full-time',
    designation: 'Senior Frontend Developer',
    currentCompanyName: 'Infosys Pvt. Ltd.',
    previousDesignation: 'Frontend Engineer',
    previousCompanyName: 'Wipro Technologies',
    highestDegree: 'B.Tech in Computer Science — MIT',
    rating: 4.7,
    resumeFileName: 'resume.png',
    resumeFileSize: '1.2 MB',
    summary: '5 years of frontend development experience building high-scale responsive web applications and AI dashboard interfaces with modern JavaScript & React.',
    skills: ['JavaScript (ES6+)', 'React / Next.js', 'TypeScript', 'CSS3 & Tailwind', 'State Management', 'REST APIs'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 18, 2026 · 10:45 AM',
        text: 'Phone screen scheduled for upcoming Wednesday.'
      }
    ],
    history: [
      { text: 'Candidate scheduled for initial screening', time: 'Aug 18, 2026 · 10:45 AM', active: true },
      { text: 'Application submitted for Senior AI Architect', time: 'Aug 17, 2026 · 02:10 PM', active: false }
    ]
  },

  // Candidates for Job 2 (Senior Technology Consultant)
  {
    id: 201,
    jobId: 2,
    fullName: 'Siddharth Rao',
    name: 'Siddharth Rao',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'siddharth.rao@advisorycloud.com',
    phone: '+91 98201 55670',
    currentLocation: 'Mumbai, India',
    location: 'Mumbai, India',
    appliedOn: 'Aug 25, 2026',
    appliedISO: '2026-08-25T13:20:00',
    status: 'Screening',
    totalExp: '7.5 Yrs',
    workExpYears: 7.5,
    currentCtc: '19 LPA',
    currentCtcNum: 19,
    expectedCtc: '23 LPA',
    expectedCtcNum: 23,
    noticePeriod: '30 Days',
    employmentType: 'Full-time',
    designation: 'Lead Cloud Strategy Consultant',
    currentCompanyName: 'Deloitte Consulting LLP',
    previousDesignation: 'Senior Technology Consultant',
    previousCompanyName: 'PwC Advisory Services',
    highestDegree: 'MBA — UCLA Anderson School of Management',
    rating: 4.8,
    resumeFileName: 'siddharth-rao-tech-consultant.pdf',
    resumeFileSize: '1.5 MB',
    summary: '7+ years leading enterprise cloud migrations, modernizing legacy monolithic architectures, and structuring digital transformation roadmaps for Fortune 500 manufacturing clients.',
    skills: ['Enterprise Architecture', 'Cloud Migration Strategy', 'Agile Pod Leadership', 'Financial ROI Modeling', 'AWS & Azure', 'Microservices'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 26, 2026 · 11:15 AM',
        text: 'Strong enterprise consulting background from Deloitte and PwC with clear cloud architecture expertise.'
      }
    ],
    history: [
      { text: 'Candidate scheduled for initial screening', time: 'Aug 26, 2026 · 11:15 AM', active: true },
      { text: 'Application submitted for Senior Technology Consultant', time: 'Aug 25, 2026 · 01:20 PM', active: false }
    ]
  },
  {
    id: 202,
    jobId: 2,
    fullName: 'Claire Dupont',
    name: 'Claire Dupont',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'claire.dupont@consulting-tech.fr',
    phone: '+91 99340 77120',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 24, 2026',
    appliedISO: '2026-08-24T09:45:00',
    status: 'Shortlisted',
    totalExp: '6.0 Yrs',
    workExpYears: 6.0,
    currentCtc: '16 LPA',
    currentCtcNum: 16,
    expectedCtc: '19 LPA',
    expectedCtcNum: 19,
    noticePeriod: 'Immediate',
    employmentType: 'Hybrid',
    designation: 'Senior Digital Consultant',
    currentCompanyName: 'Accenture Technology',
    previousDesignation: 'Cloud Strategy Analyst',
    previousCompanyName: 'Capgemini Invent',
    highestDegree: 'M.S. in Management Information Systems — NYU Stern',
    rating: 4.7,
    resumeFileName: 'claire-dupont-senior-consultant.pdf',
    resumeFileSize: '1.3 MB',
    summary: 'Technology Consultant with deep specialization in legacy system modernization, microservices migration, and client stakeholder management.',
    skills: ['Cloud Transformation', 'Client Advisory', 'Enterprise Architecture', 'Microservices', 'Scrum / Agile', 'AWS Solutions'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 24, 2026 · 02:00 PM',
        text: 'Good communication and client presentation skills.'
      }
    ],
    history: [
      { text: 'Shortlisted for consulting round', time: 'Aug 24, 2026 · 02:00 PM', active: true },
      { text: 'Application submitted for Senior Technology Consultant', time: 'Aug 24, 2026 · 09:45 AM', active: false }
    ]
  },

  // Candidates for Job 1 (Cybersecurity Analyst & Threat Hunting Specialist)
  {
    id: 101,
    jobId: 1,
    fullName: 'Elena Rostova',
    name: 'Elena Rostova',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    email: 'elena.rostova@techdefense.io',
    phone: '+91 98400 33110',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 28, 2026',
    appliedISO: '2026-08-28T10:15:00',
    status: 'Under Review',
    totalExp: '5.5 Yrs',
    workExpYears: 5.5,
    currentCtc: '15 LPA',
    currentCtcNum: 15,
    expectedCtc: '18 LPA',
    expectedCtcNum: 18,
    noticePeriod: '30 Days',
    employmentType: 'Full-time',
    designation: 'Threat Intelligence Lead',
    currentCompanyName: 'Vanguard Cyber Systems',
    previousDesignation: 'SOC Security Analyst',
    previousCompanyName: 'Apex Cloud Defense',
    highestDegree: 'B.S. in Computer Science & Info Assurance — UC Berkeley',
    rating: 4.8,
    resumeFileName: 'elena-rostova-cybersecurity-resume.pdf',
    resumeFileSize: '1.2 MB',
    summary: 'Senior Cybersecurity Engineer with 5+ years of experience in enterprise SIEM threat hunting, Splunk query optimization, SOC2 compliance governance, and automated incident triage.',
    skills: ['SIEM & Splunk (Expert)', 'AWS Security Hub', 'SOC2 / HIPAA Audit', 'Threat Hunting', 'Zero-Trust IAM', 'Python & Bash'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 28, 2026 · 11:30 AM',
        text: 'Initial resume screening completed. Experience directly matches job description.'
      }
    ],
    history: [
      { text: 'Application received and placed Under Review', time: 'Aug 28, 2026 · 10:15 AM', active: true }
    ]
  },
  {
    id: 102,
    jobId: 1,
    fullName: 'David Chen',
    name: 'David Chen',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    email: 'david.chen@cybermesh.org',
    phone: '+91 97180 22990',
    currentLocation: 'Pune, India',
    location: 'Pune, India',
    appliedOn: 'Aug 27, 2026',
    appliedISO: '2026-08-27T14:40:00',
    status: 'Shortlisted',
    totalExp: '4.0 Yrs',
    workExpYears: 4.0,
    currentCtc: '11 LPA',
    currentCtcNum: 11,
    expectedCtc: '14 LPA',
    expectedCtcNum: 14,
    noticePeriod: 'Immediate',
    employmentType: 'Full-time',
    designation: 'Cybersecurity Analyst',
    currentCompanyName: 'Nexus Tech Partners',
    previousDesignation: 'Junior Security Engineer',
    previousCompanyName: 'CyberGuard Corp',
    highestDegree: 'B.S. in Cybersecurity — USC Viterbi',
    rating: 4.6,
    resumeFileName: 'david-chen-security-analyst.pdf',
    resumeFileSize: '980 KB',
    summary: 'Cybersecurity Analyst specializing in vulnerability management, automated SAST/DAST pipeline integration, and DevSecOps compliance automation.',
    skills: ['AWS Security', 'Splunk', 'Tenable / Nessus', 'SOC2 Compliance', 'Docker Security', 'Terraform'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 27, 2026 · 04:15 PM',
        text: 'Shortlisted for preliminary screening round.'
      }
    ],
    history: [
      { text: 'Shortlisted for preliminary screening', time: 'Aug 27, 2026 · 04:15 PM', active: true },
      { text: 'Application submitted', time: 'Aug 27, 2026 · 02:40 PM', active: false }
    ]
  },
  {
    id: 103,
    jobId: 1,
    fullName: 'Marcus Holloway',
    name: 'Marcus Holloway',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'm.holloway@defenselogic.com',
    phone: '+91 96540 88120',
    currentLocation: 'Hyderabad, India',
    location: 'Hyderabad, India',
    appliedOn: 'Aug 26, 2026',
    appliedISO: '2026-08-26T11:20:00',
    status: 'Screening',
    totalExp: '6.5 Yrs',
    workExpYears: 6.5,
    currentCtc: '17 LPA',
    currentCtcNum: 17,
    expectedCtc: '20 LPA',
    expectedCtcNum: 20,
    noticePeriod: '60 Days',
    employmentType: 'Remote',
    designation: 'Senior Information Security Analyst',
    currentCompanyName: 'Horizon Health Systems',
    previousDesignation: 'IAM Specialist',
    previousCompanyName: 'Chicago Tech Solutions',
    highestDegree: 'M.S. in Information Systems — Northwestern University',
    rating: 4.7,
    resumeFileName: 'marcus-holloway-lead-analyst.pdf',
    resumeFileSize: '1.4 MB',
    summary: '6+ years in zero-trust architecture, cloud telemetry analysis, and enterprise identity security.',
    skills: ['Zero-Trust', 'Splunk Enterprise', 'Okta / Azure AD IAM', 'Incident Response', 'HIPAA Compliance', 'Python'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 26, 2026 · 02:00 PM',
        text: 'Screening call scheduled.'
      }
    ],
    history: [
      { text: 'Candidate scheduled for initial screening', time: 'Aug 26, 2026 · 02:00 PM', active: true },
      { text: 'Application submitted', time: 'Aug 26, 2026 · 11:20 AM', active: false }
    ]
  },

  // Candidates for Job 4 (Cloud Infrastructure Engineer)
  {
    id: 401,
    jobId: 4,
    fullName: 'Liam O’Connor',
    name: 'Liam O’Connor',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'liam.oconnor@cloudinfra.io',
    phone: '+91 98190 33450',
    currentLocation: 'Mumbai, India',
    location: 'Mumbai, India',
    appliedOn: 'Aug 18, 2026',
    appliedISO: '2026-08-18T14:00:00',
    status: 'Screening',
    totalExp: '4.5 Yrs',
    workExpYears: 4.5,
    currentCtc: '13 LPA',
    currentCtcNum: 13,
    expectedCtc: '16 LPA',
    expectedCtcNum: 16,
    noticePeriod: '30 Days',
    employmentType: 'Full-time',
    designation: 'Cloud Infrastructure Engineer',
    currentCompanyName: 'Skyward Systems',
    previousDesignation: 'DevOps Engineer',
    previousCompanyName: 'Pasadena Cloud Co.',
    highestDegree: 'B.S. in Computer Science — Cal Poly Pomona',
    rating: 4.7,
    resumeFileName: 'liam-oconnor-cloud-infra.pdf',
    resumeFileSize: '1.2 MB',
    summary: 'DevOps & Cloud Engineer with 4+ years authoring reusable Terraform modules, managing Kubernetes clusters on AWS EKS, and building Datadog observability dashboards.',
    skills: ['Terraform & Terragrunt', 'Kubernetes / EKS', 'AWS Multi-Account', 'Prometheus & Grafana', 'GitHub Actions CI/CD'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 19, 2026 · 10:00 AM',
        text: 'Strong Terraform and Kubernetes experience verified.'
      }
    ],
    history: [
      { text: 'Candidate scheduled for initial screening', time: 'Aug 19, 2026 · 10:00 AM', active: true },
      { text: 'Application submitted for Cloud Infrastructure Engineer', time: 'Aug 18, 2026 · 02:00 PM', active: false }
    ]
  },
  {
    id: 402,
    jobId: 4,
    fullName: 'Sofia Ramirez',
    name: 'Sofia Ramirez',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    email: 'sofia.ramirez@devops-scale.com',
    phone: '+91 97450 66120',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 16, 2026',
    appliedISO: '2026-08-16T11:15:00',
    status: 'Rejected',
    totalExp: '3.5 Yrs',
    workExpYears: 3.5,
    currentCtc: '9 LPA',
    currentCtcNum: 9,
    expectedCtc: '12 LPA',
    expectedCtcNum: 12,
    noticePeriod: 'Immediate',
    employmentType: 'Hybrid',
    designation: 'DevOps Engineer',
    currentCompanyName: 'Nexus Platforms',
    previousDesignation: 'Junior Systems Admin',
    previousCompanyName: 'DataStream Inc.',
    highestDegree: 'B.S. in Software Engineering — UC Riverside',
    rating: 4.2,
    resumeFileName: 'sofia-ramirez-devops.pdf',
    resumeFileSize: '1.1 MB',
    summary: 'Infrastructure Automation Engineer focused on zero-downtime CI/CD and multi-cloud Kubernetes deployment.',
    skills: ['Terraform', 'AWS ECS / EKS', 'Datadog', 'ArgoCD', 'Python', 'Docker'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 17, 2026 · 11:30 AM',
        text: 'Candidate experience fell below staff requirements for this senior posting.'
      }
    ],
    history: [
      { text: 'Application archived / Rejected', time: 'Aug 17, 2026 · 11:30 AM', active: true },
      { text: 'Application submitted', time: 'Aug 16, 2026 · 11:15 AM', active: false }
    ]
  },

  // Candidates for Job 5 (Blockchain Developer)
  {
    id: 501,
    jobId: 5,
    fullName: 'Mateo Morales',
    name: 'Mateo Morales',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    email: 'mateo.morales@web3foundry.dev',
    phone: '+91 96110 88230',
    currentLocation: 'Bangalore, India',
    location: 'Bangalore, India',
    appliedOn: 'Aug 14, 2026',
    appliedISO: '2026-08-14T10:45:00',
    status: 'Interviewing',
    totalExp: '4.5 Yrs',
    workExpYears: 4.5,
    currentCtc: '16 LPA',
    currentCtcNum: 16,
    expectedCtc: '20 LPA',
    expectedCtcNum: 20,
    noticePeriod: '30 Days',
    employmentType: 'Remote',
    designation: 'Smart Contract Developer',
    currentCompanyName: 'EtherFlow Protocol',
    previousDesignation: 'Solidity Engineer',
    previousCompanyName: 'BlockChain Labs Austin',
    highestDegree: 'B.S. in Software Engineering — UT Austin',
    rating: 4.8,
    resumeFileName: 'mateo-morales-solidity-developer.pdf',
    resumeFileSize: '1.0 MB',
    summary: 'Smart Contract Engineer with extensive experience in Solidity, Foundry test suites, and gas optimization for EVM Layer 2 protocols.',
    skills: ['Solidity', 'Foundry & Hardhat', 'EVM Chains', 'Smart Contract Auditing', 'OpenZeppelin', 'TypeScript'],
    comments: [
      {
        author: 'Sarah Smith',
        role: 'Senior Recruiter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        date: 'Aug 15, 2026 · 03:00 PM',
        text: 'Interview ongoing with Web3 team lead.'
      }
    ],
    history: [
      { text: 'Candidate actively interviewing with Web3 team', time: 'Aug 15, 2026 · 03:00 PM', active: true },
      { text: 'Application submitted for Blockchain Developer', time: 'Aug 14, 2026 · 10:45 AM', active: false }
    ]
  }
];

const APPLICANT_STATUSES = [
  { value: 'Under Review', label: 'Under Review', class: 'status-under-review' },
  { value: 'Shortlisted', label: 'Shortlisted', class: 'status-shortlisted' },
  { value: 'Screening', label: 'Screening', class: 'status-screening' },
  { value: 'Interviewing', label: 'Interviewing', class: 'status-interviewing' },
  { value: 'Hired', label: 'Hired', class: 'status-hired' },
  { value: 'Rejected', label: 'Rejected', class: 'status-rejected' }
];

function getStatusMeta(statusName) {
  return APPLICANT_STATUSES.find((s) => s.value === statusName) || APPLICANT_STATUSES[0];
}

function getStatusClass(statusName) {
  const meta = getStatusMeta(statusName);
  return meta ? meta.class : 'status-under-review';
}

function syncAndEnsureCandidateSeeds() {
  const existing = loadCollection(CANDIDATES_KEY, []);
  let merged = [];
  
  if (!existing || !existing.length) {
    merged = defaultCandidateSeeds;
    saveCollection(CANDIDATES_KEY, merged);
  } else {
    // Merge rich fields from defaultCandidateSeeds
    merged = defaultCandidateSeeds.map((seed) => {
      const match = existing.find((e) => e.id === seed.id);
      return match ? { ...seed, ...match, currentCtc: seed.currentCtc, currentCtcNum: seed.currentCtcNum, gender: seed.gender, history: match.history || seed.history, comments: match.comments || seed.comments } : seed;
    });
    // Retain custom user-created candidates
    existing.forEach((e) => {
      if (!merged.some((m) => m.id === e.id)) {
        merged.push(e);
      }
    });
    saveCollection(CANDIDATES_KEY, merged);
  }
  return merged;
}

let allCandidates = syncAndEnsureCandidateSeeds();
let currentJob = null;
let currentJobCandidates = [];
let selectedCandidateIds = new Set();
let pendingStatusChange = null;
let activeDrawerCandidateId = null;

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
    salary: '22 – 28 LPA',
    expiryDate: '2026-09-30',
    submitted: 'Aug 10, 2026 · 09:00 AM',
    status: 'published',
    pdfName: 'senior-ai-architect-jd.pdf',
    pdfSize: '2.1 MB',
    overview: 'Lead the design of AI-augmented delivery pods for enterprise manufacturing and fintech clients, setting technical direction across a growing generative AI architecture team.',
    responsibilities: [
      'Design scalable LLM pipelines, Retrieval-Augmented Generation (RAG) frameworks, and vector index architectures.',
      'Establish enterprise model governance, evaluation metrics, and responsible AI safety guardrails.',
      'Mentor senior machine learning engineers and present architecture strategies to enterprise stakeholders.'
    ],
    skills: ['LLM Orchestration', 'RAG Architectures', 'PyTorch / LangChain', 'Vector Databases', 'MLOps on Kubernetes']
  };

  // Update Breadcrumbs & Surface Header
  const bcReqName = document.getElementById('breadcrumb-requisition-name');
  if (bcReqName) bcReqName.textContent = `${currentJob.title} — Applicants`;

  const ctxTitle = document.getElementById('context-job-title');
  if (ctxTitle) ctxTitle.textContent = currentJob.title;

  const ctxId = document.getElementById('context-job-id');
  if (ctxId) ctxId.textContent = `JOB-${100 + currentJob.id}`;

  const ctxDept = document.getElementById('context-job-dept');
  if (ctxDept) ctxDept.textContent = currentJob.department || 'Engineering';

  const ctxLoc = document.getElementById('context-job-loc');
  if (ctxLoc) ctxLoc.textContent = currentJob.location || 'Remote';

  const ctxType = document.getElementById('context-job-type');
  if (ctxType) ctxType.textContent = currentJob.type || 'Full-time';

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

  if (!currentJobCandidates.length) {
    currentJobCandidates = allCandidates.slice(0, 5).map((c, i) => ({
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

  populateJobDescriptionPanel();
}

function populateJobDescriptionPanel() {
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
    jdOverviewEl.textContent = currentJob.overview || 'Lead architectural strategy and technical implementation across cross-functional engineering pods.';
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
      if (targetPanelId) switchTab(targetPanelId);
    });
  });

  const tabParam = getQueryParam('tab');
  if (tabParam === 'jd' || tabParam === 'description' || tabParam === 'job-description') {
    switchTab('panel-job-description');
  }
}

/* --------------------------------------------------------------------------
   Dynamic Facet Sidebar Population & Accordion Handlers
   -------------------------------------------------------------------------- */
function populateDynamicFacets() {
  // 1. Application Stage Facet
  const stageOptionsContainer = document.getElementById('facet-stage-options');
  if (stageOptionsContainer) {
    stageOptionsContainer.innerHTML = APPLICANT_STATUSES.map((st) => `
      <label class="facet-checkbox-label">
        <input type="checkbox" name="filter-stage" value="${st.value}">
        <span class="facet-checkbox-mark"></span>
        <span class="facet-label-text">${st.label}</span>
        <span class="facet-count" id="count-stage-${st.value.toLowerCase().replace(/\s+/g, '-')}">0</span>
      </label>
    `).join('');
  }

  // 2. Locations Facet
  const locOptionsContainer = document.getElementById('facet-location-options');
  if (locOptionsContainer) {
    const locSet = new Set();
    currentJobCandidates.forEach((c) => {
      const loc = c.currentLocation || c.location || 'Remote';
      locSet.add(loc);
    });
    locSet.add('Bangalore, India');
    locSet.add('Hyderabad, India');
    locSet.add('Pune, India');
    locSet.add('Mumbai, India');
    locSet.add('Remote');

    const sortedLocs = Array.from(locSet).slice(0, 6);
    locOptionsContainer.innerHTML = sortedLocs.map((loc) => `
      <label class="facet-checkbox-label">
        <input type="checkbox" name="filter-location" value="${loc}">
        <span class="facet-checkbox-mark"></span>
        <span class="facet-label-text">${loc}</span>
        <span class="facet-count" data-loc-count="${loc}">0</span>
      </label>
    `).join('');
  }

  // 3. Key Skills Facet
  const skillsOptionsContainer = document.getElementById('facet-skills-options');
  if (skillsOptionsContainer) {
    const skillCountMap = {};
    currentJobCandidates.forEach((c) => {
      (c.skills || []).forEach((sk) => {
        const cleanSkill = sk.replace(/\s*\(.*?\)\s*/g, '').trim();
        skillCountMap[cleanSkill] = (skillCountMap[cleanSkill] || 0) + 1;
      });
    });
    const topSkills = Object.keys(skillCountMap)
      .sort((a, b) => skillCountMap[b] - skillCountMap[a])
      .slice(0, 8);

    if (!topSkills.length) {
      topSkills.push('LLM Orchestration', 'RAG Architectures', 'PyTorch', 'LangChain', 'Python', 'Kubernetes');
    }

    skillsOptionsContainer.innerHTML = topSkills.map((sk) => `
      <label class="facet-checkbox-label">
        <input type="checkbox" name="filter-skill" value="${sk}">
        <span class="facet-checkbox-mark"></span>
        <span class="facet-label-text">${sk}</span>
        <span class="facet-count" data-skill-count="${sk}">0</span>
      </label>
    `).join('');
  }
}

function initFacetAccordions() {
  document.querySelectorAll('.filter-facet-heading').forEach((btn) => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.filter-facet-group');
      if (group) {
        group.classList.toggle('is-open');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Facet Filtering & Live Count Updates
   -------------------------------------------------------------------------- */
function updateFacetBadgeCounts() {
  // Update Stage Counts
  APPLICANT_STATUSES.forEach((st) => {
    const countEl = document.getElementById(`count-stage-${st.value.toLowerCase().replace(/\s+/g, '-')}`);
    if (countEl) {
      const count = currentJobCandidates.filter((c) => (c.status || 'Under Review') === st.value).length;
      countEl.textContent = count;
    }
  });

  // Update Experience Counts
  const exp02El = document.getElementById('count-exp-0-2');
  if (exp02El) exp02El.textContent = currentJobCandidates.filter((c) => (c.workExpYears || 0) <= 2).length;

  const exp35El = document.getElementById('count-exp-3-5');
  if (exp35El) exp35El.textContent = currentJobCandidates.filter((c) => (c.workExpYears || 0) > 2 && (c.workExpYears || 0) <= 5).length;

  const exp58El = document.getElementById('count-exp-5-8');
  if (exp58El) exp58El.textContent = currentJobCandidates.filter((c) => (c.workExpYears || 0) > 5 && (c.workExpYears || 0) <= 8).length;

  const exp8pEl = document.getElementById('count-exp-8plus');
  if (exp8pEl) exp8pEl.textContent = currentJobCandidates.filter((c) => (c.workExpYears || 0) > 8).length;

  // Update CTC Counts (in INR LPA)
  const ctcU6El = document.getElementById('count-ctc-under6');
  if (ctcU6El) ctcU6El.textContent = currentJobCandidates.filter((c) => (c.currentCtcNum || 0) <= 6).length;

  const ctc612El = document.getElementById('count-ctc-6-12');
  if (ctc612El) ctc612El.textContent = currentJobCandidates.filter((c) => (c.currentCtcNum || 0) > 6 && (c.currentCtcNum || 0) <= 12).length;

  const ctc1218El = document.getElementById('count-ctc-12-18');
  if (ctc1218El) ctc1218El.textContent = currentJobCandidates.filter((c) => (c.currentCtcNum || 0) > 12 && (c.currentCtcNum || 0) <= 18).length;

  const ctc18pEl = document.getElementById('count-ctc-18plus');
  if (ctc18pEl) ctc18pEl.textContent = currentJobCandidates.filter((c) => (c.currentCtcNum || 0) > 18).length;

  // Update Notice Period Counts
  const notImm = document.getElementById('count-notice-immediate');
  if (notImm) notImm.textContent = currentJobCandidates.filter((c) => /immediate|15/i.test(c.noticePeriod || '')).length;

  const not30 = document.getElementById('count-notice-30');
  if (not30) not30.textContent = currentJobCandidates.filter((c) => /30/i.test(c.noticePeriod || '')).length;

  const not60 = document.getElementById('count-notice-60');
  if (not60) not60.textContent = currentJobCandidates.filter((c) => /60/i.test(c.noticePeriod || '')).length;

  const not90 = document.getElementById('count-notice-90');
  if (not90) not90.textContent = currentJobCandidates.filter((c) => /90/i.test(c.noticePeriod || '')).length;

  // Update Gender Counts
  const genMaleEl = document.getElementById('count-gender-male');
  if (genMaleEl) genMaleEl.textContent = currentJobCandidates.filter((c) => (c.gender || 'Male').toLowerCase() === 'male').length;

  const genFemEl = document.getElementById('count-gender-female');
  if (genFemEl) genFemEl.textContent = currentJobCandidates.filter((c) => (c.gender || '').toLowerCase() === 'female').length;

  const genOthEl = document.getElementById('count-gender-other');
  if (genOthEl) genOthEl.textContent = currentJobCandidates.filter((c) => (c.gender || '').toLowerCase() === 'other').length;

  // Update Location Counts
  document.querySelectorAll('[data-loc-count]').forEach((el) => {
    const loc = el.getAttribute('data-loc-count');
    el.textContent = currentJobCandidates.filter((c) => (c.currentLocation || c.location || '').toLowerCase().includes(loc.toLowerCase())).length;
  });

  // Update Skills Counts
  document.querySelectorAll('[data-skill-count]').forEach((el) => {
    const sk = el.getAttribute('data-skill-count');
    el.textContent = currentJobCandidates.filter((c) => (c.skills || []).some((s) => s.toLowerCase().includes(sk.toLowerCase()))).length;
  });
}

function getSelectedFacetValues(name) {
  return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map((el) => el.value);
}

function getFilteredAndSortedCandidates() {
  const q = (document.getElementById('applicant-search')?.value || '').toLowerCase().trim();
  const selectedStages = getSelectedFacetValues('filter-stage');
  const selectedExps = getSelectedFacetValues('filter-exp');
  const selectedCtcs = getSelectedFacetValues('filter-ctc');
  const selectedLocs = getSelectedFacetValues('filter-location');
  const selectedNotices = getSelectedFacetValues('filter-notice');
  const selectedSkills = getSelectedFacetValues('filter-skill');
  const selectedGenders = getSelectedFacetValues('filter-gender');
  const sortBy = document.getElementById('applicant-sort-select')?.value || 'recent';

  const filtered = currentJobCandidates.filter((c) => {
    // 1. Text Search Filter
    if (q) {
      const matchText =
        (c.fullName || c.name || '').toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q) ||
        (c.phone || '').toLowerCase().includes(q) ||
        (c.designation || '').toLowerCase().includes(q) ||
        (c.currentCompanyName || '').toLowerCase().includes(q) ||
        (c.skills || []).some((sk) => sk.toLowerCase().includes(q));
      if (!matchText) return false;
    }

    // 2. Stage Filter
    if (selectedStages.length > 0) {
      if (!selectedStages.includes(c.status || 'Under Review')) return false;
    }

    // 3. Experience Filter
    if (selectedExps.length > 0) {
      const exp = c.workExpYears || 0;
      const matchExp = selectedExps.some((range) => {
        if (range === '0-2') return exp <= 2;
        if (range === '3-5') return exp > 2 && exp <= 5;
        if (range === '5-8') return exp > 5 && exp <= 8;
        if (range === '8+') return exp > 8;
        return true;
      });
      if (!matchExp) return false;
    }

    // 4. CTC Filter (INR LPA)
    if (selectedCtcs.length > 0) {
      const ctc = c.currentCtcNum || 0;
      const matchCtc = selectedCtcs.some((range) => {
        if (range === '0-6') return ctc <= 6;
        if (range === '6-12') return ctc > 6 && ctc <= 12;
        if (range === '12-18') return ctc > 12 && ctc <= 18;
        if (range === '18+') return ctc > 18;
        return true;
      });
      if (!matchCtc) return false;
    }

    // 5. Location Filter
    if (selectedLocs.length > 0) {
      const candLoc = (c.currentLocation || c.location || '').toLowerCase();
      const matchLoc = selectedLocs.some((loc) => candLoc.includes(loc.toLowerCase()));
      if (!matchLoc) return false;
    }

    // 6. Notice Period Filter
    if (selectedNotices.length > 0) {
      const notice = (c.noticePeriod || '').toLowerCase();
      const matchNotice = selectedNotices.some((n) => {
        if (n === 'immediate') return /immediate|15/i.test(notice);
        if (n === '30') return /30/i.test(notice);
        if (n === '60') return /60/i.test(notice);
        if (n === '90') return /90/i.test(notice);
        return true;
      });
      if (!matchNotice) return false;
    }

    // 7. Key Skills Filter
    if (selectedSkills.length > 0) {
      const candSkills = (c.skills || []).map((s) => s.toLowerCase());
      const matchSkill = selectedSkills.some((sk) => candSkills.some((cs) => cs.includes(sk.toLowerCase())));
      if (!matchSkill) return false;
    }

    // 8. Gender Filter
    if (selectedGenders.length > 0) {
      const gen = (c.gender || 'Male').toLowerCase();
      const matchGender = selectedGenders.some((g) => g.toLowerCase() === gen);
      if (!matchGender) return false;
    }

    return true;
  });

  // Sorting
  filtered.sort((a, b) => {
    if (sortBy === 'recent') {
      const timeA = a.appliedISO ? new Date(a.appliedISO).getTime() : 0;
      const timeB = b.appliedISO ? new Date(b.appliedISO).getTime() : 0;
      return timeB - timeA;
    }
    if (sortBy === 'exp-desc') {
      return (b.workExpYears || 0) - (a.workExpYears || 0);
    }
    if (sortBy === 'exp-asc') {
      return (a.workExpYears || 0) - (b.workExpYears || 0);
    }
    if (sortBy === 'ctc-asc') {
      return (a.currentCtcNum || 0) - (b.currentCtcNum || 0);
    }
    if (sortBy === 'ctc-desc') {
      return (b.currentCtcNum || 0) - (a.currentCtcNum || 0);
    }
    if (sortBy === 'name-asc') {
      return (a.fullName || a.name || '').localeCompare(b.fullName || b.name || '');
    }
    return 0;
  });

  return filtered;
}

function renderActiveFilterChips() {
  const chipsContainer = document.getElementById('active-filter-chips');
  if (!chipsContainer) return;

  const activeChips = [];
  const q = document.getElementById('applicant-search')?.value.trim();
  if (q) {
    activeChips.push({ label: `Search: "${q}"`, type: 'search' });
  }

  const checkedInputs = document.querySelectorAll('.filter-facet-sections input[type="checkbox"]:checked');
  checkedInputs.forEach((input) => {
    const labelText = input.closest('label')?.querySelector('.facet-label-text')?.textContent || input.value;
    activeChips.push({ label: labelText, element: input });
  });

  if (!activeChips.length) {
    chipsContainer.classList.add('hidden');
    chipsContainer.innerHTML = '';
    return;
  }

  chipsContainer.classList.remove('hidden');
  chipsContainer.innerHTML = activeChips.map((chip, idx) => `
    <span class="active-filter-chip">
      <span>${chip.label}</span>
      <button type="button" class="active-filter-chip-remove" data-chip-idx="${idx}" aria-label="Remove filter">✕</button>
    </span>
  `).join('');

  chipsContainer.querySelectorAll('.active-filter-chip-remove').forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.chipIdx);
      const targetChip = activeChips[idx];
      if (targetChip) {
        if (targetChip.type === 'search') {
          const searchInput = document.getElementById('applicant-search');
          if (searchInput) {
            searchInput.value = '';
            document.getElementById('applicant-search-clear')?.classList.add('hidden');
          }
        } else if (targetChip.element) {
          targetChip.element.checked = false;
        }
        applyFiltersAndRender();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Naukri-Style Candidate Cards Rendering (Refined)
   -------------------------------------------------------------------------- */
function renderCandidateCards(candidates) {
  const container = document.getElementById('candidate-cards-container');
  const emptyState = document.getElementById('applicants-empty-state');
  const resultsCountEl = document.getElementById('feed-results-count');

  if (resultsCountEl) {
    resultsCountEl.textContent = `Showing ${candidates.length} candidate${candidates.length === 1 ? '' : 's'}`;
  }

  if (!candidates.length) {
    if (container) container.innerHTML = '';
    if (emptyState) emptyState.classList.remove('hidden');
    return;
  }

  if (emptyState) emptyState.classList.add('hidden');
  if (!container) return;

  container.innerHTML = candidates.map((candidate) => {
    const isSelected = selectedCandidateIds.has(candidate.id);
    const profileUrl = `candidate-profile.html?id=${candidate.id}&jobId=${currentJob ? currentJob.id : 3}`;
    const statusVal = candidate.status || 'Under Review';
    const statusClass = getStatusClass(statusVal);
    const candName = candidate.fullName || candidate.name || 'Candidate';
    const candAvatar = candidate.avatar;
    const candEmail = candidate.email || 'candidate@example.com';
    const candPhone = candidate.phone || '+91 98000 00000';
    const candDesignation = candidate.designation || 'Software Engineer';
    const candCompany = candidate.currentCompanyName || 'Tech Enterprise';
    const candDegree = candidate.highestDegree || 'B.Tech in Computer Science';
    const candSkills = candidate.skills || ['Software Engineering', 'System Design'];
    const candExp = candidate.totalExp || `${candidate.workExpYears || 5} Yrs`;
    const candCtc = candidate.currentCtc || '14 LPA';
    const candLoc = candidate.currentLocation || candidate.location || 'Bangalore, India';
    const candNotice = candidate.noticePeriod || '30 Days';
    const candRating = candidate.rating || 4.8;
    const commentsCount = (candidate.comments || []).length || candidate.commentsCount || 1;
    
    // Clean applied date without time
    const cleanAppliedDate = (candidate.appliedOn || 'Aug 22, 2026').replace(/\s*·.*$/, '').replace(/^[A-Za-z]{3}\s+\d{1,2},\s+\d{4}/, (m) => m);

    // Direct Gmail Compose URL
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(candEmail)}&su=${encodeURIComponent(`Interview Invitation — ${currentJob ? currentJob.title : 'FWC Careers'}`)}`;

    const avatarHtml = candAvatar
      ? `<img src="${candAvatar}" alt="${candName}" class="candidate-avatar-thumb">`
      : `<div class="candidate-avatar-thumb-fallback">${candName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>`;

    return `
      <article class="candidate-card ${isSelected ? 'is-selected' : ''}" data-candidate-id="${candidate.id}">
        
        <!-- Card Header: Checkbox + Avatar + Candidate Name with Email & Phone beneath + Surface Actions (Resume & Email) -->
        <div class="candidate-card-header">
          <div class="candidate-header-left">
            <label class="custom-checkbox-wrap" title="Select candidate">
              <input type="checkbox" class="candidate-select-checkbox" data-candidate-id="${candidate.id}" ${isSelected ? 'checked' : ''}>
              <span class="custom-checkbox-mark"></span>
            </label>

            ${avatarHtml}

            <div class="candidate-identity-wrap">
              <a href="${profileUrl}" class="candidate-card-title-link" title="Open full dossier for ${candName}">
                <h3 class="candidate-card-name">${candName}</h3>
              </a>
              <div class="candidate-contact-subline">
                <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="candidate-contact-link" title="Open Gmail compose for ${candName}">
                  <svg viewBox="0 0 256 256" fill="currentColor" width="12" height="12"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/></svg>
                  <span>${candEmail}</span>
                </a>
                <a href="tel:${candPhone}" class="candidate-contact-link" title="Call ${candName}">
                  <svg viewBox="0 0 256 256" fill="currentColor" width="12" height="12"><path d="M222.37,158.46l-47.11-21.11a16,16,0,0,0-15.17,1.4L136.4,154.2a111.41,111.41,0,0,1-34.6-34.6l15.45-23.69a16,16,0,0,0,1.4-15.17L97.54,33.63A16,16,0,0,0,83,24H40A16,16,0,0,0,24,40,192.21,192.21,0,0,0,216,232a16,16,0,0,0,16-16V173A16,16,0,0,0,222.37,158.46ZM216,216A176.2,176.2,0,0,1,40,40H83l21.11,47.11L86.82,107a8,8,0,0,0-.7,8.23A127.38,127.38,0,0,0,140.77,169.88a8,8,0,0,0,8.23-.7l19.89-17.29L216,173Z"/></svg>
                  <span>${candPhone}</span>
                </a>
              </div>
            </div>
          </div>

          <div class="candidate-header-actions">
            <button type="button" class="surface-action-link btn-direct-resume" data-candidate-name="${candName}" data-candidate-role="${candDesignation}" title="Preview candidate resume">
              <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H40V56H216V200ZM184,96a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,96Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,128Zm0,32a8,8,0,0,1-8,8H80a8,8,0,0,1,0-16h96A8,8,0,0,1,184,160Z"/></svg>
              <span>Resume</span>
            </button>
            <a href="${gmailUrl}" target="_blank" rel="noopener noreferrer" class="surface-action-link" title="Send email via Gmail">
              <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"/></svg>
              <span>Email</span>
            </a>
          </div>
        </div>

        <!-- Key Metadata Row: Exp, CTC, Location, Notice Period -->
        <div class="candidate-meta-row">
          <div class="card-meta-pill" title="Total Experience">
            <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M216,56H176V48a24,24,0,0,0-24-24H104A24,24,0,0,0,80,48v8H40A16,16,0,0,0,24,72V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V72A16,16,0,0,0,216,56ZM96,48a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96ZM216,72v41.61A184,184,0,0,1,128,136a184.07,184.07,0,0,1-88-22.38V72Zm0,128H40V131.64A200.19,200.19,0,0,0,128,152a200.25,200.25,0,0,0,88-20.37V200Z"/></svg>
            <span><strong>${candExp}</strong></span>
          </div>

          <div class="card-meta-pill" title="Current CTC">
            <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm40-88a8,8,0,0,1-8,8H136v24a8,8,0,0,1-16,0V136H96a8,8,0,0,1,0-16h24V96a8,8,0,0,1,16,0v24h24A8,8,0,0,1,168,128Z"/></svg>
            <span><strong>${candCtc}</strong></span>
          </div>

          <div class="card-meta-pill" title="Current Location">
            <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M128,64a40,40,0,1,0,40,40A40,40,0,0,0,128,64Zm0,64a24,24,0,1,1,24-24A24,24,0,0,1,128,128Zm0-112a88.1,88.1,0,0,0-88,88c0,31.4,14.51,64.68,42,96.25a254.19,254.19,0,0,0,41.45,37.3,8,8,0,0,0,9.18,0A254.19,254.19,0,0,0,174,202.25C201.49,170.68,216,137.4,216,104A88.1,88.1,0,0,0,128,16Zm0,206c-16.53-13-72-60.75-72-118a72,72,0,1,1,144,0C200,161.25,144.53,209,128,222Z"/></svg>
            <span>${candLoc}</span>
          </div>

          <div class="card-meta-pill" title="Notice Period">
            <svg viewBox="0 0 256 256" fill="currentColor" width="14" height="14"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"/></svg>
            <span><strong>${candNotice}</strong></span>
          </div>
        </div>

        <!-- Full-Width Dossier Rows: Current, Education, Key skills -->
        <div class="candidate-dossier-full">
          <div class="dossier-item">
            <span class="dossier-label">Current:</span>
            <div class="dossier-val">
              <strong>${candDesignation}</strong> at <span class="company-highlight">${candCompany}</span>
            </div>
          </div>

          <div class="dossier-item">
            <span class="dossier-label">Education:</span>
            <div class="dossier-val">
              <span style="color: var(--ink-primary); font-weight: 500;">${candDegree}</span>
            </div>
          </div>

          <div class="dossier-item">
            <span class="dossier-label">Key skills:</span>
            <div class="dossier-val">
              <span class="dossier-skills-text">${candSkills.join(', ')}</span>
            </div>
          </div>
        </div>

        <!-- Card Footer: Applied Date (no time) + Comments Button + Rating + History Link + Squared Rounded Status Select -->
        <div class="candidate-card-footer">
          <div class="candidate-footer-left">
            <span class="applied-date-text" title="Application submission date">
              Applied on ${cleanAppliedDate}
            </span>

            <button type="button" class="comments-trigger-btn btn-open-comments" data-candidate-id="${candidate.id}" title="View evaluation notes & comments">
              <svg viewBox="0 0 256 256" fill="currentColor" width="13" height="13"><path d="M216,48H40A16,16,0,0,0,24,64V224a8,8,0,0,0,13.66,5.66L73.37,192H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM216,176H70.06a8,8,0,0,0-5.66,2.34L40,202.34V64H216Z"/></svg>
              <span>${commentsCount} comment${commentsCount === 1 ? '' : 's'}</span>
            </button>

            <div class="candidate-rating-wrap" title="Candidate Evaluation Score">
              <span class="rating-stars">★★★★☆</span>
              <span class="rating-score-text">${candRating} / 5.0</span>
            </div>
          </div>

          <div class="candidate-footer-right">
            <button type="button" class="history-trigger-btn btn-open-history" data-candidate-id="${candidate.id}" title="View recruitment timeline history">
              History
            </button>

            <div class="applicant-status-select-wrap">
              <select class="applicant-status-select ${statusClass}" data-candidate-id="${candidate.id}" data-current-status="${statusVal}" aria-label="Recruitment status for ${candName}">
                ${APPLICANT_STATUSES.map((s) => `
                  <option value="${s.value}" ${s.value === statusVal ? 'selected' : ''}>${s.label}</option>
                `).join('')}
              </select>
            </div>
          </div>
        </div>

      </article>
    `;
  }).join('');

  attachCardEvents();
}

/* --------------------------------------------------------------------------
   Card Event Listeners & Interactive Handlers
   -------------------------------------------------------------------------- */
function attachCardEvents() {
  // Checkbox selection
  document.querySelectorAll('.candidate-select-checkbox').forEach((chk) => {
    chk.addEventListener('change', () => {
      const id = Number(chk.dataset.candidateId);
      const card = chk.closest('.candidate-card');
      if (chk.checked) {
        selectedCandidateIds.add(id);
        card?.classList.add('is-selected');
      } else {
        selectedCandidateIds.delete(id);
        card?.classList.remove('is-selected');
      }
      updateBulkActionBar();
    });
  });

  // Direct Resume Lightbox triggers
  document.querySelectorAll('.btn-direct-resume').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.candidateName || 'Candidate';
      const role = btn.dataset.candidateRole || 'Application Resume';
      document.getElementById('resume-lightbox-candidate-name').textContent = `${name} — Resume`;
      document.getElementById('resume-lightbox-candidate-role').textContent = `${role} • Verified application attachment`;
      openModal('resume-preview-modal');
    });
  });

  // Open Comments Drawer triggers
  document.querySelectorAll('.btn-open-comments').forEach((btn) => {
    btn.addEventListener('click', () => {
      const candidateId = Number(btn.dataset.candidateId);
      openCommentsDrawer(candidateId);
    });
  });

  // Open History Drawer triggers
  document.querySelectorAll('.btn-open-history').forEach((btn) => {
    btn.addEventListener('click', () => {
      const candidateId = Number(btn.dataset.candidateId);
      openHistoryDrawer(candidateId);
    });
  });
}

/* --------------------------------------------------------------------------
   Comments Slide-Over Drawer Engine (Chats on Surface)
   -------------------------------------------------------------------------- */
function openCommentsDrawer(candidateId) {
  const candidate = allCandidates.find((c) => c.id === candidateId) || currentJobCandidates.find((c) => c.id === candidateId);
  if (!candidate) return;

  activeDrawerCandidateId = candidateId;

  const candName = candidate.fullName || candidate.name || 'Candidate';
  document.getElementById('drawer-candidate-name').textContent = candName;
  document.getElementById('drawer-candidate-role').textContent = `${candidate.designation || 'Candidate'} • ${candidate.currentCompanyName || 'Tech Enterprise'}`;

  const avatarContainer = document.getElementById('drawer-candidate-avatar');
  if (avatarContainer) {
    avatarContainer.innerHTML = candidate.avatar
      ? `<img src="${candidate.avatar}" alt="${candName}">`
      : `<div class="avatar-fallback">${candName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>`;
  }

  renderDrawerComments(candidate);

  const overlay = document.getElementById('comments-drawer-overlay');
  if (overlay) {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
  }

  setTimeout(() => {
    document.getElementById('drawer-new-comment-input')?.focus();
  }, 100);
}

function closeCommentsDrawer() {
  const overlay = document.getElementById('comments-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }
  activeDrawerCandidateId = null;
  const input = document.getElementById('drawer-new-comment-input');
  if (input) input.value = '';
}

function renderDrawerComments(candidate) {
  const listEl = document.getElementById('drawer-comments-list');
  const countEl = document.getElementById('drawer-comments-count');
  const comments = candidate.comments || [];

  if (countEl) countEl.textContent = comments.length;
  if (!listEl) return;

  if (!comments.length) {
    listEl.innerHTML = `
      <div class="drawer-comments-empty">
        No evaluation notes or comments added yet for this candidate. Add the first note below.
      </div>
    `;
    return;
  }

  listEl.innerHTML = comments.map((comment) => `
    <div class="drawer-comment-item">
      <div class="drawer-comment-header">
        <div class="drawer-comment-author-wrap">
          <img src="${comment.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}" alt="${comment.author}" class="drawer-comment-avatar">
          <div>
            <span class="drawer-comment-author-name">${comment.author}</span>
            <span class="drawer-comment-author-role"> • ${comment.role || 'Recruiter'}</span>
          </div>
        </div>
        <span class="drawer-comment-date">${comment.date}</span>
      </div>
      <p class="drawer-comment-body">${comment.text}</p>
    </div>
  `).join('');
}

function initCommentsDrawer() {
  const overlay = document.getElementById('comments-drawer-overlay');
  const closeBtn = document.getElementById('drawer-close-btn');
  const form = document.getElementById('drawer-add-comment-form');
  const textarea = document.getElementById('drawer-new-comment-input');

  closeBtn?.addEventListener('click', closeCommentsDrawer);

  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeCommentsDrawer();
  });

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!activeDrawerCandidateId) return;

    const text = textarea?.value.trim();
    if (!text) return;

    const candidate = allCandidates.find((c) => c.id === activeDrawerCandidateId) || currentJobCandidates.find((c) => c.id === activeDrawerCandidateId);
    if (!candidate) return;

    if (!candidate.comments) candidate.comments = [];

    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const formattedDate = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newComment = {
      author: 'Taylor Brooks',
      role: 'Super Admin',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      date: formattedDate,
      text: text
    };

    candidate.comments.unshift(newComment);
    candidate.commentsCount = candidate.comments.length;

    saveCollection(CANDIDATES_KEY, allCandidates);

    renderDrawerComments(candidate);
    if (textarea) textarea.value = '';

    const cardCommentBtn = document.querySelector(`.candidate-card[data-candidate-id="${candidate.id}"] .comments-trigger-btn span`);
    if (cardCommentBtn) {
      cardCommentBtn.textContent = `${candidate.comments.length} comment${candidate.comments.length === 1 ? '' : 's'}`;
    }

    showToast('Evaluation note posted successfully!', 'success');
  });
}

/* --------------------------------------------------------------------------
   Candidate History Timeline Slide-Over Drawer
   -------------------------------------------------------------------------- */
function openHistoryDrawer(candidateId) {
  const candidate = allCandidates.find((c) => c.id === candidateId) || currentJobCandidates.find((c) => c.id === candidateId);
  if (!candidate) return;

  const candName = candidate.fullName || candidate.name || 'Candidate';
  document.getElementById('history-drawer-candidate-name').textContent = candName;
  document.getElementById('history-drawer-candidate-role').textContent = `${candidate.designation || 'Candidate'} • ${candidate.currentCompanyName || 'Tech Enterprise'}`;

  const avatarContainer = document.getElementById('history-drawer-avatar');
  if (avatarContainer) {
    avatarContainer.innerHTML = candidate.avatar
      ? `<img src="${candidate.avatar}" alt="${candName}">`
      : `<div class="avatar-fallback">${candName.split(' ').map((n) => n[0]).join('').slice(0, 2)}</div>`;
  }

  // Populate timeline nodes
  const timelineEl = document.getElementById('history-drawer-timeline');
  if (timelineEl) {
    const historyNodes = candidate.history && candidate.history.length > 0
      ? candidate.history
      : [
          { text: `Candidate currently in ${candidate.status || 'Under Review'} stage`, time: `${candidate.appliedOn} · Current active status`, active: true },
          { text: `Application submitted for ${currentJob ? currentJob.title : 'open position'}`, time: `${candidate.appliedOn}`, active: false }
        ];

    timelineEl.innerHTML = historyNodes.map((node, idx) => `
      <div class="history-node">
        <div class="history-dot ${node.active || idx === 0 ? 'dot-active' : ''}"></div>
        <div class="history-text">${node.text}</div>
        <div class="history-time">${node.time}</div>
      </div>
    `).join('');
  }

  const overlay = document.getElementById('history-drawer-overlay');
  if (overlay) {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
  }
}

function closeHistoryDrawer() {
  const overlay = document.getElementById('history-drawer-overlay');
  if (overlay) {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
  }
}

function initHistoryDrawer() {
  const overlay = document.getElementById('history-drawer-overlay');
  const closeBtn = document.getElementById('history-drawer-close-btn');

  closeBtn?.addEventListener('click', closeHistoryDrawer);
  overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeHistoryDrawer();
  });
}

/* --------------------------------------------------------------------------
   Bulk Selection Bar Handlers (Light Mode & Stage Change Dropdown)
   -------------------------------------------------------------------------- */
function updateBulkActionBar() {
  const bulkBar = document.getElementById('applicants-bulk-bar');
  const countText = document.getElementById('bulk-selected-text');
  const selectAllChk = document.getElementById('header-select-all');
  const bulkSelectAllChk = document.getElementById('bulk-select-all-checkbox');
  const bulkStatusSelect = document.getElementById('bulk-status-select');
  const count = selectedCandidateIds.size;

  if (count > 0) {
    bulkBar?.classList.remove('hidden');
    if (countText) countText.textContent = `${count} candidate${count === 1 ? '' : 's'} selected`;
    if (selectAllChk) selectAllChk.checked = count === currentJobCandidates.length;
    if (bulkSelectAllChk) bulkSelectAllChk.checked = count === currentJobCandidates.length;
    if (bulkStatusSelect) bulkStatusSelect.selectedIndex = 0;
  } else {
    bulkBar?.classList.add('hidden');
    if (selectAllChk) selectAllChk.checked = false;
    if (bulkSelectAllChk) bulkSelectAllChk.checked = false;
  }
}

function initBulkActions() {
  const selectAllChk = document.getElementById('header-select-all');
  const bulkSelectAllChk = document.getElementById('bulk-select-all-checkbox');
  const clearSelectionBtn = document.getElementById('bulk-clear-selection-btn');
  const bulkStatusSelect = document.getElementById('bulk-status-select');

  function toggleSelectAll(checked) {
    const visibleCards = getFilteredAndSortedCandidates();
    if (checked) {
      visibleCards.forEach((c) => selectedCandidateIds.add(c.id));
    } else {
      selectedCandidateIds.clear();
    }
    renderCandidateCards(visibleCards);
    updateBulkActionBar();
  }

  selectAllChk?.addEventListener('change', (e) => toggleSelectAll(e.target.checked));
  bulkSelectAllChk?.addEventListener('change', (e) => toggleSelectAll(e.target.checked));

  clearSelectionBtn?.addEventListener('click', () => {
    selectedCandidateIds.clear();
    renderCandidateCards(getFilteredAndSortedCandidates());
    updateBulkActionBar();
  });

  // Bulk Status Dropdown Change Triggering Confirmation Modal
  bulkStatusSelect?.addEventListener('change', (e) => {
    const newStatus = e.target.value;
    if (!newStatus || !selectedCandidateIds.size) return;

    const count = selectedCandidateIds.size;

    pendingStatusChange = {
      isBulk: true,
      candidateIds: Array.from(selectedCandidateIds),
      candidateName: `${count} selected candidates`,
      oldStatus: 'Current stages',
      newStatus: newStatus
    };

    document.getElementById('confirm-candidate-name').textContent = `${count} selected candidates`;

    const newMeta = getStatusMeta(newStatus);
    const newBadgeClass = newMeta.class.replace('status-', 'status-pill-');

    document.getElementById('confirm-old-status-badge').innerHTML = `
      <span class="status-modal-badge status-pill-under-review">Various stages (${count})</span>
    `;
    document.getElementById('confirm-new-status-badge').innerHTML = `
      <span class="status-modal-badge ${newBadgeClass}">${newStatus}</span>
    `;

    openModal('status-confirm-modal');
  });
}

/* --------------------------------------------------------------------------
   Status Change Handlers & Confirmation Modal
   -------------------------------------------------------------------------- */
function initStatusChangeHandlers() {
  const container = document.getElementById('candidate-cards-container');
  const modal = document.getElementById('status-confirm-modal');
  const closeBtn = document.getElementById('status-modal-close-btn');
  const cancelBtn = document.getElementById('confirm-status-cancel-btn');
  const submitBtn = document.getElementById('confirm-status-submit-btn');

  container?.addEventListener('change', (e) => {
    const select = e.target.closest('.applicant-status-select');
    if (!select) return;

    const candidateId = Number(select.dataset.candidateId);
    const oldStatus = select.dataset.currentStatus || 'Under Review';
    const newStatus = select.value;

    if (oldStatus === newStatus) return;

    const candidate = allCandidates.find((c) => c.id === candidateId) || currentJobCandidates.find((c) => c.id === candidateId);
    if (!candidate) return;

    pendingStatusChange = {
      isBulk: false,
      candidateId,
      candidateName: candidate.fullName || candidate.name,
      oldStatus,
      newStatus,
      selectElement: select
    };

    document.getElementById('confirm-candidate-name').textContent = candidate.fullName || candidate.name;

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
    if (pendingStatusChange && !pendingStatusChange.isBulk && pendingStatusChange.selectElement) {
      pendingStatusChange.selectElement.value = pendingStatusChange.oldStatus;
    }
    const bulkSelect = document.getElementById('bulk-status-select');
    if (bulkSelect) bulkSelect.selectedIndex = 0;
    pendingStatusChange = null;
    closeModal('status-confirm-modal');
  }

  function confirmStatusChange() {
    if (!pendingStatusChange) return;

    if (pendingStatusChange.isBulk) {
      const { candidateIds, newStatus } = pendingStatusChange;
      const count = candidateIds.length;
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const timestamp = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      candidateIds.forEach((id) => {
        const match = allCandidates.find((c) => c.id === id);
        if (match) {
          match.status = newStatus;
          if (!match.history) match.history = [];
          match.history.forEach((h) => (h.active = false));
          match.history.unshift({ text: `Candidate stage updated to ${newStatus}`, time: timestamp, active: true });
        }
        const curMatch = currentJobCandidates.find((c) => c.id === id);
        if (curMatch) {
          curMatch.status = newStatus;
        }
      });

      saveCollection(CANDIDATES_KEY, allCandidates);
      selectedCandidateIds.clear();
      closeModal('status-confirm-modal');
      showToast(`Successfully updated ${count} candidates to "${newStatus}"!`, 'success');
      pendingStatusChange = null;
      applyFiltersAndRender();
      return;
    }

    const { candidateId, candidateName, newStatus, selectElement } = pendingStatusChange;
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const timestamp = `${months[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()} · ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const match = allCandidates.find((c) => c.id === candidateId);
    if (match) {
      match.status = newStatus;
      if (!match.history) match.history = [];
      match.history.forEach((h) => (h.active = false));
      match.history.unshift({ text: `Candidate stage updated to ${newStatus}`, time: timestamp, active: true });
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
    showToast(`Recruitment stage for "${candidateName}" updated to "${newStatus}"!`, 'success');
    pendingStatusChange = null;

    applyFiltersAndRender();
  }

  closeBtn?.addEventListener('click', cancelStatusChange);
  cancelBtn?.addEventListener('click', cancelStatusChange);
  submitBtn?.addEventListener('click', confirmStatusChange);

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) cancelStatusChange();
  });
}

/* --------------------------------------------------------------------------
   CSV Export Functionality
   -------------------------------------------------------------------------- */
function exportApplicantsCSV(items) {
  if (!items.length) {
    showToast('No candidate profiles to export.', 'error');
    return;
  }

  const headers = ['S.No.', 'Candidate Name', 'Gender', 'Designation', 'Current Company', 'Experience', 'Current CTC', 'Notice Period', 'Email ID', 'Phone No.', 'Location', 'Status'];
  const rows = items.map((c, idx) => [
    idx + 1,
    `"${c.fullName || c.name}"`,
    `"${c.gender || 'Male'}"`,
    `"${c.designation || ''}"`,
    `"${c.currentCompanyName || ''}"`,
    `"${c.totalExp || ''}"`,
    `"${c.currentCtc || ''}"`,
    `"${c.noticePeriod || ''}"`,
    `"${c.email || ''}"`,
    `"${c.phone || ''}"`,
    `"${c.currentLocation || c.location || ''}"`,
    `"${c.status || 'Under Review'}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `candidates-${currentJob ? currentJob.title.toLowerCase().replace(/\s+/g, '-') : 'job'}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast('Candidates directory exported to CSV!', 'success');
}

/* --------------------------------------------------------------------------
   Master Apply Filters & Re-Render
   -------------------------------------------------------------------------- */
function applyFiltersAndRender() {
  const filtered = getFilteredAndSortedCandidates();
  renderCandidateCards(filtered);
  renderActiveFilterChips();
  updateFacetBadgeCounts();
  updateBulkActionBar();
}

/* --------------------------------------------------------------------------
   Main Initializer on DOM Ready
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initJobContext();
  initApplicantTabs();
  populateDynamicFacets();
  initFacetAccordions();
  initStatusChangeHandlers();
  initBulkActions();
  initCommentsDrawer();
  initHistoryDrawer();

  // Initial Render
  applyFiltersAndRender();

  // Search Input Listeners
  const searchInput = document.getElementById('applicant-search');
  const clearSearchBtn = document.getElementById('applicant-search-clear');

  searchInput?.addEventListener('input', () => {
    if (searchInput.value.trim()) {
      clearSearchBtn?.classList.remove('hidden');
    } else {
      clearSearchBtn?.classList.add('hidden');
    }
    applyFiltersAndRender();
  });

  clearSearchBtn?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    clearSearchBtn.classList.add('hidden');
    applyFiltersAndRender();
  });

  // Sort Select Listener
  document.getElementById('applicant-sort-select')?.addEventListener('change', applyFiltersAndRender);

  // Facet Checkbox Change Listeners
  document.querySelector('.filter-facet-sections')?.addEventListener('change', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
      applyFiltersAndRender();
    }
  });

  // Clear All Filters Button
  document.getElementById('filter-clear-all-btn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    clearSearchBtn?.classList.add('hidden');
    document.querySelectorAll('.filter-facet-sections input[type="checkbox"]').forEach((chk) => {
      chk.checked = false;
    });
    applyFiltersAndRender();
    showToast('All facet filters cleared.', 'info');
  });

  // Empty State Reset Button
  document.getElementById('empty-reset-filters-btn')?.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    clearSearchBtn?.classList.add('hidden');
    document.querySelectorAll('.filter-facet-sections input[type="checkbox"]').forEach((chk) => {
      chk.checked = false;
    });
    applyFiltersAndRender();
  });

  // CSV Export Button
  document.getElementById('export-applicants-csv-btn')?.addEventListener('click', () => {
    const filtered = getFilteredAndSortedCandidates();
    exportApplicantsCSV(filtered);
  });
});
