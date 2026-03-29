document.addEventListener("DOMContentLoaded", () => {
  // ---------- FOOTER YEAR ----------
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- MOBILE NAV TOGGLE ----------
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
    });
  }

  // ---------- LOGIN BUTTONS ----------
  const goToAuth = () => {
    window.location.href = "auth.html";
  };

  const loginBtnHeader = document.getElementById("loginBtnHeader");
  const loginBtnHero = document.getElementById("loginBtnHero");

  if (loginBtnHeader) loginBtnHeader.addEventListener("click", goToAuth);
  if (loginBtnHero) loginBtnHero.addEventListener("click", goToAuth);

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
    const updateServiceTab = (service) => {
      const label = planGroup.querySelector("label");

      if (service === "data") {
        if (label) label.textContent = "Data Plan";
        planOrAmount.innerHTML = `
          <option value="">Select data plan</option>
          <option value="500-1gb">₦500 – 1GB (30 days)</option>
          <option value="1000-3gb">₦1000 – 3GB (30 days)</option>
          <option value="2000-10gb">₦2000 – 10GB (30 days)</option>
        `;
      } else if (service === "airtime") {
        if (label) label.textContent = "Amount (₦)";
        planOrAmount.innerHTML = `
          <option value="">Select amount</option>
          <option value="100">₦100</option>
          <option value="200">₦200</option>
          <option value="500">₦500</option>
          <option value="1000">₦1000</option>
          <option value="2000">₦2000</option>
        `;
      } else if (service === "airtime2cash") {
        if (label) label.textContent = "Airtime Amount (₦)";
        planOrAmount.innerHTML = `
          <option value="">Select amount</option>
          <option value="500">₦500</option>
          <option value="1000">₦1000</option>
          <option value="2000">₦2000</option>
          <option value="5000">₦5000</option>
        `;
      }
    };

    // Default tab setup
    const activeTab = document.querySelector("[data-service-tab].active");
    if (activeTab) {
      const defaultService = activeTab.getAttribute("data-service-tab");
      serviceInput.value = defaultService;
      updateServiceTab(defaultService);
    }

    // Service tab clicks
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        tabButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const service = btn.getAttribute("data-service-tab");
        serviceInput.value = service;
        updateServiceTab(service);
      });
    });

    // Quick Buy form submit
    quickBuyForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const serviceType = serviceInput.value;
      const network = document.getElementById("network")?.value;
      const plan = planOrAmount.value;
      const phone = document.getElementById("phone")?.value.trim();

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
    });
  }

  // ================================================================
  // AUTH PAGE: LOGIN / REGISTER TABS AND FORMS
  // ================================================================
  const authTabs = document.querySelectorAll("[data-auth-tab]");
  const authForms = document.querySelectorAll(".auth-form");

  if (authTabs.length && authForms.length) {
    // Switch auth tabs
    authTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const target = tab.getAttribute("data-auth-tab");

        authTabs.forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");

        authForms.forEach((form) => {
          const formType = form.getAttribute("data-auth-form");
          form.classList.toggle("active", formType === target);
        });
      });
    });

    // Login form
    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm && loginMessage) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const email = document.getElementById("loginEmail")?.value.trim();
        const password = document.getElementById("loginPassword")?.value;

        if (!email || !password) {
          loginMessage.textContent = "Please enter your email and password.";
          loginMessage.className = "form-message error";
          return;
        }

        loginMessage.textContent =
          "Login submitted. Connect this form to your backend authentication.";
        loginMessage.className = "form-message success";
      });
    }

    // Register form
    const registerForm = document.getElementById("registerForm");
    const registerMessage = document.getElementById("registerMessage");

    if (registerForm && registerMessage) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const fullName = document.getElementById("regFullName")?.value.trim();
        const email = document.getElementById("regEmail")?.value.trim();
        const phone = document.getElementById("regPhone")?.value.trim();
        const password = document.getElementById("regPassword")?.value;
        const confirmPassword =
          document.getElementById("regConfirmPassword")?.value;

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

        registerMessage.textContent =
          "Account created (demo). Connect this form to your backend registration.";
        registerMessage.className = "form-message success";
      });
    }
  }
});