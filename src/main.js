const links = window.PORTFOLIO_LINKS || {};

const projects = [
  {
    title: "Saturday",
    type: "AI Agent · Featured",
    image: "./img/project-saturday.png",
    summary: "An autonomous AI agent designed to turn a goal into a sequence of useful actions across tools.",
    features: ["Breaks complex requests into clear tasks", "Coordinates browser, files, and APIs", "Keeps progress visible and recoverable"],
    tech: ["Python", "FastAPI", "LLM tool calling", "Agent orchestration"],
    outcome: "A practical exploration of how autonomous software can stay capable without becoming opaque.",
    url: links.saturday,
  },
  {
    title: "Runnova",
    type: "Mobile Product · Founder",
    image: "./img/project-runnova.png",
    summary: "A mobile running companion that turns activity data into simple, motivating progress.",
    features: ["Tracks runs, routes, and performance trends", "Surfaces clear progress summaries", "Designed for fast, distraction-free use outdoors"],
    tech: ["Mobile app development", "Maps & location", "Activity analytics", "Product design"],
    outcome: "Built as a founder-led product, from concept and experience design to the technical foundation.",
    url: links.runnova,
  },
  {
    title: "Online Book Store",
    type: "Full-stack Web Application",
    image: "./img/project-bookstore.png",
    summary: "A complete online bookstore experience for discovering books, managing a cart, and placing orders.",
    features: ["Searches and filters a structured book catalog", "Manages cart items and order totals", "Supports a clear checkout and order workflow"],
    tech: ["HTML & CSS", "JavaScript", "SQL", "Backend APIs"],
    outcome: "An end-to-end commerce project focused on clean catalog navigation, reliable data handling, and a simple purchase journey.",
    url: links.bookstore,
  },
  {
    title: "AI Email Assistant",
    type: "AI Automation",
    image: "./img/project_email_assistant.png",
    summary: "A focused assistant for understanding inbox context, extracting actions, and drafting useful replies.",
    features: ["Summarizes long conversations", "Finds commitments and next steps", "Creates editable, context-aware drafts"],
    tech: ["Python", "FastAPI", "Gmail API", "OAuth"],
    outcome: "Reduces time spent turning noisy email threads into clear decisions and responses.",
    url: links.emailAssistant,
  },
  {
    title: "Salon Queue",
    type: "Service Platform",
    image: "./img/project_salon.png",
    summary: "A booking and live-queue experience that gives customers a more predictable salon visit.",
    features: ["Books services and time slots", "Shows live queue position", "Compares nearby salons and availability"],
    tech: ["Python", "FastAPI", "Google Maps API", "Responsive web"],
    outcome: "A full workflow designed to reduce waiting time for customers and simplify daily operations.",
    url: links.salon,
  },
];

const certificates = [
  ["ICPC Chennai Provincial", "Regional Champion certificate for the 2025 Chennai Multi Provincial Contest.", "18SG7qYI7Vko2ce68hX8LYzuSht2MxOU1"],
  ["Adobe University Hackathon", "Participation certificate from Adobe; progressed to the second round.", "1zz8m-jDJwXShU9oMUiZY9fl5xbdYrccJ"],
  ["Guidewire DEVTrails 2026", "University hackathon participation with Guidewire and EY.", "1rF95XrcGW0KQgqbiCK7W-_-LCbLkXevA"],
  ["HackHova 3.0", "Hackathon participation focused on collaborative product building.", "1eTd97VbPSNAp0lC4kT93Q5DiPIGfeqqU"],
  ["Java Bug Hunt", "Competitive debugging and Java problem-solving event.", "1qpUJM8dRLHCQ8WrjjK9AU6wmA5BkLlh4"],
  ["NPTEL · Algorithms", "Completed the eight-week Design and Analysis of Algorithms course.", "14l_kOhqpIbDwMFmSznNZSZCc8J6NBC6Q"],
  ["PyQuest", "Python-focused technical challenge and participation certificate.", "1gpMH4in2z9M8_-G2xfRx2NP9vr80FqdS"],
];

const projectGrid = document.querySelector("#projectGrid");
projectGrid.innerHTML = projects.map((project, index) => `
  <button class="project-card ${index === 0 ? "project-wide" : ""}" type="button" data-project="${index}" aria-label="Open details for ${project.title}">
    <div class="project-image"><img src="${project.image}" alt="${project.title} project visual" /></div>
    <div class="project-meta"><div><span>${project.type}</span><h3>${project.title}</h3></div><span class="project-arrow" aria-hidden="true">↗</span></div>
    <p>${project.summary}</p>
  </button>`).join("");

