/**
 * ZONETOCODE - Unified Frontend Logic
 */
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("active");
}

// 1. NAVBAR SCROLL EFFECT

window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }
});

// 2. MOBILE MENU TOGGLE

function toggleMenu() {
  const navLinks = document.getElementById("navLinks");
  const menuBtn = document.getElementById("menuBtn");

  navLinks.classList.toggle("active");
  const isOpen = navLinks.classList.contains("active");

  // Swap icons: 'close' renders as X, 'menu' renders as ≡
  menuBtn.textContent = isOpen ? "close" : "menu";

  // Keep the 'X' button visible and on top of the mobile menu
  if (isOpen) {
    menuBtn.style.position = "fixed";
    menuBtn.style.right = "20px";
    menuBtn.style.zIndex = "1100";
  } else {
    menuBtn.style.position = "static";
  }
}

// 3. PASSWORD VISIBILITY TOGGLE

function togglePassword(inputId, iconId) {
  const passwordInput = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (passwordInput && icon) {
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      icon.textContent = "visibility";
    } else {
      passwordInput.type = "password";
      icon.textContent = "visibility_off";
    }
  }
}

// 4. UI INITIALIZATION (Alerts & Profile)
document.addEventListener("DOMContentLoaded", () => {
  const alerts = document.querySelectorAll(".alert, .status-msg");
  alerts.forEach((alert) => {
    setTimeout(() => {
      alert.style.opacity = "0";
      alert.style.transition = "opacity 0.5s ease";
      setTimeout(() => alert.remove(), 500);
    }, 5000);
  });

  //  Profile Page Logic
  const profileDetails = document.getElementById("profileDetails");
  const profileForm = document.getElementById("profileForm");
  const passSection = document.getElementById("passwordSection");
  const editBtn = document.getElementById("editProfileBtn");
  const cancelEdit = document.getElementById("cancelEditBtn");
  const showPassBtn = document.getElementById("showPassBtn");
  const cancelPass = document.getElementById("cancelPassBtn");

  if (editBtn) {
    editBtn.onclick = () => {
      profileDetails.style.display = "none";
      profileForm.style.display = "flex";
      passSection.style.display = "none";
    };
  }

  if (cancelEdit) {
    cancelEdit.onclick = () => {
      profileDetails.style.display = "block";
      profileForm.style.display = "none";
    };
  }

  if (showPassBtn) {
    showPassBtn.onclick = () => {
      passSection.style.display = "block";
      profileForm.style.display = "none";
      passSection.scrollIntoView({ behavior: "smooth" });
    };
  }

  if (cancelPass) {
    cancelPass.onclick = () => {
      passSection.style.display = "none";
    };
  }

  // C. AJAX Profile Update
  if (profileForm) {
    profileForm.onsubmit = async (e) => {
      e.preventDefault();
      const msg = document.getElementById("updateMsg");
      const formData = new URLSearchParams(new FormData(profileForm));

      try {
        const response = await fetch("/update-profile", {
          method: "POST",
          body: formData,
        });
        const res = await response.json();

        if (res.success) {
          msg.style.color = "green";
          msg.textContent = "Saved! ✅";

          document.getElementById("displayFullName").textContent =
            res.user.firstname;
          document.getElementById("displayEmail").textContent = res.user.email;
          document.getElementById("welcomeText").textContent =
            `Welcome, ${res.user.firstname}!`;

          setTimeout(() => {
            msg.textContent = "";
            profileDetails.style.display = "block";
            profileForm.style.display = "none";
          }, 1000);
        }
      } catch (err) {
        msg.textContent = "Update failed.";
        msg.style.color = "red";
      }
    };
  }
});
