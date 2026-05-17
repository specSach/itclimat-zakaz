/* Добавляем класс .js на <html> синхронно — до рендера страницы.
   Это активирует CSS-правило .js .reveal { opacity: 0 },
   чтобы элементы были скрыты ДО запуска IntersectionObserver. */
document.documentElement.classList.add('js');
