/* ============================================================
   ITCLIMAT · HEADER — скролл, скрытие, активная ссылка
   ============================================================ */

/* ── Скролл + скрытие при прокрутке вниз ── */
(function () {
  const h = document.querySelector('.header');
  if (!h) return;

  let lastY   = window.scrollY;
  let ticking = false;
  const THRESHOLD = 80;

  function update() {
    const y = window.scrollY;
    h.classList.toggle('header--scrolled', y > 24);

    if (y > lastY && y > THRESHOLD) {
      h.classList.add('header--hidden');
    } else {
      h.classList.remove('header--hidden');
    }

    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();

/* ── Активная ссылка навигации ── */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (!page && href === 'index.html')) {
      link.classList.add('header__nav-link--active');
    }
  });
})();
