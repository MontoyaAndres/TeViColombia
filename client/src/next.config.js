const withOffline = require("next-offline");

const prod = process.env.NODE_ENV === "production";

module.exports = withOffline({
  env: {
    API_HOST: prod ? "https://api.example.com" : "http://localhost:4000"
  },
  crossOrigin: "anonymous"
});
