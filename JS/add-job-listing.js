/* ==========================================================================
   Add / Edit / Review Job Requisition — Canvas & Management
   Auto-Fill Details, LinkedIn Social Share Composer & Markdown Generator
   ========================================================================== */

const JOBS_KEY = 'fwc-job-listings';

let editingJob = null;
let isReviewMode = false;
let uploadedPdfName = 'cybersecurity-analyst-jd.pdf';
let uploadedPdfSize = '1.4 MB';
let currentSkills = ['SIEM & Splunk', 'AWS Security', 'SOC2 / HIPAA Compliance', 'Zero-Trust'];
let currentJobForShare = null;

const sampleAutoFillPresets = [
  {
    title: 'Senior Cybersecurity Analyst',
    department: 'Cybersecurity',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Mid-Level (3–5 Yrs)',
    salary: '$120,000 – $145,000 / yr',
    overview: 'We are looking for a Senior Cybersecurity Analyst to safeguard client cloud infrastructure, lead proactive threat hunting, and support SOC2/HIPAA-aligned delivery across our distributed engineering teams.',
    responsibilities: [
      'Lead continuous monitoring, threat intelligence analysis, and proactive vulnerability management across AWS environments.',
      'Collaborate with platform engineering teams to architect zero-trust network boundaries and IAM policies.',
      'Maintain continuous audit readiness for SOC2 Type II, HIPAA, and ISO 27001 certifications.'
    ],
    skills: ['SIEM & Splunk', 'AWS Security', 'SOC2 / HIPAA Compliance', 'Zero-Trust', 'Threat Modeling'],
    pdfName: 'cybersecurity-analyst-jd.pdf',
    pdfSize: '1.4 MB'
  },
  {
    title: 'Senior AI & LLM Systems Engineer',
    department: 'AI & Advanced Tech',
    location: 'Alhambra, CA',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$145,000 – $175,000 / yr',
    overview: 'Drive enterprise generative AI and Retrieval-Augmented Generation (RAG) system deployments for Fortune 500 manufacturing and financial intelligence pipelines.',
    responsibilities: [
      'Design high-throughput vector database pipelines using pgvector, Pinecone, and LangChain/LlamaIndex.',
      'Fine-tune open-weight models (Llama 3, Mistral) for domain-specific technical documentation retrieval.',
      'Implement enterprise guardrails, semantic latency caching, and automated evals frameworks.'
    ],
    skills: ['Generative AI / LLMs', 'Python & PyTorch', 'Vector Databases (RAG)', 'LangChain / LlamaIndex', 'AWS Bedrock'],
    pdfName: 'ai-llm-engineer-jd.pdf',
    pdfSize: '1.5 MB'
  },
  {
    title: 'Principal Cloud Solutions Architect',
    department: 'Cloud Services',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Staff / Lead (8+ Yrs)',
    salary: '$155,000 – $185,000 / yr',
    overview: 'Lead the architecture and design of high-throughput multi-region AWS and Azure cloud environments for enterprise clients undergoing modernization.',
    responsibilities: [
      'Architect enterprise-scale AWS/Azure landing zones utilizing Terraform and Terragrunt.',
      'Define zero-trust network boundaries, IAM least-privilege hierarchies, and automated CI/CD gating.',
      'Lead technical architecture review boards and steer client engineering leadership on modernization.'
    ],
    skills: ['AWS Solutions Architecture', 'Terraform', 'Kubernetes / EKS', 'Zero-Trust Security', 'Multi-Region High Availability'],
    pdfName: 'principal-cloud-architect-jd.pdf',
    pdfSize: '1.6 MB'
  }
];

let autoFillIndex = 0;

