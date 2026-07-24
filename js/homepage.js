document.addEventListener('DOMContentLoaded', () => {
  initInteractiveTabs();
  initFaqAccordion();
  initStreakBadge();
});

// ============================================================
// INTERACTIVE TABS & DYNAMIC MOCKUPS
// ============================================================

const MOCKUP_TEMPLATES = {
  1: `
    <div class="mockup-audio-widget">
      <div class="mock-audio-title-row">
        <div>
          <h4 style="margin: 0; font-size: 0.95rem; font-weight: 700;">Chapter 6 &middot; CSS Architecture</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">Voice: Google US English (Natural)</span>
        </div>
        <span class="mock-audio-badge">Playing</span>
      </div>
      <div style="font-size: 0.9rem; line-height: 1.5; color: var(--text-secondary); background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 6px; margin-top: 1rem;">
        "CSS Custom Properties are dynamically updated in the browser. <span style="background: rgba(6, 182, 212, 0.25); color: white; padding: 2px 4px; border-radius: 2px; border-bottom: 2px solid var(--accent-cyan);">Unlike preprocessor variables, they can be accessed and manipulated directly using JavaScript</span>, enabling dynamic styling..."
      </div>
      <div class="mock-audio-playhead-container">
        <div class="mock-audio-track">
          <div class="mock-audio-progress" style="width: 58%;"></div>
          <div class="mock-audio-pin" style="left: 58%;"></div>
        </div>
        <div class="mock-audio-time" style="margin-top: 0.5rem;">
          <span>01:14</span>
          <span>02:40</span>
        </div>
      </div>
      <div class="mock-audio-controls">
        <span style="font-size: 1.25rem; color: var(--text-muted); cursor: pointer;">⏮</span>
        <div class="mock-audio-btn-circle" style="cursor: pointer;">
          <span style="margin-left: 2px;">⏸</span>
        </div>
        <span style="font-size: 1.25rem; color: var(--text-muted); cursor: pointer;">⏭</span>
        <span style="font-size: 0.85rem; font-family: monospace; border: 1px solid var(--border); padding: 2px 6px; border-radius: 4px; color: var(--accent-cyan);">1.25x</span>
      </div>
    </div>
  `,
  2: `
    <div class="mockup-quiz-widget">
      <div style="display:flex; justify-content:space-between; margin-bottom: 1rem; font-size: 0.8rem; color: var(--text-muted);">
        <span>Category: Performance & CSS</span>
        <span>Question 4 of 30</span>
      </div>
      <div class="mock-quiz-q">Which CSS function allows fluid typography scale between min/max sizes without media queries?</div>
      <div class="mock-quiz-opts">
        <div class="mock-quiz-opt">
          <span>A. calc(16px + 1vw)</span>
          <span></span>
        </div>
        <div class="mock-quiz-opt correct">
          <span>B. clamp(1rem, 2.5vw, 3rem)</span>
          <span class="mock-quiz-check">✓ Correct</span>
        </div>
        <div class="mock-quiz-opt">
          <span>C. minmax(1rem, 3rem)</span>
          <span></span>
        </div>
      </div>
      <div style="margin-top: 1rem; padding: 1rem; border-radius: 6px; background: rgba(16, 185, 129, 0.05); border: 1px dashed rgba(16, 185, 129, 0.2); font-size: 0.85rem;">
        <strong style="color: var(--accent-green);">💡 Explanation:</strong> The <code>clamp()</code> function takes three parameters: a minimum value, a preferred value, and a maximum value, allowing perfect responsive text scaling.
      </div>
    </div>
  `,
  3: `
    <div class="mockup-progress-widget">
      <div class="mock-progress-bar-row">
        <div>
          <h4 style="margin: 0; font-size: 1.1rem;">Overall Guide Progress</h4>
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">7 of 12 chapters completed</p>
        </div>
        <div class="mock-progress-ring">58%</div>
      </div>
      <div class="mock-progress-items">
        <div class="mock-progress-item">
          <div class="mock-checkbox checked"></div>
          <span class="mock-progress-text strike">📋 Pre-Project Setup Checklist</span>
        </div>
        <div class="mock-progress-item">
          <div class="mock-checkbox checked"></div>
          <span class="mock-progress-text strike">🐙 Git Context & AGENTS.md Setup</span>
        </div>
        <div class="mock-progress-item">
          <div class="mock-checkbox"></div>
          <span class="mock-progress-text">🎨 Fluid CSS & Web Vitals Audit</span>
        </div>
      </div>
    </div>
  `,
  4: `
    <div class="mockup-visualizer-widget">
      <div class="mock-visualizer-controls">
        <button class="mock-vis-btn active" data-style="flex-row">flex-row</button>
        <button class="mock-vis-btn" data-style="flex-col">flex-column</button>
        <button class="mock-vis-btn" data-style="justify-center">justify-center</button>
        <button class="mock-vis-btn" data-style="justify-between">justify-between</button>
      </div>
      <p style="font-size:0.8rem; text-align:center; color: var(--text-muted); margin: 0;">Interactive Demo: Click controls to update layout</p>
      <div class="mock-vis-canvas" id="visCanvas">
        <div class="mock-vis-item">Box 1</div>
        <div class="mock-vis-item" style="background: linear-gradient(135deg, var(--accent-cyan), var(--grad-start));">Box 2</div>
        <div class="mock-vis-item" style="background: linear-gradient(135deg, var(--accent-amber), var(--accent-red));">Box 3</div>
      </div>
    </div>
  `,
  5: `
    <div class="mockup-ai-widget">
      <div class="mock-ai-msg user">How does CORS policy block browser requests?</div>
      <div class="mock-ai-msg ai">
        CORS (Cross-Origin Resource Sharing) is a security mechanism enforced by the <strong>browser</strong>. When a web page requests a resource from a different origin:
        <br/><br/>
        1. Browser sends a preflight request (<code>OPTIONS</code>).
        <br/>
        2. Server responds with <code>Access-Control-Allow-Origin</code> headers.
        <br/>
        3. If headers mismatch, browser blocks response.<span class="mock-ai-streaming-cursor"></span>
      </div>
    </div>
  `,
  6: `
    <div class="mockup-palette-widget">
      <div class="mock-palette-input-row">
        <span style="font-size: 1.1rem;">🔍</span>
        <input type="text" value="Testing" style="background:none; border:none; color:white; width:100%; outline:none; font-size: 0.9rem;" disabled />
        <span style="font-size: 0.75rem; color: var(--text-muted);">Esc</span>
      </div>
      <div class="mock-palette-results">
        <div class="mock-palette-item active">
          <span>🧪 Testing Strategy: The Testing Pyramid</span>
          <span class="mock-palette-kbd">Enter</span>
        </div>
        <div class="mock-palette-item">
          <span>🛠️ Chrome DevTools: Network Tab Auditing</span>
          <span class="mock-palette-kbd">Jump</span>
        </div>
        <div class="mock-palette-item">
          <span>📋 Pre-Launch QA Verification Checklist</span>
          <span class="mock-palette-kbd">Jump</span>
        </div>
      </div>
    </div>
  `
};

