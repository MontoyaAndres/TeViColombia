const withOffline = require("next-offline");
const withCSS = require("@zeit/next-css");

const prod = process.env.NODE_ENV === "production";

module.exports = withOffline(
  withCSS({
    target: "serverless",
    workboxOpts: {
      swDest: "static/service-worker.js",
      runtimeCaching: [
        {
          urlPattern: /^https?:\/\/api.tevicolombia.com\/.*/,
          handler: "staleWhileRevalidate"
        },
        {
          urlPattern: /^https?.*/,
          handler: "networkFirst",
          options: {
            cacheName: "https-calls",
            networkTimeoutSeconds: 15,
            expiration: {
              maxEntries: 150,
              maxAgeSeconds: 30 * 24 * 60 * 60 // 1 month
            },
            cacheableResponse: {
              statuses: [0, 200]
            }
          }
        }
      ]
    },
    env: {
      presets: ["next/babel"],
      API_HOST: prod ? "https://api.tevicolombia.com" : "http://localhost:4000"
    },
    crossOrigin: "anonymous"
  })
);
