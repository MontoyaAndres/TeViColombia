const withOffline = require("next-offline");
const withCSS = require("@zeit/next-css");

const prod = process.env.NODE_ENV === "production";

module.exports = withOffline(
  withCSS({
    env: {
      API_HOST: prod ? "https://api.tevicolombia.com" : "http://localhost:4000"
    },
    crossOrigin: "anonymous"
  })
);
