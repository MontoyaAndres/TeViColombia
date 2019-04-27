const withOffline = require("next-offline");
const withCSS = require("@zeit/next-css");

const prod = process.env.NODE_ENV === "production";

module.exports = withOffline(
  withCSS({
    workboxOpts: {
      globPatterns: ["static/**/*"],
      globDirectory: ".",
      runtimeCaching: [
        {
          urlPattern: prod
            ? /^https?:\/\/api.tevicolombia.com\/.*/
            : /^http:\/\/localhost:4000\/.*/,
          handler: "staleWhileRevalidate"
        },
        {
          urlPattern: /^http(s)?.*/,
          handler: "networkFirst"
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
