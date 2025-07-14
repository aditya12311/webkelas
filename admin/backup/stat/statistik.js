document.addEventListener("DOMContentLoaded", () => {
  // --- 1. AUTHENTICATION GUARD (Sangat Penting!) ---
  // Melindungi halaman agar tidak bisa diakses tanpa login.
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Akses ditolak! Anda harus login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // --- Element Selectors ---
  const darkModeToggle = document.getElementById("darkModeToggle");
  const backButton = document.getElementById("backButton");
  const body = document.body;

  // --- 2. DARK MODE & KONTROL NAVIGASI ---
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
    darkModeToggle.checked ? enableDarkMode() : disableDarkMode();
  });
  backButton.addEventListener("click", () => {
    window.location.href = "dashadm.html";
  });

  // --- 3. DATA DUMMY UNTUK GRAFIK ---
  const genderData = {
    labels: ["Laki-laki", "Perempuan"],
    data: [22, 18], // Total 40 siswa
  };

  const hobbyData = {
    labels: ["Game", "Olahraga", "Membaca", "Musik", "Coding", "Melukis"],
    data: [12, 8, 7, 6, 4, 3],
  };

  const regionData = {
    labels: ["Jakarta", "Bandung", "Bekasi", "Tangerang", "Depok", "Lainnya"],
    data: [15, 8, 6, 5, 4, 2],
  };

  // --- 4. FUNGSI UNTUK MERENDER GRAFIK ---

  // Grafik Gender (Pie Chart)
  function renderGenderChart() {
    const ctx = document.getElementById("genderChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: genderData.labels,
        datasets: [
          {
            label: "Jumlah Siswa",
            data: genderData.data,
            backgroundColor: [
              "rgba(59, 130, 246, 0.7)",
              "rgba(236, 72, 153, 0.7)",
            ],
            borderColor: ["rgba(59, 130, 246, 1)", "rgba(236, 72, 153, 1)"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
      },
    });
  }

  // Grafik Hobi (Bar Chart)
  function renderHobbyChart() {
    const ctx = document.getElementById("hobbyChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: hobbyData.labels,
        datasets: [
          {
            label: "Jumlah Siswa",
            data: hobbyData.data,
            backgroundColor: "rgba(22, 163, 74, 0.6)",
            borderColor: "rgba(22, 163, 74, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: "y", // Membuat bar menjadi horizontal
        scales: { x: { beginAtZero: true } },
        plugins: { legend: { display: false } },
      },
    });
  }

  // Grafik Wilayah (Bar Chart)
  function renderRegionChart() {
    const ctx = document.getElementById("regionChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: regionData.labels,
        datasets: [
          {
            label: "Jumlah Siswa",
            data: regionData.data,
            backgroundColor: "rgba(249, 115, 22, 0.6)",
            borderColor: "rgba(249, 115, 22, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { y: { beginAtZero: true } },
        plugins: { legend: { display: false } },
      },
    });
  }

  // Panggil semua fungsi render saat halaman dimuat
  renderGenderChart();
  renderHobbyChart();
  renderRegionChart();
});
