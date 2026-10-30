/* ============================================================
   Dadds Laundry shop — script.js
   Interactions: navigation, WhatsApp booking, scroll reveal,
   back-to-top, dynamic year.
   ============================================================ */

const WHATSAPP_NUMBER = "639202923946";
const WHATSAPP_BASE_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const WHATSAPP_DEFAULT_MESSAGE = "Hello Dadds Laundry shop! I would like to inquire about your laundry services.";
const WHATSAPP_URL = `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

const SERVICE_MESSAGES = {
  "wash-fold": "Hello Dadds Laundry shop! I would like to inquire about your Wash & Fold service.",
  "wash-dry-fold": "Hello Dadds Laundry shop! I would like to inquire about your Wash, Dry & Fold service.",
  "pickup-delivery": "Hello Dadds Laundry shop! I would like to inquire about your Pickup & Delivery service.",
  "comforter-blanket": "Hello Dadds Laundry shop! I would like to inquire about your Comforter & Blanket Cleaning service.",
};

function getWhatsAppUrlForService(serviceKey) {
  const message = SERVICE_MESSAGES[serviceKey] || WHATSAPP_DEFAULT_MESSAGE;
  return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`;
}

function setupWhatsAppLinks() {
  const defaultLink = document.querySelector('a[data-whatsapp]');
  if (defaultLink) {
    defaultLink.href = WHATSAPP_URL;
  }

  document.querySelectorAll("[data-whatsapp-service]").forEach((link) => {
    const serviceKey = link.getAttribute("data-whatsapp-service");
    link.setAttribute("href", getWhatsAppUrlForService(serviceKey));
  });
}

function setupNavigation() {
  const nav = document.querySelector(".site-nav");
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("primary-navigation");

  if (!nav || !toggle || !menu) {
    return;
  }

  function setOpen(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");
    setOpen(!isOpen);
  });

  menu.addEventListener("click", (event) => {
    const target = event.target.closest("a");
    if (target) {
      setOpen(false);
    }
  });

  document.addEventListener("click", (event) => {
    const isOpen = nav.classList.contains("open");
    if (!isOpen) {
      return;
    }
    if (nav.contains(event.target)) {
      return;
    }
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });
}

function setupBackToTop() {
  const backToTop = document.getElementById("back-to-top");
  if (!backToTop) {
    return;
  }

  const toggleVisibility = () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function setupReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
}

function setupFooterYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

function init() {
  setupWhatsAppLinks();
  setupNavigation();
  setupBackToTop();
  setupReveal();
  setupFooterYear();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
