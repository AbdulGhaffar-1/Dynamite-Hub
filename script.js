// Handle dynamic year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

// Quick Buy service tabs
const tabButtons = document.querySelectorAll("[data-service-tab]");
const serviceInput = document.getElementById("serviceType");
const planGroup = document.getElementById("planGroup");
const planOrAmount = document.getElementById("planOrAmount");

tabButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Make this tab active
    tabButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    const service = btn.getAttribute("data-service-tab");
    serviceInput.value = service;

    // Adjust form for each service type
    if (service === "data") {
      planGroup.querySelector("label").textContent = "Data Plan";
      planOrAmount.innerHTML = `
        <option value="">Select data plan</option>
        <option value="500-1gb">₦500 – 1GB (30 days)</option>
        <option value="1000-3gb">₦1000 – 3GB (30 days)</option>
        <option value="2000-10gb">₦2000 – 10GB (30 days)</option>
      `;
    } else if (service === "airtime") {
      planGroup.querySelector("label").textContent = "Amount (₦)";
      planOrAmount.innerHTML = `
        <option value="">Select amount</option>
        <option value="100">₦100</option>
        <option value="200">₦200</option>
        <option value="500">₦500</option>
        <option value="1000">₦1000</option>
        <option value="2000">₦2000</option>
      `;
    } else if (service === "airtime2cash") {
      planGroup.querySelector("label").textContent = "Airtime Amount (₦)";
      planOrAmount.innerHTML = `
        <option value="">Select amount</option>
        <option value="500">₦500</option>
        <option value="1000">₦1000</option>
        <option value="2000">₦2000</option>
        <option value="5000">₦5000</option>
      `;
    }
  });
});

// Quick Buy form submission (front-end only)
const quickBuyForm = document.getElementById("quick-buy-form");
const quickBuyMessage = document.getElementById("quickBuyMessage");

quickBuyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const serviceType = serviceInput.value;
  const network = document.getElementById("network").value;
  const plan = planOrAmount.value;
  const phone = document.getElementById("phone").value.trim();

  // Very basic validation
  if (!network || !plan || !phone) {
    quickBuyMessage.textContent = "Please fill in all fields to continue.";
    quickBuyMessage.className = "form-message error";
    return;
  }

  if (!/^0\d{10}$/.test(phone)) {
    quickBuyMessage.textContent = "Enter a valid Nigerian phone number (11 digits).";
    quickBuyMessage.className = "form-message error";
    return;
  }

  // Show a simulated "next step" message
  quickBuyMessage.textContent = `Preview: ${serviceType.toUpperCase()} on ${network.toUpperCase()} for ${phone}. Connect backend to proceed with real payment.`;
  quickBuyMessage.className = "form-message success";

  // In a real app, you might:
  // - send this data to your server,
  // - redirect to a checkout page,
  // - or open a confirmation modal.
});

// Dummy login button handlers (for now)
// document.getElementById("loginBtnHeader").addEventListener("click", () => {
//   alert("Login modal/page goes here. We'll build it next.");
// });

// document.getElementById("loginBtnHero").addEventListener("click", () => {
//   alert("Login modal/page goes here. We'll build it next.");
// });






