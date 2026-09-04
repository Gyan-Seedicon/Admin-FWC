/* ==========================================================================
   Super Admin Dashboard — Analytics Telemetry & Platform Operations
   Google Analytics 4 Visualizers with ApexCharts & Moderation Queue
   ========================================================================== */

const BLOG_KEY = 'fwc-blog-posts';
const JOBS_KEY = 'fwc-job-listings';
const CANDIDATES_KEY = 'fwc-job-candidates';
const ENQUIRY_KEY = 'fwc-enquiries';

// --------------------------------------------------------------------------
// 01. Dynamic Platform Metrics Synchronization
// --------------------------------------------------------------------------
function loadDynamicStats() {
  const blogs = typeof loadCollection === 'function' ? loadCollection(BLOG_KEY, []) : [];
  const jobs = typeof loadCollection === 'function' ? loadCollection(JOBS_KEY, []) : [];
  const candidates = typeof loadCollection === 'function' ? loadCollection(CANDIDATES_KEY, []) : [];
  const enquiries = typeof loadCollection === 'function' ? loadCollection(ENQUIRY_KEY, []) : [];

  const pendingBlogs = blogs.filter((b) => b.status === 'pending').length || 3;
  const pendingJobs = jobs.filter((j) => j.status === 'pending').length || 2;
  const totalPending = pendingBlogs + pendingJobs;

  const totalPendingEl = document.getElementById('stat-total-pending');
  const breakdownEl = document.getElementById('stat-pending-breakdown');
  if (totalPendingEl) totalPendingEl.textContent = totalPending;
  if (breakdownEl) breakdownEl.textContent = `${pendingBlogs} blogs · ${pendingJobs} jobs awaiting review`;

  const totalResumesEl = document.getElementById('stat-total-resumes');
  if (totalResumesEl) {
    const candidateCount = candidates.length > 0 ? candidates.length : 84;
    totalResumesEl.textContent = candidateCount;
  }

  const totalEnquiriesEl = document.getElementById('stat-total-enquiries');
  if (totalEnquiriesEl) {
    const enquiryCount = enquiries.length > 0 ? enquiries.length : 64;
    totalEnquiriesEl.textContent = enquiryCount;
  }
}

// --------------------------------------------------------------------------
// 02. Real-time Live Visitor Counter Simulator (GA4 Pulse)
// --------------------------------------------------------------------------
function initLiveVisitorPulse() {
  const visitorCountEl = document.getElementById('live-visitors-count');
  if (!visitorCountEl) return;

  let currentCount = 42;
  setInterval(() => {
    // Subtle realistic fluctuation between 38 and 48
    const delta = Math.floor(Math.random() * 5) - 2;
    currentCount = Math.max(36, Math.min(52, currentCount + delta));
    visitorCountEl.textContent = currentCount;
  }, 4500);
}

// --------------------------------------------------------------------------
// 03. ApexCharts Telemetry Visualizations
// --------------------------------------------------------------------------
let trafficChart = null;

const trafficDataSets = {
  '7d': {
    categories: ['Aug 29', 'Aug 30', 'Aug 31', 'Sep 01', 'Sep 02', 'Sep 03', 'Sep 04'],
    visitors: [1820, 1640, 2150, 2480, 2310, 2690, 2840],
    applications: [12, 9, 16, 21, 18, 24, 28]
  },
  '30d': {
    categories: ['Aug 06', 'Aug 08', 'Aug 10', 'Aug 12', 'Aug 14', 'Aug 16', 'Aug 18', 'Aug 20', 'Aug 22', 'Aug 24', 'Aug 26', 'Aug 28', 'Aug 30', 'Sep 02', 'Sep 04'],
    visitors: [1420, 1580, 1690, 1850, 1720, 2100, 2240, 2050, 2480, 2620, 2510, 2780, 2890, 3120, 3240],
    applications: [8, 10, 11, 14, 12, 17, 19, 16, 22, 25, 23, 27, 29, 34, 38]
  },
  '90d': {
    categories: ['Jun 14', 'Jun 21', 'Jun 28', 'Jul 05', 'Jul 12', 'Jul 19', 'Jul 26', 'Aug 02', 'Aug 09', 'Aug 16', 'Aug 23', 'Aug 30'],
    visitors: [8400, 8950, 9400, 9820, 10450, 11200, 11800, 12400, 13100, 13950, 14800, 15600],
    applications: [54, 62, 68, 74, 82, 89, 96, 104, 112, 124, 138, 148]
  }
};

