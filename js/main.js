/* ============================================================
   ITCLIMAT · MAIN JS — точка входа, только import'ы
   ============================================================

   vendor/vendor.js      — GSAP 3.12.5 + ScrollTrigger (classic script, грузится до main.js)

   modules/
     header.js           — скролл шапки, скрытие, активная ссылка
     menu.js             — мобильное меню (бургер)
     reveal.js           — scroll-reveal (IntersectionObserver)
     hero.js             — GSAP-анимация входа + параллакс
     scroll-top.js       — кнопка «наверх» с кольцом прогресса
     cookie-banner.js    — уведомление о cookie
   ============================================================ */

/* ── Модули ── */
import './modules/header.js';
import './modules/menu.js';
import './modules/reveal.js';
import './modules/hero.js';
import './modules/scroll-top.js';
import './modules/cookie-banner.js';
