/* ============================================================
   ITCLIMAT · PRELOADER — minimal
   Синхронный скрипт в начале <body> — появляется мгновенно.
   Скрывается после window.load + минимальная задержка.
   ============================================================ */
(function () {
  'use strict';

  /* Минимальное время показа — чтобы не мелькал на быстрых соединениях */
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
      /* Запускаем fade-out через CSS transition */
      el.classList.add('preloader--exit');

      /* Удаляем из DOM после окончания перехода */
      el.addEventListener('transitionend', cleanup, { once: true });

      /* Страховка — если transitionend не сработал */
      setTimeout(cleanup, 700);
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
