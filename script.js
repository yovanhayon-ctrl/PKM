// Simple script for small interactions (smooth scroll, stat counter, contact form)
document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Year in footer
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Stat counter (simple)
  const statEls = document.querySelectorAll(".stat");
  statEls.forEach(function (el) {
    const target = parseInt(el.getAttribute("data-target")) || 0;
    let current = 0;
    const increment = Math.ceil(target / 80);

    function update() {
      current += increment;
      if (current >= target) {
        el.textContent = target + (target >= 1000 ? "" : "");
      } else {
        el.textContent = current;
        requestAnimationFrame(update);
      }
    }

    // trigger when element visible
    function inViewport(elem) {
      const rect = elem.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom >= 0;
    }
    function checkAndStart() {
      if (inViewport(el) && el.textContent === "0") {
        update();
        window.removeEventListener("scroll", checkAndStart);
      }
    }
    window.addEventListener("scroll", checkAndStart);
    checkAndStart();
  });

  // Simple contact form submit (no backend) -> show alert
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Terima kasih! Pesan Anda telah terkirim (simulasi).");
      contactForm.reset();
    });
  }
});

// === SLIDER "MENGAPA BENGKEL KAMI" ===
const cards = document.querySelectorAll(".why-card");
const nextBtn = document.querySelector(".why-btn.next");
const prevBtn = document.querySelector(".why-btn.prev");

let activeIndex = 0;

function updateActiveCard() {
  cards.forEach((card, index) => {
    card.classList.toggle("active", index === activeIndex);
  });
}

nextBtn.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % cards.length;
  updateActiveCard();
});

prevBtn.addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + cards.length) % cards.length;
  updateActiveCard();
});

updateActiveCard();

// === NAVIGASI MENGAPA BENGKEL KAMI ===
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".why-btn.next");
  const prevBtn = document.querySelector(".why-btn.prev");

  if (nextBtn && prevBtn) {
    // Jika klik tombol > menuju ke video section
    nextBtn.addEventListener("click", () => {
      const videoSection = document.querySelector(".video-section");
      if (videoSection) {
        videoSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    // Jika klik tombol < kembali ke home section
    prevBtn.addEventListener("click", () => {
      const homeSection = document.querySelector("#home");
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});

// === SCROLL KE TENGAH VIDEO SECTION SAAT TOMBOL ">" DIKLIK ===
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".why-btn.next"); // Tombol panah kanan (>)
  const videoSection = document.querySelector("#youtube"); // Section video merah

  if (nextBtn && videoSection) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();

      // Ambil posisi section merah
      const sectionTop = videoSection.offsetTop;
      const sectionHeight = videoSection.offsetHeight;
      const windowHeight = window.innerHeight;

      // Hitung posisi agar section merah berada di tengah layar
      const targetPosition = sectionTop - windowHeight / 2 + sectionHeight / 2;

      // Scroll halus ke posisi target
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }
});

// === ANIMASI FADE-UP CEPAT & EFISIEN ===
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-up");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 } // muncul cepat (20% bagian elemen terlihat)
);

document.querySelectorAll(".project-card").forEach((card) => {
  observer.observe(card);
});

// === SCROLL HALUS KE TENGAH SAAT KLIK MENU "PROJECT" DI NAVBAR ===
document.addEventListener("DOMContentLoaded", () => {
  const projectLink = document.querySelector('a[href="#project"]'); // link di navbar
  const projectSection = document.querySelector("#project"); // section recent project

  if (projectLink && projectSection) {
    projectLink.addEventListener("click", (e) => {
      e.preventDefault();

      // Dapatkan posisi section
      const sectionTop = projectSection.offsetTop;
      const sectionHeight = projectSection.offsetHeight;
      const windowHeight = window.innerHeight;

      // Hitung posisi agar section berada di tengah layar
      const targetPosition = sectionTop - windowHeight / 2 + sectionHeight / 2;

      // Scroll halus ke posisi target
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  }
});
