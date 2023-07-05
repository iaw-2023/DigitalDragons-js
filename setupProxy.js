const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/rest',
    createProxyMiddleware({
      target: 'https://digital-dragons-laravel-mor2nweig-digitaldragons.vercel.app/rest/process_payment', // Reemplaza con la URL del servidor Laravel en desarrollo
      changeOrigin: true,
    })
  );
};