const links = {
  email: import.meta.env.VITE_EMAIL || "patarisuman2@gmail.com",
  github: import.meta.env.VITE_GITHUB_URL || "https://github.com/suman05-cloud/",
  linkedin: import.meta.env.VITE_LINKEDIN_URL || "",
  leetcode: import.meta.env.VITE_LEETCODE_URL || "",
  instagram: import.meta.env.VITE_INSTAGRAM_URL || "",
  certificates: import.meta.env.VITE_CERTIFICATES_URL || "https://drive.google.com/drive/folders/1V3GEGdT7FZ-2z0vky4rRhoB2reTG2ajr",
  saturday: import.meta.env.VITE_SATURDAY_URL || "",
  runnova: import.meta.env.VITE_RUNNOVA_URL || "",
  machineLearning: import.meta.env.VITE_ML_PROJECT_URL || "",
  emailAssistant: import.meta.env.VITE_EMAIL_ASSISTANT_URL || "",
  salon: import.meta.env.VITE_SALON_URL || "",
};

const projects = [
  {
    title: "Saturday",
    type: "AI Agent · Featured",
    image: "/img/project-saturday.png",
    summary: "An autonomous AI agent designed to turn a goal into a sequence of useful actions across tools.",
    features: ["Breaks complex requests into clear tasks", "Coordinates browser, files, and APIs", "Keeps progress visible and recoverable"],
    tech: ["Python", "FastAPI", "LLM tool calling", "Agent orchestration"],
    outcome: "A practical exploration of how autonomous software can stay capable without becoming opaque.",
    url: links.saturday,
  },
  {
    title: "Runnova",
    type: "Mobile Product · Founder",
    image: "/img/project-runnova.png",
    summary: "A mobile running companion that turns activity data into simple, motivating progress.",
    features: ["Tracks runs, routes, and performance trends", "Surfaces clear progress summaries", "Designed for fast, distraction-free use outdoors"],
    tech: ["Mobile app development", "Maps & location", "Activity analytics", "Product design"],
    outcome: "Built as a founder-led product, from concept and experience design to the technical foundation.",
    url: links.runnova,
  },
  {
    title: "Student Success Predictor",
    type: "Machine Learning",
    image: "/img/project-ml.png",
    summary: "A machine learning system that identifies patterns connected to student outcomes and support needs.",
    features: ["Cleans and transforms mixed student data", "Explains the signals behind each prediction", "Supports earlier, data-informed intervention"],
    tech: ["Python", "scikit-learn", "Pandas", "Model evaluation"],
    outcome: "A responsible applied-ML study centered on interpretable predictions rather than black-box scores.",
    url: links.machineLearning,
  },
  {
    title: "AI Email Assistant",
    type: "AI Automation",
    image: "/img/project_email_assistant.png",
    summary: "A focused assistant for understanding inbox context, extracting actions, and drafting useful replies.",
    features: ["Summarizes long conversations", "Finds commitments and next steps", "Creates editable, context-aware drafts"],
    tech: ["Python", "FastAPI", "Gmail API", "OAuth"],
    outcome: "Reduces time spent turning noisy email threads into clear decisions and responses.",
    url: links.emailAssistant,
  },
  {
    title: "Salon Queue",
    type: "Service Platform",
    image: "/img/project_salon.png",
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
socialRow.innerHTML = socialLinks.filter(([, url]) => url).map(([label, url]) => `<a href="${url}" ${url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}><span>${label}</span><span aria-hidden="true">↗</span></a>`).join("");

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

const reveal = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); reveal.unobserve(entry.target); } }), { threshold: 0.08 });
document.querySelectorAll(".project-card, .feature-achievement, .certificate-card, .principles article").forEach((element) => { element.classList.add("reveal"); reveal.observe(element); });