const cursourcePresets = {
  'cs-1': sampleAutoFillPresets[2],
  'cs-2': {
    title: 'Lead Full-Stack React / Node Engineer',
    department: 'Engineering',
    location: 'Alhambra, CA',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$130,000 – $160,000 / yr',
    overview: 'Drive full-stack microfrontend and backend service development across high-velocity agile pods building real-time client analytics dashboards.',
    responsibilities: [
      'Engineer robust React TypeScript web applications with microfrontend architectures and SSR.',
      'Design event-driven Node.js / NestJS microservices backed by Redis and PostgreSQL.',
      'Mentor junior and mid-level engineers through code reviews and technical design specifications.'
    ],
    skills: ['React / Next.js', 'Node.js / NestJS', 'TypeScript', 'PostgreSQL', 'GraphQL & REST'],
    pdfName: 'lead-fullstack-engineer-jd.pdf',
    pdfSize: '1.2 MB'
  },
  'cs-3': {
    title: 'Senior Data Governance & Compliance Lead',
    department: 'Cybersecurity',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Senior (5–8 Yrs)',
    salary: '$140,000 – $170,000 / yr',
    overview: 'Direct enterprise data privacy, regulatory compliance (SOC2, HIPAA, GDPR, DORA), and data lineage framework implementations across multi-cloud environments.',
    responsibilities: [
      'Establish enterprise data governance catalogs and classification taxonomy across AWS and Snowflake.',
      'Partner with internal audit and external assessors for ISO 27001, SOC2 Type II, and HIPAA certifications.',
      'Automate policy-as-code controls to detect data exfiltration and unauthorized PII access.'
    ],
    skills: ['SOC2 & HIPAA Compliance', 'Data Lineage & Collibra', 'Snowflake Governance', 'ISO 27001', 'Policy as Code'],
    pdfName: 'data-governance-lead-jd.pdf',
    pdfSize: '1.8 MB'
  }
};

function getParams() {
  return new URLSearchParams(window.location.search);
}

function formatNow() {
  const now = new Date();
  const datePart = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  const timePart = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return `${datePart} · ${timePart}`;
}

function renderSkills() {
  const container = document.getElementById('job-skills-tags');
  if (!container) return;
  container.innerHTML = currentSkills.map((skill, idx) => `
    <span class="job-skill-tag">
      ${skill}
      <span class="remove-tag" data-skill-idx="${idx}">✕</span>
    </span>
  `).join('');
}

function initSkillsTagInput() {
  const input = document.getElementById('field-skills-input');
  if (!input) return;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = input.value.trim().replace(/,/g, '');
      if (val && !currentSkills.includes(val)) {
        currentSkills.push(val);
        renderSkills();
        input.value = '';
      }
    }
  });

  document.getElementById('job-skills-tags')?.addEventListener('click', (e) => {
    const btn = e.target.closest('.remove-tag');
    if (!btn) return;
    const idx = Number(btn.dataset.skillIdx);
    currentSkills.splice(idx, 1);
    renderSkills();
  });

  renderSkills();
}

function initPdfUploader() {
  const dropzone = document.getElementById('pdf-dropzone-trigger');
  const fileInput = document.getElementById('pdf-file-input');
  const browseBtn = document.getElementById('pdf-browse-btn');

  dropzone?.addEventListener('click', () => fileInput.click());
  browseBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    fileInput.click();
  });

  fileInput?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      uploadedPdfName = file.name;
      uploadedPdfSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      document.getElementById('attached-pdf-name').textContent = uploadedPdfName;
      document.getElementById('attached-pdf-size').textContent = `${uploadedPdfSize} · Attached PDF document`;
    }
  });
}

function applyPresetToForm(preset) {
  document.getElementById('job-title-input').value = preset.title;
  document.getElementById('field-location').value = preset.location;
  document.getElementById('field-type').value = preset.type;
  document.getElementById('field-experience').value = preset.experience;
  document.getElementById('field-overview').value = preset.overview;
  document.getElementById('field-responsibilities').value = preset.responsibilities.map((r) => `• ${r}`).join('\n');

  currentSkills = [...preset.skills];
  renderSkills();

  uploadedPdfName = preset.pdfName;
  uploadedPdfSize = preset.pdfSize;
  document.getElementById('attached-pdf-name').textContent = uploadedPdfName;
  document.getElementById('attached-pdf-size').textContent = `${uploadedPdfSize} · Attached PDF specification`;
}

function initAutoFillButton() {
  const btn = document.getElementById('auto-fill-btn');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const preset = sampleAutoFillPresets[autoFillIndex % sampleAutoFillPresets.length];
    autoFillIndex++;
    applyPresetToForm(preset);
    showToast(`Auto-filled details for "${preset.title}"!`, 'success');
  });
}

