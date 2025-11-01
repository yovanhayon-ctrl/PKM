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
