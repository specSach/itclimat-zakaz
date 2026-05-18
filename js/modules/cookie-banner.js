(function () {
  "use strict";

  var KEY_CONSENT    = "itclimat_cookie_consent";
  var KEY_CATEGORIES = "itclimat_cookie_categories";

  /* ── localStorage ── */
  function getItem(key)        { try { return localStorage.getItem(key) || ""; } catch(e) { return ""; } }
  function setItem(key, value) { try { localStorage.setItem(key, value); } catch(e) {} }
  function removeItem(key)     { try { localStorage.removeItem(key); } catch(e) {} }

  function parseCategories(raw) {
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }

  /* ── Показ / скрытие ── */
  function showBanner(root) {
    root.classList.add("is-active");
    root.querySelector(".cb__banner").classList.add("is-visible");
    root.querySelector(".cb__settings").classList.remove("is-visible");
    root.querySelector(".cb__settings").setAttribute("aria-hidden", "true");
  }

  function showSettings(root) {
    root.classList.add("is-active");
    root.querySelector(".cb__banner").classList.remove("is-visible");
    root.querySelector(".cb__settings").classList.add("is-visible");
    root.querySelector(".cb__settings").setAttribute("aria-hidden", "false");
  }

  function hidePanels(root) {
    root.classList.remove("is-active");
    root.querySelector(".cb__banner").classList.remove("is-visible");
    root.querySelector(".cb__settings").classList.remove("is-visible");
    root.querySelector(".cb__settings").setAttribute("aria-hidden", "true");
  }

  /* ── Категории ── */
  function getSelectedCategories(root) {
    var selected = ["essential"];
    root.querySelectorAll(".cb__toggle-input[name='cookie_type']").forEach(function (input) {
      if (input.checked) selected.push(input.value);
    });
    return selected;
  }

  function setAllOptionalCategories(root, checked) {
    root.querySelectorAll(".cb__toggle-input[name='cookie_type']").forEach(function (input) {
      input.checked = checked;
    });
  }

  function applySavedCategories(root, categories) {
    root.querySelectorAll(".cb__toggle-input[name='cookie_type']").forEach(function (input) {
      input.checked = categories.indexOf(input.value) !== -1;
    });
  }

  /* ── Сохранение в localStorage ── */
  function saveConsent(root) {
    var categories = getSelectedCategories(root);
    setItem(KEY_CONSENT, "true");
    setItem(KEY_CATEGORIES, JSON.stringify(categories));

    root.dispatchEvent(new CustomEvent("cookiebanner:consent", {
      bubbles: true,
      detail: { categories: categories }
    }));
  }

  /* ── Инициализация ── */
  function initCookieBanner(root) {
    if (!root || root.dataset.cookieBannerReady === "true") return;
    root.dataset.cookieBannerReady = "true";

    var consentGiven = getItem(KEY_CONSENT);
    applySavedCategories(root, parseCategories(getItem(KEY_CATEGORIES)));

    /* Аккордеон категорий */
    root.querySelectorAll("[data-category-toggle]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.closest(".cb__category").classList.toggle("is-open");
      });
    });

    var widgetBtn   = root.querySelector(".cb__widget-button");
    var acceptBtn   = root.querySelector(".cb__accept-btn");
    var settingsBtn = root.querySelector(".cb__settings-btn");
    var confirmBtn  = root.querySelector(".cb__confirm-btn");
    var settingsHdr = root.querySelector(".cb__settings-header");

    /* Открываем баннер при первом визите */
    if (!consentGiven) {
      showBanner(root);
    } else {
      hidePanels(root);
    }

    /* Кнопка-триггер: открыть / закрыть */
    widgetBtn.addEventListener("click", function () {
      var open = root.querySelector(".cb__banner").classList.contains("is-visible") ||
                 root.querySelector(".cb__settings").classList.contains("is-visible");
      open ? hidePanels(root) : showBanner(root);
    });

    settingsBtn.addEventListener("click", function () { showSettings(root); });
    settingsHdr.addEventListener("click", function () { showBanner(root); });

    acceptBtn.addEventListener("click", function () {
      setAllOptionalCategories(root, true);
      saveConsent(root);
      hidePanels(root);
    });

    confirmBtn.addEventListener("click", function () {
      saveConsent(root);
      hidePanels(root);
    });

    /* Якорные триггеры: <a href="#opencookiebanner"> */
    document.querySelectorAll("a[href='#opencookiebanner']").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        showBanner(root);
      });
    });
  }

  function autoInit() {
    document.querySelectorAll("[data-cookie-banner]").forEach(initCookieBanner);
  }

  /* ── Публичное API ── */
  window.CookieBanner = {
    reset: function () {
      removeItem(KEY_CONSENT);
      removeItem(KEY_CATEGORIES);
    },
    getCategories: function () {
      return parseCategories(getItem(KEY_CATEGORIES));
    },
    hasConsent: function () {
      return getItem(KEY_CONSENT) === "true";
    }
  };

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", autoInit)
    : autoInit();
})();
