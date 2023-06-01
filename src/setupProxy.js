import { createProxyMiddleware } from "http-proxy-middleware";

export default function setupProxy(app) {
    app.use(
      '/FreshSmile',
      createProxyMiddleware({
        target: 'https://backfresh.azurewebsites.net',
        changeOrigin: true,
      })
    );
  };