/* ============================================================
   ITCLIMAT · SCROLL REVEAL — IntersectionObserver
   Добавляет .in-view к элементам с классом .reveal
   когда они входят в область видимости.
   ============================================================ */

(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in-view');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -36px 0px' });

  els.forEach(el => obs.observe(el));
})();