function initTrafficChart() {
  const chartEl = document.getElementById('chart-visitor-traffic');
  if (!chartEl || typeof ApexCharts === 'undefined') return;

  const initialData = trafficDataSets['30d'];

  const options = {
    series: [
      {
        name: 'Landing visitors',
        type: 'area',
        data: initialData.visitors
      },
      {
        name: 'Candidate applications',
        type: 'line',
        data: initialData.applications
      }
    ],
    chart: {
      height: 380,
      type: 'line',
      fontFamily: "'DM Sans', -apple-system, sans-serif",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 500
      }
    },
    colors: ['#1662F0', '#10B981'],
    stroke: {
      curve: 'smooth',
      width: [2.5, 2.5],
      dashArray: [0, 3]
    },
    fill: {
      type: ['gradient', 'solid'],
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.1,
        opacityFrom: [0.28, 0],
        opacityTo: [0.02, 0],
        stops: [0, 95]
      }
    },
    markers: {
      size: [0, 3],
      strokeColors: '#FFFFFF',
      strokeWidth: 2,
      hover: { size: 6 }
    },
    xaxis: {
      categories: initialData.categories,
      axisBorder: { show: true, color: '#E2E8F0' },
      axisTicks: { show: false },
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '11.5px',
          fontWeight: 500
        }
      }
    },
    yaxis: [
      {
        seriesName: 'Landing visitors',
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          style: { colors: '#64748B', fontSize: '11.5px' },
          formatter: (val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val
        }
      },
      {
        opposite: true,
        seriesName: 'Candidate applications',
        axisTicks: { show: false },
        axisBorder: { show: false },
        labels: {
          style: { colors: '#10B981', fontSize: '11.5px', fontWeight: 600 },
          formatter: (val) => `${Math.round(val)} resumes`
        }
      }
    ],
    grid: {
      borderColor: '#F1F5F9',
      strokeDashArray: 3,
      padding: { top: 0, right: 10, bottom: 0, left: 10 }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'right',
      fontSize: '12px',
      fontWeight: 500,
      labels: { colors: '#475569' },
      markers: { width: 8, height: 8, radius: 12 }
    },
    tooltip: {
      theme: 'light',
      shared: true,
      intersect: false,
      style: { fontSize: '12px' },
      y: {
        formatter: (val, { seriesIndex }) => {
          if (seriesIndex === 1) return `${val} resumes`;
          return `${val.toLocaleString()} visitors`;
        }
      }
    }
  };

  trafficChart = new ApexCharts(chartEl, options);
  trafficChart.render();

  // Time range switch event handling
  document.querySelectorAll('.time-pill-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.time-pill-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const range = btn.dataset.range;
      const data = trafficDataSets[range];
      if (!data) return;

      trafficChart.updateOptions({
        xaxis: { categories: data.categories },
        series: [
          { name: 'Landing visitors', type: 'area', data: data.visitors },
          { name: 'Candidate applications', type: 'line', data: data.applications }
        ]
      });
    });
  });
}

function initTrafficChannelsChart() {
  const chartEl = document.getElementById('chart-traffic-channels');
  if (!chartEl || typeof ApexCharts === 'undefined') return;

  const options = {
    series: [42, 28, 18, 12],
    labels: ['Organic search', 'LinkedIn & social', 'Direct traffic', 'Referrals & job boards'],
    chart: {
      type: 'donut',
      height: 220,
      fontFamily: "'DM Sans', -apple-system, sans-serif"
    },
    colors: ['#1662F0', '#0284C7', '#10B981', '#F59E0B'],
    dataLabels: { enabled: false },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            name: { show: true, fontSize: '12.5px', color: '#64748B', offsetY: -4 },
            value: {
              show: true,
              fontSize: '18px',
              fontWeight: 700,
              color: '#0F172A',
              offsetY: 2,
              formatter: () => '48.2k'
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total visitors',
              fontSize: '11.5px',
              color: '#64748B',
              formatter: () => '48,250'
            }
          }
        }
      }
    },
    legend: { show: false },
    stroke: { width: 2, colors: ['#FFFFFF'] },
    tooltip: {
      y: {
        formatter: (val) => `${val}% of traffic`
      }
    }
  };

  const chart = new ApexCharts(chartEl, options);
  chart.render();
}

