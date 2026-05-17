/* ============================================================
   ITCLIMAT · ПРЕЛОАДЕР
   Синхронный скрипт — подключается первым в <body>,
   появляется мгновенно до загрузки остального контента.
   Скрывается после window.load + минимальная задержка.
   ============================================================ */
(function () {
  'use strict';

  /* Минимальное время показа — чтобы не мелькал на быстром соединении */
  var MIN_DISPLAY = 800;
  var startTime   = Date.now();
  var hidden      = false;

  /* ── Создаём разметку ── */
  var el = document.createElement('div');
  el.id        = 'preloader';
  el.className = 'preloader';
  el.setAttribute('aria-hidden', 'true');
  el.setAttribute('role', 'presentation');

  el.innerHTML =
    '<div class="preloader__dots">' +
      '<div class="preloader__dot"></div>' +
      '<div class="preloader__dot"></div>' +
      '<div class="preloader__dot"></div>' +
    '</div>';

  document.body.insertBefore(el, document.body.firstChild);

  /* Блокируем прокрутку пока прелоадер виден */
  document.body.style.overflow = 'hidden';

  /* ── Скрыть прелоадер ── */
  function hide() {
    if (hidden) return;
    hidden = true;

    var elapsed = Date.now() - startTime;
    var wait    = Math.max(0, MIN_DISPLAY - elapsed);

    setTimeout(function () {
      el.classList.add('preloader--exit');
      el.addEventListener('transitionend', cleanup, { once: true });
      setTimeout(cleanup, 700); /* страховка */
    }, wait);
  }

  function cleanup() {
    if (el.parentNode) el.parentNode.removeChild(el);
    document.body.style.overflow = '';
  }

  /* ── Ждём полной загрузки страницы ── */
  if (document.readyState === 'complete') {
    hide();
  } else {
    window.addEventListener('load', hide, { once: true });
  }

})();
