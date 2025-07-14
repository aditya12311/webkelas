document.addEventListener("DOMContentLoaded", () => {
  // --- Dark Mode Logic ---
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  const enableDarkMode = () => {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  };

  const disableDarkMode = () => {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  };

  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
    darkModeToggle.checked = true;
  }

  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });

  // --- Lightbox Logic ---
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeButton = document.querySelector(".close-button");

  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imgSrc = item.querySelector("img").src;
      lightboxImg.src = imgSrc;
      lightbox.classList.add("active");
    });
  });

  const closeLightbox = () => {
    lightbox.classList.remove("active");
  };

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    // Hanya tutup jika yang diklik adalah background gelap, bukan gambar
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
