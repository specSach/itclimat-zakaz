/* ============================================================
   ITCLIMAT · МОБИЛЬНОЕ МЕНЮ — бургер + открытие/закрытие
   ============================================================ */

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

  menu.querySelectorAll('.mobile-menu__link').forEach(l =>
    l.addEventListener('click', close));

  document.addEventListener('keydown', e => e.key === 'Escape' && close());
})();
