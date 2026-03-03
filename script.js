// ===== Mobile nav + active link (professional, minimal) =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navAnchors = document.querySelectorAll(".nav-link");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section");

// Mobile menu
navToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close on click (mobile)
navAnchors.forEach((a) => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Smooth scroll with offset (header height)
function scrollToSection(id) {
  const el = document.querySelector(id);
  if (!el) return;

  const headerH = header?.offsetHeight || 0;
  const y = el.getBoundingClientRect().top + window.scrollY - headerH + 6;
  window.scrollTo({ top: y, behavior: "smooth" });
}

navAnchors.forEach((a) => {
  a.addEventListener("click", (e) => {
    e.preventDefault();
    scrollToSection(a.getAttribute("href"));
  });
});

// Scrollspy (active section)
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navAnchors.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
      });
    });
  },
  { threshold: 0.55 },
);

sections.forEach((s) => observer.observe(s));

// Subtle header scroll state
function onScroll() {
  if (!header) return;
  header.classList.toggle("scrolled", window.scrollY > 10);
}
onScroll();
window.addEventListener("scroll", onScroll);

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Contact form: simple professional message (no fake terminal)
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  formNote.textContent =
    "Thanks! This form is currently a demo. Please email me directly: sofiawanjikusmall@gmail.com";
  contactForm.reset();
});