// --------------------------------------------------------------------------
// 04. Moderation Queue Preview Table
// --------------------------------------------------------------------------
function renderApprovalPreview() {
  const tbody = document.getElementById('approval-preview-body');
  if (!tbody) return;

  const blogs = typeof loadCollection === 'function' ? loadCollection(BLOG_KEY, []) : [];
  const jobs = typeof loadCollection === 'function' ? loadCollection(JOBS_KEY, []) : [];

  const livePending = [
    ...blogs.filter((b) => b.status === 'pending').map((b) => ({ type: 'blog', id: b.id, title: b.title, submitted: b.submitted })),
    ...jobs.filter((j) => j.status === 'pending').map((j) => ({ type: 'job', id: j.id, title: j.title, submitted: j.submitted }))
  ];

  if (!livePending.length) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align: center; color: var(--ink-muted); padding: var(--space-6);">
          All caught up! No pending approval requests.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = livePending.slice(0, 5).map((item) => {
    const reviewUrl = item.type === 'blog'
      ? `add-blog-post.html?mode=review&id=${item.id}`
      : `add-job-listing.html?mode=review&id=${item.id}`;

    return `
      <tr style="cursor: pointer;" data-href="${reviewUrl}" title="Click to review request">
        <td style="font-weight: 600; color: var(--ink-primary); max-width: 280px;"><span class="cell-truncate-title" title="${item.title}">${item.title}</span></td>
        <td><span class="status-badge ${item.type === 'blog' ? 'status-draft' : 'status-info'}" style="white-space: nowrap;">${item.type === 'blog' ? 'Blog post' : 'Job posting'}</span></td>
        <td style="color: var(--ink-muted); font-size: var(--text-2xs); white-space: nowrap;">${item.submitted}</td>
        <td><span class="status-badge status-pending" style="white-space: nowrap;">Pending review</span></td>
        <td style="text-align: right; white-space: nowrap;">
          <a href="${reviewUrl}" class="btn btn-sm btn-secondary" style="font-weight: 500;">
            Review & take action →
          </a>
        </td>
      </tr>
    `;
  }).join('');
}

// --------------------------------------------------------------------------
// 05. Recent Notifications
// --------------------------------------------------------------------------
function renderHomeNotifications() {
  const target = document.getElementById('home-notification-list');
  if (!target) return;

  const defaultNotifications = [
    { text: 'Elena Rostova submitted a resume for "Cybersecurity Analyst"', time: '10 mins ago' },
    { text: 'Jordan Lee submitted job posting "Cybersecurity Analyst" for review', time: '1 hour ago' },
    { text: 'New client enquiry received from Apex Financial Technologies', time: '2 hours ago' },
    { text: 'Google Analytics traffic spike: +24% visitors landing on /careers', time: '5 hours ago' }
  ];

  const list = typeof NOTIFICATIONS !== 'undefined' && NOTIFICATIONS.length > 0 ? NOTIFICATIONS : defaultNotifications;

  target.innerHTML = list.map((n) => `
    <div class="notification-item">
      <p class="notification-item-text">${n.text}</p>
      <p class="notification-item-time">${n.time}</p>
    </div>
  `).join('');
}

// --------------------------------------------------------------------------
// 06. Initialization
// --------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  loadDynamicStats();
  initLiveVisitorPulse();
  initTrafficChart();
  initTrafficChannelsChart();
  renderApprovalPreview();
  renderHomeNotifications();

  // Smart row click navigation for pending moderation queue
  document.getElementById('approval-preview-body')?.addEventListener('click', (e) => {
    const row = e.target.closest('tr[data-href]');
    if (row && !e.target.closest('a, button')) {
      window.location.href = row.dataset.href;
    }
  });
});