// Run everything after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // ---------- COMMON: FOOTER YEAR ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- COMMON: MOBILE NAV TOGGLE (index.html only) ----------
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  // ---------- COMMON: LOGIN BUTTONS NAVIGATE TO AUTH PAGE ----------
  const goToAuth = () => {
    window.location.href = "auth.html";
  };

  const loginBtnHeader = document.getElementById("loginBtnHeader");
  const loginBtnHero = document.getElementById("loginBtnHero");

  if (loginBtnHeader) {
    loginBtnHeader.addEventListener("click", goToAuth);
  }
  if (loginBtnHero) {
    loginBtnHero.addEventListener("click", goToAuth);
  }

  // ================================================================
  // INDEX PAGE: QUICK BUY FORM + SERVICE TABS
  // ================================================================

  const quickBuyForm = document.getElementById("quick-buy-form");
  const quickBuyMessage = document.getElementById("quickBuyMessage");
  const tabButtons = document.querySelectorAll("[data-service-tab]");
  const serviceInput = document.getElementById("serviceType");
  const planGroup = document.getElementById("planGroup");
  const planOrAmount = document.getElementById("planOrAmount");

  if (quickBuyForm && quickBuyMessage && serviceInput && planGroup && planOrAmount) {
    // Service tabs (Data / Airtime / Airtime2Cash)
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const service = btn.getAttribute("data-service-tab");
        serviceInput.value = service;

        if (service === "data") {
          planGroup.querySelector("label").textContent = "Data Plan";
          planOrAmount.innerHTML = `
            <option value="">Select data plan</option>
            <option value="500-1gb">₦500 – 1GB (30 days)</option>
            <option value="1000-3gb">₦1000 – 3GB (30 days)</option>
            <option value="2000-10gb">₦2000 – 10GB (30 days)</option>
          `;
        } else if (service === "airtime") {
          planGroup.querySelector("label").textContent = "Amount (₦)";
          planOrAmount.innerHTML = `
            <option value="">Select amount</option>
            <option value="100">₦100</option>
            <option value="200">₦200</option>
            <option value="500">₦500</option>
            <option value="1000">₦1000</option>
            <option value="2000">₦2000</option>
          `;
        } else if (service === "airtime2cash") {
          planGroup.querySelector("label").textContent = "Airtime Amount (₦)";
          planOrAmount.innerHTML = `
            <option value="">Select amount</option>
            <option value="500">₦500</option>
            <option value="1000">₦1000</option>
            <option value="2000">₦2000</option>
            <option value="5000">₦5000</option>
          `;
        }
      });
    });

    // Quick Buy form submission (front-end demo only)
    quickBuyForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const serviceType = serviceInput.value;
      const network = document.getElementById("network").value;
      const plan = planOrAmount.value;
      const phone = document.getElementById("phone").value.trim();

      if (!network || !plan || !phone) {
        quickBuyMessage.textContent = "Please fill in all fields to continue.";
        quickBuyMessage.className = "form-message error";
        return;
      }

      if (!/^0\d{10}$/.test(phone)) {
        quickBuyMessage.textContent =
          "Enter a valid Nigerian phone number (11 digits).";
        quickBuyMessage.className = "form-message error";
        return;
      }

      quickBuyMessage.textContent = `Preview: ${serviceType.toUpperCase()} on ${network.toUpperCase()} for ${phone}. Connect your backend to complete this transaction.`;
      quickBuyMessage.className = "form-message success";

      // In real app: send to backend or redirect to checkout
    });
  }

  // ================================================================
  // AUTH PAGE: LOGIN / REGISTER TABS AND FORMS
  // ================================================================

  const authTabs = document.querySelectorAll("[data-auth-tab]");
  const authForms = document.querySelectorAll(".auth-form");

  if (authTabs.length && authForms.length) {
    // Tab switching
    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-auth-tab");

        // Switch active tab
        authTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        // Switch active form
        authForms.forEach((form) => {
          const formType = form.getAttribute("data-auth-form");
          if (formType === target) {
            form.classList.add("active");
          } else {
            form.classList.remove("active");
          }
        });
      });
    });

    // LOGIN form handling
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm && loginMessage) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        if (!email || !password) {
          loginMessage.textContent = "Please enter your email and password.";
          loginMessage.className = "form-message error";
          return;
        }

        // Demo-only behavior
        loginMessage.textContent =
          "Login submitted. Connect this form to your backend authentication.";
        loginMessage.className = "form-message success";
      });
    }

    // REGISTER form handling
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");

    if (registerForm && registerMessage) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.getElementById("regFullName").value.trim();
        const email = document.getElementById("regEmail").value.trim();
        const phone = document.getElementById("regPhone").value.trim();
        const password = document.getElementById("regPassword").value;
        const confirmPassword =
          document.getElementById("regConfirmPassword").value;

        if (!fullName || !email || !phone || !password || !confirmPassword) {
          registerMessage.textContent = "Please fill in all fields.";
          registerMessage.className = "form-message error";
          return;
        }

        if (!/^0\d{10}$/.test(phone)) {
          registerMessage.textContent =
            "Enter a valid Nigerian phone number (11 digits).";
          registerMessage.className = "form-message error";
          return;
        }

        if (password.length < 6) {
          registerMessage.textContent =
            "Password should be at least 6 characters.";
          registerMessage.className = "form-message error";
          return;
        }

        if (password !== confirmPassword) {
          registerMessage.textContent = "Passwords do not match.";
          registerMessage.className = "form-message error";
          return;
        }

        // Demo-only behavior
        registerMessage.textContent =
          "Account created (demo). Connect this form to your backend registration.";
        registerMessage.className = "form-message success";
      });
    }
  }
});