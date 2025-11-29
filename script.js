/* ============================================================
   script.js — FINAL VERSION (Bersih, Stabil, Tidak Bentrok)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("navMenu");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbar = document.querySelector(".navbar");
  const ANIM_DURATION = 300;

  /* ============================================================
        SMOOTH SCROLL DENGAN OFFSET NAVBAR
  ============================================================ */
  function scrollToSection(targetEl, center = false) {
    if (!targetEl) return;
    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const top = targetEl.offsetTop;
    const height = targetEl.offsetHeight;
    const windowHeight = window.innerHeight;

    let targetY = center
      ? top - windowHeight / 2 + height / 2
      : top - navbarHeight;

    window.scrollTo({ top: targetY, behavior: "smooth" });
  }

  // Semua anchor scroll aman
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href === "#") return;
      const id = href.replace("#", "");
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      scrollToSection(target);
    });
  });

  /* ============================================================
        FOOTER YEAR OTOMATIS
  ============================================================ */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ============================================================
        COUNTER ANIMATION (STATISTICS)
  ============================================================ */
  const stats = document.querySelectorAll(".stat");
  stats.forEach((el) => {
    const target = parseInt(el.dataset.target) || 0;
    let current = 0;
    const increment = Math.ceil(target / 80);

    function animate() {
      current += increment;
      if (current >= target) {
        el.textContent = target;
      } else {
        el.textContent = current;
        requestAnimationFrame(animate);
      }
    }

    function onScroll() {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        if (el.textContent === "0") animate();
        window.removeEventListener("scroll", onScroll);
      }
    }

    window.addEventListener("scroll", onScroll);
    onScroll();
  });

  /* ============================================================
        CONTACT FORM SIMULATION
  ============================================================ */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Terima kasih! Pesan Anda telah terkirim.");
      form.reset();
    });
  }

  /* ============================================================
        WHY SLIDER – 6 CARD, CENTERED INITIAL VIEW
  ============================================================ */
  const cards = Array.from(document.querySelectorAll(".why-card"));
  const nextBtn2 = document.querySelector(".why-btn.next");
  const prevBtn2 = document.querySelector(".why-btn.prev");

  let slideIndex = 0; // 0 = tampilan awal (0-3), 1 = slide 1 (1-4), 2 = slide 2 (2-5)
  const VISIBLE_COUNT = 4;
  const ANIMATION_DURATION = 400;

  // Konfigurasi card mana yang ditampilkan di setiap slide
  const slideConfigs = [
    [0, 1, 2, 3], // Slide 0: Rekomendasi, Mudah, Instruksi, Workshop
    [1, 2, 4, 3], // Slide 1: Mudah, Instruksi, Responsif, Workshop (geser kanan)
    [2, 4, 5, 3], // Slide 2: Instruksi, Responsif, Dukungan, Workshop (geser kanan lagi)
  ];

  function updateSlider(direction = "right") {
    const currentConfig = slideConfigs[slideIndex];

    // Hide semua card dengan animasi
    cards.forEach((card, idx) => {
      if (!currentConfig.includes(idx)) {
        card.classList.remove("show");
        card.classList.add("hidden");
      }
    });

    // Tampilkan card yang aktif dengan animasi stagger
    currentConfig.forEach((cardIndex, position) => {
      const card = cards[cardIndex];

      setTimeout(() => {
        card.classList.remove("hidden");
        card.classList.add("show");

        // Animasi slide
        if (direction === "right") {
          card.style.animation = "slideInFromRight 0.4s ease-out";
        } else {
          card.style.animation = "slideInFromLeft 0.4s ease-out";
        }

        // Reset animasi setelah selesai
        setTimeout(() => {
          card.style.animation = "";
        }, ANIMATION_DURATION);
      }, position * 80);
    });
  }

  if (nextBtn2) {
    nextBtn2.addEventListener("click", () => {
      if (slideIndex < 2) {
        slideIndex++;
        updateSlider("right");
      }
    });
  }

  if (prevBtn2) {
    prevBtn2.addEventListener("click", () => {
      if (slideIndex > 0) {
        slideIndex--;
        updateSlider("left");
      }
    });
  }

  // Inisialisasi tampilan awal
  updateSlider();

  /* ============================================================
        PROJECT CARD FADE-UP
  ============================================================ */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("fade-up");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    observer.observe(card);
  });

  /* ============================================================
        NAVBAR CUSTOM OPEN/CLOSE
  ============================================================ */
  function openMenu() {
    if (!navMenu) return;
    navMenu.classList.remove("closing");
    navMenu.classList.add("opening");
    setTimeout(() => {
      navMenu.classList.add("show");
      navMenu.classList.remove("opening");
    }, ANIM_DURATION);
  }

  function closeMenu() {
    if (!navMenu) return;
    navMenu.classList.add("closing");
    setTimeout(() => {
      navMenu.classList.remove("show", "closing");
    }, ANIM_DURATION);
  }

  if (navbarToggler) {
    navbarToggler.addEventListener("click", () => {
      if (navMenu.classList.contains("show")) closeMenu();
      else openMenu();
    });
  }

  // klik luar → tutup menu
  document.addEventListener("click", (e) => {
    if (
      navMenu &&
      navMenu.classList.contains("show") &&
      !navMenu.contains(e.target) &&
      !navbarToggler.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // auto-tutup saat klik link
  if (navMenu) {
    navMenu.querySelectorAll(".nav-link").forEach((lnk) => {
      lnk.addEventListener("click", () => {
        setTimeout(closeMenu, 50);
      });
    });
  }
});

// FAQ Section
// SMOOTH FAQ COLLAPSE
document.querySelectorAll(".accordion-button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".accordion-item");
    const body = item.querySelector(".accordion-collapse");

    // Tutup card lain
    document.querySelectorAll(".accordion-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        const openBody = openItem.querySelector(".accordion-collapse");
        openBody.style.maxHeight = "0px";
      }
    });

    // Toggle card saat ini
    if (item.classList.contains("open")) {
      // Tutup
      item.classList.remove("open");
      body.style.maxHeight = "0px";
    } else {
      // Buka
      item.classList.add("open");
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
});
