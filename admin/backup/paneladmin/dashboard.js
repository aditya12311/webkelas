document.addEventListener("DOMContentLoaded", () => {
  // --- 1. AUTHENTICATION GUARD ---
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Akses ditolak! Anda harus login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  // --- 2. VIEW SWITCHING LOGIC ---
  const navLinks = document.querySelectorAll(".nav-link");
  const views = document.querySelectorAll(".view");

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = link.getAttribute("data-view");

      // Hapus kelas 'active' dari semua link dan view
      navLinks.forEach((l) => l.classList.remove("active"));
      views.forEach((v) => v.classList.remove("active"));

      // Tambahkan kelas 'active' ke link yang diklik dan view yang sesuai
      link.classList.add("active");
      document.getElementById(`view-${targetView}`).classList.add("active");
    });
  });

  // --- 3. DARK MODE & LOGOUT (Sama seperti sebelumnya) ---
  const darkModeToggle = document.getElementById("darkModeToggle");
  const logoutButton = document.getElementById("logoutButton");
  const body = document.body;

  // ... (Kode dark mode dan logout Anda bisa diletakkan di sini, tidak perlu diubah) ...
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
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "login.html";
  });

  // --- 4. DATA POPULATION (Memuat data ke setiap view) ---

  // Data Dummy (nantinya dari server)
  const dummyLogs = [
    {
      time: "2025-07-13 10:30",
      ip: "103.45.12.1",
      user: "admin",
      success: true,
      action: "Login",
    },
    {
      time: "2025-07-13 09:15",
      ip: "202.80.212.5",
      user: "hacker",
      success: false,
      action: "Login",
    },
    {
      time: "2025-07-12 20:05",
      ip: "114.122.10.8",
      user: "ketua_kelas",
      success: true,
      action: "Login",
    },
    {
      time: "2025-07-12 18:40",
      ip: "114.122.10.8",
      user: "ketua_kelas",
      success: false,
      action: "Login",
    },
  ];
  const dummyStudents = [
    {
      id: 1,
      name: "Aditya Pratama",
      nis: "102301",
      hobby: "Gitar",
      photo: "https://placehold.co/40x40/3b82f6/ffffff?text=AP",
    },
    {
      id: 2,
      name: "Bunga Citra",
      nis: "102302",
      hobby: "Membaca",
      photo: "https://placehold.co/40x40/ec4899/ffffff?text=BC",
    },
  ];

  // Fungsi untuk memuat log di Dashboard
  function populateDashboardLog() {
    const logTableBody = document.getElementById("logTableBody");
    logTableBody.innerHTML = "";
    dummyLogs.slice(0, 5).forEach((log) => {
      // Hanya 5 log terbaru
      const row = document.createElement("tr");
      const statusClass = log.success ? "status-success" : "status-fail";
      const statusText = log.success ? "Berhasil" : "Gagal";
      row.innerHTML = `<td>${log.time}</td><td>${log.ip}</td><td>${log.user}</td><td><span class="status ${statusClass}">${statusText}</span></td>`;
      logTableBody.appendChild(row);
    });
  }

  // Fungsi untuk memuat tabel siswa
  function populateStudentTable() {
    const studentTableBody = document.getElementById("studentTableBody");
    studentTableBody.innerHTML = "";
    dummyStudents.forEach((s) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td><img src="${s.photo}" alt="${s.name}" class="table-photo"></td>
                <td>${s.name}</td><td>${s.nis}</td><td>${s.hobby}</td>
                <td class="action-buttons"><button class="btn-edit">Edit</button><button class="btn-delete">Hapus</button></td>`;
      studentTableBody.appendChild(row);
    });
  }

  // Fungsi untuk memuat semua log aktivitas
  function populateFullLogTable() {
    // Mirip dengan populateDashboardLog, tapi tampilkan semua log
  }

  // Fungsi untuk merender semua grafik
  function renderCharts() {
    // Kode untuk renderActivityChart, genderChart, hobbyChart bisa diletakkan di sini
  }

  // Panggil semua fungsi pemuat data
  populateDashboardLog();
  populateStudentTable();
  renderCharts(); // Panggil fungsi render grafik
});
