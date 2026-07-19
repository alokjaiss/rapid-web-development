/* ─── SCRIPT.JS ──────────────────────────────────────────────── */

// ── Footer year ──
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when any nav link or dropdown link is clicked
  navLinks.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── Scroll reveal ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

// Add reveal class to card-like elements
const revealTargets = document.querySelectorAll(
  '.law-card, .phase-card, .gap-category, .pillar-card, .cs-card, ' +
  '.ag-principle, .velocity-item, .section-header, .pp-card, ' +
  '.gh-block, .gh-loop-step, .gh-feature-card, .gh-np-card, ' +
  '.cl-category, .css-card, .perf-card, .perf-metric, .pyramid-level, ' +
  '.test-rule-card, .debug-card, .api-card, .deploy-env-card, ' +
  '.deploy-platform-card, .tool-category, .track-card'
);

revealTargets.forEach((el, i) => {
  el.classList.add('reveal');
  el.dataset.delay = (i % 4) * 80; // stagger within groups of 4
  revealObserver.observe(el);
});

// ── Particle canvas ──
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  const PARTICLE_COUNT = 80;
  const COLORS = ['rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(6,182,212,'];

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  particles = Array.from({ length: PARTICLE_COUNT }, createParticle);

  // Mouse influence
  let mx = -9999, my = -9999;
  window.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mx = e.clientX - rect.left;
    my = e.clientY - rect.top;
  }, { passive: true });

  let animId;
  function animate() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach((p, i) => {
      // Mouse repulsion
      const dx = p.x - mx, dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        p.vx += (dx / dist) * 0.04;
        p.vy += (dy / dist) * 0.04;
      }

      // Speed cap
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.5) { p.vx *= 0.95; p.vy *= 0.95; }

      p.x += p.vx;
      p.y += p.vy;

      // Wrap
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      // Connect nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const ddx = p.x - q.x, ddy = p.y - q.y;
        const dd = ddx * ddx + ddy * ddy;
        if (dd < 12000) {
          const opacity = (1 - dd / 12000) * 0.15;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = 'rgba(99,102,241,' + opacity + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animId = requestAnimationFrame(animate);
  }

  // Only animate when hero is visible
  const heroObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      animate();
    } else {
      cancelAnimationFrame(animId);
    }
  }, { threshold: 0 });

  const heroEl = document.getElementById('hero');
  if (heroEl) heroObs.observe(heroEl);
})();

// ── Smooth number count-up animation for velocity banner ──
function countUp(el, target, suffix = '') {
  const start = 0;
  const duration = 1800;
  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
    const current = Math.round(start + (target - start) * eased);
    el.textContent = current + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

const velocityNums = document.querySelectorAll('.velocity-num');
const velocityData = [
  { target: 10,   suffix: '×' },
  { target: 50,   suffix: '×' },
  { target: 100,  suffix: '×' },
  { target: 1000, suffix: '×' },
];

const velocityObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      velocityNums.forEach((el, i) => {
        countUp(el, velocityData[i].target, velocityData[i].suffix);
      });
      velocityObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const velocityBanner = document.querySelector('.ai-velocity-banner');
if (velocityBanner) velocityObserver.observe(velocityBanner);

// ── Law card hover glow colour matching ──
document.querySelectorAll('.law-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', x + '%');
    card.style.setProperty('--mouse-y', y + '%');
  });
});

// ── Toast Notification Helper ──
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}