const certificateGrid = document.querySelector("#certificateGrid");
certificateGrid.innerHTML = certificates.map(([title, description, id], index) => `
  <a class="certificate-card" href="https://drive.google.com/file/d/${id}/view" target="_blank" rel="noreferrer">
    <div class="certificate-preview"><img src="https://drive.google.com/thumbnail?id=${id}&sz=w1000" alt="Preview of ${title} certificate" loading="lazy" /><span>${String(index + 1).padStart(2, "0")}</span></div>
    <div><h4>${title}</h4><p>${description}</p><span class="view-label">View certificate ↗</span></div>
  </a>`).join("");

document.querySelectorAll("[data-contact]").forEach((element) => {
  const key = element.dataset.contact;
  const value = links[key];
  if (key === "email") element.href = `mailto:${value}`;
  else if (value) element.href = value;
  else element.hidden = true;
});

const socialRow = document.querySelector("#socialRow");
const socialLinks = [["Email", `mailto:${links.email}`], ["GitHub", links.github], ["LinkedIn", links.linkedin], ["LeetCode", links.leetcode], ["Instagram", links.instagram]];
const socialIcons = {
  Email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h17v13h-17z"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
  GitHub: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.8a9.4 9.4 0 0 0-3 18.3c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.7-1.4-2.3-.3-4.7-1.1-4.7-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.8-4.7 5 .4.3.7 1 .7 1.9v2.9c0 .3.2.6.7.5A9.4 9.4 0 0 0 12 2.8Z" fill="currentColor" stroke="none"/></svg>',
  LinkedIn: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.2 9.1v9.7M5.2 5.3v.1M9.5 18.8V9.1m0 4.2c.8-2.7 6.4-3.2 6.4 1.2v4.3M3.2 3.2h17.6v17.6H3.2z"/></svg>',
  LeetCode: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m13.4 3.2-7.3 7.2a4.8 4.8 0 0 0 0 6.8l1.2 1.2a4.8 4.8 0 0 0 6.8 0l2.3-2.3M9.2 7.4l3.2-3.2M8.7 13h10.1"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.7" r=".8" fill="currentColor" stroke="none"/></svg>'
};
socialRow.innerHTML = socialLinks.map(([label, url]) => url
  ? `<a href="${url}" ${url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}><span class="social-name"><span class="social-icon">${socialIcons[label]}</span><span>${label}</span></span><span aria-hidden="true">↗</span></a>`
  : `<span class="social-pending" aria-label="${label} link to be added"><span class="social-name"><span class="social-icon">${socialIcons[label]}</span><span>${label}</span></span><small>Add URL</small></span>`).join("");

const dialog = document.querySelector("#projectDialog");
const dialogLink = document.querySelector("#dialogLink");
function openProject(project) {
  document.querySelector("#dialogImage").src = project.image;
  document.querySelector("#dialogImage").alt = `${project.title} project visual`;
  document.querySelector("#dialogType").textContent = project.type;
  document.querySelector("#dialogTitle").textContent = project.title;
  document.querySelector("#dialogSummary").textContent = project.summary;
  document.querySelector("#dialogFeatures").innerHTML = project.features.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#dialogTech").innerHTML = project.tech.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#dialogOutcome").textContent = project.outcome;
  dialogLink.href = project.url || "#contact";
  dialogLink.target = project.url ? "_blank" : "_self";
  dialogLink.innerHTML = project.url ? 'View project <span aria-hidden="true">↗</span>' : 'Ask about this project <span aria-hidden="true">→</span>';
  dialog.showModal();
  document.body.classList.add("modal-open");
}

projectGrid.addEventListener("click", (event) => {
  const card = event.target.closest("[data-project]");
  if (card) openProject(projects[Number(card.dataset.project)]);
});
function closeDialog() { dialog.close(); document.body.classList.remove("modal-open"); }
document.querySelector(".dialog-close").addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => { if (event.target === dialog) closeDialog(); });
dialog.addEventListener("close", () => document.body.classList.remove("modal-open"));

const menuButton = document.querySelector(".menu-button");
const mobileNav = document.querySelector(".mobile-nav");
menuButton.addEventListener("click", () => {
  const open = mobileNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mobileNav.addEventListener("click", () => { mobileNav.classList.remove("open"); menuButton.setAttribute("aria-expanded", "false"); });

if ("IntersectionObserver" in window) {
  const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); } }), { threshold: 0.08 });
  document.querySelectorAll(".project-card, .feature-achievement, .certificate-card, .principles article, .education-grid article, .skills-grid article").forEach((element) => { element.classList.add("reveal"); reveal.observe(element); });
}
