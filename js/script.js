/* ─── SCRIPT.JS ──────────────────────────────────────────────── */

// ── Footer year ──
document.getElementById('year').textContent = new Date().getFullYear();

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

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

  heroObs.observe(document.getElementById('hero'));
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