// ── Automatic Copy Code Buttons ──
document.querySelectorAll('pre').forEach(preBlock => {
  const btn = document.createElement('button');
  btn.className = 'copy-code-btn';
  btn.textContent = 'Copy';
  btn.setAttribute('aria-label', 'Copy code to clipboard');

  btn.addEventListener('click', async () => {
    const codeText = preBlock.querySelector('code')?.innerText || preBlock.innerText;
    try {
      await navigator.clipboard.writeText(codeText);
      btn.textContent = 'Copied! ✓';
      btn.classList.add('copied');
      showToast('Code copied to clipboard!');
      setTimeout(() => {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  });

  preBlock.appendChild(btn);
});

// ── Back to Top Button ──
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ── Live Reference Search Filter ──
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  const searchableCards = document.querySelectorAll(
    '.pp-card, .law-card, .phase-card, .gap-category, .pillar-card, .cs-card, ' +
    '.ag-principle, .css-card, .perf-card, .debug-card, .api-card, ' +
    '.deploy-env-card, .deploy-platform-card, .tool-category, .gh-block'
  );

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    searchableCards.forEach(card => {
      const text = card.innerText.toLowerCase();
      if (!query || text.includes(query)) {
        card.style.display = '';
        card.style.opacity = '1';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ── IA 3.0 — Command Palette (Ctrl+K) ──
(function initCommandPalette() {
  const overlay = document.getElementById('cmdOverlay');
  const searchInput = document.getElementById('cmdSearchInput');
  const resultsContainer = document.getElementById('cmdResults');
  const trigger = document.getElementById('cmdPaletteTrigger');

  if (!overlay || !searchInput || !resultsContainer) return;

  // Search index — all navigable items across the platform
  const cmdIndex = [
    // Quick Actions
    { group: 'Quick Actions', icon: '🧠', text: 'Take the Quiz Challenge', url: 'pages/quiz.html' },
    { group: 'Quick Actions', icon: '📑', text: 'View Cheat Sheet', url: 'pages/cheatsheet.html' },
    { group: 'Quick Actions', icon: '🏠', text: 'Back to Hub Overview', url: '#hero' },

    // Guides
    { group: 'Guides', icon: '📋', text: 'Pre-Project & Pre-Launch Checklists', url: 'pages/checklists.html' },
    { group: 'Guides', icon: '🐙', text: 'GitHub & AI Context Management', url: 'pages/github-context.html' },
    { group: 'Guides', icon: '🎨', text: 'CSS Architecture & Performance', url: 'pages/css-performance.html' },
    { group: 'Guides', icon: '🧪', text: 'Testing Strategy & Debugging', url: 'pages/testing-debugging.html' },
    { group: 'Guides', icon: '🌐', text: 'API Design & Deployment', url: 'pages/api-deployment.html' },
    { group: 'Guides', icon: '📜', text: '12 Universal Laws & 7-Phase Workflow', url: 'pages/laws-workflow.html' },
    { group: 'Guides', icon: '💡', text: 'Knowledge Gaps & Dev Tools', url: 'pages/gaps-devtools.html' },
    { group: 'Guides', icon: '🤖', text: 'AI Acceleration & Antigravity', url: 'pages/ai-acceleration.html' },

    // 12 Universal Laws
    { group: '12 Laws', icon: '⚖️', text: 'Separation of Concerns', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '📱', text: 'Mobile-First Responsive Design', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '🛡️', text: 'Defensive Coding', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '🔒', text: 'Progressive Enhancement', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '♻️', text: 'DRY — Don\'t Repeat Yourself', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '🔀', text: 'Single Responsibility Principle', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '📦', text: 'Semantic HTML', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '⚡', text: 'Performance Budget', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '♿', text: 'Accessibility First (a11y)', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '🔄', text: 'Version Control Everything', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '🧪', text: 'Test Before Ship', url: 'pages/laws-workflow.html' },
    { group: '12 Laws', icon: '🎯', text: 'Law of Least Surprise', url: 'pages/laws-workflow.html' },

    // Learning Tracks
    { group: 'Learning Tracks', icon: '🚀', text: 'Production Readiness Track', url: '#tracks' },
    { group: 'Learning Tracks', icon: '⚡', text: 'AI-Accelerated Developer Track', url: '#tracks' },
    { group: 'Learning Tracks', icon: '🛡️', text: 'Senior Architect Track', url: '#tracks' },
  ];

  let activeIndex = -1;

  function openPalette() {
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    searchInput.value = '';
    searchInput.focus();
    renderResults('');
    activeIndex = -1;
  }

  function closePalette() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    activeIndex = -1;
  }

  function renderResults(query) {
    const q = query.toLowerCase().trim();
    const filtered = q
      ? cmdIndex.filter(item => item.text.toLowerCase().includes(q) || item.group.toLowerCase().includes(q))
      : cmdIndex;

    if (filtered.length === 0) {
      resultsContainer.innerHTML = '<div class="cmd-empty">No results found. Try a different search.</div>';
      return;
    }

    // Group by category
    const groups = {};
    filtered.forEach(item => {
      if (!groups[item.group]) groups[item.group] = [];
      groups[item.group].push(item);
    });

    let html = '';
    Object.keys(groups).forEach(groupName => {
      html += `<div class="cmd-group-label">${groupName}</div>`;
      groups[groupName].forEach(item => {
        html += `
          <a href="${item.url}" class="cmd-result-item" data-url="${item.url}">
            <span class="cmd-result-icon">${item.icon}</span>
            <span class="cmd-result-text">${item.text}</span>
            <span class="cmd-result-arrow">→</span>
          </a>`;
      });
    });

    resultsContainer.innerHTML = html;

    // Attach click handlers
    resultsContainer.querySelectorAll('.cmd-result-item').forEach(el => {
      el.addEventListener('click', (e) => {
        closePalette();
      });
    });
  }

  function updateActiveResult() {
    const items = resultsContainer.querySelectorAll('.cmd-result-item');
    items.forEach((el, i) => el.classList.toggle('active', i === activeIndex));
    if (items[activeIndex]) items[activeIndex].scrollIntoView({ block: 'nearest' });
  }

  // Event: Trigger button click
  if (trigger) trigger.addEventListener('click', openPalette);

  // Event: Ctrl+K keyboard shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      if (overlay.classList.contains('active')) {
        closePalette();
      } else {
        openPalette();
      }
    }

    if (!overlay.classList.contains('active')) return;

    if (e.key === 'Escape') {
      closePalette();
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const items = resultsContainer.querySelectorAll('.cmd-result-item');
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      updateActiveResult();
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      updateActiveResult();
    }

    if (e.key === 'Enter') {
      const items = resultsContainer.querySelectorAll('.cmd-result-item');
      if (items[activeIndex]) {
        items[activeIndex].click();
      }
    }
  });

  // Event: Search input
  searchInput.addEventListener('input', (e) => {
    renderResults(e.target.value);
    activeIndex = -1;
  });

  // Event: Close on backdrop click
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePalette();
  });
})();

