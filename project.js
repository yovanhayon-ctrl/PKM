// Menampilkan tahun otomatis di footer
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
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
