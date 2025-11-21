/* script.js — versi final rapi & bebas error */

/* Menjalankan semua fitur setelah halaman selesai dimuat */
document.addEventListener("DOMContentLoaded", function () {
  const navMenu = document.getElementById("navMenu");
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbar = document.querySelector(".navbar");
  const ANIM_DURATION = 300;

  /* ===============================
      Smooth Scroll Dengan Offset Navbar
  ================================ */
  function scrollToSection(targetEl, center = false) {
    if (!targetEl) return;

    const navbarHeight = navbar ? navbar.offsetHeight : 0;
    const sectionTop = targetEl.offsetTop;
    const sectionHeight = targetEl.offsetHeight;
    const windowHeight = window.innerHeight;

    let targetPosition;

    if (center) {
      // Pusatkan (untuk section khusus, bila diperlukan)
      targetPosition = sectionTop - windowHeight / 2 + sectionHeight / 2;
    } else {
      // Scroll mulai dari atas section (offset navbar)
      targetPosition = sectionTop - navbarHeight;
    }

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }

  /* Smooth scroll semua anchor */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();

      if (href === "#project") {
        scrollToSection(target, false); // ★ PERBAIKAN DI SINI → scroll ke batas putih
      } else {
        scrollToSection(target, false);
      }
    });
  });

  /* Scroll khusus tombol Prev (kembali ke Home) */
  const homeSection = document.querySelector("#home");
  const prevBtn = document.querySelector(".why-btn.prev");
  if (prevBtn && homeSection) {
    prevBtn.addEventListener("click", () => {
      scrollToSection(homeSection, false);
    });
  }

  /* ===============================
      Year footer otomatis
  ================================ */
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ===============================
      Counter Statistik
  ================================ */
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

    function inViewport() {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    }

    function initAnimate() {
      if (inViewport() && el.textContent === "0") {
        animate();
        window.removeEventListener("scroll", initAnimate);
      }
    }

    window.addEventListener("scroll", initAnimate);
    initAnimate();
  });

  /* ===============================
      Contact form (simulasi)
  ================================ */
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Terima kasih! Pesan Anda telah terkirim.");
      form.reset();
    });
  }

  /* ===============================
      WHY Slider
  ================================ */
  const cards = document.querySelectorAll(".why-card");
  let activeIndex = 0;

  function updateCard() {
    cards.forEach((c, i) => {
      c.classList.toggle("active", i === activeIndex);
    });
  }

  if (cards.length > 0) {
    const nextBtn = document.querySelector(".why-btn.next");
    const prevBtn = document.querySelector(".why-btn.prev");

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % cards.length;
        updateCard();

        // 🔥 Scroll otomatis ke video section
        const videoSection = document.querySelector(".video-section");
        if (videoSection) {
          scrollToSection(videoSection, true);
        }
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        updateCard();
      });
    }

    updateCard();
  }

  /* ===============================
      Project fade-up animation
  ================================ */
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-up");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".project-card").forEach((card) => {
    observer.observe(card);
  });

  /* ===============================
      Custom Navbar Open / Close
  ================================ */
  function openMenu() {
    navMenu.classList.remove("closing");
    navMenu.classList.add("opening");
    setTimeout(() => {
      navMenu.classList.add("show");
      navMenu.classList.remove("opening");
    }, ANIM_DURATION);
  }

  function closeMenu() {
    navMenu.classList.add("closing");
    setTimeout(() => {
      navMenu.classList.remove("show");
      navMenu.classList.remove("closing");
    }, ANIM_DURATION);
  }

  navbarToggler.addEventListener("click", () => {
    if (navMenu.classList.contains("show")) closeMenu();
    else openMenu();
  });

  /* Tutup saat klik di luar menu */
  document.addEventListener("click", (e) => {
    if (
      navMenu.classList.contains("show") &&
      !navMenu.contains(e.target) &&
      !navbarToggler.contains(e.target)
    ) {
      closeMenu();
    }
  });

  /* Tutup otomatis saat klik link navbar */
  document.querySelectorAll("#navMenu .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(() => {
        if (navMenu.classList.contains("show")) closeMenu();
      }, 50);
    });
  });
});