function initCurSourceModal() {
  const openBtn = document.getElementById('import-cursource-btn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      openModal('cursource-modal');
    });
  }

  document.getElementById('cursource-req-list')?.addEventListener('click', (e) => {
    const item = e.target.closest('.cursource-item');
    if (!item) return;
    const importId = item.dataset.importId;
    const preset = cursourcePresets[importId];
    if (!preset) return;

    applyPresetToForm(preset);
    closeModal('cursource-modal');
    showToast(`Imported "${preset.title}" from CurSource ATS!`, 'success');
  });
}

// --------------------------------------------------------------------------
// LinkedIn Post Composer & Social Share Generator
// --------------------------------------------------------------------------
function generateLinkedInMarkdown(job) {
  const title = job.title || 'Senior Engineering Specialist';
  const dept = job.department || 'Technology';
  const loc = job.location || 'Remote';
  const type = job.type || 'Full-time';
  const exp = job.experience || '3–5 Years';
  const sal = job.salary || '$120,000 – $145,000 / yr';
  
  let bullets = '';
  if (Array.isArray(job.responsibilities) && job.responsibilities.length) {
    bullets = job.responsibilities.map((r) => `- ${r.replace(/^[•\-]\s*/, '')}`).join('\n');
  } else if (job.responsibilities) {
    bullets = job.responsibilities.split(/•|\n/).map((s) => s.trim()).filter(Boolean).map((s) => `- ${s}`).join('\n');
  } else {
    bullets = '- Drive technical excellence across enterprise client engagements\n- Collaborate with cross-functional architecture and delivery pods\n- Implement best practices in code quality and infrastructure security';
  }

  const tagList = Array.isArray(job.skills) && job.skills.length 
    ? job.skills.map((s) => `#${s.replace(/[^a-zA-Z0-9]/g, '')}`).join(' ') + ' #FutureWorkforceCorp #Hiring'
    : '#Hiring #TechCareers #FutureWorkforceCorp #Innovation';

  const careerUrl = `https://fwc.com/careers/job-${job.id || 101}`;

  return `We are hiring: ${title} at Future Workforce Corp (FWC)

We are expanding our ${dept} practice to deliver high-impact enterprise technology solutions for our global clients. If you are looking to work with world-class engineering teams on modern architectures, we would love to connect.

Position Details:
- Location: ${loc}
- Employment Type: ${type} | Experience: ${exp}
- Compensation: ${sal}

Key Responsibilities:
${bullets}

Required Competencies:
${tagList}

Apply directly or explore all career opportunities at:
${careerUrl}`;
}

function openLinkedInComposer(job) {
  currentJobForShare = job;

  // Populate Written Announcement Copy
  const markdownText = generateLinkedInMarkdown(job);
  const editor = document.getElementById('linkedin-post-editor');
  if (editor) editor.value = markdownText;

  openModal('linkedin-composer-modal');
}

function initLinkedInComposer() {
  // Social Channel Picker -> Select LinkedIn
  document.getElementById('select-linkedin-channel')?.addEventListener('click', () => {
    closeModal('social-share-channel-modal');
    if (currentJobForShare) {
      openLinkedInComposer(currentJobForShare);
    }
  });

  // Copy Post Text
  document.getElementById('copy-linkedin-text-btn')?.addEventListener('click', () => {
    const editor = document.getElementById('linkedin-post-editor');
    if (editor) {
      navigator.clipboard.writeText(editor.value).then(() => {
        showToast('Copied announcement text to clipboard!', 'success');
      }).catch(() => {
        editor.select();
        document.execCommand('copy');
        showToast('Copied announcement text to clipboard!', 'success');
      });
    }
  });

  // Download Banner Graphic
  document.getElementById('download-banner-btn')?.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = '../../assets/banners/linkedin-hiring-banner.jpg';
    link.download = 'fwc-hiring-banner.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Downloaded recruitment banner image!', 'success');
  });

  // Direct Share to LinkedIn
  document.getElementById('share-linkedin-direct-btn')?.addEventListener('click', () => {
    const editor = document.getElementById('linkedin-post-editor');
    const text = editor ? editor.value : '';
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://fwc.com/careers/job-' + (currentJobForShare?.id || 101))}`;
    
    // Copy content for easy paste into LinkedIn
    if (editor) {
      navigator.clipboard.writeText(text);
    }
    
    showToast('Announcement text copied! Opening LinkedIn sharing composer...', 'success');
    window.open(shareUrl, '_blank', 'width=650,height=600');
  });
}

