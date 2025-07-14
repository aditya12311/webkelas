document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("adminLoggedIn") !== "true") {
    alert("Akses ditolak! Anda harus login terlebih dahulu.");
    window.location.href = "login.html";
    return;
  }

  const logoutButton = document.getElementById("logoutButton");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const body = document.body;

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("adminLoggedIn"); // Hapus bukti login
    alert("Anda telah berhasil logout.");
    window.location.href = "login.html";
  });

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

  const visitorCountEl = document.getElementById("visitor-count");
  const messageCountEl = document.getElementById("message-count");
  setInterval(() => {
    let currentVisitors = parseInt(visitorCountEl.textContent);
    visitorCountEl.textContent =
      currentVisitors + Math.floor(Math.random() * 3);
  }, 5000);

  const dummyLogs = [
    {
      time: "2025-07-14 08:15",
      ip: "103.45.12.1",
      user: "admin",
      success: true,
    },
    {
      time: "2025-07-14 07:50",
      ip: "202.80.212.5",
      user: "hacker",
      success: false,
    },
    {
      time: "2025-07-13 20:05",
      ip: "114.122.10.8",
      user: "ketua_kelas",
      success: true,
    },
  ];
  const logTableBody = document.getElementById("logTableBody");
  logTableBody.innerHTML = "";
  dummyLogs.forEach((log) => {
    const row = document.createElement("tr");
    const statusClass = log.success ? "status-success" : "status-fail";
    const statusText = log.success ? "Berhasil" : "Gagal";
    row.innerHTML = `<td>${log.time}</td><td>${log.ip}</td><td>${log.user}</td><td><span class="status ${statusClass}">${statusText}</span></td>`;
    logTableBody.appendChild(row);
  });

  const genderChartCanvas = document
    .getElementById("genderChart")
    .getContext("2d");
  new Chart(genderChartCanvas, {
    type: "pie",
    data: {
      labels: ["Laki-laki", "Perempuan"],
      datasets: [
        {
          label: "Jumlah Siswa",
          data: [22, 18],
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
    },
  });
});