function initInteractiveTabs() {
  const tabs = document.querySelectorAll('.interactive-tab-btn');
  const mockupBody = document.getElementById('mockupBody');
  
  if (!mockupBody) return;
  
  // Set initial content
  mockupBody.innerHTML = MOCKUP_TEMPLATES[1];
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active states
      tabs.forEach(t => t.classList.remove('active'));
      
      // Add active state to clicked
      tab.classList.add('active');
      
      // Load new template with fade transition
      mockupBody.style.opacity = 0;
      setTimeout(() => {
        const tabId = tab.getAttribute('data-tab');
        mockupBody.innerHTML = MOCKUP_TEMPLATES[tabId] || '';
        mockupBody.style.opacity = 1;
        
        // Re-bind interactive visualizer layout buttons if tab 4 is loaded
        if (tabId === '4') {
          bindVisualizerControls();
        }
      }, 150);
    });
  });
}

function bindVisualizerControls() {
  const controls = document.querySelectorAll('.mock-vis-btn');
  const canvas = document.getElementById('visCanvas');
  
  if (!canvas) return;
  
  controls.forEach(btn => {
    btn.addEventListener('click', () => {
      const style = btn.getAttribute('data-style');
      
      // Handle active state
      if (style.startsWith('flex')) {
        controls.forEach(c => {
          if (c.getAttribute('data-style').startsWith('flex')) c.classList.remove('active');
        });
      } else if (style.startsWith('justify')) {
        controls.forEach(c => {
          if (c.getAttribute('data-style').startsWith('justify')) c.classList.remove('active');
        });
      }
      btn.classList.add('active');
      
      // Apply style to mockup canvas
      if (style === 'flex-row') {
        canvas.style.flexDirection = 'row';
      } else if (style === 'flex-col') {
        canvas.style.flexDirection = 'column';
      } else if (style === 'justify-center') {
        canvas.style.justifyContent = 'center';
      } else if (style === 'justify-between') {
        canvas.style.justifyContent = 'space-between';
      }
    });
  });
}

// ============================================================
// FAQ ACCORDION TRANSITIONS
// ============================================================

function initFaqAccordion() {
  const triggers = document.querySelectorAll('.faq-trigger');
  
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.closest('.faq-item');
      const panel = faqItem.querySelector('.faq-panel');
      const isActive = faqItem.classList.contains('active');
      
      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        item.querySelector('.faq-panel').style.maxHeight = null;
      });
      
      if (!isActive) {
        faqItem.classList.add('active');
        panel.style.maxHeight = panel.scrollHeight + 'px';
      }
    });
  });
}

// ============================================================
// STREAK BADGE INTERACTIVITY
// ============================================================

function initStreakBadge() {
  const streak = document.getElementById('streakBadge');
  if (streak) {
    streak.addEventListener('click', () => {
      if (typeof showToast === 'function') {
        showToast("🔥 Your learning streak: 3 days active! Keep building your momentum! ⚡");
      } else {
        alert("🔥 Your learning streak: 3 days active! Keep building your momentum! ⚡");
      }
    });
  }
}
