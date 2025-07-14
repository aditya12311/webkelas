document.addEventListener("DOMContentLoaded", () => {
  const studentGrid = document.getElementById("student-grid");
  const searchInput = document.getElementById("searchInput");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const pageInfo = document.getElementById("page-info");
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
    enableDarkMode(); // Langsung aktifkan mode gelap
    if (darkModeToggle) {
      darkModeToggle.checked = true; // Sesuaikan posisi tombol toggle
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

  // --- DATA SISWA ---
  const studentNames = [
    "A A Gede Migen Sinatria",
    "Ahdam Amri Efriza",
    "Anak Agung Gde Adhi Mahardika",
    "Anak Agung Gde Putra Artha Kusuma",
    "Dewa Ayu Yunika Risma Pramesti",
    "Gede Angga Pradnyana",
    "HAIDAR FATHI",
    "I Dewa Ayu Trianova",
    "I Gede Agus Aditya",
    "I Gede Andika Satrya Risanata",
    "I GEDE ARFIN MARTA WIGUNA",
    "I Gede Dharma Putra Hardika",
    "I Kadek Dika Mahesa Premana",
    "I Komang Bagus Davin Dewananta",
    "I Made Adi Tresna Wiguna",
    "I Made Bangkit Sanjaya",
    "I Made Refiyana Pranata",
    "I Made Satrya Dharma Endra",
    "I Nyoman Parta Wijaya Kusuma",
    "I Putu Wira Adnyana",
    "Ida Bagus Angga Wijaya Kusuma",
    "Ida Bagus Yogi Werdiyana",
    "Ketut Diah Putri Yanti",
    "NI KADEK DWINA AYU ARGIANTI",
    "Ni Ketut Ayu Darmayanti",
    "NI KETUT NOVIANA PRATIWI",
    "Ni Komang Yunita Pratiwi",
    "Ni Luh Ayu Sukma Ariyanti",
    "Ni Luh Komang Angey Diandra Mertasari",
    "NI LUH NAYLA TRIANA",
    "Ni Luh Putu Febyta Maharani",
    "Ni Putu Ariyanti Putri",
    "NI PUTU ELYN NOVITA DEWI",
    "Ni Putu Frida Laksmi Wiguna",
    "Ni Putu Restiana Pradnya Sari",
    "Ni Putu Tarisa Ariyanti",
    "Nino Yeremi Nugraha",
    "Putu Adheesa Sadhwika Nagi",
    "Putu Angga Saputra",
    "Putu Paris Ramadhani",
  ];

  const students = studentNames.map((name, i) => {
    const getInitials = (name) => {
      let initials = name
        .split(" ")
        .map((n) => n[0])
        .join("");
      return initials.length > 2 ? initials.substring(0, 2) : initials;
    };
    return {
      name: name,
      absen: (i + 1).toString().padStart(2, "0"),
      image: `https://placehold.co/120x120/${Math.floor(
        Math.random() * 16777215
      ).toString(16)}/ffffff?text=${getInitials(name)}`,
    };
  });

  let currentPage = 1;
  const rowsPerPage = 10;
  let filteredStudents = [...students];

  function displayStudents(studentList, page) {
    studentGrid.innerHTML = "";
    page--;
    const startIndex = rowsPerPage * page;
    const endIndex = startIndex + rowsPerPage;
    const paginatedItems = studentList.slice(startIndex, endIndex);

    if (paginatedItems.length === 0) {
      studentGrid.innerHTML = `<p class="no-results">Siswa tidak ditemukan.</p>`;
      return;
    }

    paginatedItems.forEach((student) => {
      const card = document.createElement("div");
      card.className = "student-card";
      card.innerHTML = `
        <img src="${student.image}" alt="Foto ${student.name}" class="profile-pic" onerror="this.onerror=null;this.src='https://placehold.co/120x120/cccccc/ffffff?text=Error';">
        <h2 class="student-name">${student.name}</h2>
        <p class="student-absen">No. Absen: ${student.absen}</p>
      `;
      studentGrid.appendChild(card);
    });
  }

  function updatePaginationButtons(studentList) {
    const totalPages = Math.ceil(studentList.length / rowsPerPage);
    pageInfo.textContent = `Halaman ${currentPage} dari ${totalPages || 1}`;
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
  }

  prevButton.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayStudents(filteredStudents, currentPage);
      updatePaginationButtons(filteredStudents);
    }
  });

  nextButton.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      displayStudents(filteredStudents, currentPage);
      updatePaginationButtons(filteredStudents);
    }
  });

  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    filteredStudents = students.filter((student) => {
      return (
        student.name.toLowerCase().includes(searchTerm) ||
        student.absen.toLowerCase().includes(searchTerm)
      );
    });
    currentPage = 1;
    displayStudents(filteredStudents, currentPage);
    updatePaginationButtons(filteredStudents);
  });

  displayStudents(filteredStudents, currentPage);
  updatePaginationButtons(filteredStudents);
});
