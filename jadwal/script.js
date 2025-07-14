document.addEventListener("DOMContentLoaded", () => {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  // Fungsi untuk mengaktifkan mode gelap
  const enableDarkMode = () => {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  };

  // Fungsi untuk menonaktifkan mode gelap
  const disableDarkMode = () => {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  };

  // Cek preferensi pengguna dari localStorage saat halaman dimuat
  if (localStorage.getItem("darkMode") === "enabled") {
    enableDarkMode();
    darkModeToggle.checked = true;
  }

  // Tambahkan event listener ke tombol toggle
  darkModeToggle.addEventListener("change", () => {
    if (darkModeToggle.checked) {
      enableDarkMode();
    } else {
      disableDarkMode();
    }
  });
});