// --------------------------------------------------------------------------
// Pure Read-Only Written Document Review Flow (NO EDITING / NO CARDS / NO EMOJIS)
// --------------------------------------------------------------------------
function setupReviewMode(job) {
  isReviewMode = true;
  currentJobForShare = job;

  document.getElementById('page-title').textContent = `Review: ${job.title} — FWC Super Admin`;
  
  // Breadcrumbs
  const parentBreadcrumb = document.getElementById('breadcrumb-parent');
  if (parentBreadcrumb) {
    parentBreadcrumb.href = 'approval-requests.html';
    parentBreadcrumb.textContent = 'Approval Requests';
  }
  const currBreadcrumb = document.getElementById('breadcrumb-current');
  if (currBreadcrumb) {
    currBreadcrumb.textContent = 'Review Requisition';
  }
  document.getElementById('page-heading').textContent = 'Review Job Requisition';

  // Active sidebar link
  document.getElementById('nav-link-jobs')?.classList.remove('active');
  document.getElementById('nav-link-approvals')?.classList.add('active');

  // Header action bar toggles
  document.getElementById('normal-header-actions')?.classList.add('hidden');
  document.getElementById('review-header-actions')?.classList.remove('hidden');
  document.getElementById('review-back-icon-btn')?.classList.remove('hidden');

  document.getElementById('job-header-heading').textContent = job.title;
  document.getElementById('job-header-subtext').textContent = `Submitted by ${job.department} on ${job.submitted}`;

  // Hide Create Canvas Form, Show Pure Read-Only Document
  document.getElementById('job-creation-canvas')?.classList.add('hidden');
  const reviewDoc = document.getElementById('job-review-canvas');
  if (reviewDoc) {
    reviewDoc.classList.remove('hidden');

    // Populate Read-Only Typography Content
    document.getElementById('review-display-title').textContent = job.title;
    document.getElementById('review-val-loc').textContent = job.location || 'Remote';
    document.getElementById('review-val-type').textContent = job.type || 'Full-time';
    document.getElementById('review-val-exp').textContent = job.experience || '3–5 Years';

    document.getElementById('review-display-overview').textContent = job.overview || job.excerpt || 'No specific overview provided.';

    // Bullets
    const respContainer = document.getElementById('review-display-responsibilities');
    if (Array.isArray(job.responsibilities) && job.responsibilities.length) {
      respContainer.innerHTML = job.responsibilities.map((r) => `<li>${r}</li>`).join('');
    } else if (job.responsibilities) {
      const parts = job.responsibilities.split(/•|\n/).map((s) => s.trim()).filter(Boolean);
      respContainer.innerHTML = parts.map((r) => `<li>${r}</li>`).join('');
    } else {
      respContainer.innerHTML = `<li>Standard role responsibilities apply.</li>`;
    }

    // Skills
    const skillsContainer = document.getElementById('review-display-skills');
    const skills = Array.isArray(job.skills) && job.skills.length ? job.skills : ['Technical Leadership', 'Problem Solving', 'Domain Expertise'];
    skillsContainer.innerHTML = skills.map((s) => `<span class="job-skill-tag">${s}</span>`).join('');

    // PDF
    const pdfName = job.pdfName || 'job-specification.pdf';
    const pdfSize = job.pdfSize || '1.4 MB';
    document.getElementById('review-display-pdf-name').textContent = `${pdfName} (${pdfSize})`;
  }

  // Approve Trigger
  document.getElementById('review-approve-btn')?.addEventListener('click', () => {
    document.getElementById('approve-job-title').textContent = job.title;
    openModal('approve-job-modal');
  });

  // Confirm Approve -> Prompts Social Share
  document.getElementById('confirm-approve-job-btn')?.addEventListener('click', () => {
    let jobListings = loadCollection(JOBS_KEY, []);
    const match = jobListings.find((j) => j.id === job.id);
    if (match) {
      match.status = 'published';
      match.actionTakenOn = formatNow();
      match.feedback = null;
      saveCollection(JOBS_KEY, jobListings);
    }
    closeModal('approve-job-modal');
    showToast(`Approved "${job.title}" — published live!`, 'success');
    
    // Open Social Broadcast Modal
    setTimeout(() => {
      openModal('social-share-channel-modal');
    }, 350);
  });

  // Reject Trigger
  document.getElementById('review-reject-btn')?.addEventListener('click', () => {
    document.getElementById('reject-job-title').textContent = job.title;
    document.getElementById('rejection-job-reason').value = '';
    document.getElementById('rejection-job-error').style.display = 'none';
    openModal('reject-job-modal');
  });

  // Confirm Reject
  document.getElementById('confirm-reject-job-btn')?.addEventListener('click', () => {
    const reasonInput = document.getElementById('rejection-job-reason');
    const reason = reasonInput.value.trim();
    if (!reason) {
      document.getElementById('rejection-job-error').style.display = 'block';
      reasonInput.focus();
      return;
    }

    let jobListings = loadCollection(JOBS_KEY, []);
    const match = jobListings.find((j) => j.id === job.id);
    if (match) {
      match.status = 'rejected';
      match.actionTakenOn = formatNow();
      match.feedback = reason;
      saveCollection(JOBS_KEY, jobListings);
    }
    closeModal('reject-job-modal');
    showToast(`Rejected "${job.title}" and sent feedback notes.`, 'error');
    setTimeout(() => {
      window.location.href = 'approval-requests.html';
    }, 450);
  });
}