// ── Interactive Active-Recall Quiz Engine ──
(function initQuizEngine() {
  const quizCard = document.getElementById('quizCard');
  if (!quizCard) return;

  const quizQuestions = [
    // ── CATEGORY 1: CHECKLISTS (5 Questions) ──
    {
      category: 'checklists',
      question: 'What is the very first step to complete BEFORE writing a single line of code in a new project?',
      options: [
        'Set up folder structure & design tokens',
        'Deploy to production server immediately',
        'Install 20+ npm dependencies',
        'Start writing main CSS styles'
      ],
      answer: 0,
      explanation: 'Pre-Project Step 01 dictates organizing your folder structure and design tokens first to prevent root-folder chaos and magic numbers spreading.'
    },
    {
      category: 'checklists',
      question: 'Which WCAG AA contrast ratio standard must body text satisfy against its background color?',
      options: [
        'At least 2.0:1',
        'At least 4.5:1',
        'At least 10:1',
        'Contrast ratio does not matter'
      ],
      answer: 1,
      explanation: 'WCAG AA contrast guidelines require body text to achieve at least a 4.5:1 contrast ratio to ensure readability for visually impaired users.'
    },
    {
      category: 'checklists',
      question: 'What target score threshold should a production web application achieve on Google Lighthouse Audits?',
      options: [
        'Under 50 in Performance',
        'At least 90+ across Performance, Accessibility, Best Practices, and SEO',
        'Exactly 100 in SEO only',
        'Lighthouse scores are irrelevant'
      ],
      answer: 1,
      explanation: 'Pre-Launch audit guidelines require achieving 90+ across all 4 Lighthouse pillars to ensure fast, accessible, and SEO-friendly delivery.'
    },
    {
      category: 'checklists',
      question: 'Why should a custom 404 page always be created before project launch?',
      options: [
        'To display arbitrary advertisements',
        'To prevent broken user journeys and guide lost visitors back to the home hub',
        'To hide server configuration errors',
        'To force users to register'
      ],
      answer: 1,
      explanation: 'A custom 404 page preserves user experience by providing clear navigation links back to active content when invalid URLs are visited.'
    },
    {
      category: 'checklists',
      question: 'Why is defining explicit `width` and `height` attributes on `<img>` tags required for performance?',
      options: [
        'To force image stretching',
        'To reserve layout space and eliminate Cumulative Layout Shift (CLS)',
        'To speed up CSS downloading',
        'To enable automatic image crop'
      ],
      answer: 1,
      explanation: 'Reserving aspect-ratio space prevents elements from jumping during image load, eliminating high Cumulative Layout Shift (CLS).'
    },

    // ── CATEGORY 2: GITHUB & AI CONTEXT (5 Questions) ──
    {
      category: 'github',
      question: 'What is the purpose of AGENTS.md (or claude.md) in an AI-first development workflow?',
      options: [
        'It acts as an automated compiler configuration',
        'It serves as the AI assistant briefing document read on session startup',
        'It is a backup copy of package.json',
        'It replaces Git version control'
      ],
      answer: 1,
      explanation: 'AGENTS.md provides permanent architectural briefing, tech stack details, conventions, and "what NOT to do" rules to your AI assistant.'
    },
    {
      category: 'github',
      question: 'According to Conventional Commits standards, which prefix should be used for bug fixes?',
      options: [
        'feat:',
        'fix:',
        'style:',
        'chore:'
      ],
      answer: 1,
      explanation: 'Conventional Commits uses "fix:" for bug fixes, "feat:" for new features, "style:" for CSS/formatting, and "chore:" for tooling/deps.'
    },
    {
      category: 'github',
      question: 'In standard branch strategy, which branch holds production-ready, stable releases?',
      options: [
        'main branch',
        'release branch',
        'feature/test branch',
        'scratch branch'
      ],
      answer: 1,
      explanation: 'Feature development happens on feature branches, merges to `main`, and stable production releases are merged into `release` with semver tags.'
    },
    {
      category: 'github',
      question: 'Why should sensitive Personal Access Tokens (PATs) NEVER be hardcoded into public repositories?',
      options: [
        'Because GitHub will automatically delete your account',
        'To prevent token leakage, unauthorized repository access, and push protection blocks',
        'Because tokens slow down Git commit speeds',
        'Tokens can only be used on Windows'
      ],
      answer: 1,
      explanation: 'Hardcoding tokens exposes administrative access to your repositories and triggers GitHub secret scanning blocks.'
    },
    {
      category: 'github',
      question: 'What command format should be used to link a Pull Request to automatically close an issue upon merge?',
      options: [
        'closes #1 / fixes #1 in PR description',
        'tag #1 in commit message',
        'delete issue manually',
        'create a new branch'
      ],
      answer: 0,
      explanation: 'Including "closes #<issue>" or "fixes #<issue>" in the PR body automatically closes the referenced GitHub Issue upon merging.'
    },

    // ── CATEGORY 3: CSS & PERFORMANCE (5 Questions) ──
    {
      category: 'css',
      question: 'Which CSS function allows smooth fluid font scaling between a minimum and maximum size without media queries?',
      options: [
        'calc()',
        'minmax()',
        'clamp(min, val, max)',
        'flex-grow()'
      ],
      answer: 2,
      explanation: 'clamp(min, val, max) allows responsive fluid typography that scales smoothly with viewport width while respecting upper and lower bounds.'
    },
    {
      category: 'css',
      question: 'What is the target threshold for Largest Contentful Paint (LCP) in Core Web Vitals?',
      options: [
        'Under 2.5 seconds',
        'Under 10 seconds',
        'Under 500 milliseconds',
        'Over 5 seconds'
      ],
      answer: 0,
      explanation: 'Core Web Vitals targets LCP under 2.5s to ensure users perceive the page as loading quickly.'
    },
    {
      category: 'css',
      question: 'Where should global design tokens (colors, font families, radii, shadows) be defined in vanilla CSS?',
      options: [
        'Inside inline HTML style attributes',
        'Under the :root selector as CSS Custom Properties',
        'Spread across 50 individual class selectors',
        'In JavaScript script tags'
      ],
      answer: 1,
      explanation: 'Defining custom properties under `:root` creates a centralized design token system that promotes consistency and effortless dark mode styling.'
    },
    {
      category: 'css',
      question: 'Why is Next-Gen WebP image format preferred over legacy PNG/JPEG for web delivery?',
      options: [
        'WebP images work without HTML img tags',
        'WebP provides 25-35% smaller file sizes with superior lossy/lossless compression',
        'PNG images load faster on mobile',
        'JPEG supports transparent animation'
      ],
      answer: 1,
      explanation: 'WebP significantly reduces payload bytes without visual quality degradation, boosting Largest Contentful Paint (LCP).'
    },
    {
      category: 'css',
      question: 'What does BEM class naming syntax stand for in CSS Architecture?',
      options: [
        'Basic Element Method',
        'Block Element Modifier',
        'Browser Execution Model',
        'Build Engine Module'
      ],
      answer: 1,
      explanation: 'Block Element Modifier (BEM) provides scoped, readable CSS class names like `.card__title--active` to prevent specificity collisions.'
    },

    // ── CATEGORY 4: TESTING & DEBUGGING (5 Questions) ──
    {
      category: 'testing',
      question: 'In the Testing Strategy Pyramid, which tier should make up the largest percentage (~70%) of automated tests?',
      options: [
        'End-to-End (E2E) Tests',
        'Manual Monkey Tests',
        'Unit Tests',
        'Visual Regression Tests'
      ],
      answer: 2,
      explanation: 'Unit tests are fast, deterministic, and isolated, making up ~70% of the testing pyramid.'
    },
    {
      category: 'testing',
      question: 'What is an essential empirical rule when debugging an error traceback?',
      options: [
        'Swallow exceptions with empty try/catch blocks',
        'Inspect full, un-truncated error logs before forming hypotheses',
        'Comment out failing unit tests',
        'Return dummy hardcoded fallback data'
      ],
      answer: 1,
      explanation: 'Empirical debugging requires inspecting complete, un-truncated logs and tracing upstream root causes rather than patching symptoms.'
    },
    {
      category: 'testing',
      question: 'Why is patching symptoms (e.g. returning dummy null objects) considered harmful in software engineering?',
      options: [
        'It speeds up code execution too much',
        'It masks underlying contract breakages and causes silent downstream data corruption',
        'It causes compiler warnings',
        'It forces automatic server restart'
      ],
      answer: 1,
      explanation: 'Superficial patches mask real bugs, leading to subtle runtime failures that are far harder to debug downstream.'
    },
    {
      category: 'testing',
      question: 'What is the primary advantage of End-to-End (E2E) testing over Unit testing?',
      options: [
        'E2E tests run 100x faster than unit tests',
        'E2E tests validate complete user journeys across real browsers and DOM environments',
        'E2E tests require zero test setup',
        'E2E tests replace unit tests completely'
      ],
      answer: 1,
      explanation: 'E2E tests simulate actual user interactions across the full application stack to verify end-to-end functionality.'
    },
    {
      category: 'testing',
      question: 'What defensive programming practice prevents `TypeError: Cannot read properties of null` crashes?',
      options: [
        'Using explicit null guards or optional chaining `?.` before property access',
        'Removing all JavaScript files',
        'Setting all variables to global scope',
        'Wrapping entire codebase in `eval()`'
      ],
      answer: 0,
      explanation: 'Checking element existence (`if (el)`) or using optional chaining (`el?.textContent`) prevents null pointer dereference crashes.'
    },

    // ── CATEGORY 5: API & DEPLOYMENT (5 Questions) ──
    {
      category: 'api',
      question: 'Which HTTP status code signifies that a resource was successfully created on the server?',
      options: [
        '200 OK',
        '201 Created',
        '400 Bad Request',
        '500 Internal Error'
      ],
      answer: 1,
      explanation: 'HTTP status code 201 Created explicitly indicates that a new resource was created successfully.'
    },
    {
      category: 'api',
      question: 'Which HTTP status code indicates an Unauthorized request due to missing or invalid authentication credentials?',
      options: [
        '200 OK',
        '401 Unauthorized',
        '404 Not Found',
        '503 Service Unavailable'
      ],
      answer: 1,
      explanation: '401 Unauthorized signals that authentication credentials are required or invalid.'
    },
    {
      category: 'api',
      question: 'What is the purpose of Cross-Origin Resource Sharing (CORS) HTTP headers?',
      options: [
        'To compress HTTP response bodies',
        'To allow or restrict cross-domain requests between different web origins',
        'To encrypt database passwords',
        'To enable local file editing'
      ],
      answer: 1,
      explanation: 'CORS headers inform browsers whether requests from origin A are permitted to access resources on origin B.'
    },
    {
      category: 'api',
      question: 'In RESTful API design, which HTTP verb should be used for updating existing resource data?',
      options: [
        'GET',
        'PUT / PATCH',
        'DELETE',
        'OPTIONS'
      ],
      answer: 1,
      explanation: 'PUT replaces a resource completely, while PATCH applies partial modifications to existing resources.'
    },
    {
      category: 'api',
      question: 'Why should API keys and database credentials be stored in `.env` files rather than source code?',
      options: [
        'To keep environment-specific configurations separate from codebase and prevent secret leakage',
        'To make code run faster',
        'Because git cannot read .env files',
        'To disable server logging'
      ],
      answer: 0,
      explanation: 'Storing secrets in `.env` files (excluded via `.gitignore`) prevents committing sensitive credentials to version control.'
    },

    // ── CATEGORY 6: 12 UNIVERSAL LAWS & WORKFLOW (5 Questions) ──
    {
      category: 'laws',
      question: 'What does the Law of Separation of Concerns mandate?',
      options: [
        'HTML for structure, CSS for presentation, JavaScript for behavior',
        'Put all code into one 10,000 line file',
        'Use inline styles for everything',
        'Avoid using CSS custom properties'
      ],
      answer: 0,
      explanation: 'Separation of Concerns maintains clean boundaries: HTML defines semantic structure, CSS handles visual design tokens, and JS controls behavior.'
    },
    {
      category: 'laws',
      question: 'What does the Law of Least Surprise dictate in software interface design?',
      options: [
        'Always surprise users with hidden navigation buttons',
        'Elements should behave in predictable ways aligned with standard user mental models',
        'Never update your UI design',
        'Randomize button colors on every click'
      ],
      answer: 1,
      explanation: 'Least Surprise dictates that user interface elements should behave predictably to minimize cognitive friction.'
    },
    {
      category: 'laws',
      question: 'What does the DRY (Don\'t Repeat Yourself) principle aim to eliminate?',
      options: [
        'Duplicated logic and redundant code across the codebase',
        'Using CSS variables',
        'Writing documentation comments',
        'Creating modular components'
      ],
      answer: 0,
      explanation: 'DRY promotes single sources of truth, reducing maintenance overhead and bug propagation.'
    },
    {
      category: 'laws',
      question: 'What is the correct sequence of the 7-Phase Web Development Lifecycle Model?',
      options: [
        'Deploy -> Code -> Plan -> Test -> Fix -> Launch -> Idea',
        'Requirements -> Architecture -> Design System -> Implementation -> Verification -> Review -> Release',
        'Code -> Release -> Test -> Design -> Plan -> Deploy -> Fix',
        'Implementation only'
      ],
      answer: 1,
      explanation: 'Disciplined software development progresses systematically from planning through implementation, verification, and tagged release.'
    },
    {
      category: 'laws',
      question: 'According to the Law of Premature Optimization, when should performance tuning take place?',
      options: [
        'Before writing any code',
        'After establishing correct, clean architecture and identifying empirical bottlenecks',
        'Never optimize anything',
        'Rewrite everything in Assembly'
      ],
      answer: 1,
      explanation: 'Optimizing without empirical profiling wastes effort; focus first on correctness and clean abstractions, then measure and optimize.'
    }
  ];

  const categoryStudyMap = {
    checklists: { name: 'Pre-Project & Pre-Launch Checklists', url: 'checklists.html' },
    github: { name: 'GitHub Setup & AI Context Management', url: 'github-context.html' },
    css: { name: 'CSS Architecture & Performance', url: 'css-performance.html' },
    testing: { name: 'Testing Strategy & Debugging Toolkit', url: 'testing-debugging.html' },
    api: { name: 'API Design & Deployment Guide', url: 'api-deployment.html' },
    laws: { name: '12 Universal Laws & 7-Phase Workflow', url: 'laws-workflow.html' }
  };

  function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  let currentPool = shuffleArray(quizQuestions);
  let currentIndex = 0;
  let score = 0;
  let selectedCategory = 'all';
  let userAnswers = [];

  const categoryLabel = document.getElementById('quizCategoryLabel');
  const counterText = document.getElementById('quizCounterText');
  const questionText = document.getElementById('quizQuestionText');
  const optionsContainer = document.getElementById('quizOptionsContainer');
  const explanationBox = document.getElementById('quizExplanationBox');
  const explanationText = document.getElementById('quizExplanationText');
  const nextBtn = document.getElementById('quizNextBtn');
  const progressBar = document.getElementById('quizProgressBar');

  function filterQuestions(category) {
    selectedCategory = category;
    if (category === 'all') {
      currentPool = shuffleArray(quizQuestions);
    } else {
      currentPool = shuffleArray(quizQuestions.filter(q => q.category === category));
    }
    currentIndex = 0;
    score = 0;
    userAnswers = [];
    renderQuestion();
  }

  function renderQuestion() {
    if (currentIndex >= currentPool.length) {
      renderScorecard();
      return;
    }

    const q = currentPool[currentIndex];
    categoryLabel.textContent = `Category: ${selectedCategory.toUpperCase()}`;
    counterText.textContent = `Question ${currentIndex + 1} of ${currentPool.length}`;
    questionText.textContent = q.question;
    progressBar.style.width = `${((currentIndex) / currentPool.length) * 100}%`;

    explanationBox.style.display = 'none';
    nextBtn.style.display = 'none';
    optionsContainer.innerHTML = '';

    q.options.forEach((optText, index) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="opt-prefix">${String.fromCharCode(65 + index)}.</span> <span>${optText}</span>`;
      btn.addEventListener('click', () => handleOptionClick(btn, index, q));
      optionsContainer.appendChild(btn);
    });
  }

  function handleOptionClick(selectedBtn, chosenIndex, questionObj) {
    const allOptionBtns = optionsContainer.querySelectorAll('.quiz-option-btn');
    allOptionBtns.forEach(btn => btn.disabled = true);

    const isCorrect = (chosenIndex === questionObj.answer);
    if (isCorrect) {
      selectedBtn.classList.add('correct');
      score++;
      if (typeof showToast === 'function') showToast('Correct! +1 Point');
    } else {
      selectedBtn.classList.add('incorrect');
      allOptionBtns[questionObj.answer].classList.add('correct');
    }

    userAnswers.push({
      questionObj,
      chosenIndex,
      isCorrect
    });

    explanationText.textContent = questionObj.explanation;
    explanationBox.style.display = 'block';
    nextBtn.style.display = 'inline-block';
  }

  function renderScorecard() {
    progressBar.style.width = '100%';
    const pct = Math.round((score / currentPool.length) * 100);
    let badgeText = pct >= 80 ? '🏆 Mastered!' : pct >= 60 ? '👍 Good Effort!' : '📚 Keep Learning!';
    const incorrectCount = currentPool.length - score;

    let reviewCardsHTML = userAnswers.map((ans, idx) => {
      const q = ans.questionObj;
      const userAnsText = q.options[ans.chosenIndex];
      const correctAnsText = q.options[q.answer];
      const studyInfo = categoryStudyMap[q.category] || { name: 'WebDev Reference Guide', url: '../index.html' };

      return `
        <div class="quiz-review-card ${ans.isCorrect ? 'review-correct' : 'review-incorrect'}" data-is-correct="${ans.isCorrect}">
          <div class="review-q-title">Q${idx + 1}. ${q.question}</div>
          <div class="review-ans-group">
            <div class="review-user-ans ${ans.isCorrect ? 'user-correct' : 'user-incorrect'}">
              <strong>Your Answer:</strong> ${ans.isCorrect ? '✅' : '❌'} ${userAnsText}
            </div>
            ${!ans.isCorrect ? `
              <div class="review-correct-ans">
                <strong>Correct Answer:</strong> ✅ ${correctAnsText}
              </div>
            ` : ''}
          </div>
          <div class="review-exp-box">
            <strong>💡 Explanation:</strong> ${q.explanation}
          </div>
          <a href="${studyInfo.url}" class="study-guide-link" target="_blank">📖 Review Topic: ${studyInfo.name} →</a>
        </div>
      `;
    }).join('');

    quizCard.innerHTML = `
      <div class="quiz-scorecard">
        <div class="score-badge">${pct}%</div>
        <h3>${badgeText}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          You scored <strong>${score}</strong> out of <strong>${currentPool.length}</strong> questions correctly.
        </p>

        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap; margin-bottom: 2rem;">
          <button class="btn btn-primary" id="restartQuizBtn">Retake Quiz →</button>
          <button class="btn btn-ghost" id="copyResultsBtn">📋 Copy Results</button>
          ${incorrectCount > 0 ? `<button class="btn btn-ghost" id="toggleMistakesBtn">🔍 Show Incorrect Only (${incorrectCount})</button>` : ''}
        </div>

        <div class="quiz-review-section">
          <div class="quiz-review-header">
            <h4>Detailed Performance Audit</h4>
            <span style="font-size: 0.85rem; color: var(--text-muted);">${userAnswers.length} Questions Reviewed</span>
          </div>
          <div class="quiz-review-list" id="quizReviewList">
            ${reviewCardsHTML}
          </div>
        </div>
      </div>
    `;

    document.getElementById('restartQuizBtn')?.addEventListener('click', () => {
      location.reload();
    });

    document.getElementById('copyResultsBtn')?.addEventListener('click', () => {
      const summaryText = `WebDevRef Quiz Score: ${pct}%\nCategory: ${selectedCategory.toUpperCase()}\nCorrect: ${score}/${currentPool.length}`;
      navigator.clipboard.writeText(summaryText);
      if (typeof showToast === 'function') showToast('Copied quiz summary to clipboard!');
    });

    let showingOnlyMistakes = false;
    document.getElementById('toggleMistakesBtn')?.addEventListener('click', (e) => {
      showingOnlyMistakes = !showingOnlyMistakes;
      e.target.textContent = showingOnlyMistakes ? `👁️ Show All (${currentPool.length})` : `🔍 Show Incorrect Only (${incorrectCount})`;
      
      const cards = document.querySelectorAll('.quiz-review-card');
      cards.forEach(card => {
        if (showingOnlyMistakes && card.dataset.isCorrect === 'true') {
          card.style.display = 'none';
        } else {
          card.style.display = 'block';
        }
      });
    });
  }

  nextBtn?.addEventListener('click', () => {
    currentIndex++;
    renderQuestion();
  });

  document.querySelectorAll('.quiz-pill').forEach(pill => {
    pill.addEventListener('click', (e) => {
      document.querySelectorAll('.quiz-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      filterQuestions(pill.dataset.category);
    });
  });

  renderQuestion();
})();
