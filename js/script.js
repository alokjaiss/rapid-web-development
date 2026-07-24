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
    hamburger.setAttribute('aria-expanded', isOpen); // a11y: communicate state to screen readers
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

  const PARTICLE_COUNT = window.innerWidth < 768 ? 30 : 80;
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
    { group: 'Quick Actions', icon: '📑', text: 'View Cheat Sheet', url: 'portal.html#developer-cheatsheet' },
    { group: 'Quick Actions', icon: '🏠', text: 'Back to Hub Overview', url: '#hero' },

    // Guides
    { group: 'Guides', icon: '📋', text: 'Pre-Project & Pre-Launch Checklists', url: 'portal.html#preproject-checklist' },
    { group: 'Guides', icon: '🐙', text: 'GitHub & AI Context Management', url: 'portal.html#github-workflow' },
    { group: 'Guides', icon: '🎨', text: 'CSS Architecture & Performance', url: 'portal.html#css-architecture' },
    { group: 'Guides', icon: '🧪', text: 'Testing Strategy & Debugging', url: 'portal.html#testing-pyramid' },
    { group: 'Guides', icon: '🌐', text: 'API Design & Deployment', url: 'portal.html#api-design' },
    { group: 'Guides', icon: '📜', text: '12 Universal Laws & 7-Phase Workflow', url: 'portal.html#universal-laws' },
    { group: 'Guides', icon: '💡', text: 'Knowledge Gaps & Dev Tools', url: 'portal.html#developer-cheatsheet' },
    { group: 'Guides', icon: '🤖', text: 'AI Acceleration & Antigravity', url: 'portal.html#ai-velocity' },

    // 12 Universal Laws
    { group: '12 Laws', icon: '⚖️', text: 'Separation of Concerns', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '📱', text: 'Mobile-First Responsive Design', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '🛡️', text: 'Defensive Coding', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '🔒', text: 'Progressive Enhancement', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '♻️', text: 'DRY — Don\'t Repeat Yourself', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '🔀', text: 'Single Responsibility Principle', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '📦', text: 'Semantic HTML', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '⚡', text: 'Performance Budget', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '♿', text: 'Accessibility First (a11y)', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '🔄', text: 'Version Control Everything', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '🧪', text: 'Test Before Ship', url: 'portal.html#universal-laws' },
    { group: '12 Laws', icon: '🎯', text: 'Law of Least Surprise', url: 'portal.html#universal-laws' },

    // Learning Tracks
    { group: 'Learning Tracks', icon: '🚀', text: 'Production Readiness Track', url: '#tracks' },
    { group: 'Learning Tracks', icon: '⚡', text: 'AI-Accelerated Developer Track', url: '#tracks' },
    { group: 'Learning Tracks', icon: '🛡️', text: 'Senior Architect Track', url: '#tracks' },

    // TypeScript Mastery Track Chapters
    { group: 'TypeScript Mastery', icon: '📘', text: 'TypeScript Setup & Primitive Types', url: 'portal.html?track=typescript#ts-fundamentals' },
    { group: 'TypeScript Mastery', icon: '🔷', text: 'Interfaces vs Type Aliases', url: 'portal.html?track=typescript#ts-interfaces-types' },
    { group: 'TypeScript Mastery', icon: '⚡', text: 'Mastering Generics & Type Parameters', url: 'portal.html?track=typescript#ts-generics' },
    { group: 'TypeScript Mastery', icon: '🛠️', text: 'Utility Types & Type Manipulations', url: 'portal.html?track=typescript#ts-utility-types' },
    { group: 'TypeScript Mastery', icon: '⚙️', text: 'Strict Mode & Production React/Node.js', url: 'portal.html?track=typescript#ts-strict-react-node' },

    // Next.js & AI Integration Track Chapters
    { group: 'Next.js Mastery', icon: '⚛️', text: 'Next.js App Router Architecture', url: 'portal.html?track=nextjs#nextjs-architecture' },
    { group: 'Next.js Mastery', icon: '📋', text: 'Mini Project: Server Task Board', url: 'portal.html?track=nextjs#nextjs-miniproject' },
    { group: 'Next.js Mastery', icon: '🤖', text: 'AI Integration & LLM Streaming', url: 'portal.html?track=nextjs#nextjs-ai-integration' },
    { group: 'Next.js Mastery', icon: '🏆', text: 'Capstone Project: AI Mock Interviewer', url: 'portal.html?track=nextjs#nextjs-capstone' },
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
    },
    // ── CATEGORY 7: SESSION 2 LEARNINGS (5 Questions) ──
    {
      category: 'session',
      question: 'What is the key conceptual difference between Imperative UI (vanilla JS) and Declarative UI (React/Next.js)?',
      options: [
        'Imperative UI declares a function of state; Declarative UI manually updates individual elements',
        'Imperative UI manually selects and modifies elements on events; Declarative UI defines UI as a function of current state',
        'Declarative UI requires database queries for every button click; Imperative UI is server-only',
        'There is no difference; both rely on document.getElementById for rendering updates'
      ],
      answer: 1,
      explanation: 'Vanilla JS uses imperative steps to locate and mutate elements. React/Next.js uses declarative programming, where you define the target state and UI, and React updates the DOM automatically when the state changes.'
    },
    {
      category: 'session',
      question: 'Why are React Server Components (RSC) the default rendering model in the Next.js App Router?',
      options: [
        'They render on the server, shipping zero client-side JavaScript for those components, maximizing page speed',
        'They run only in client-side web workers to improve render latency',
        'They replace HTML files with static raw database query logs',
        'They force all components to reload the browser on every state mutation'
      ],
      answer: 0,
      explanation: 'RSCs execute only on the server, allowing direct database access and zero client-side JS bundle overhead, yielding instant loading states.'
    },
    {
      category: 'session',
      question: 'How do Server Actions in Next.js eliminate standard API controller boilerplate?',
      options: [
        'They compile forms to binary files and run them inside server iframe cells',
        'They allow calling asynchronous server-side functions directly from client components or forms without manual fetch POST routes',
        'They replace local storage with static cookies for background syncs',
        'They require setting up Express.js servers inside client-side components'
      ],
      answer: 1,
      explanation: 'Server Actions allow you to define secure server functions (\'use server\') that compile to standard HTTP RPC calls automatically, eliminating manual REST fetch routes.'
    },
    {
      category: 'session',
      question: 'When escaping code templates inside Javascript backtick template literals in knowledge data files, why must we write \'\\${}\' instead of \'${}\'?',
      options: [
        'To tell Next.js to compile it as a TypeScript module type',
        'To prevent the browser from evaluating the content on page load as a live JavaScript template expression',
        'To tell CSS to render the dollar sign in purple',
        'To prevent Git from detecting line changes in commit diffs'
      ],
      answer: 1,
      explanation: 'Unescaped \'${}\' strings inside backtick literals are executed immediately on file load. We must escape them to render them as static code templates.'
    },
    {
      category: 'session',
      question: 'Which API is used in the AI Mock Interviewer Capstone project to read questions aloud to candidates in real-time?',
      options: [
        'HTML5 Audio Element with custom mp3 voice files',
        'Native Web Speech API (SpeechSynthesis)',
        'Node.js server-side voice synthesis pipeline',
        'Vercel AI SDK Voice Streaming streamReader'
      ],
      answer: 1,
      explanation: 'The native Web Speech API SpeechSynthesis is used client-side to read dynamically generated AI questions without extra server latency or audio payload generation.'
    }
  ];

  const categoryStudyMap = {
    checklists: { name: 'Pre-Project & Pre-Launch Checklists', url: '../portal.html#preproject-checklist' },
    github: { name: 'GitHub Setup & AI Context Management', url: '../portal.html#github-workflow' },
    css: { name: 'CSS Architecture & Performance', url: '../portal.html#css-architecture' },
    testing: { name: 'Testing Strategy & Debugging Toolkit', url: '../portal.html#testing-pyramid' },
    api: { name: 'API Design & Deployment Guide', url: '../portal.html#api-design' },
    laws: { name: '12 Universal Laws & 7-Phase Workflow', url: '../portal.html#universal-laws' },
    session: { name: 'Session 2: Next.js & AI Mastery', url: '../portal.html?track=nextjs' }
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

/* ====================================================================
   ALGOMASTER-INSPIRED KNOWLEDGE BASE PORTAL INTERACTIVE ENGINE
   ==================================================================== */
(function initKnowledgePortal() {
  const portalTree = document.getElementById('portalTree');
  if (!portalTree || !window.KNOWLEDGE_DATA) return;

  const data = window.KNOWLEDGE_DATA;
  
  // Get active track from URL query parameter (?track=typescript or ?track=webdev)
  const urlParams = new URLSearchParams(window.location.search);
  const activeTrack = urlParams.get('track') || 'webdev';
  
  // Filter modules based on the active track
  const activeModules = data.modules.filter(mod => mod.track === activeTrack);
  
  // Storage Keys
  const STORAGE_KEY_COMPLETED = 'webdevref_completed_topics';
  const STORAGE_KEY_BOOKMARKS = 'webdevref_bookmarked_topics';
  const STORAGE_KEY_NOTES     = 'webdevref_notes_data';

  // State
  let completedTopics = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_COMPLETED) || '[]'));
  let bookmarkedTopics = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY_BOOKMARKS) || '[]'));
  let notesData = JSON.parse(localStorage.getItem(STORAGE_KEY_NOTES) || '{}');

  // Flatten active track's topics for navigation & total count
  const allTopics = [];
  activeModules.forEach(mod => {
    mod.topics.forEach(topic => {
      allTopics.push({ ...topic, moduleId: mod.id, moduleTitle: mod.title });
    });
  });

  let currentTopicId = location.hash.replace('#', '') || allTopics[0].id;

  // DOM Elements
  const portalProgressPct   = document.getElementById('portalProgressPct');
  const portalProgressCount = document.getElementById('portalProgressCount');
  const portalProgressFill  = document.getElementById('portalProgressFill');
  const chapterSearchInput  = document.getElementById('chapterSearchInput');

  const bcModule = document.getElementById('bcModule');
  const bcTopic  = document.getElementById('bcTopic');

  const articleTitle      = document.getElementById('articleTitle');
  const badgePriority     = document.getElementById('badgePriority');
  const badgeTime         = document.getElementById('badgeTime');
  const badgeUpdated      = document.getElementById('badgeUpdated');
  const portalContentBody = document.getElementById('portalContentBody');

  const btnCompleteToggle  = document.getElementById('btnCompleteToggle');
  const completeToggleText = document.getElementById('completeToggleText');
  const btnStarToggle      = document.getElementById('btnStarToggle');
  const btnNotesToggle     = document.getElementById('btnNotesToggle');
  const btnAiHelper        = document.getElementById('btnAiHelper');
  const btnPrevTopic       = document.getElementById('btnPrevTopic');
  const btnNextTopic       = document.getElementById('btnNextTopic');

  const readingProgressPct  = document.getElementById('readingProgressPct');
  const readingProgressFill = document.getElementById('readingProgressFill');
  const tocLinks            = document.getElementById('tocLinks');

  const portalSidebar       = document.getElementById('portalSidebar');
  const portalSidebarToggle = document.getElementById('portalSidebarToggle');

  const notesModalOverlay   = document.getElementById('notesModalOverlay');
  const notesModalClose     = document.getElementById('notesModalClose');
  const notesTextarea       = document.getElementById('notesTextarea');
  const notesSaveBtn        = document.getElementById('notesSaveBtn');

  // --- Track Selection & Dropdown Controller ---
  const portalTrackSelector = document.getElementById('portalTrackSelector');
  const trackSelectBtn       = document.getElementById('trackSelectBtn');
  const activeTrackIcon      = document.getElementById('activeTrackIcon');
  const activeTrackLabel     = document.getElementById('activeTrackLabel');
  const trackDropdownMenu    = document.getElementById('trackDropdownMenu');
  const portalCourseTitle    = document.getElementById('portalCourseTitle');

  if (activeTrack === 'typescript') {
    if (activeTrackIcon) activeTrackIcon.textContent = '📘';
    if (activeTrackLabel) activeTrackLabel.textContent = 'TypeScript Mastery';
    if (portalCourseTitle) portalCourseTitle.textContent = 'TypeScript Mastery & Type Systems';
    
    document.getElementById('trackOptWebdev')?.classList.remove('active');
    document.getElementById('trackOptTypescript')?.classList.add('active');
    document.getElementById('trackOptNextjs')?.classList.remove('active');
  } else if (activeTrack === 'nextjs') {
    if (activeTrackIcon) activeTrackIcon.textContent = '⚛️';
    if (activeTrackLabel) activeTrackLabel.textContent = 'Next.js Mastery';
    if (portalCourseTitle) portalCourseTitle.textContent = 'Next.js & AI Integration';
    
    document.getElementById('trackOptWebdev')?.classList.remove('active');
    document.getElementById('trackOptTypescript')?.classList.remove('active');
    document.getElementById('trackOptNextjs')?.classList.add('active');
  } else {
    if (activeTrackIcon) activeTrackIcon.textContent = '🌐';
    if (activeTrackLabel) activeTrackLabel.textContent = 'Web Development Mastery';
    if (portalCourseTitle) portalCourseTitle.textContent = 'Web Development Mastery';
    
    document.getElementById('trackOptWebdev')?.classList.add('active');
    document.getElementById('trackOptTypescript')?.classList.remove('active');
    document.getElementById('trackOptNextjs')?.classList.remove('active');
  }

  if (trackSelectBtn && portalTrackSelector) {
    trackSelectBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      portalTrackSelector.classList.toggle('active');
    });

    document.addEventListener('click', () => {
      portalTrackSelector.classList.remove('active');
    });
  }

  // --- Audio TTS Engine (Web Speech API) ---
  const audioBar            = document.querySelector('.portal-audio-bar');
  const audioPlayBtn        = document.getElementById('audioPlayBtn');
  let speechSynth           = window.speechSynthesis;
  let currentUtterance      = null;
  let isSpeaking            = false;
  let isPaused              = false;

  function stopSpeech() {
    if (speechSynth) {
      speechSynth.cancel();
    }
    isSpeaking = false;
    isPaused = false;
    updateAudioUI();
  }

  function getBestEnglishVoice() {
    if (!speechSynth) return null;
    const voices = speechSynth.getVoices();
    // Prefer Google US English
    let voice = voices.find(v => v.lang.startsWith('en-US') && v.name.includes('Google'));
    if (!voice) {
      // Fallback to any English voice
      voice = voices.find(v => v.lang.startsWith('en'));
    }
    if (!voice && voices.length > 0) {
      voice = voices[0];
    }
    return voice;
  }

  function extractSpeakableProse(htmlString) {
    if (!htmlString) return '';
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;

    // Remove pre tags (code blocks), images, style, script, and icon elements
    const blocksToRemove = tempDiv.querySelectorAll('pre, .code-box, img, style, script, .callout-icon');
    blocksToRemove.forEach(el => el.remove());

    // Add a natural period space after headings so they don't run into paragraphs
    tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(h => {
      h.innerHTML = h.innerHTML + '. ';
    });

    // Add a semicolon space after list items for a brief pause
    tempDiv.querySelectorAll('li').forEach(li => {
      li.innerHTML = li.innerHTML + '; ';
    });

    return tempDiv.textContent || tempDiv.innerText || '';
  }

  function updateAudioUI() {
    if (!audioPlayBtn || !audioBar) return;
    
    const iconSpan = audioPlayBtn.querySelector('span:first-child');
    const textSpan = audioPlayBtn.querySelector('span:last-child');
    const labelSpan = audioBar.querySelector('.audio-label');

    if (isSpeaking && !isPaused) {
      audioBar.classList.add('playing');
      audioBar.classList.remove('paused');
      audioPlayBtn.classList.add('playing');
      if (iconSpan) iconSpan.textContent = '⏸';
      if (textSpan) textSpan.textContent = 'Pause audio';
      if (labelSpan) {
        labelSpan.innerHTML = `🎙️ Speaking... <div class="voice-visualizer"><span></span><span></span><span></span><span></span></div>`;
      }
    } else if (isSpeaking && isPaused) {
      audioBar.classList.add('playing');
      audioBar.classList.add('paused');
      audioPlayBtn.classList.remove('playing');
      if (iconSpan) iconSpan.textContent = '▶';
      if (textSpan) textSpan.textContent = 'Resume audio';
      if (labelSpan) {
        labelSpan.innerHTML = `⏸ Audio Paused <div class="voice-visualizer"><span></span><span></span><span></span><span></span></div>`;
      }
    } else {
      audioBar.classList.remove('playing');
      audioBar.classList.remove('paused');
      audioPlayBtn.classList.remove('playing');
      if (iconSpan) iconSpan.textContent = '▶';
      if (textSpan) textSpan.textContent = 'Listen to this chapter';
      if (labelSpan) labelSpan.textContent = '🎧 Audio Overview Available';
    }
  }

  function startSpeaking() {
    if (!speechSynth) return;
    speechSynth.cancel();

    const topicObj = allTopics.find(t => t.id === currentTopicId) || allTopics[0];
    const speakTitle = topicObj.title ? `Chapter: ${topicObj.title}. ` : '';
    const speakSummary = topicObj.summary ? `Overview: ${topicObj.summary}. ` : '';
    const speakContent = extractSpeakableProse(topicObj.content);
    
    const textToSpeak = (speakTitle + speakSummary + speakContent).replace(/\s+/g, ' ').trim();

    if (!textToSpeak) return;

    currentUtterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const voice = getBestEnglishVoice();
    if (voice) {
      currentUtterance.voice = voice;
    }
    currentUtterance.rate = 1.05;
    currentUtterance.pitch = 1.0;

    currentUtterance.onend = () => {
      isSpeaking = false;
      isPaused = false;
      updateAudioUI();
    };

    currentUtterance.onerror = (e) => {
      if (e.error !== 'interrupted') {
        console.error('Speech synthesis error:', e);
      }
      isSpeaking = false;
      isPaused = false;
      updateAudioUI();
    };

    isSpeaking = true;
    isPaused = false;
    updateAudioUI();
    
    speechSynth.speak(currentUtterance);
  }

  if (speechSynth && speechSynth.onvoiceschanged !== undefined) {
    speechSynth.onvoiceschanged = () => {
      getBestEnglishVoice();
    };
  }

  if (audioPlayBtn) {
    audioPlayBtn.addEventListener('click', () => {
      if (!speechSynth) {
        alert('Web Speech API is not supported in this browser.');
        return;
      }

      if (isSpeaking) {
        if (isPaused) {
          speechSynth.resume();
          isPaused = false;
          updateAudioUI();
        } else {
          speechSynth.pause();
          isPaused = true;
          updateAudioUI();
        }
      } else {
        startSpeaking();
      }
    });
  }

  window.addEventListener('beforeunload', () => {
    stopSpeech();
  });

  // --- Render Knowledge Tree Navigation ---
  function renderTree(filterQuery = '') {
    const query = filterQuery.toLowerCase().trim();
    let treeHTML = '';

    activeModules.forEach((mod, modIdx) => {
      let matchingTopics = mod.topics.filter(t => 
        !query || t.title.toLowerCase().includes(query) || t.summary.toLowerCase().includes(query)
      );

      if (query && matchingTopics.length === 0) return; // Skip non-matching modules when searching

      let modCompletedCount = mod.topics.filter(t => completedTopics.has(t.id)).length;
      const isExpanded = query.length > 0 || mod.topics.some(t => t.id === currentTopicId) || modIdx === 0;

      treeHTML += `
        <div class="portal-tree-group ${isExpanded ? 'expanded' : ''}" data-mod-id="${mod.id}">
          <button class="portal-tree-header">
            <div class="portal-tree-title">
              <span>${mod.icon}</span>
              <span>${mod.title}</span>
            </div>
            <div class="portal-tree-meta">
              <span class="portal-tree-counter">${modCompletedCount}/${mod.topics.length}</span>
              <span class="portal-tree-chevron">▾</span>
            </div>
          </button>
          <div class="portal-tree-list">
            ${matchingTopics.map(topic => {
              const isActive = topic.id === currentTopicId;
              const isCompleted = completedTopics.has(topic.id);
              return `
                <a href="#${topic.id}" class="portal-tree-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" data-topic-id="${topic.id}">
                  <span class="portal-tree-icon">📄</span>
                  <span class="portal-tree-label">${topic.title}</span>
                  <span class="portal-tree-check">✓</span>
                </a>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    portalTree.innerHTML = treeHTML || '<div style="padding:1rem; text-align:center; color:var(--text-muted); font-size:0.85rem;">No matching chapters found</div>';

    // Accordion Toggle Event Listeners
    portalTree.querySelectorAll('.portal-tree-header').forEach(header => {
      header.addEventListener('click', () => {
        const group = header.closest('.portal-tree-group');
        group.classList.toggle('expanded');
      });
    });

    // Topic Item Click Listeners
    portalTree.querySelectorAll('.portal-tree-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const topicId = item.dataset.topicId;
        currentTopicId = topicId;
        loadTopic(topicId);
        if (window.innerWidth <= 992 && portalSidebar) {
          portalSidebar.classList.remove('open');
        }
      });
    });

    updateOverallProgress();
  }

  // --- Update Overall Progress Bar ---
  function updateOverallProgress() {
    const total = allTopics.length;
    const completedCount = allTopics.filter(t => completedTopics.has(t.id)).length;
    const pct = total > 0 ? Math.round((completedCount / total) * 100) : 0;

    if (portalProgressPct) portalProgressPct.textContent = `${pct}%`;
    if (portalProgressCount) portalProgressCount.textContent = `${completedCount} / ${total}`;
    if (portalProgressFill) portalProgressFill.style.width = `${pct}%`;
  }

  // --- Load Topic Content into Reader ---
  function loadTopic(topicId) {
    stopSpeech();
    const topicObj = allTopics.find(t => t.id === topicId) || allTopics[0];
    currentTopicId = topicObj.id;

    // Breadcrumbs
    if (bcModule) bcModule.textContent = topicObj.moduleTitle;
    if (bcTopic) bcTopic.textContent = topicObj.title;

    // Header Badges
    if (articleTitle) articleTitle.textContent = topicObj.title;
    if (badgePriority) badgePriority.textContent = `🔥 ${topicObj.priority}`;
    if (badgeTime) badgeTime.textContent = `⏱️ ${topicObj.readTime}`;
    if (badgeUpdated) badgeUpdated.textContent = `📅 Updated ${topicObj.updated}`;

    // Content Body
    if (portalContentBody) {
      portalContentBody.innerHTML = topicObj.content;
    }

    // Complete Button state
    updateCompleteButtonState(topicObj.id);

    // Star/Bookmark button state
    if (btnStarToggle) {
      const isBookmarked = bookmarkedTopics.has(topicObj.id);
      btnStarToggle.style.color = isBookmarked ? 'var(--accent-amber)' : 'var(--text-primary)';
      btnStarToggle.querySelector('span:last-child').textContent = isBookmarked ? 'Bookmarked' : 'Bookmark';
    }

    // Prev / Next Navigation buttons
    const currentIndex = allTopics.findIndex(t => t.id === topicObj.id);
    if (btnPrevTopic) {
      if (currentIndex > 0) {
        btnPrevTopic.style.display = 'inline-flex';
        btnPrevTopic.onclick = () => loadTopic(allTopics[currentIndex - 1].id);
      } else {
        btnPrevTopic.style.display = 'none';
      }
    }

    if (btnNextTopic) {
      if (currentIndex < allTopics.length - 1) {
        btnNextTopic.style.display = 'inline-flex';
        btnNextTopic.onclick = () => loadTopic(allTopics[currentIndex + 1].id);
      } else {
        btnNextTopic.style.display = 'none';
      }
    }

    // Render Right Column TOC
    renderTOC(topicObj);

    // Re-highlight tree
    renderTree(chapterSearchInput ? chapterSearchInput.value : '');

    // Reset scroll to top of content
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // --- Complete Button State Helper ---
  function updateCompleteButtonState(topicId) {
    if (!btnCompleteToggle) return;
    const isDone = completedTopics.has(topicId);
    if (isDone) {
      btnCompleteToggle.classList.add('active');
      if (completeToggleText) completeToggleText.textContent = 'Completed ✓';
    } else {
      btnCompleteToggle.classList.remove('active');
      if (completeToggleText) completeToggleText.textContent = 'Mark Complete';
    }
  }

  // --- Render Table of Contents (Right Sidebar) ---
  function renderTOC(topicObj) {
    if (!tocLinks) return;

    let outlineItems = topicObj.outline || [];

    // Fallback: search rendered h2/h3 tags if outline not defined
    if (outlineItems.length === 0 && portalContentBody) {
      const headings = portalContentBody.querySelectorAll('h2, h3');
      headings.forEach((h, i) => {
        if (!h.id) h.id = `section-${i}`;
        outlineItems.push({ id: h.id, text: h.textContent });
      });
    }

    if (outlineItems.length === 0) {
      tocLinks.innerHTML = '<li style="font-size:0.8rem; color:var(--text-muted);">No sections</li>';
      return;
    }

    tocLinks.innerHTML = outlineItems.map((item, idx) => `
      <li>
        <a href="#${item.id}" class="toc-link ${idx === 0 ? 'active' : ''}" data-target="${item.id}">
          ${item.text}
        </a>
      </li>
    `).join('');

    // Smooth scroll to heading when TOC link clicked
    tocLinks.querySelectorAll('.toc-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.dataset.target;
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
      });
    });
  }

  // --- Reading Progress % Calculation & Scroll TOC Sync ---
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const pct = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      if (readingProgressPct) readingProgressPct.textContent = `${pct}%`;
      if (readingProgressFill) readingProgressFill.style.width = `${pct}%`;
    }

    // Scrollsync TOC link highlight
    const headings = portalContentBody ? portalContentBody.querySelectorAll('h2[id], h3[id]') : [];
    let currentHeadingId = '';

    headings.forEach(h => {
      const rect = h.getBoundingClientRect();
      if (rect.top <= 140) {
        currentHeadingId = h.id;
      }
    });

    if (currentHeadingId && tocLinks) {
      tocLinks.querySelectorAll('.toc-link').forEach(l => {
        l.classList.toggle('active', l.dataset.target === currentHeadingId);
      });
    }
  }, { passive: true });

  // --- Live Chapter Search ---
  if (chapterSearchInput) {
    chapterSearchInput.addEventListener('input', (e) => {
      renderTree(e.target.value);
    });
  }

  // --- Complete Button Toggle ---
  if (btnCompleteToggle) {
    btnCompleteToggle.addEventListener('click', () => {
      if (completedTopics.has(currentTopicId)) {
        completedTopics.delete(currentTopicId);
      } else {
        completedTopics.add(currentTopicId);
      }
      localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify([...completedTopics]));
      updateCompleteButtonState(currentTopicId);
      renderTree(chapterSearchInput ? chapterSearchInput.value : '');
    });
  }

  // --- Star/Bookmark Button Toggle ---
  if (btnStarToggle) {
    btnStarToggle.addEventListener('click', () => {
      if (bookmarkedTopics.has(currentTopicId)) {
        bookmarkedTopics.delete(currentTopicId);
      } else {
        bookmarkedTopics.add(currentTopicId);
      }
      localStorage.setItem(STORAGE_KEY_BOOKMARKS, JSON.stringify([...bookmarkedTopics]));
      const isBookmarked = bookmarkedTopics.has(currentTopicId);
      btnStarToggle.style.color = isBookmarked ? 'var(--accent-amber)' : 'var(--text-primary)';
      btnStarToggle.querySelector('span:last-child').textContent = isBookmarked ? 'Bookmarked' : 'Bookmark';
    });
  }

  // --- Notes Modal Handler ---
  if (btnNotesToggle && notesModalOverlay) {
    btnNotesToggle.addEventListener('click', () => {
      notesTextarea.value = notesData[currentTopicId] || '';
      notesModalOverlay.classList.add('active');
    });
  }

  if (notesModalClose && notesModalOverlay) {
    notesModalClose.addEventListener('click', () => {
      notesModalOverlay.classList.remove('active');
    });
  }

  if (notesSaveBtn) {
    notesSaveBtn.addEventListener('click', () => {
      notesData[currentTopicId] = notesTextarea.value;
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(notesData));
      notesModalOverlay.classList.remove('active');
      if (typeof showToast === 'function') showToast('Notes saved successfully!');
    });
  }

  // --- Ask AI Helper Button ---
  if (btnAiHelper) {
    btnAiHelper.addEventListener('click', () => {
      const activeTopicObj = allTopics.find(t => t.id === currentTopicId);
      const prompt = `I am studying "${activeTopicObj ? activeTopicObj.title : 'Web Development'}" on WebDevRef. Can you quiz me on these key concepts or provide a real-world scenario to test my knowledge?`;
      navigator.clipboard.writeText(prompt);
      alert('🤖 AI Assistant Prompt copied to clipboard!\n\nPaste this in your AI chat window to start pair programming!');
    });
  }

  // --- Mobile Sidebar Drawer Toggle ---
  if (portalSidebarToggle && portalSidebar) {
    portalSidebarToggle.addEventListener('click', () => {
      portalSidebar.classList.toggle('open');
    });
  }

  // --- Initial Load ---
  renderTree();
  loadTopic(currentTopicId);

  // Sync with Hash Changes in URL
  window.addEventListener('hashchange', () => {
    const hashId = location.hash.replace('#', '');
    if (hashId && hashId !== currentTopicId) {
      loadTopic(hashId);
    }
  });
})();

