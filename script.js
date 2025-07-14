document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const closeBtn = document.getElementById("close-btn");
  const navMenu = document.getElementById("nav-menu");
  const overlay = document.getElementById("overlay");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
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
    if (darkModeToggle) {
      darkModeToggle.checked = true;
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", () => {
      if (darkModeToggle.checked) {
        enableDarkMode();
      } else {
        disableDarkMode();
      }
    });
  }

  if (hamburgerBtn && navMenu && overlay && closeBtn) {
    const toggleMenu = () => {
      navMenu.classList.toggle("active");
      overlay.classList.toggle("active");
    };

    hamburgerBtn.addEventListener("click", toggleMenu);
    closeBtn.addEventListener("click", toggleMenu);
    overlay.addEventListener("click", toggleMenu);
  }
});
