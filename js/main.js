/* ============================================================
   ITCLIMAT · MAIN JS
   ============================================================ */

/* Добавляем класс .js на <html> — CSS анимации активируются только с JS */
document.documentElement.classList.add('js');

/* ── HEADER SCROLL + HIDE ON SCROLL DOWN ── */
(function () {
  const h = document.querySelector('.header');
  if (!h) return;

  let lastY    = window.scrollY;
  let ticking  = false;
  const THRESHOLD = 80; /* px — начать прятать после этого порога */

  function update() {
    const y = window.scrollY;
    h.classList.toggle('header--scrolled', y > 24);

    if (y > lastY && y > THRESHOLD) {
      /* Скролл вниз — скрыть */
      h.classList.add('header--hidden');
    } else {
      /* Скролл вверх — показать */
      h.classList.remove('header--hidden');
    }
    lastY = y;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* ── BURGER MENU ── */
(function () {
  const burger   = document.querySelector('.header__burger');
  const menu     = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.mobile-menu__close');
  if (!burger || !menu) return;

  const open = () => {
    burger.classList.add('header__burger--open');
    menu.classList.add('mobile-menu--open');
    document.body.style.overflow = 'hidden';
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Закрыть меню');
  };
  const close = () => {
    burger.classList.remove('header__burger--open');
    menu.classList.remove('mobile-menu--open');
    document.body.style.overflow = '';
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Открыть меню');
  };

  burger.addEventListener('click', () =>
    menu.classList.contains('mobile-menu--open') ? close() : open());
  if (closeBtn) closeBtn.addEventListener('click', close);
  menu.querySelectorAll('.mobile-menu__link').forEach(l => l.addEventListener('click', close));
  document.addEventListener('keydown', e => e.key === 'Escape' && close());
})();

/* ── ACTIVE NAV LINK ── */
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.header__nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === page || (!page && href === 'index.html')) {
      link.classList.add('header__nav-link--active');
    }
  });
})();

/* ── SCROLL REVEAL (IntersectionObserver — всегда запускается) ── */
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

/* ── GSAP — только Hero-анимация (не влияет на .reveal) ── */
(function () {
  if (typeof gsap === 'undefined') return;
  if (typeof ScrollTrigger !== 'undefined') gsap.registerPlugin(ScrollTrigger);

  /* Hero главной */
  if (document.querySelector('.hero__content')) {
    gsap.set(['.hero__title', '.hero__desc', '.hero__actions', '.hero__phones'], { opacity: 0, y: 40 });
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

/* Cookie banner removed */

/* ── SCROLL TO TOP WITH PROGRESS RING ── */
(function () {
  const RADIUS = 19;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS; /* ≈ 119.4 */

  /* Создаём кнопку динамически — работает на всех страницах */
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
  ring.style.strokeDashoffset = CIRCUMFERENCE; /* старт — пустой */

  let ticking = false;

  function update() {
    const scrollY   = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const ratio     = maxScroll > 0 ? Math.min(scrollY / maxScroll, 1) : 0;

    /* Показываем кнопку после 220px */
    btn.classList.toggle('scroll-top--visible', scrollY > 220);

    /* Обновляем прогресс обводки */
    ring.style.strokeDashoffset = CIRCUMFERENCE * (1 - ratio);

    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* Первичный вызов на случай, если страница уже проскроллена */
  update();
})();

/* ── HERO PARALLAX ── */
(function () {
  const el = document.querySelector('.hero__phones');
  if (!el) return;
  if (window.matchMedia('(max-width: 1024px), (prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;

  function update() {
    el.style.transform = 'translateY(' + (window.scrollY * -0.22) + 'px)';
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();
