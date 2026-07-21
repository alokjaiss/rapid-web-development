/**
 * WebDevRef Master Knowledge Data Registry
 * AlgoMaster-inspired modular data structure for instant topic expansion.
 * Editorial Long-Form Prose Layout (matching AlgoMaster.io article structure).
 */

window.KNOWLEDGE_DATA = {
  courseTitle: "Web Development Mastery & AI Velocity",
  totalTopics: 37,
  modules: [
    {
      id: "mod-setup-git",
      track: "webdev",
      title: "01. Pre-Project & GitHub Workflow",
      icon: "⚡",
      topics: [
        {
          id: "preproject-checklist",
          title: "Pre-Project Setup Checklist (8 Steps)",
          priority: "High Priority",
          readTime: "6 min read",
          updated: "May 27, 2026",
          badge: "Essential",
          audioUrl: "#",
          summary: "Complete 8-step setup checklist required before writing line 1 of code to avoid technical debt and context loss.",
          outline: [
            { id: "the-core-idea", text: "1. The Core Idea" },
            { id: "step-1-git", text: "2. Git Repository & .gitignore Setup" },
            { id: "step-2-agents", text: "3. Drafting the AI Briefing (AGENTS.md)" },
            { id: "step-3-tokens", text: "4. Design System Tokens (:root CSS)" },
            { id: "step-4-structure", text: "5. Folder Structure & Conventions" },
            { id: "step-5-secrets", text: "6. Environment Configuration & Secret Hygiene" },
            { id: "step-7-pipeline", text: "7. Automated Testing & Verification" },
            { id: "conclusion", text: "8. Conclusion & Best Practices" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Pre-project setup is the process of establishing project boundaries, technical constraints, design tokens, and automated checks before writing a single line of feature code.</p>

              <p>It involves more than just running <code>git init</code>. Effective pre-project configuration ensures clean code architecture, smooth team collaboration, and seamless pair programming with agentic AI assistants. Skipping these initial steps leads to spaghetti code, broken commit histories, leaked secrets, and unnecessary refactoring.</p>

              <div class="callout callout-tip">
                <span class="callout-icon">💡</span>
                <div class="callout-body">
                  <strong>The 15-Minute Rule:</strong> Spending 15 minutes setting up proper repository rules, design tokens, and context boundaries saves 15+ hours of merge conflicts, styling bugs, and technical debt later.
                </div>
              </div>

              <h2 id="the-core-idea">1. The Core Idea</h2>
              <p>When starting a new web project or feature module, professional engineers establish a repeatable foundation. This foundation consists of eight sequential steps that guarantee code maintainability and team velocity.</p>

              <h2 id="step-1-git">2. Git Repository & .gitignore Setup</h2>
              <p>Initialize version control immediately to track every architectural decision. Create a strict <code>.gitignore</code> file to prevent build artifacts, dependency directories, and environment secrets from cluttering the repository.</p>
              
              <div class="code-box">
                <pre><code># Dependencies
node_modules/
.pnpm-store/

# Production Build Outputs
dist/
build/
.next/

# Local Environment Secrets
.env
.env.local
*.pem

# Operating System Noise
.DS_Store
Thumbs.db</code></pre>
              </div>

              <h2 id="step-2-agents">3. Drafting the AI Briefing (AGENTS.md)</h2>
              <p>In modern software development, AI coding assistants work directly inside your repository. Create a root-level <code>AGENTS.md</code> file detailing tech stack rules, CSS variable names, folder structures, and Git branching rules.</p>
              
              <p>When an AI agent opens your workspace, it reads <code>AGENTS.md</code> first. This prevents the assistant from adding unapproved npm libraries, inventing rogue CSS classes, or breaking existing architecture.</p>

              <h2 id="step-3-tokens">4. Design System Tokens (:root CSS)</h2>
              <p>Define single-source-of-truth CSS custom properties in <code>css/style.css</code> under <code>:root</code> before writing HTML components. This establishes unified color palettes, typography scales, border radii, and dark mode theme variables.</p>

              <div class="code-box">
                <pre><code>:root {
  /* Color Palette Tokens */
  --bg-primary: #050510;
  --bg-secondary: #0a0a1a;
  
  /* Accent Gradients */
  --grad-start: #6366f1;
  --grad-end: #06b6d4;
  --accent-cyan: #06b6d4;
  --accent-green: #10b981;
}</code></pre>
              </div>

              <h2 id="step-4-structure">5. Folder Structure & Conventions</h2>
              <p>Separate assets, styles, scripts, and helper modules into distinct directories. Use clear naming patterns so every contributor knows where to locate and add files.</p>

              <ul class="article-list">
                <li><strong>/css/</strong> — Design tokens, global resets, portal grid, and component styles.</li>
                <li><strong>/js/</strong> — Master data registries, state management, and interactive UI logic.</li>
                <li><strong>/assets/</strong> — Compressed images, self-hosted fonts, and favicons.</li>
                <li><strong>/pages/</strong> — Sub-pages, practice suites, and specialized reference tools.</li>
              </ul>

              <h2 id="step-5-secrets">6. Environment Configuration & Secret Hygiene</h2>
              <p>Never hardcode API keys, database credentials, or secret tokens inside application code. Store secrets in <code>.env</code> files and commit an obfuscated <code>.env.example</code> file to document required environment keys.</p>

              <h2 id="step-7-pipeline">7. Automated Testing & Verification</h2>
              <p>Configure automated linters and test scripts. Verify that test commands run cleanly before submitting pull requests or merging into production release branches.</p>

              <h2 id="conclusion">8. Conclusion & Best Practices</h2>
              <p>By following this 8-step setup checklist on every project, you ensure high software reliability, clean developer onboarding, and maximum AI pair programming velocity.</p>
            </div>
          `
        },
        {
          id: "github-workflow",
          title: "GitHub Setup, SSH & Branching Strategy",
          priority: "High Priority",
          readTime: "7 min read",
          updated: "Jun 12, 2026",
          badge: "Git Mastery",
          audioUrl: "#",
          summary: "Master SSH authentication, branch hierarchy, pull requests, and conventional commit standards.",
          outline: [
            { id: "git-intro", text: "1. Introduction to Version Control" },
            { id: "ssh-setup", text: "2. SSH Key Generation & Authentication" },
            { id: "branching-rules", text: "3. Branch Hierarchy: Main vs Release" },
            { id: "conventional-commits", text: "4. Conventional Commits Standard" },
            { id: "git-summary", text: "5. Summary & Workflow Routine" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">GitHub workflow design dictates how software changes move from local developer environments to stable production deployments.</p>

              <p>Establishing professional Git workflows guarantees traceable releases, conflict-free collaboration, and automated CI/CD deployments.</p>

              <h2 id="git-intro">1. Introduction to Version Control</h2>
              <p>Version control tracks every alteration to the codebase in a special database. If a bug is introduced, developers can compare historical commits, trace author intentions, and revert cleanly without manual file backups.</p>

              <h2 id="ssh-setup">2. SSH Key Generation & Authentication</h2>
              <p>Configure SSH keys once per developer workstation to authenticate securely with GitHub without typing passwords on every push.</p>

              <div class="code-box">
                <pre><code># Generate ED25519 SSH Key
ssh-keygen -t ed25519 -C "your_email@example.com"

# Copy SSH public key to clipboard (PowerShell)
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard</code></pre>
              </div>

              <h2 id="branching-rules">3. Branch Hierarchy: Main vs Release</h2>
              <p>Never commit directly to production release branches. Follow a structured 4-tier branch hierarchy:</p>

              <ol class="article-list">
                <li><strong>main:</strong> Active integration branch where feature branches are merged after testing.</li>
                <li><strong>release:</strong> Stable production release branch. Deployed automatically to production servers.</li>
                <li><strong>feature/*:</strong> Short-lived feature branches (e.g. <code>feature/dark-mode-toggle</code>).</li>
                <li><strong>fix/*:</strong> Targeted bugfix branches (e.g. <code>fix/sidebar-mobile-scroll</code>).</li>
              </ol>

              <h2 id="conventional-commits">4. Conventional Commits Standard</h2>
              <p>Format commit messages as <code>type(scope): description</code>. This enables automated changelog generation and clear audit trails.</p>

              <div class="code-box">
                <pre><code>feat(portal): add 3-column AlgoMaster workspace layout
fix(nav): correct z-index layering on scrolled mobile view
docs(agents): update AGENTS.md with new design guidelines
chore(deps): update dependencies to latest patch versions</code></pre>
              </div>

              <h2 id="git-summary">5. Summary & Workflow Routine</h2>
              <p>Always pull latest changes before starting work (<code>git pull origin main</code>), keep branches focused on single tasks, and rebase cleanly before opening pull requests.</p>
            </div>
          `
        },
        {
          id: "ai-context-files",
          title: "AI Context Management (AGENTS.md & SKILL.md)",
          priority: "Must Know",
          readTime: "6 min read",
          updated: "Jul 18, 2026",
          badge: "AI Acceleration",
          audioUrl: "#",
          summary: "How to structure context files so AI agents program with 100% precision without breaking codebase rules.",
          outline: [
            { id: "context-idea", text: "1. The AI Context Paradigm" },
            { id: "agents-md-rules", text: "2. Structuring AGENTS.md Briefings" },
            { id: "skill-md-rules", text: "3. Custom Agent Skills & Tools" },
            { id: "context-summary", text: "4. Conclusion" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">AI context management is the art of providing AI coding agents with exact repository boundaries, design tokens, and coding standards.</p>

              <p>When AI agents have access to structured briefing files like <code>AGENTS.md</code>, they generate accurate code, adhere strictly to your tech stack, and avoid unapproved dependencies or rogue styling.</p>

              <div class="callout callout-tip">
                <span class="callout-icon">🤖</span>
                <div class="callout-body">
                  <strong>Why AGENTS.md Works:</strong> Modern AI assistants automatically discover root-level <code>AGENTS.md</code> files upon entering a workspace, loading domain rules into memory before processing user prompts.
                </div>
              </div>

              <h2 id="context-idea">1. The AI Context Paradigm</h2>
              <p>Without context files, AI models must guess your coding preferences, leading to mismatched class names, incorrect imports, and style regressions. Providing explicit context files converts an AI model from a generic chatbot into a tailored senior pair programmer.</p>

              <h2 id="agents-md-rules">2. Structuring AGENTS.md Briefings</h2>
              <p>An effective <code>AGENTS.md</code> briefing contains five core sections:</p>

              <ol class="article-list">
                <li><strong>Project Overview:</strong> App name, goals, target audience, and architecture.</li>
                <li><strong>Tech Stack:</strong> Explicit technology choices and hard forbidden frameworks (e.g. Vanilla CSS only, no Tailwind).</li>
                <li><strong>Design System Tokens:</strong> Complete list of CSS custom properties (colors, gradients, border radius).</li>
                <li><strong>Coding Standards:</strong> Class naming rules, file organization, and error handling policies.</li>
                <li><strong>What NOT to Do:</strong> Hard constraints that prevent accidental breaking changes.</li>
              </ol>

              <h2 id="skill-md-rules">3. Custom Agent Skills & Tools</h2>
              <p>For complex repetitive tasks (e.g. database migrations, security audits, test generation), define reusable agent skills under <code>.agents/skills/skill-name/SKILL.md</code>.</p>

              <h2 id="context-summary">4. Conclusion</h2>
              <p>Investing time in updating your <code>AGENTS.md</code> whenever new patterns emerge ensures AI assistants continuously produce high-quality, production-ready code.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-css-perf",
      track: "webdev",
      title: "02. CSS Architecture & Performance",
      icon: "🎨",
      topics: [
        {
          id: "css-architecture",
          title: "CSS Architecture & Design System Tokens",
          priority: "High Priority",
          readTime: "8 min read",
          updated: "Jun 15, 2026",
          badge: "CSS Design",
          audioUrl: "#",
          summary: "Build scalable CSS systems using CSS Custom Properties, BEM naming conventions, and modern flex/grid layouts.",
          outline: [
            { id: "css-core-idea", text: "1. Scalable CSS Principles" },
            { id: "custom-properties", text: "2. CSS Custom Properties (:root)" },
            { id: "bem-methodology", text: "3. BEM Class Naming System" },
            { id: "flex-grid-rules", text: "4. Flexbox vs CSS Grid Architecture" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">CSS architecture defines how styles are organized, tokenized, and scoped across large web applications.</p>

              <p>A well-architected CSS system prevents specificity wars, guarantees visual consistency across pages, and makes dark mode theming effortless.</p>

              <h2 id="css-core-idea">1. Scalable CSS Principles</h2>
              <p>Unstructured CSS quickly degrades into thousands of lines of duplicated properties and fragile <code>!important</code> overrides. Professional web applications rely on central design tokens and structured naming conventions.</p>

              <h2 id="custom-properties">2. CSS Custom Properties (:root)</h2>
              <p>Store all reusable design values in CSS Custom Properties under the <code>:root</code> pseudo-class:</p>

              <div class="code-box">
                <pre><code>:root {
  /* Dark Mode Palette */
  --bg-primary: #050510;
  --bg-secondary: #0a0a1a;
  --bg-card: rgba(255, 255, 255, 0.04);
  
  /* Gradients & Accents */
  --grad-start: #6366f1;
  --grad-end: #06b6d4;
  --accent-cyan: #06b6d4;
  --accent-green: #10b981;
}</code></pre>
              </div>

              <h2 id="bem-methodology">3. BEM Class Naming System</h2>
              <p>Use Block-Element-Modifier (BEM) syntax to scope CSS selectors and prevent unintended style leaks:</p>

              <ul class="article-list">
                <li><strong>Block:</strong> Standalone component entity (<code>.portal-sidebar</code>).</li>
                <li><strong>Element:</strong> Component sub-part tied to the block (<code>.portal-sidebar__title</code>).</li>
                <li><strong>Modifier:</strong> Variant state flag (<code>.portal-sidebar--collapsed</code>).</li>
              </ul>

              <h2 id="flex-grid-rules">4. Flexbox vs CSS Grid Architecture</h2>
              <p>Use <strong>Flexbox</strong> for 1-dimensional component alignments (navbars, toolbars, list items). Use <strong>CSS Grid</strong> for 2-dimensional page layouts (3-column portal grids, card viewports).</p>
            </div>
          `
        },
        {
          id: "web-vitals-perf",
          title: "Core Web Vitals & Performance Optimization",
          priority: "High Priority",
          readTime: "9 min read",
          updated: "Jul 10, 2026",
          badge: "Performance",
          audioUrl: "#",
          summary: "Optimize LCP, FID/INP, and CLS to achieve sub-second page loads and 100/100 Lighthouse scores.",
          outline: [
            { id: "vitals-overview", text: "1. Understanding Core Web Vitals" },
            { id: "lcp-strategy", text: "2. Largest Contentful Paint (LCP)" },
            { id: "inp-strategy", text: "3. Interaction to Next Paint (INP)" },
            { id: "cls-strategy", text: "4. Cumulative Layout Shift (CLS)" },
            { id: "perf-conclusion", text: "5. Summary" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Core Web Vitals are Google's standardized metrics for measuring page loading speed, interactivity, and visual stability.</p>

              <p>Optimizing Web Vitals improves search engine rankings, lowers user bounce rates, and delivers a premium user experience.</p>

              <h2 id="vitals-overview">1. Understanding Core Web Vitals</h2>
              <p>Google evaluates web user experience through three key metrics: Largest Contentful Paint (LCP), Interaction to Next Paint (INP), and Cumulative Layout Shift (CLS).</p>

              <h2 id="lcp-strategy">2. Largest Contentful Paint (LCP) &lt; 2.5s</h2>
              <p>LCP measures how long it takes for the largest visual element (hero image or primary heading) to render in the viewport.</p>

              <ul class="article-list">
                <li>Preload critical hero images using <code>&lt;link rel="preload"&gt;</code>.</li>
                <li>Compress visual assets to modern WebP / AVIF formats.</li>
                <li>Self-host fonts with <code>font-display: swap</code> to eliminate render-blocking font downloads.</li>
              </ul>

              <h2 id="inp-strategy">3. Interaction to Next Paint (INP) &lt; 200ms</h2>
              <p>INP measures page responsiveness to user clicks, taps, and key presses. Keep INP low by breaking up long-running JavaScript tasks on the main thread using <code>requestAnimationFrame</code> or Web Workers.</p>

              <h2 id="cls-strategy">4. Cumulative Layout Shift (CLS) &lt; 0.1</h2>
              <p>CLS measures unexpected visual movement during page load. Always specify explicit <code>width</code> and <code>height</code> attributes on images and videos to reserve layout dimensions.</p>

              <h2 id="perf-conclusion">5. Summary</h2>
              <p>Regularly audit performance using Chrome DevTools Lighthouse to ensure sub-second initial load times across mobile and desktop devices.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-testing-debug",
      track: "webdev",
      title: "03. Testing Strategy & Debugging Toolkit",
      icon: "🧪",
      topics: [
        {
          id: "testing-pyramid",
          title: "The Testing Pyramid & Unit Testing Rules",
          priority: "High Priority",
          readTime: "7 min read",
          updated: "Jun 20, 2026",
          badge: "Testing",
          audioUrl: "#",
          summary: "Establish high software reliability using unit tests, integration testing, and end-to-end browser verification.",
          outline: [
            { id: "testing-concept", text: "1. The Value of Automated Testing" },
            { id: "pyramid-structure", text: "2. The 3 Layers of the Testing Pyramid" },
            { id: "unit-rules-list", text: "3. Core Unit Testing Guidelines" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Automated testing guarantees that code additions and refactoring pass verification without introducing unexpected regressions.</p>

              <p>A balanced test suite acts as a safety net, allowing developers to push features with confidence.</p>

              <h2 id="testing-concept">1. The Value of Automated Testing</h2>
              <p>Manual browser testing is slow, error-prone, and unscalable. Automated test suites execute hundreds of assertions in seconds, verifying application logic on every commit.</p>

              <h2 id="pyramid-structure">2. The 3 Layers of the Testing Pyramid</h2>
              
              <ol class="article-list">
                <li><strong>Unit Tests (70%):</strong> Fast, isolated tests validating single functions and data transformations.</li>
                <li><strong>Integration Tests (20%):</strong> Verify interactions between components, API calls, and local storage state.</li>
                <li><strong>End-to-End Tests (10%):</strong> Simulate full user journeys in real browser sessions (Playwright) before production releases.</li>
              </ol>

              <h2 id="unit-rules-list">3. Core Unit Testing Guidelines</h2>
              <p>Keep unit tests deterministic, fast, and independent. Never mock the system under test, and ensure every test failure provides clear diagnostic output.</p>
            </div>
          `
        },
        {
          id: "devtools-debugging",
          title: "Chrome DevTools & Memory Leak Audits",
          priority: "Must Know",
          readTime: "8 min read",
          updated: "Jul 15, 2026",
          badge: "Debugging",
          audioUrl: "#",
          summary: "Use Console breakpoints, Network throttling, Heap snapshots, and Render performance audits like a pro.",
          outline: [
            { id: "debug-overview", text: "1. Professional Debugging Workflow" },
            { id: "conditional-breakpoints", text: "2. Conditional Breakpoints & Logpoints" },
            { id: "memory-audit", text: "3. Memory Leak Detection via Heap Snapshots" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Chrome DevTools provides deep diagnostic capabilities for inspecting runtime errors, DOM shifts, network latency, and memory leaks.</p>

              <h2 id="debug-overview">1. Professional Debugging Workflow</h2>
              <p>Move beyond standard <code>console.log</code> statements. Use native browser debugger tools to pause execution, inspect variable call stacks, and evaluate expressions dynamically.</p>

              <h2 id="conditional-breakpoints">2. Conditional Breakpoints & Logpoints</h2>
              <p>Right-click line numbers in the Sources panel to set conditional breakpoints (e.g. <code>user.id === 404</code>). Use Logpoints to log runtime telemetry without editing source code.</p>

              <h2 id="memory-audit">3. Memory Leak Detection via Heap Snapshots</h2>
              <p>Use the DevTools Memory panel to record Heap Allocation Profiles before and after user interactions to catch detached DOM elements and lingering event listeners.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-api-deploy",
      track: "webdev",
      title: "04. API Design & Deployment",
      icon: "🌐",
      topics: [
        {
          id: "api-design",
          title: "RESTful API Best Practices & Security",
          priority: "High Priority",
          readTime: "8 min read",
          updated: "Jun 18, 2026",
          badge: "API Architecture",
          audioUrl: "#",
          summary: "Design predictable REST APIs, enforce standard HTTP status codes, structured JSON errors, and auth security headers.",
          outline: [
            { id: "api-overview", text: "1. RESTful API Design Principles" },
            { id: "resource-naming", text: "2. Endpoint Naming Conventions" },
            { id: "status-codes-ref", text: "3. Standard HTTP Status Codes" },
            { id: "security-headers-ref", text: "4. Security Headers & Rate Limiting" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">RESTful API design establishes consistent communication contracts between frontend applications and backend services.</p>

              <h2 id="api-overview">1. RESTful API Design Principles</h2>
              <p>Well-designed APIs are self-documenting, stateless, predictable, and secured with standard authentication headers.</p>

              <h2 id="resource-naming">2. Endpoint Naming Conventions</h2>
              <p>Use plural nouns for resource URLs and standard HTTP verbs for operations:</p>

              <ul class="article-list">
                <li><code>GET /api/v1/topics</code> — Retrieve list of topics.</li>
                <li><code>GET /api/v1/topics/42</code> — Retrieve single topic by ID.</li>
                <li><code>POST /api/v1/topics</code> — Create a new topic resource.</li>
                <li><code>DELETE /api/v1/topics/42</code> — Remove a topic resource.</li>
              </ul>

              <h2 id="status-codes-ref">3. Standard HTTP Status Codes</h2>
              <p>Return exact HTTP status codes to communicate payload outcomes:</p>

              <ol class="article-list">
                <li><strong>200 OK / 201 Created:</strong> Request succeeded or resource created successfully.</li>
                <li><strong>400 Bad Request:</strong> Client error (invalid payload or missing parameters).</li>
                <li><strong>401 Unauthorized / 403 Forbidden:</strong> Missing auth token or insufficient permissions.</li>
                <li><strong>404 Not Found:</strong> Target resource endpoint does not exist.</li>
                <li><strong>500 Internal Server Error:</strong> Unhandled backend exception.</li>
              </ol>

              <h2 id="security-headers-ref">4. Security Headers & Rate Limiting</h2>
              <p>Always enforce CORS origins, CSP policies, rate limiting, and HTTPS redirect headers in production environments.</p>
            </div>
          `
        },
        {
          id: "deployment-pipeline",
          title: "CI/CD Pipeline & Production Launch",
          priority: "High Priority",
          readTime: "7 min read",
          updated: "Jul 12, 2026",
          badge: "DevOps",
          audioUrl: "#",
          summary: "Configure automated GitHub Actions pipelines, environment secret security, and platform hosting.",
          outline: [
            { id: "cicd-concept", text: "1. Continuous Integration & Deployment" },
            { id: "pipeline-phases", text: "2. The 5-Step Automated Pipeline" },
            { id: "hosting-platforms", text: "3. Production Hosting Matrix" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Automated CI/CD deployment pipelines transform raw source code into audited, production-ready live web releases.</p>

              <h2 id="cicd-concept">1. Continuous Integration & Deployment</h2>
              <p>Manual server deployments are prone to human error. Continuous integration runners automatically lint code, run test suites, build production bundles, and deploy releases seamlessly.</p>

              <h2 id="pipeline-phases">2. The 5-Step Automated Pipeline</h2>
              
              <ol class="article-list">
                <li><strong>Lint & Format Check:</strong> Verify code syntax rules on every pull request.</li>
                <li><strong>Automated Test Execution:</strong> Run unit and integration tests.</li>
                <li><strong>Production Asset Bundling:</strong> Minify CSS and compress JavaScript.</li>
                <li><strong>Staging Deployment:</strong> Deploy automatically to preview URLs for QA review.</li>
                <li><strong>Production Swap:</strong> Route domain traffic to new release zero-downtime.</li>
              </ol>

              <h2 id="hosting-platforms">3. Production Hosting Matrix</h2>
              <p>Select hosting environments based on site needs: Vercel / Netlify for static and serverless web applications, Render / AWS for backend API deployments.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-laws-workflow",
      track: "webdev",
      title: "05. Universal Laws & Development Workflow",
      icon: "📜",
      topics: [
        {
          id: "universal-laws",
          title: "12 Universal Laws of Web Development",
          priority: "Must Know",
          readTime: "10 min read",
          updated: "May 20, 2026",
          badge: "Core Laws",
          audioUrl: "#",
          summary: "Timeless engineering principles that guide clean architecture, maintainability, and team decision making.",
          outline: [
            { id: "laws-intro", text: "1. The Foundations of Software Engineering" },
            { id: "law-dry-ref", text: "2. DRY (Don't Repeat Yourself)" },
            { id: "law-kiss-ref", text: "3. KISS (Keep It Simple, Stupid)" },
            { id: "law-yagni-ref", text: "4. YAGNI (You Aren't Gonna Need It)" },
            { id: "law-pareto-ref", text: "5. Pareto Principle (80/20 Rule)" },
            { id: "laws-summary", text: "6. Summary" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Universal laws of software development are battle-tested engineering guidelines that prevent over-engineering and guarantee long-term code quality.</p>

              <h2 id="laws-intro">1. The Foundations of Software Engineering</h2>
              <p>Programming languages and frameworks change constantly, but core software engineering laws remain constant across decades.</p>

              <h2 id="law-dry-ref">2. DRY (Don't Repeat Yourself)</h2>
              <p>Every piece of business logic or design knowledge must have a single, unambiguous representation within a system. Avoid duplicating logic across multiple files.</p>

              <h2 id="law-kiss-ref">3. KISS (Keep It Simple, Stupid)</h2>
              <p>Simplicity should be a primary design goal. Simple code is easier to read, test, debug, and maintain than complex abstractions.</p>

              <h2 id="law-yagni-ref">4. YAGNI (You Aren't Gonna Need It)</h2>
              <p>Do not write code or implement features until they are actually required. Premature optimization introduces unnecessary complexity.</p>

              <h2 id="law-pareto-ref">5. Pareto Principle (80/20 Rule)</h2>
              <p>80% of application value comes from 20% of core features. Focus engineering effort on high-impact user paths first.</p>

              <h2 id="laws-summary">6. Summary</h2>
              <p>Applying these universal laws during daily code reviews keeps codebases lean, understandable, and resilient.</p>
            </div>
          `
        },
        {
          id: "7-phase-workflow",
          title: "7-Phase Software Development Workflow",
          priority: "High Priority",
          readTime: "8 min read",
          updated: "Jun 22, 2026",
          badge: "Workflow",
          audioUrl: "#",
          summary: "From initial specification to maintenance: the complete professional development lifecycle.",
          outline: [
            { id: "lifecycle-overview", text: "1. The Engineering Lifecycle" },
            { id: "seven-phases", text: "2. The 7 Sequential Phases" },
            { id: "workflow-conclusion", text: "3. Conclusion" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">The 7-Phase Software Development Workflow maps out the complete lifecycle of a web feature from concept to live maintenance.</p>

              <h2 id="lifecycle-overview">1. The Engineering Lifecycle</h2>
              <p>Adhering to a structured development process ensures projects stay on schedule, meet technical specifications, and release with zero unexpected bugs.</p>

              <h2 id="seven-phases">2. The 7 Sequential Phases</h2>
              
              <ol class="article-list">
                <li><strong>Phase 1 — Scope & Requirements:</strong> Define feature specs and acceptance criteria.</li>
                <li><strong>Phase 2 — Architecture & Design System:</strong> Establish CSS tokens, database schemas, and API contracts.</li>
                <li><strong>Phase 3 — Core Development:</strong> Write modular components and application logic.</li>
                <li><strong>Phase 4 — Automated Testing:</strong> Execute unit, integration, and E2E tests.</li>
                <li><strong>Phase 5 — Pre-Launch Audit:</strong> Verify performance, accessibility, and security compliance.</li>
                <li><strong>Phase 6 — Production Release:</strong> Execute CI/CD pipeline deployment to live servers.</li>
                <li><strong>Phase 7 — Monitoring & Maintenance:</strong> Track error logs, user metrics, and iterative updates.</li>
              </ol>

              <h2 id="workflow-conclusion">3. Conclusion</h2>
              <p>Following this 7-phase process guarantees high software quality and predictable delivery timelines.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-ai-antigravity",
      track: "webdev",
      title: "06. AI Acceleration & Antigravity",
      icon: "🤖",
      topics: [
        {
          id: "ai-velocity",
          title: "1000× Velocity with Agentic AI Programming",
          priority: "High Priority",
          readTime: "9 min read",
          updated: "Jul 20, 2026",
          badge: "1000× AI",
          audioUrl: "#",
          summary: "Leverage AI agents for pair programming, test generation, schema refactoring, and instant bug resolution.",
          outline: [
            { id: "agentic-shift", text: "1. The Paradigm Shift to Agentic AI" },
            { id: "agentic-pillars", text: "2. Pillars of High-Velocity AI Pair Programming" },
            { id: "ai-conclusion", text: "3. Conclusion" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Agentic AI pair programming shifts the developer's role from typing syntax to directing architecture, establishing specifications, and verifying automated outputs.</p>

              <h2 id="agentic-shift">1. The Paradigm Shift to Agentic AI</h2>
              <p>Autonomous AI agents can inspect workspace files, run terminal commands, execute unit tests, and diagnose error stack traces directly. This multiplies developer velocity by up to 1000×.</p>

              <h2 id="agentic-pillars">2. Pillars of High-Velocity AI Pair Programming</h2>

              <ul class="article-list">
                <li><strong>Explicit Context Briefings:</strong> Maintain updated <code>AGENTS.md</code> files so agents understand codebase rules.</li>
                <li><strong>Verification-Driven Iteration:</strong> Always instruct AI agents to run test commands and empirically verify fixes before finishing tasks.</li>
                <li><strong>Modular Task Decomposition:</strong> Break complex requests into clear component tasks.</li>
              </ul>

              <h2 id="ai-conclusion">3. Conclusion</h2>
              <p>Developers who master agentic AI workflows build faster, deliver higher quality software, and focus on high-level architectural innovation.</p>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-cheatsheet",
      track: "webdev",
      title: "07. Developer DevTools & Cheat Sheet",
      icon: "📑",
      topics: [
        {
          id: "developer-cheatsheet",
          title: "Universal Developer Cheat Sheet",
          priority: "Must Have",
          readTime: "5 min read",
          updated: "Jul 20, 2026",
          badge: "Reference",
          audioUrl: "#",
          summary: "Instant copy-paste cheat sheet for Git commands, CSS Flex/Grid properties, JS array helpers, and terminal shortcuts.",
          outline: [
            { id: "git-shortcuts", text: "1. Git Command Reference" },
            { id: "css-shortcuts", text: "2. CSS Layout Snippets" },
            { id: "js-shortcuts", text: "3. JavaScript Array Helpers" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">A quick-reference cheat sheet for essential Git commands, CSS layout properties, and modern JavaScript helpers.</p>

              <h2 id="git-shortcuts">1. Git Command Reference</h2>
              
              <div class="code-box">
                <pre><code># Unstage files while retaining local changes
git reset HEAD filename

# Stash current work including untracked files
git stash -u

# Interactive rebase of last 3 commits
git rebase -i HEAD~3

# Delete branch safely after merging
git branch -d feature/topic-name</code></pre>
              </div>

              <h2 id="css-shortcuts">2. CSS Layout Snippets</h2>
              
              <div class="code-box">
                <pre><code>/* Perfect Grid Centering */
.parent {
  display: grid;
  place-items: center;
}

/* Fluid Responsive Grid */
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}</code></pre>
              </div>

              <h2 id="js-shortcuts">3. JavaScript Array Helpers</h2>
              
              <div class="code-box">
                <pre><code>// Unique Array values
const uniqueList = [...new Set(array)];

// Object key-value mapping
const map = Object.fromEntries(entries);</code></pre>
              </div>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-typescript",
      track: "typescript",
      title: "08. TypeScript Mastery & Type Systems",
      icon: "📘",
      topics: [
        {
          id: "ts-fundamentals",
          title: "TypeScript Setup, Compiler & Primitive Types",
          priority: "High Priority",
          readTime: "7 min read",
          updated: "Jul 20, 2026",
          badge: "TypeScript",
          audioUrl: "#",
          summary: "Learn why TypeScript boosts velocity, how to configure tsconfig.json, and master primitive types, type inference, unions, and intersections.",
          outline: [
            { id: "ts-intro", text: "1. Why TypeScript?" },
            { id: "tsconfig-setup", text: "2. Configuring tsconfig.json" },
            { id: "primitive-types", text: "3. Primitives & Type Inference" },
            { id: "union-intersection", text: "4. Unions (|) and Intersections (&)" },
            { id: "ts-summary-1", text: "5. Summary & Key Takeaways" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript, catching type errors during development before code reaches production.</p>

              <p>Adding static type checking eliminates an entire class of runtime bugs, provides auto-completion in code editors, and acts as living documentation for your team.</p>

              <div class="callout callout-tip">
                <span class="callout-icon">💡</span>
                <div class="callout-body">
                  <strong>The Type Safety Guarantee:</strong> Studies show static typing with TypeScript catches up to 15% of common JavaScript runtime bugs during compile time.
                </div>
              </div>

              <h2 id="ts-intro">1. Why TypeScript?</h2>
              <p>JavaScript is dynamically typed, meaning variables can change types at runtime. In large applications or distributed teams, this leads to <code>TypeError: Cannot read properties of undefined</code> crashes.</p>
              
              <p>TypeScript introduces static type checking. You define expected data types for variables, function parameters, and return values. The TypeScript compiler (<code>tsc</code>) verifies these rules instantly in your editor.</p>

              <h2 id="tsconfig-setup">2. Configuring tsconfig.json</h2>
              <p>Initialize a TypeScript configuration file using <code>npx tsc --init</code>. Recommended compiler settings for modern web projects:</p>

              <div class="code-box">
                <pre><code>{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}</code></pre>
              </div>

              <h2 id="primitive-types">3. Primitives & Type Inference</h2>
              <p>TypeScript supports JavaScript primitive types: <code>string</code>, <code>number</code>, <code>boolean</code>, <code>null</code>, <code>undefined</code>, and <code>symbol</code>.</p>

              <p>TypeScript also features intelligent <strong>Type Inference</strong>. If you initialize a variable, TypeScript infers its type automatically without requiring explicit annotations:</p>

              <div class="code-box">
                <pre><code>// Explicit type annotation
let username: string = "Alex";
let topicCount: number = 32;

// Type inference (TypeScript infers boolean automatically)
let isCompleted = false;</code></pre>
              </div>

              <h2 id="union-intersection">4. Unions (|) and Intersections (&)</h2>
              <p>Union types allow a variable to hold one of several types. Intersection types combine multiple types into a single unified shape:</p>

              <div class="code-box">
                <pre><code>// Union Type: status can be string OR number
type Status = "success" | "error" | "loading";
let currentStatus: Status = "loading";

// Intersection Type: combines User with AdminPermissions
type User = { id: string; name: string };
type AdminPermissions = { superuser: boolean };
type AdminUser = User & AdminPermissions;</code></pre>
              </div>

              <h2 id="ts-summary-1">5. Summary & Key Takeaways</h2>
              <p>Setting up TypeScript with strict compiler rules provides immediate feedback, cleaner autocomplete, and reliable refactoring tools across your entire codebase.</p>
            </div>
          `
        },
        {
          id: "ts-interfaces-types",
          title: "Interfaces vs Type Aliases & Object Shapes",
          priority: "High Priority",
          readTime: "8 min read",
          updated: "Jul 20, 2026",
          badge: "Type Design",
          audioUrl: "#",
          summary: "Learn how to define robust object shapes, when to use Interface vs Type, and master declaration merging, optional, and readonly properties.",
          outline: [
            { id: "object-shapes", text: "1. Defining Object Contracts" },
            { id: "interfaces-vs-types", text: "2. Interfaces vs Type Aliases" },
            { id: "declaration-merging", text: "3. Interface Declaration Merging" },
            { id: "readonly-optional", text: "4. Readonly & Optional Properties" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Interfaces and Type Aliases define object shapes and data contracts in TypeScript applications.</p>

              <p>Understanding when to use <code>interface</code> versus <code>type</code> enables clean API boundaries, extensible design systems, and robust domain modeling.</p>

              <h2 id="object-shapes">1. Defining Object Contracts</h2>
              <p>Object types enforce property names, value types, and structure. If a caller passes an object missing a required property, TypeScript flags a compile-time error.</p>

              <h2 id="interfaces-vs-types">2. Interfaces vs Type Aliases</h2>
              <p>Both <code>interface</code> and <code>type</code> can describe object structures, but they have distinct characteristics:</p>

              <ol class="article-list">
                <li><strong>interface:</strong> Best for object shapes, class implementations, and extensible library contracts. Supports <em>Declaration Merging</em> and <code>extends</code> syntax.</li>
                <li><strong>type:</strong> Best for primitives, unions (<code>string | number</code>), tuples, functions, and complex mapped type manipulations.</li>
              </ol>

              <div class="code-box">
                <pre><code>// Interface Definition
interface UserProfile {
  id: string;
  email: string;
}

// Interface Extension
interface AuthorProfile extends UserProfile {
  articlesCount: number;
}

// Type Alias Definition
type Point = { x: number; y: number };
type ID = string | number;</code></pre>
              </div>

              <h2 id="declaration-merging">3. Interface Declaration Merging</h2>
              <p>Interfaces with the same name automatically merge their properties. This is useful when augmenting global window objects or third-party library types:</p>

              <div class="code-box">
                <pre><code>// Augmenting Window interface in TypeScript
interface Window {
  KNOWLEDGE_DATA: any;
}</code></pre>
              </div>

              <h2 id="readonly-optional">4. Readonly & Optional Properties</h2>
              <p>Use <code>?</code> for optional fields and <code>readonly</code> to prevent property mutation after object creation:</p>

              <div class="code-box">
                <pre><code>interface TopicMeta {
  readonly id: string; // Cannot be reassigned
  title: string;
  readTime?: string;   // Optional property
}</code></pre>
              </div>
            </div>
          `
        },
        {
          id: "ts-generics",
          title: "Mastering Generics & Type Parameters",
          priority: "Must Know",
          readTime: "9 min read",
          updated: "Jul 20, 2026",
          badge: "Advanced TS",
          audioUrl: "#",
          summary: "Write reusable, flexible code with Generics (<T>). Master generic functions, interfaces, constraints, and the keyof operator.",
          outline: [
            { id: "generics-intro", text: "1. The Power of Generics" },
            { id: "generic-functions", text: "2. Generic Functions & Constraints" },
            { id: "generic-interfaces", text: "3. Generic Interfaces & Classes" },
            { id: "keyof-operator", text: "4. The keyof Operator & Property Lookup" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Generics allow you to write reusable functions, interfaces, and classes that work with multiple types while preserving strict type safety.</p>

              <p>Without generics, you would either duplicate functions for different types or resort to <code>any</code>, losing all static type checking.</p>

              <h2 id="generics-intro">1. The Power of Generics</h2>
              <p>Think of generics as variables for types. You pass a type parameter (conventionally <code>&lt;T&gt;</code>) when invoking a function or instantiating a generic interface.</p>

              <h2 id="generic-functions">2. Generic Functions & Constraints</h2>
              <p>Define generic type parameters using angle brackets (<code>&lt;T&gt;</code>). You can enforce type constraints using the <code>extends</code> keyword:</p>

              <div class="code-box">
                <pre><code>// Generic Function returning input type T
function wrapInArray<T>(value: T): T[] {
  return [value];
}

const numberList = wrapInArray(42);       // number[]
const stringList = wrapInArray("hello"); // string[]

// Type Constraint: T must possess an id property
function getEntityId<T extends { id: string }>(item: T): string {
  return item.id;
}</code></pre>
              </div>

              <h2 id="generic-interfaces">3. Generic Interfaces & Classes</h2>
              <p>Generic interfaces create flexible API response wrappers and data containers:</p>

              <div class="code-box">
                <pre><code>interface ApiResponse<TData> {
  status: "success" | "error";
  data: TData;
  timestamp: number;
}

type UserResponse = ApiResponse<{ id: string; name: string }>;</code></pre>
              </div>

              <h2 id="keyof-operator">4. The keyof Operator & Property Lookup</h2>
              <p>The <code>keyof</code> operator produces a union of string literal keys from an object type. Combined with generics, it guarantees type-safe property access:</p>

              <div class="code-box">
                <pre><code>function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { name: "Sarah", role: "Developer" };
const userName = getProperty(user, "name"); // Type string</code></pre>
              </div>
            </div>
          `
        },
        {
          id: "ts-utility-types",
          title: "Utility Types & Type Manipulations",
          priority: "High Priority",
          readTime: "8 min read",
          updated: "Jul 20, 2026",
          badge: "Utility Types",
          audioUrl: "#",
          summary: "Master built-in TypeScript utility types: Partial, Required, Readonly, Pick, Omit, Record, and ReturnType.",
          outline: [
            { id: "utility-intro", text: "1. Built-In Utility Types" },
            { id: "partial-required-readonly", text: "2. Partial, Required & Readonly" },
            { id: "pick-omit", text: "3. Pick and Omit" },
            { id: "record-mapped", text: "4. Record & Mapped Types" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">TypeScript provides built-in global utility types to facilitate common type transformations and object manipulations.</p>

              <h2 id="utility-intro">1. Built-In Utility Types</h2>
              <p>Utility types allow you to construct new types from existing ones without manually re-declaring properties.</p>

              <h2 id="partial-required-readonly">2. Partial, Required & Readonly</h2>

              <ul class="article-list">
                <li><code>Partial&lt;T&gt;</code>: Makes all properties in <code>T</code> optional. Ideal for patch/update payloads.</li>
                <li><code>Required&lt;T&gt;</code>: Makes all optional properties in <code>T</code> required.</li>
                <li><code>Readonly&lt;T&gt;</code>: Sets all properties in <code>T</code> to <code>readonly</code>.</li>
              </ul>

              <div class="code-box">
                <pre><code>interface User {
  id: string;
  name: string;
  email: string;
}

// Useful for update payload where any field is optional
type UserUpdatePayload = Partial<User>;</code></pre>
              </div>

              <h2 id="pick-omit">3. Pick and Omit</h2>

              <ul class="article-list">
                <li><code>Pick&lt;T, K&gt;</code>: Constructs a type by picking specific keys <code>K</code> from <code>T</code>.</li>
                <li><code>Omit&lt;T, K&gt;</code>: Constructs a type by omitting keys <code>K</code> from <code>T</code>.</li>
              </ul>

              <div class="code-box">
                <pre><code>// Select only name and email
type UserPreview = Pick<User, "name" | "email">;

// Exclude internal id
type UserFormInputs = Omit<User, "id">;</code></pre>
              </div>

              <h2 id="record-mapped">4. Record & Mapped Types</h2>
              <p><code>Record&lt;K, T&gt;</code> constructs an object type whose property keys are <code>K</code> and property values are <code>T</code>:</p>

              <div class="code-box">
                <pre><code>// Dictionary mapping topic IDs to boolean completion status
type CompletionMap = Record<string, boolean>;

const statusMap: CompletionMap = {
  "ts-fundamentals": true,
  "ts-generics": false
};</code></pre>
              </div>
            </div>
          `
        },
        {
          id: "ts-strict-react-node",
          title: "Strict Mode, React & Node.js Integration",
          priority: "Best Practices",
          readTime: "7 min read",
          updated: "Jul 20, 2026",
          badge: "Production TS",
          audioUrl: "#",
          summary: "Enforce strict mode rules, type React components, props, event handlers, and configure Node.js TypeScript resolution.",
          outline: [
            { id: "strict-mode", text: "1. Enabling strict: true" },
            { id: "react-ts", text: "2. Typing React Props & Event Handlers" },
            { id: "node-ts", text: "3. Node.js & Module Resolution" },
            { id: "ts-best-practices", text: "4. Production Checklist" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Production TypeScript relies on strict compiler settings and proper type integration with modern frameworks like React and Node.js.</p>

              <h2 id="strict-mode">1. Enabling strict: true</h2>
              <p>Always enable <code>"strict": true</code> in <code>tsconfig.json</code>. Strict mode activates strict null checks, prevents implicit <code>any</code> types, and enforces sound function signatures.</p>

              <h2 id="react-ts">2. Typing React Props & Event Handlers</h2>
              <p>Define interface contracts for React component props and use built-in SyntheticEvent types:</p>

              <div class="code-box">
                <pre><code>import React from 'react';

interface ButtonProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);</code></pre>
              </div>

              <h2 id="node-ts">3. Node.js & Module Resolution</h2>
              <p>Install <code>@types/node</code> dev dependency when working in Node.js environments to get type definitions for native modules (<code>fs</code>, <code>path</code>, <code>http</code>).</p>

              <h2 id="ts-best-practices">4. Production Checklist</h2>

              <ol class="article-list">
                <li><strong>No any:</strong> Avoid using <code>any</code>. Use <code>unknown</code> for unknown inputs and perform type narrowing.</li>
                <li><strong>Strict Null Checks:</strong> Explicitly handle <code>null</code> and <code>undefined</code> values.</li>
                <li><strong>Type Guards:</strong> Use custom type guards (<code>is</code>) for runtime validation.</li>
                <li><strong>Automated Typecheck:</strong> Run <code>tsc --noEmit</code> inside your CI/CD test runner before deploying.</li>
              </ol>
            </div>
          `
        }
      ]
    },
    {
      id: "mod-nextjs",
      title: "09. Next.js & AI Integration",
      icon: "⚛️",
      track: "nextjs",
      topics: [
        {
          id: "nextjs-architecture",
          title: "Next.js Setup & App Router Architecture",
          priority: "High Priority",
          readTime: "8 min read",
          updated: "Jul 21, 2026",
          badge: "Fundamentals",
          audioUrl: "#",
          summary: "Master Next.js App Router, Nested Layouts, Server Components vs Client Components, and advanced Data Fetching & Caching.",
          outline: [
            { id: "app-router-setup", text: "1. Next.js App Router Setup" },
            { id: "rendering-models", text: "2. Server vs Client Components" },
            { id: "routing-layouts", text: "3. Routing & Nested Layouts" },
            { id: "fetching-caching", text: "4. Data Fetching & Caching" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Next.js is the leading React framework for building high-performance, SEO-friendly web applications utilizing server-side execution and modular App Router architectures.</p>

              <h2 id="app-router-setup">1. Next.js App Router Setup</h2>
              <p>Initialize a new production-ready Next.js application using the standard CLI creator. Enable TypeScript, ESLint, Tailwind CSS (optional), and the <code>app/</code> directory:</p>
              <div class="code-box">
                <pre><code>npx create-next-app@latest my-app --ts --eslint --app --src-dir=false --import-alias=\"@/*\"</code></pre>
              </div>

              <h2 id="rendering-models">2. Server vs Client Components</h2>
              <p>Next.js splits components into Server Components (default) and Client Components to minimize bundle sizes:</p>
              <ul class="article-list">
                <li><strong>React Server Components (RSC):</strong> Render exclusively on the server. Zero client-side JavaScript. Direct access to secure databases and server resources.</li>
                <li><strong>Client Components:</strong> Rendered on the server initially, then hydrated on the client. Indicated by the <code>"use client"</code> directive at the top of the file. Required for state hooks (<code>useState</code>, <code>useEffect</code>) and event listeners (<code>onClick</code>).</li>
              </ul>

              <h2 id="routing-layouts">3. Routing & Nested Layouts</h2>
              <p>The App Router uses file-system based routing under the <code>app/</code> directory. Pages are defined using <code>page.tsx</code>, while shared shells are defined using <code>layout.tsx</code>:</p>
              <div class="code-box">
                <pre><code>// app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    &lt;div class="dashboard-shell"&gt;
      &lt;aside&gt;Sidebar Navigation&lt;/aside&gt;
      &lt;main&gt;{children}&lt;/main&gt;
    &lt;/div&gt;
  );
}</code></pre>
              </div>

              <h2 id="fetching-caching">4. Data Fetching & Caching</h2>
              <p>Perform async fetches directly inside Server Components using native <code>async/await</code>. Next.js extends the web <code>fetch</code> API to support automated caching and revalidation configurations:</p>
              <div class="code-box">
                <pre><code>// Dynamic data fetching with revalidation every hour
async function getProducts() {
  const res = await fetch('https://api.example.com/products', { next: { revalidate: 3600 } });
  return res.json();
}

export default async function Page() {
  const products = await getProducts();
  return &lt;ul&gt;{products.map(p =&gt; &lt;li key={p.id}&gt;{p.name}&lt;/li&gt;)}&lt;/ul&gt;;
}</code></pre>
              </div>
            </div>
          `
        },
        {
          id: "nextjs-miniproject",
          title: "Mini Project: Server-Driven Task Board",
          priority: "Hands-on Project",
          readTime: "10 min read",
          updated: "Jul 21, 2026",
          badge: "Mini Project",
          audioUrl: "#",
          summary: "Build a server-driven Task Board using Next.js Server Actions, Route Handlers, and Optimistic UI state updates.",
          outline: [
            { id: "taskboard-intro", text: "1. Project Overview & Setup" },
            { id: "server-actions", text: "2. Mutating Data with Server Actions" },
            { id: "route-handlers", text: "3. API Route Handlers" },
            { id: "optimistic-ui", text: "4. Optimistic UI Updates" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Learn how to build a collaborative, real-time Task Board with direct database mutations via server execution and responsive client-side UI hydration.</p>

              <h2 id="taskboard-intro">1. Project Overview & Setup</h2>
              <p>Our task board allows users to create, delete, and toggle tasks in columns. It leverages Server Actions for secure mutations without standard API controllers, and registers state instantly.</p>

              <h2 id="server-actions">2. Mutating Data with Server Actions</h2>
              <p>Server Actions are async functions declared with the <code>"use server"</code> directive. They can be invoked inside form actions or event handlers to execute securely on the server:</p>
              <div class="code-box">
                <pre><code>// app/actions.ts
"use server";
import { revalidatePath } from 'next/cache';

export async function createTask(formData: FormData) {
  const title = formData.get('title');
  // Execute database query securely here: DB.insert(title)
  revalidatePath('/tasks'); // Purge cache and update UI
}</code></pre>
              </div>

              <h2 id="route-handlers">3. API Route Handlers</h2>
              <p>If you need external systems to access task data, create custom HTTP Route Handlers using standard methods (<code>GET</code>, <code>POST</code>, <code>DELETE</code>) defined in <code>route.ts</code> files:</p>
              <div class="code-box">
                <pre><code>// app/api/tasks/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const tasks = await db.fetchTasks();
  return NextResponse.json(tasks);
}</code></pre>
              </div>

              <h2 id="optimistic-ui">4. Optimistic UI Updates</h2>
              <p>Use React's experimental <code>useOptimistic</code> hook to instantly render changes in the UI before the server resolves the action, keeping the user interface extremely fast:</p>
              <div class="code-box">
                <pre><code>// Client Component
const [optimisticTasks, addOptimisticTask] = useOptimistic(
  tasks,
  (state, newTask) =&gt; [...state, newTask]
);</code></pre>
              </div>
            </div>
          `
        },
        {
          id: "nextjs-ai-integration",
          title: "AI Integration & LLM Streaming",
          priority: "AI Integration",
          readTime: "9 min read",
          updated: "Jul 21, 2026",
          badge: "AI & LLM",
          audioUrl: "#",
          summary: "Learn how to connect Large Language Models (Gemini/GPT), setup streaming response SDKs, and format structured JSON output.",
          outline: [
            { id: "vercel-ai-sdk", text: "1. Vercel AI SDK Integration" },
            { id: "streaming-responses", text: "2. Streaming Responses" },
            { id: "structured-json", text: "3. Structured JSON Generation" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Integrate intelligent AI models into Next.js by setting up secure server configurations and streaming real-time model text outputs directly to client views.</p>

              <h2 id="vercel-ai-sdk">1. Vercel AI SDK Integration</h2>
              <p>Install the Vercel AI SDK and the model provider package of your choice (e.g., OpenAI or Google Gemini provider):</p>
              <div class="code-box">
                <pre><code>npm install ai @ai-sdk/google</code></pre>
              </div>

              <h2 id="streaming-responses">2. Streaming Responses</h2>
              <p>Use the <code>streamText</code> utility from the AI SDK inside a Next.js Route Handler to steam characters to the browser as they are generated by the model:</p>
              <div class="code-box">
                <pre><code>// app/api/chat/route.ts
import { google } from '@ai-sdk/google';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: google('gemini-1.5-pro'),
    messages,
  });
  return result.toDataStreamResponse();
}</code></pre>
              </div>

              <h2 id="structured-json">3. Structured JSON Generation</h2>
              <p>For programmatic evaluations, grading rubrics, or schema validation, enforce structured JSON output formats using the <code>generateObject</code> utility:</p>
              <div class="code-box">
                <pre><code>import { generateObject } from 'ai';
import { z } from 'zod';

const scoreSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string(),
  strengths: z.array(z.string())
});</code></pre>
              </div>
            </div>
          `
        },
        {
          id: "nextjs-capstone",
          title: "Capstone Project: Intelligent AI Mock Interviewer",
          priority: "Capstone Project",
          readTime: "12 min read",
          updated: "Jul 21, 2026",
          badge: "Capstone",
          audioUrl: "#",
          summary: "Build an Intelligent AI Mock Interviewer that provides interactive mock interviews, streams voice prompts, and outputs detailed feedback reports.",
          outline: [
            { id: "capstone-overview", text: "1. Capstone Requirements" },
            { id: "interview-engine", text: "2. Interactive Interview Engine" },
            { id: "ai-evaluator", text: "3. Auto-Grading & Score Reports" }
          ],
          content: `
            <div class="content-block">
              <p class="article-lead">Apply all Next.js App Router features, Server Actions, and AI SDK APIs to deploy a production-ready Intelligent AI Mock Interviewer platform.</p>

              <h2 id="capstone-overview">1. Capstone Requirements</h2>
              <p>The AI Mock Interviewer must satisfy the following core criteria:</p>
              <ul class="article-list">
                <li><strong>Topic Selection:</strong> User selects an interview topic (e.g., Frontend React, Backend Systems, System Design).</li>
                <li><strong>Interactive Simulator:</strong> User participates in a 5-question mock interview. Questions are dynamically generated based on selection.</li>
                <li><strong>Real-time Voice Output (Optional):</strong> Synthesize voice for the generated questions using the Web Speech TTS system.</li>
                <li><strong>Evaluation Dashboard:</strong> The model evaluates the candidate's answers and generates a structured performance report (Score, Strengths, Weaknesses, Recommended Study Topics).</li>
              </ul>

              <h2 id="interview-engine">2. Interactive Interview Engine</h2>
              <p>Manage the session state (current question index, transcript list) inside a React client component, prompting the next dynamic question sequentially via a client-side layout:</p>
              <div class="code-box">
                <pre><code>// Client component managing interview state
export default function InterviewSession() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState&lt;string[]&gt;([]);
  // UI logic to prompt questions and record answers
}</code></pre>
              </div>

              <h2 id="ai-evaluator">3. Auto-Grading & Score Reports</h2>
              <p>When the interview is completed, POST the transcript array to a Next.js Server Action or API Route. Use <code>generateObject</code> with Gemini/GPT models and Zod schemas to compile the official grade report card:</p>
              <div class="code-box">
                <pre><code>// server action or API route processing the answers
const report = await generateObject({
  model: google('gemini-1.5-pro'),
  schema: scoreSchema,
  prompt: "Grade these interview answers: " + JSON.stringify(answers)
});</code></pre>
              </div>
            </div>
          `
        }
      ]
    }
  ]
};