function triggerDeleteJobFlow() {
  const title = editingJob ? editingJob.title : (document.getElementById('job-title-input').value.trim() || 'Untitled Requisition');
  document.getElementById('delete-job-confirm-title').textContent = title;
  openModal('delete-job-modal');
}

function saveJobRequisition(status = 'pending') {
  const title = document.getElementById('job-title-input').value.trim();
  const overview = document.getElementById('field-overview').value.trim();
  const respVal = document.getElementById('field-responsibilities').value.trim();

  if (!title) {
    showToast('Please enter a role title for the requisition.', 'error');
    document.getElementById('job-title-input').focus();
    return false;
  }

  if (!overview) {
    showToast('Please describe the role overview.', 'error');
    document.getElementById('field-overview').focus();
    return false;
  }

  const dept = (editingJob && editingJob.department) ? editingJob.department : 'Engineering';
  const location = document.getElementById('field-location').value.trim() || 'Remote';
  const type = document.getElementById('field-type').value;
  const experience = document.getElementById('field-experience').value;
  const salary = (editingJob && editingJob.salary) ? editingJob.salary : '$130,000 – $160,000 / yr';

  const respItems = respVal
    .split(/•|\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  let jobListings = loadCollection(JOBS_KEY, []);
  const nowFormatted = formatNow();
  const today = new Date();
  const submittedISO = today.toISOString().slice(0, 10);

  let savedJob = null;

  if (editingJob) {
    editingJob.title = title;
    editingJob.location = location;
    editingJob.type = type;
    editingJob.experience = experience;
    editingJob.overview = overview;
    editingJob.responsibilities = respItems.length ? respItems : [overview];
    editingJob.skills = currentSkills;
    editingJob.pdfName = uploadedPdfName;
    editingJob.pdfSize = uploadedPdfSize;
    if (status) editingJob.status = status;
    saveCollection(JOBS_KEY, jobListings);
    savedJob = editingJob;
    showToast(status === 'published' ? 'Job published live!' : (status === 'draft' ? 'Draft saved successfully.' : 'Job submitted for approval! Status is now pending review.'), 'success');
  } else {
    const newId = jobListings.length ? Math.max(...jobListings.map((j) => j.id)) + 1 : 1;
    const newJob = {
      id: newId,
      title,
      department: dept,
      location,
      type,
      experience,
      salary,
      submitted: nowFormatted,
      submittedISO,
      status,
      actionTakenOn: null,
      feedback: null,
      pdfName: uploadedPdfName || 'job-spec.pdf',
      pdfSize: uploadedPdfSize || '1.2 MB',
      overview,
      responsibilities: respItems.length ? respItems : [overview],
      skills: currentSkills
    };
    jobListings.push(newJob);
    saveCollection(JOBS_KEY, jobListings);
    savedJob = newJob;
    showToast(status === 'published' ? 'Job published live!' : (status === 'draft' ? 'Draft saved successfully.' : 'Job submitted for approval! Status is now pending review.'), 'success');
  }

  currentJobForShare = savedJob;

  if (status === 'published') {
    setTimeout(() => {
      openModal('social-share-channel-modal');
    }, 400);
  } else {
    setTimeout(() => {
      window.location.href = 'job-listings.html';
    }, 450);
  }

  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  initSkillsTagInput();
  initPdfUploader();
  initCurSourceModal();
  initAutoFillButton();
  initLinkedInComposer();

  const params = getParams();
  const mode = params.get('mode');
  const targetId = params.get('id') ? Number(params.get('id')) : null;

  if (targetId != null) {
    const jobListings = loadCollection(JOBS_KEY, []);
    editingJob = jobListings.find((j) => j.id === targetId);

    if (editingJob) {
      if (mode === 'review') {
        setupReviewMode(editingJob);
      } else if (mode === 'edit') {
        document.getElementById('page-title').textContent = `Edit requisition — ${editingJob.title}`;
        document.getElementById('page-heading').textContent = 'Edit job posting';
        document.getElementById('breadcrumb-current').textContent = 'Edit job posting';
        document.getElementById('job-header-heading').textContent = `Edit: ${editingJob.title}`;
        document.getElementById('job-header-subtext').textContent = 'Modify requisition details and requirements.';

        // Reveal delete button in creator mode when editing existing requisition
        document.getElementById('delete-job-btn')?.classList.remove('hidden');

        document.getElementById('job-title-input').value = editingJob.title || '';
        document.getElementById('field-location').value = editingJob.location || 'Remote';
        document.getElementById('field-type').value = editingJob.type || 'Full-time';
        document.getElementById('field-experience').value = editingJob.experience || 'Mid-Level (3–5 Yrs)';
        document.getElementById('field-overview').value = editingJob.overview || editingJob.excerpt || '';

        if (Array.isArray(editingJob.responsibilities)) {
          document.getElementById('field-responsibilities').value = editingJob.responsibilities.map((r) => `• ${r}`).join('\n');
        }

        if (Array.isArray(editingJob.skills)) {
          currentSkills = [...editingJob.skills];
          renderSkills();
        }

        if (editingJob.pdfName) {
          uploadedPdfName = editingJob.pdfName;
          uploadedPdfSize = editingJob.pdfSize || '1.2 MB';
          document.getElementById('attached-pdf-name').textContent = uploadedPdfName;
          document.getElementById('attached-pdf-size').textContent = `${uploadedPdfSize} · Attached PDF Specification`;
        }
      }
    }
  }

  // Save Draft
  document.getElementById('save-draft-btn')?.addEventListener('click', () => {
    saveJobRequisition('draft');
  });

  // Submit for Approval (triggers confirmation modal)
  document.getElementById('submit-approval-btn')?.addEventListener('click', () => {
    const title = document.getElementById('job-title-input').value.trim();
    const overview = document.getElementById('field-overview').value.trim();

    if (!title) {
      showToast('Please enter a role title for the requisition before submitting.', 'error');
      document.getElementById('job-title-input').focus();
      return;
    }

    if (!overview) {
      showToast('Please describe the role overview before submitting.', 'error');
      document.getElementById('field-overview').focus();
      return;
    }

    document.getElementById('submit-job-confirm-title').textContent = title;
    openModal('submit-job-modal');
  });

  // Confirm Submit in Modal
  document.getElementById('confirm-submit-job-btn')?.addEventListener('click', () => {
    closeModal('submit-job-modal');
    saveJobRequisition('pending');
  });

  // Delete Handlers
  document.getElementById('delete-job-btn')?.addEventListener('click', triggerDeleteJobFlow);
  document.getElementById('review-delete-btn')?.addEventListener('click', triggerDeleteJobFlow);

  // Confirm Delete in Modal
  document.getElementById('confirm-delete-job-btn')?.addEventListener('click', () => {
    if (editingJob && editingJob.id) {
      let jobListings = loadCollection(JOBS_KEY, []);
      jobListings = jobListings.filter((j) => j.id !== editingJob.id);
      saveCollection(JOBS_KEY, jobListings);
    }
    closeModal('delete-job-modal');
    showToast('Job requisition has been permanently deleted.', 'error');
    setTimeout(() => {
      window.location.href = isReviewMode ? 'approval-requests.html' : 'job-listings.html';
    }, 450);
  });
});
