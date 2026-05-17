/* ============================================================
   ITCLIMAT · 404 PAGE — countdown & redirect
   ============================================================ */
(function () {
  'use strict';

  var SECONDS   = 5;
  var TARGET    = 'index.html';

  var countEl   = document.getElementById('countdown');
  var remaining = SECONDS;

  /* Первичная отрисовка */
  countEl.textContent = remaining;

  /* ── Тик каждую секунду ── */
  var interval = setInterval(function () {
    remaining -= 1;

    /* Анимируем смену числа */
    countEl.classList.remove('err-timer__count--tick');

    /* Небольшой reflow чтобы анимация сработала повторно */
    void countEl.offsetWidth;

    countEl.textContent = remaining;
    countEl.classList.add('err-timer__count--tick');

    if (remaining <= 0) {
      clearInterval(interval);
      window.location.href = TARGET;
    }
  }, 1000);

  /* ── Кнопка «На главную» — немедленный переход ── */
  var btn = document.getElementById('homeBtn');
  if (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      clearInterval(interval);
      window.location.href = TARGET;
    });
  }

})();
