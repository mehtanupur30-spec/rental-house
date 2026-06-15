/* =============================================================================
   RentEase — app.js
   Front-end interactivity only (no backend calls).
   Everything is plain vanilla JS + Bootstrap's bundle (loaded in the layout).
   Each block is guarded so a page that lacks an element simply skips it.
   ============================================================================= */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
     1. SIDEBAR
     - Desktop: collapse/expand (icons only) and remember the choice.
     - Mobile/Tablet: slide-in off-canvas with a backdrop.
  ------------------------------------------------------------------ */
  const body = document.body;
  const toggleBtn = document.querySelector("[data-sidebar-toggle]");
  const backdrop = document.querySelector(".sidebar-backdrop");
  const DESKTOP = () => window.innerWidth >= 992;

  // Restore the collapsed preference on desktop.
  if (localStorage.getItem("re_sidebar") === "collapsed" && DESKTOP()) {
    body.classList.add("sidebar-collapsed");
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      if (DESKTOP()) {
        body.classList.toggle("sidebar-collapsed");
        localStorage.setItem(
          "re_sidebar",
          body.classList.contains("sidebar-collapsed") ? "collapsed" : "open"
        );
      } else {
        body.classList.toggle("sidebar-open");
      }
    });
  }
  if (backdrop) {
    backdrop.addEventListener("click", () => body.classList.remove("sidebar-open"));
  }
  // Close the mobile drawer after navigating.
  document.querySelectorAll(".sidebar .nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (!DESKTOP()) body.classList.remove("sidebar-open");
    });
  });

  /* ------------------------------------------------------------------
     2. LIVE TABLE / GRID SEARCH
     Any input with [data-filter="#targetId"] filters the rows/cards
     inside the target container by their text content.
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-filter]").forEach((input) => {
    const target = document.querySelector(input.getAttribute("data-filter"));
    if (!target) return;
    const items = target.querySelectorAll("[data-filter-item]");
    const emptyMsg = document.querySelector(input.getAttribute("data-filter-empty"));

    input.addEventListener("input", function () {
      const q = this.value.trim().toLowerCase();
      let shown = 0;
      items.forEach((el) => {
        const match = el.textContent.toLowerCase().includes(q);
        el.style.display = match ? "" : "none";
        if (match) shown++;
      });
      if (emptyMsg) emptyMsg.style.display = shown === 0 ? "" : "none";
    });
  });

  /* ------------------------------------------------------------------
     3. BOOKING — AUTO BALANCE
     balance = total - advance.  Recalculated as the user types.
  ------------------------------------------------------------------ */
  const total = document.querySelector("[data-amount-total]");
  const advance = document.querySelector("[data-amount-advance]");
  const balance = document.querySelector("[data-amount-balance]");
  function recalcBalance() {
    if (!total || !advance || !balance) return;
    const t = parseFloat(total.value) || 0;
    const a = parseFloat(advance.value) || 0;
    const b = Math.max(t - a, 0);
    balance.value = b.toFixed(2);
  }
  if (total && advance && balance) {
    [total, advance].forEach((el) => el.addEventListener("input", recalcBalance));
    recalcBalance();
  }

  /* ------------------------------------------------------------------
     4. IMAGE GALLERY (house details)
     Click a thumbnail to swap the main image.
  ------------------------------------------------------------------ */
  const mainImg = document.querySelector("[data-gallery-main]");
  if (mainImg) {
    document.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => {
      thumb.addEventListener("click", function () {
        mainImg.src = this.src;
        document.querySelectorAll("[data-gallery-thumb]").forEach((t) => t.classList.remove("active"));
        this.classList.add("active");
      });
    });
  }

  /* ------------------------------------------------------------------
     5. PASSWORD VISIBILITY TOGGLE
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-pw-toggle]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const field = document.querySelector(this.getAttribute("data-pw-toggle"));
      if (!field) return;
      const show = field.type === "password";
      field.type = show ? "text" : "password";
      this.querySelector("i").className = show ? "bi bi-eye-slash" : "bi bi-eye";
    });
  });

  /* ------------------------------------------------------------------
     6. BOOTSTRAP FORM VALIDATION (client-side demo)
     Forms with .needs-validation show inline messages and never
     actually submit (UI prototype only).
  ------------------------------------------------------------------ */
  document.querySelectorAll(".needs-validation").forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add("was-validated");
        return;
      }
      form.classList.add("was-validated");

      // If the form declares a redirect target (e.g. the login form),
      // navigate there. Otherwise show a success toast.
      const redirect = form.getAttribute("data-redirect");
      if (redirect) {
        window.location.href = redirect;
        return;
      }

      // Show a success toast so buttons always have a visible action.
      showToast(form.getAttribute("data-success") || "Saved successfully.");
      const modalEl = form.closest(".modal");
      if (modalEl && window.bootstrap) bootstrap.Modal.getInstance(modalEl)?.hide();
    });
  });

  /* ------------------------------------------------------------------
     7. TOASTS — lightweight confirmation feedback
     Used by validated forms and any [data-toast] trigger.
  ------------------------------------------------------------------ */
  function ensureToastHost() {
    let host = document.querySelector(".toast-host");
    if (!host) {
      host = document.createElement("div");
      host.className = "toast-host position-fixed bottom-0 end-0 p-3";
      host.style.zIndex = 1090;
      document.body.appendChild(host);
    }
    return host;
  }
  function showToast(msg) {
    const host = ensureToastHost();
    const el = document.createElement("div");
    el.className = "toast align-items-center text-white border-0 show mb-2";
    el.style.background = "var(--navy-800)";
    el.style.borderRadius = "12px";
    el.innerHTML =
      '<div class="d-flex"><div class="toast-body d-flex align-items-center gap-2">' +
      '<i class="bi bi-check-circle-fill text-orange"></i>' + msg +
      '</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>';
    host.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }
  // Expose for inline triggers + buttons.
  window.showToast = showToast;
  document.querySelectorAll("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => showToast(btn.getAttribute("data-toast")));
  });

  /* ------------------------------------------------------------------
     8. CONFIRM-DELETE (generic)
     Buttons with [data-confirm] open a shared confirmation modal.
  ------------------------------------------------------------------ */
  document.querySelectorAll("[data-confirm]").forEach((btn) => {
    btn.addEventListener("click", function () {
      const msg = this.getAttribute("data-confirm");
      const label = document.querySelector("#confirmText");
      if (label) label.textContent = msg;
      if (window.bootstrap) new bootstrap.Modal("#confirmModal").show();
    });
  });
})();
