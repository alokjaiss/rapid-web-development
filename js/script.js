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
  '.deploy-platform-card, .tool-category'
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

// ── Interactive Active-Recall Quiz Engine ──
(function initQuizEngine() {
  const quizCard = document.getElementById('quizCard');
  if (!quizCard) return;

  const quizQuestions = [
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
      question: 'Which WCAG AA contrast ratio standard must text satisfy against its background color?',
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
    }
  ];

  let currentPool = [...quizQuestions];
  let currentIndex = 0;
  let score = 0;
  let selectedCategory = 'all';

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
      currentPool = [...quizQuestions];
    } else {
      currentPool = quizQuestions.filter(q => q.category === category);
    }
    currentIndex = 0;
    score = 0;
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

    if (chosenIndex === questionObj.answer) {
      selectedBtn.classList.add('correct');
      score++;
      if (typeof showToast === 'function') showToast('Correct! +1 Point');
    } else {
      selectedBtn.classList.add('incorrect');
      allOptionBtns[questionObj.answer].classList.add('correct');
    }

    explanationText.textContent = questionObj.explanation;
    explanationBox.style.display = 'block';
    nextBtn.style.display = 'inline-block';
  }

  function renderScorecard() {
    progressBar.style.width = '100%';
    const pct = Math.round((score / currentPool.length) * 100);
    let badgeText = pct >= 80 ? '🏆 Mastered!' : pct >= 60 ? '👍 Good Effort!' : '📚 Keep Learning!';

    quizCard.innerHTML = `
      <div class="quiz-scorecard">
        <div class="score-badge">${pct}%</div>
        <h3>${badgeText}</h3>
        <p style="color: var(--text-secondary); margin-bottom: 1.5rem;">
          You scored <strong>${score}</strong> out of <strong>${currentPool.length}</strong> questions correctly.
        </p>
        <button class="btn btn-primary" id="restartQuizBtn">Retake Quiz →</button>
      </div>
    `;

    document.getElementById('restartQuizBtn')?.addEventListener('click', () => {
      location.reload();
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
