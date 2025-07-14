document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const notification = document.getElementById("notification");

  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === "" || password === "") {
      showNotification("Username dan password tidak boleh kosong!", "error");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      const result = await response.json();

      if (result.success) {
        showNotification(result.message, "success");

        localStorage.setItem("adminLoggedIn", "true");

        setTimeout(() => {
          window.location.href = "dashadm.html";
        }, 1500);
      } else {
        showNotification(result.message, "error");
      }
    } catch (error) {
      console.error("Error:", error);
      showNotification("Tidak dapat terhubung ke server.", "error");
    }
  });

  function showNotification(message, type) {
    notification.textContent = message;
    notification.className = "notification";
    notification.classList.add(type, "show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }
});
