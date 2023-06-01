import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app) {
    app.use(
      '/FreshSmile',
      createProxyMiddleware({
        target: 'https://freshsmile.azurewebsites.net',
        changeOrigin: true,
      })
    );
  };