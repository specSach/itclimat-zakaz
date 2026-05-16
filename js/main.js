/* ============================================================
   ITCLIMAT · MAIN JS
   ============================================================ */

/* Добавляем класс .js на <html> — CSS анимации активируются только с JS */
document.documentElement.classList.add('js');

/* ── HEADER SCROLL ── */
(function () {
  const h = document.querySelector('.header');
  if (!h) return;
  window.addEventListener('scroll', () => {
    h.classList.toggle('header--scrolled', window.scrollY > 24);
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

/* ── COOKIE BANNER ── */
(function () {
  const KEY = 'itclimat_cookie_v1';
  if (localStorage.getItem(KEY)) return;

  const s = document.createElement('style');
  s.textContent = `.ck{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);
    background:#fff;border-radius:20px;box-shadow:0 8px 40px rgba(0,0,0,.18);
    padding:20px 28px;display:flex;align-items:center;gap:20px;z-index:2000;
    max-width:600px;width:calc(100% - 32px);opacity:0;
    animation:ckIn .5s .6s ease forwards;}
    @keyframes ckIn{to{opacity:1;transform:translateX(-50%) translateY(0)}}
    .ck__text{font-size:14px;line-height:1.5;flex:1;font-family:'Manrope',sans-serif}
    .ck__link{color:#8301ff;text-decoration:underline}
    .ck__btn{flex-shrink:0;padding:10px 22px;border-radius:20px;background:linear-gradient(120deg,#b100c0,#8301ff);
      color:#fff;font-weight:700;font-size:14px;cursor:pointer;border:none;font-family:'Manrope',sans-serif}
    @media(max-width:500px){.ck{flex-direction:column;text-align:center}.ck__btn{width:100%}}`;
  document.head.appendChild(s);

  const b = document.createElement('div');
  b.className = 'ck';
  b.innerHTML = `<p class="ck__text">Мы используем cookie для улучшения работы сайта. <a href="docs.html" class="ck__link">Подробнее</a></p>
    <button class="ck__btn">Принять</button>`;
  document.body.appendChild(b);

  b.querySelector('button').addEventListener('click', () => {
    localStorage.setItem(KEY, '1');
    b.style.transition = 'opacity .4s ease, transform .4s ease';
    b.style.opacity = '0';
    b.style.transform = 'translateX(-50%) translateY(20px)';
    setTimeout(() => b.remove(), 400);
  });
})();
