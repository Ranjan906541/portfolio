
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
});

// Close mobile menu after selecting a section
navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Reveal elements when they enter the screen
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          currentObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

// Highlight the current navigation section
const sections = document.querySelectorAll("main section[id]");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navItems.forEach((link) => {
            const isActive =
              link.getAttribute("href") === `#${entry.target.id}`;

            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -55% 0px"
    }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}

// Animated professional role
const roleText = document.getElementById("roleText");

const roles = [
  "Software Engineer",
  "AI/ML Enthusiast",
  "Web Developer"
];

let roleIndex = 0;

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  setInterval(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
  }, 2500);
}

// Current year in footer
document.getElementById("year").textContent =
  new Date().getFullYear();

// Contact form: prepare an email using the visitor's email app
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

// IMPORTANT: Replace this with your actual email address.
const ownerEmail = "your-email@example.com";

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) return;

  if (ownerEmail === "your-email@example.com") {
    formStatus.textContent =
      "Please replace the placeholder email in script.js with your real email.";
    return;
  }

  const formData = new FormData(contactForm);

  const senderName = formData.get("name").trim();
  const senderEmail = formData.get("email").trim();
  const message = formData.get("message").trim();

  const subject = encodeURIComponent(
    `Portfolio enquiry from ${senderName}`
  );

  const body = encodeURIComponent(
    `Name: ${senderName}\n` +
    `Email: ${senderEmail}\n\n` +
    `Message:\n${message}`
  );

  formStatus.textContent =
    "Opening your email app. Send the prepared email to complete your message.";

  window.location.href =
    `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
});