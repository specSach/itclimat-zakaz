/* ============================================================
   ITCLIMAT · HERO — GSAP-анимация входа + параллакс
   ============================================================ */

/* ── GSAP-анимация (только hero главной и page-hero подстраниц) ── */
(function () {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* Hero главной */
  if (document.querySelector('.hero__content')) {
    gsap.set(['.hero__title', '.hero__desc', '.hero__actions', '.hero__phones'],
      { opacity: 0, y: 40 });

    const tl = gsap.timeline({ delay: .1, defaults: { ease: 'power3.out' } });
    tl.to('.hero__title',   { opacity: 1, y: 0, duration: .9 })
      .to('.hero__desc',    { opacity: 1, y: 0, duration: .7 }, '-=.5')
      .to('.hero__actions', { opacity: 1, y: 0, duration: .6 }, '-=.4')
      .to('.hero__phones',  { opacity: 1, y: 0, duration: .9, ease: 'back.out(1.5)' }, '-=.7');
  }

  /* Hero подстраниц */
  if (document.querySelector('.page-hero__title')) {
    gsap.set('.page-hero__title', { opacity: 0, y: 30 });
    gsap.to('.page-hero__title', { opacity: 1, y: 0, duration: .8, ease: 'power3.out', delay: .1 });
  }
})();

/* ── Параллакс изображения телефонов ── */
(function () {
  const el = document.querySelector('.hero__phones');
  if (!el) return;
  if (window.matchMedia('(max-width: 1024px), (prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function update() {
    el.style.transform = 'translateY(' + (window.scrollY * -0.22) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
})();
