const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.themoviedb.org',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      onProxyReq(proxyReq) {
        proxyReq.setHeader('origin', 'http://localhost:3000');
      },
      secure: false,
    })
  );
};