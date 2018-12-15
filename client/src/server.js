const express = require("express");
const next = require("next");
const cookieParser = require("cookie-parser");
const { join } = require("path");
const { parse } = require("url");

const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "src" });
const handler = routes.getRequestHandler(app);
const server = express();

app
  .prepare()
  .then(() => {
    server
      .use(cookieParser())
      .get("/service-worker.js", (req, res) => {
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;
        const filePath = join(__dirname, ".next", pathname);
        app.serveStatic(req, res, filePath);
      })
      .use(handler)
      .listen(process.env.PORT || 3000);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
