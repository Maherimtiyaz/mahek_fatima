// All site content lives here. Edit this file to update the portfolio — no component changes needed.

export type Status = "live" | "shipped" | "building";

export interface Project {
  id: string;
  name: string;
  kicker: string;
  status: Status;
  year: string;
  summary: string;
  evidence: string[];
  stack: string[];
  repo?: string;
  live?: string;
  note?: string;
}

export const person = {
  name: "Mahek Fatima",
  alias: "Madame",
  title: "Backend & AI Engineer",
  line: "I build backends that keep their promises — APIs, real-time systems and LLM agents that ask before they act.",
  location: "Jaipur, India",
  coords: "26.9124° N · 75.7873° E",
  email: "mahekimtiyaz7@gmail.com",
  availability: "Open to opportunities",
  availabilityDetail: "Full-time roles, internships, open-source collaboration, or simply a good conversation.",
  links: [
    { label: "GitHub", href: "https://github.com/Maherimtiyaz", handle: "@Maherimtiyaz" },
    { label: "LinkedIn", href: "https://linkedin.com/in/mahek-fatima", handle: "in/mahek-fatima" },
    { label: "X", href: "https://x.com/itzmaherimtiyaz", handle: "@itzmaherimtiyaz" },
  ],
};

export const projects: Project[] = [
  {
    id: "career-agent",
    name: "Career Agent",
    kicker: "goal in · outreach out · human in between",
    status: "building",
    year: "2026",
    summary:
      "Type one sentence — “find me an ML internship” — and get a ranked opportunity, a real person to contact and a personalised email. Nothing is sent until you approve it.",
    evidence: [
      "The LLM has no send tool. Only the approval endpoint can send, using exactly the approved text.",
      "Live five-stage progress, a trace of every tool call with reasoning, timing and credits.",
      "Source attribution on every contact it finds.",
    ],
    stack: ["Python", "FastAPI", "LLM tool calling", "Postgres"],
    repo: "https://github.com/Maherimtiyaz/career-agent",
  },
  {
    id: "voice-agent",
    name: "Voice Agent Platform",
    kicker: "multi-tenant saas for ai phone agents",
    status: "shipped",
    year: "2026",
    summary:
      "The foundation for AI phone agents that answer calls, understand intent and run workflows — built so one tenant can never see another.",
    evidence: [
      "Twilio and Vapi webhooks with signature verification and an idempotency ledger.",
      "Org-scoped LLM function calling.",
      "100 Vitest tests against in-memory Postgres covering auth, lifecycle and tenant isolation.",
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle", "Twilio", "Vapi"],
    repo: "https://github.com/Maherimtiyaz/voice-agent-saas",
  },
  {
    id: "incidentops",
    name: "IncidentOps AI",
    kicker: "incident triage with a memory",
    status: "shipped",
    year: "2026",
    summary:
      "An on-call agent that remembers. It investigates an alert with read-only tools and cites past postmortems when today’s symptoms match.",
    evidence: [
      "Budgets, retries, timeouts and evidence validation on every tool call.",
      "Schema-validated reports; resolutions are written to memory only with human approval.",
      "89 tests and a deterministic eval gate. Built at the Flip the Switch hackathon.",
    ],
    stack: ["Python", "LLM agents", "Evals", "Guardrails"],
    repo: "https://github.com/Maherimtiyaz/triage-agent",
  },
  {
    id: "sift",
    name: "Sift",
    kicker: "ramble for a minute, get your day sorted",
    status: "shipped",
    year: "2026",
    summary:
      "Talk or type, and Sift turns it into tasks, calendar events and draft messages — with live captions while you speak and one-tap Google Calendar sync.",
    evidence: [
      "Live captions over WebSocket, with a record-then-upload fallback.",
      "Tap any item to see the exact words it came from.",
      "46 API tests on real Postgres and Redis, Alembic migrations, CI.",
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Whisper"],
    repo: "https://github.com/Maherimtiyaz/Sift",
  },
  {
    id: "dunwell",
    name: "Dunwell",
    kicker: "a receivables agent that never invents",
    status: "shipped",
    year: "2026",
    summary:
      "Reads a ledger, decides deterministically which overdue invoices deserve a follow-up, and drafts it using only recorded facts. Everything else is held with a reason code.",
    evidence: [
      "Core invariant: a draft is never invented.",
      "CLI engine plus a dashboard and JSON API in one process.",
      "Every decision exported as a report and CSV.",
    ],
    stack: ["Python", "SQLite", "LLM drafting"],
    repo: "https://github.com/Maherimtiyaz/dunwell",
  },
  {
    id: "atlas",
    name: "Atlas",
    kicker: "a visual product map for any codebase",
    status: "shipped",
    year: "2026",
    summary:
      "Turns a GitHub repo into an interactive product graph — features, pages, APIs, services, data and dependencies — with flow tracing and PDF export.",
    evidence: ["Runs fully in the browser. No backend.", "Flow tracing across the whole graph.", "Client-side PDF export."],
    stack: ["React", "Vite", "TypeScript", "Tailwind"],
    repo: "https://github.com/Maherimtiyaz/atlas",
  },
  {
    id: "glowmark",
    name: "glowmark",
    kicker: "markdown in, beautiful page out",
    status: "live",
    year: "2026",
    summary: "Turn any Markdown file into a standalone, beautiful HTML page. One command, zero config.",
    evidence: ["Live-reload server.", "Paste-in web editor.", "Animated landing page."],
    stack: ["Python", "HTML", "CSS"],
    repo: "https://github.com/Maherimtiyaz/glowmark",
    live: "https://maherimtiyaz.github.io/glowmark/",
  },
  {
    id: "medminder",
    name: "MedMinder",
    kicker: "elderly care, accessible by default",
    status: "live",
    year: "2026",
    summary:
      "A collaborative care platform for elderly people and their caregivers, built for the Catalyst 2026 Forma Track.",
    evidence: ["WCAG 2.1 AA compliance and an OLED dark mode.", "Caregiver access and dynamic appointment calendars.", "Proactive voice and browser alarms."],
    stack: ["TypeScript", "React", "Accessibility"],
    repo: "https://github.com/Maherimtiyaz/medminder",
    live: "https://medminder-ux.netlify.app/",
  },
  {
    id: "docapi",
    name: "AI Document API",
    kicker: "rag that survives a free-tier deploy",
    status: "shipped",
    year: "2026",
    summary:
      "PDF ingestion, chunking and embedding retrieval, with answers grounded in the retrieved chunks — all behind JWT auth.",
    evidence: [
      "Replaced a local FAISS index with embeddings stored in PostgreSQL after Render’s ephemeral disk wiped it.",
      "Cosine similarity in NumPy; no extra infra to babysit.",
      "Deployed on Render.",
    ],
    stack: ["Python", "FastAPI", "PostgreSQL", "OpenAI"],
    repo: "https://github.com/Maherimtiyaz/AI_Powered_Doc_API",
  },
  {
    id: "convopilot",
    name: "ConvoPilot",
    kicker: "an ai chief of staff",
    status: "building",
    year: "2026",
    summary:
      "Turns conversations into decisions, commitments and finished work: understands email, remembers people, tracks follow-ups. You approve anything that leaves.",
    evidence: ["PRD, architecture, threat model and eval plan written before code.", "Memory-integrity rules and row-level security.", "Provider-agnostic AI layer."],
    stack: ["Next.js", "Supabase", "pgvector", "Zod", "Vitest"],
    repo: "https://github.com/Maherimtiyaz/ConvoPilot",
  },
];

export const archive: { name: string; line: string; repo: string }[] = [
  { name: "Shipstory", line: "Evidence-backed engineering storytelling, linked to GitHub", repo: "Shipstory" },
  { name: "Dev-Verse", line: "Developer DNA, multi-agent code roast, RAG open-source matchmaker", repo: "Dev-Verse" },
  { name: "Reddit Pain Radar", line: "SaaS landing + Python ingestion worker", repo: "reddit-pain-radar" },
  { name: "BookFlow", line: "Reading platform with progress tracking and a PDF reader", repo: "bookflow-v1" },
  { name: "AI Operating System", line: "Local Whisper voice control and automation, PyQt6", repo: "ai-operating-system" },
  { name: "content-agent", line: "Human-in-the-loop copilot for technical writing", repo: "content-agent" },
  { name: "cold-email", line: "Finds founders, drafts with AI, sends via Gmail, tracks replies", repo: "cold-email" },
  { name: "Tagline", line: "Messy notes into emails, plans and briefs", repo: "Tagline" },
  { name: "money-journal", line: "Offline-first animated money journal", repo: "money-journal" },
  { name: "TaskOps", line: "Multi-tenant task API with RBAC and CI", repo: "Task-Manager-API" },
  { name: "Chat Backend", line: "Async WebSocket messaging with JWT handshakes", repo: "Chat_Backend" },
  { name: "Auth Service", line: "JWT rotation, revocation and an audit trail", repo: "Auth-service" },
  { name: "Live Leaderboard", line: "Redis sorted sets and Pub/Sub workers", repo: "redis-live-leaderboard-fastapi" },
  { name: "No_reply", line: "Transactional emails into a clean financial ledger", repo: "No_reply" },
  { name: "support-env", line: "Reproducible benchmark environment for support agents", repo: "support-env" },
  { name: "Resume Analyzer", line: "Semantic resume-to-JD matching and ATS feedback", repo: "a-resume-analyzer" },
];

export const now = [
  { tag: "building", text: "Upgrading outreach-agent into Career Agent — human approval as a hard guarantee, not a feature." },
  { tag: "building", text: "ConvoPilot, phase one: the foundation of an AI chief of staff." },
  { tag: "contributing", text: "Fixing bugs across the LLM tooling ecosystem — autogen, outlines, langchain, litellm and friends." },
  { tag: "competing", text: "Homingo hackathon, 21 November." },
  { tag: "reading", text: "The Mountain Is You — Brianna Wiest." },
  { tag: "learning", text: "How to take a product from first prototype to its first real users." },
];

export const fieldwork = [
  {
    when: "Apr — May 2026",
    what: "Backend Engineer",
    where: "Cloud Nova · early-stage startup",
    notes: [
      "Designed the schema and SQLAlchemy models; built Celery ingestion with typed schemas.",
      "Core FastAPI REST + WebSocket API, with a change-detection gate in the pipeline.",
      "Clerk JWT auth, rate limiting, request logging and API versioning.",
      "Email pipeline on Resend, with integration tests.",
    ],
  },
  {
    when: "2025 — now",
    what: "Independent Engineer",
    where: "Self-directed",
    notes: ["25+ public projects across backends, AI agents and full-stack products.", "Security-first habits: input validation, bcrypt, JWT lifecycles, Docker CI."],
  },
  {
    when: "2025 — now",
    what: "Open-source contributor",
    where: "YATL · DeepAlpha · LLM tooling",
    notes: ["Merged: YATL #80 — custom exception handling.", "Merged: DeepAlpha — pytest-asyncio test infrastructure.", "In progress: a fix for tool-call name normalisation in microsoft/autogen."],
  },
  {
    when: "2026",
    what: "Hackathons",
    where: "Flip the Switch · Catalyst 2026 · Homingo",
    notes: ["IncidentOps AI — incident triage with memory.", "MedMinder — Forma Track, accessible elderly care."],
  },
  {
    when: "2025 — 2028",
    what: "BCA",
    where: "Vivekananda Global University, Jaipur",
    notes: ["Certifications: Machine Learning Specialization (Andrew Ng), Python for AI & ML (DeepLearning.AI), MongoDB Semantic Search."],
  },
];

export const instruments = [
  { group: "Backend", items: ["Python", "FastAPI", "REST", "WebSockets", "JWT / RBAC", "Celery", "Node.js"] },
  { group: "AI", items: ["LLM agents", "Tool calling", "RAG", "Evals", "Guardrails", "Whisper"] },
  { group: "Data", items: ["PostgreSQL", "SQLAlchemy", "Alembic", "Drizzle", "Redis", "pgvector"] },
  { group: "Frontend", items: ["TypeScript", "Next.js", "React", "Tailwind"] },
  { group: "Ops", items: ["Docker", "GitHub Actions", "pytest", "Vitest", "Vercel", "Render"] },
];

// ───────────────────────── About ─────────────────────────
export const words = ["Curious", "Disciplined", "Driven"];

export const talks = [
  {
    front: "Why people do what they do",
    sub: "psychology · power · mindset",
    back: "Do we choose our habits — or do they choose us?",
    link: "#library", linkLabel: "See the Mind & Habit shelf",
  },
  {
    front: "How systems get built — and how they fail",
    sub: "backends · AI · famous collapses",
    back: "Every collapse had a moment someone could have read the source. Who was reading?",
    link: "#watch", linkLabel: "See Money & Power on the watchlist",
  },
  {
    front: "Engineering at the limit",
    sub: "Formula 1 · speed · nerve",
    back: "Senna, Ford v Ferrari, F1 — where does engineering end and nerve begin?",
    link: "#watch", linkLabel: "See Speed & Limits",
  },
];

// Draft lines from the interview — easy to change here.
export const compass = {
  goal: "Launch what I build and put it in front of real users — a product people benefit from, not just a repo.",
  learning: "How to take a product from first prototype to its first real users.",
  dream: "To build products that make people’s hardest problems feel solvable — and ship them to everyone who needs them.",
  line: "I can’t control what people think of me. I can control what I ship.",
  lineSource: "after The Courage to Be Disliked & Can’t Hurt Me",
  advice: [
    "Zero experience is a starting point, not a verdict. Build the thing you don’t know how to build yet.",
    "Live so the last chapter doesn’t surprise you. Ivan Ilyich waited too long to learn that.",
  ],
};

// ───────────────────────── Library ─────────────────────────
export interface Book { title: string; author?: string }

export const reading = { title: "The Mountain Is You", author: "Brianna Wiest" };

export const shelves: { name: string; note: string; tone: "emerald" | "ink" | "spark" | "paper"; books: Book[] }[] = [
  {
    name: "Power & Strategy", note: "how influence really works", tone: "ink",
    books: [
      { title: "The Art of War", author: "Sun Tzu" },
      { title: "The 48 Laws of Power", author: "Robert Greene" },
      { title: "The Concise Laws of Human Nature", author: "Robert Greene" },
      { title: "Surrounded by Idiots", author: "Thomas Erikson" },
    ],
  },
  {
    name: "Mind & Habit", note: "the operating system underneath", tone: "emerald",
    books: [
      { title: "Mindset", author: "Carol Dweck" },
      { title: "Don’t Believe Everything You Think", author: "Joseph Nguyen" },
      { title: "Can’t Hurt Me", author: "David Goggins" },
      { title: "The Courage to Be Disliked", author: "Ichiro Kishimi & Fumitake Koga" },
      { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson" },
      { title: "How to Win Friends and Influence People", author: "Dale Carnegie" },
      { title: "Same as Ever", author: "Morgan Housel" },
      { title: "Think Straight", author: "Darius Foroux" },
      { title: "Good Vibes, Good Life", author: "Vex King" },
      { title: "The Art of Living Alone" },
      { title: "Steal Like an Artist", author: "Austin Kleon" },
    ],
  },
  {
    name: "Meaning", note: "what it’s all for", tone: "spark",
    books: [
      { title: "The Death of Ivan Ilyich", author: "Leo Tolstoy" },
      { title: "Al-Aqidah al-Tahawiyyah", author: "Imam al-Tahawi" },
      { title: "Reclaim Your Heart", author: "Yasmin Mogahed" },
    ],
  },
];

export const wantToRead: (Book & { note?: string })[] = [
  { title: "The Sealed Nectar", author: "Safiur Rahman Mubarakpuri", note: "again" },
  { title: "Purification of the Heart", author: "Hamza Yusuf" },
  { title: "A Brief History of Intelligence", author: "Max Bennett" },
  { title: "Man’s Search for Meaning", author: "Viktor Frankl" },
  { title: "When Breath Becomes Air", author: "Paul Kalanithi" },
  { title: "The Examined Life", author: "Stephen Grosz" },
];
export const moreWaiting = 2; // Gödel, Escher, Bach · Braiding Sweetgrass

// ───────────────────────── Watch ─────────────────────────
export const watchGroups: { name: string; line: string; titles: string[] }[] = [
  { name: "Money & Power", line: "how systems get gamed", titles: ["Inside Job", "Enron: The Smartest Guys in the Room", "The Big Short"] },
  { name: "Tech & Mind", line: "machines, minds and the people behind them", titles: ["The Social Dilemma", "AlphaGo", "The Imitation Game", "The Playlist", "Oppenheimer"] },
  { name: "Speed & Limits", line: "engineering, endurance, nerve", titles: ["Senna", "The Last Dance", "Ford v Ferrari", "F1", "Formula 1 (series)", "14 Peaks", "The Farthest", "Icarus", "Full Speed"] },
  { name: "Mystery", line: "puzzles that bite back", titles: ["Shutter Island", "Prisoners", "Zodiac", "Inception"] },
  { name: "Popcorn", line: "no notes, just fun", titles: ["Mission: Impossible", "Jumanji", "San Andreas", "The Meg", "The Great Flood", "Troll", "Kingdom", "Heist", "Unforgettable", "The Journey", "The Last House", "Thrash"] },
];
export const following = [
  { name: "Formula 1", line: "race weekends, strategy calls" },
  { name: "Tennis", line: "one-on-one, all nerve" },
  { name: "Soccer", line: "systems with eleven moving parts" },
];

// ───────────────────────── Listening ─────────────────────────
export const listenEnglish = [
  ["Dwarkesh Podcast", "intellectual depth"],
  ["The Knowledge Project", "mental models"],
  ["Acquired", "business understanding"],
  ["Mindscape", "scientific thinking"],
  ["Hidden Brain", "psychology"],
  ["Lex Fridman Podcast", "deep conversations"],
  ["In Our Time", "general knowledge"],
  ["Fall of Civilizations", "historical perspective"],
  ["The Seen and the Unseen", "Indian society & economics"],
  ["Intelligence Squared", "critical thinking"],
  ["Latent Space", "AI & engineering"],
  ["EconTalk", "economics"],
  ["Poetry Unbound", "literature & sensitivity"],
  ["Closer to Truth", "philosophy & existence"],
  ["Theories of Everything", "fundamental questions"],
  ["Veritasium", "science, beautifully explained"],
] as const;
export const listenArabic = [
  ["Sarde After Dinner", "deep conversations"],
  ["Al Daheeh", "science & knowledge"],
  ["Aswat Podcast", "human stories & personalities"],
  ["Al Jazeera Documentary", "history & civilisation"],
  ["Basira Podcast", "philosophy & faith"],
  ["Moghamra", "business & entrepreneurship"],
  ["On Orientalism", "Arab intellectual history"],
  ["Mada Masr", "politics & society"],
  ["Asharq Documentary", "history & geopolitics"],
  ["Thmanyah", "long-form discussions"],
] as const;
export const listenFaith = [
  ["Omar Suleiman", "spirituality & history"],
  ["Nouman Ali Khan", "Qur’an & Arabic"],
  ["Hamza Yusuf", "philosophy & wisdom"],
  ["Yasir Qadhi", "seerah & theology"],
  ["Dr. Israr Ahmed", "Qur’an & civilisation"],
  ["The Thinking Muslim", "intellectual debate"],
  ["The Muslim Lantern", "faith & philosophy"],
  ["Mustafa Hosny", "spirituality"],
  ["Nabil Al-Awadi", "Islamic history"],
  ["Yaqeen Institute", "faith & contemporary issues"],
  ["Qalam Institute", "Islamic scholarship"],
  ["The Mad Mamluks", "long-form discussions"],
] as const;
export const listenChannels = [
  { label: "Thmanyah Podcasts", href: "https://www.youtube.com/@thmanyahPodcasts" },
  { label: "@ybh_1000", href: "https://www.youtube.com/@ybh_1000" },
  { label: "@deyaelayyan-", href: "https://www.youtube.com/@deyaelayyan-" },
];
