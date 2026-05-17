/* ============================================================
   ITCLIMAT · КНОПКА «НАВЕРХ» — прогресс-кольцо
   Создаётся динамически, работает на всех страницах.
   ============================================================ */

(function () {
  const RADIUS       = 19;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; /* ≈ 119.4 */

  const btn = document.createElement('button');
  btn.className = 'scroll-top';
  btn.setAttribute('aria-label', 'Наверх');
  btn.innerHTML =
    '<svg class="scroll-top__ring" viewBox="0 0 48 48" aria-hidden="true">' +
      '<circle class="scroll-top__track"    cx="24" cy="24" r="' + RADIUS + '"/>' +
      '<circle class="scroll-top__progress" cx="24" cy="24" r="' + RADIUS + '"/>' +
    '</svg>' +
    '<svg class="scroll-top__arrow" width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">' +
      '<path d="M7 11V3M3 7l4-4 4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';
  document.body.appendChild(btn);

  const ring = btn.querySelector('.scroll-top__progress');
  ring.style.strokeDasharray  = CIRCUMFERENCE;
  ring.style.strokeDashoffset = CIRCUMFERENCE;

  let ticking = false;

  function update() {
    const scrollY   = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio     = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    btn.classList.toggle('scroll-top--visible', scrollY > 220);
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - ratio);
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  btn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' }));

  update();
})();
