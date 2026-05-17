/**
 * ITCLIMAT · локальный dev-сервер
 *
 * Запуск:  node js/modules/server.js
 * Сайт:    http://localhost:3000
 *
 * Отдаёт статические файлы как есть.
 * Любой неизвестный URL → 404.html (как на продакшне).
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 3000;
const ROOT = path.join(__dirname, '../..'); /* корень проекта, а не папка js/modules/ */

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

function serve(res, filePath, status) {
  const ext  = path.extname(filePath).toLowerCase();
  const mime = MIME[ext] || 'application/octet-stream';
  const data = fs.readFileSync(filePath);
  res.writeHead(status, { 'Content-Type': mime });
  res.end(data);
}

http.createServer(function (req, res) {
  /* Убираем query-string и декодируем URL */
  let urlPath = decodeURIComponent(req.url.split('?')[0]);

  /* Корень → index.html */
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    /* Файл найден — отдаём с кодом 200 */
    serve(res, filePath, 200);
  } else {
    /* Файл не найден — отдаём 404.html с кодом 404 */
    serve(res, path.join(ROOT, '404.html'), 404);
  }

}).listen(PORT, function () {
  console.log('');
  console.log('  ИТ Климат · dev-сервер запущен');
  console.log('  → http://localhost:' + PORT);
  console.log('  Ctrl+C — остановить');
  console.log('');
});
